"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { loadRazorpay } from '../../utils/razorpayUtils';
import { toast } from 'react-hot-toast';

// --- The Content Component ---
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, cartSubtotal, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Helper to calculate item total
  const calculateItemTotal = (price, quantity) => {
    const itemPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.-]+/g, "")) 
      : price;
    return itemPrice * quantity;
  };
  
  // Get selected item IDs
  const selectedItemIds = searchParams.getAll('selected');
  
  // Filter cart items
  const filteredCartItems = selectedItemIds.length > 0 
    ? cartItems.filter(item => selectedItemIds.includes(item.id))
    : cartItems;
  
  // Recalculate subtotal
  const filteredSubtotal = filteredCartItems.reduce(
    (sum, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
        : item.price;
      return sum + (itemPrice * item.quantity);
    },
    0
  );
  
  // Form states
  const [isMobile, setIsMobile] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  // Load saved info
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      try {
        setShippingInfo(prev => ({ ...prev, ...JSON.parse(savedShippingInfo) }));
      } catch (error) { console.error(error); }
    }

    const savedAddressesData = localStorage.getItem('savedAddresses');
    if (savedAddressesData) {
      try {
        setSavedAddresses(JSON.parse(savedAddressesData));
      } catch (error) { console.error(error); }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [billingInfo, setBillingInfo] = useState({ sameAsShipping: true });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Shipping Constants
  const SHIPPING_PRICES = { standard: 50, express: 150 };
  const shippingCost = SHIPPING_PRICES[shippingMethod];
  const taxRate = 0.18; 
  const taxAmount = filteredSubtotal * taxRate;
  const total = filteredSubtotal + shippingCost + taxAmount;

  // Redirect if empty
  useEffect(() => {
    if (filteredCartItems.length === 0 && !isProcessing && !loading) {
      router.push('/cart');
    }
  }, [filteredCartItems, router, isProcessing, loading]);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep(2); 
      setLoading(false);
    }, 300);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // --- COD FLOW ---
      if (paymentMethod === 'cod') {
        const response = await fetch('/api/create-cod-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: filteredCartItems,
            shipping: shippingInfo,
            total: total,
            paymentMethod: 'cod'
          }),
        });

        const order = await response.json();
        
        if (order.id) {
          setIsProcessing(true);
          toast.success('Order placed successfully!');
          router.push('/'); // REDIRECT TO HOME
          
          setTimeout(() => {
            if (selectedItemIds.length > 0) {
              selectedItemIds.forEach(id => removeFromCart(id));
            } else {
              clearCart();
            }
          }, 500);
        } else {
          toast.error('Failed to place COD order');
          setLoading(false);
        }
        return;
      }
      
      // --- RAZORPAY FLOW ---
      console.log('Initiating Razorpay...');
      
      // 1. Create Order
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: filteredCartItems,
          shipping: shippingInfo,
          total: total
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || 'Failed to create order');
      }
      
      const order = await response.json();
      
      if (order.id) {
        const Razorpay = await loadRazorpay();
        if (!Razorpay) {
          toast.error('Payment gateway failed to load');
          setLoading(false);
          return;
        }
        
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: order.amount,
          currency: 'INR',
          name: 'Basho by Shivangi',
          description: 'Pottery Purchase',
          order_id: order.id,
          image: "/images/bgr_logo.png",
          handler: async function (response) {
            try {
              // 2. Verify Payment
              const verifyResponse = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              // FIX: Check for server errors (4xx/5xx) before parsing JSON
              if (!verifyResponse.ok) {
                const errorText = await verifyResponse.text();
                console.error('Verify API Error:', verifyResponse.status, errorText);
                throw new Error(`Payment verification failed: ${verifyResponse.statusText}`);
              }

              const verification = await verifyResponse.json();
              console.log('Verification Result:', verification); // Debug log
              
              if (verification.success) {
                setIsProcessing(true);
                toast.success('Payment Successful!');
                
                // 3. REDIRECT TO HOME PAGE
                router.push('/');
                
                // 4. Clear Cart
                setTimeout(() => {
                  if (selectedItemIds.length > 0) {
                    selectedItemIds.forEach(id => removeFromCart(id));
                  } else {
                    clearCart();
                  }
                }, 100);
              } else {
                console.error('Verification failed payload:', verification);
                toast.error(verification.error || 'Payment verified but order update failed.');
                setLoading(false);
              }
            } catch (error) {
              console.error('Verification Logic Error:', error);
              toast.error(error.message || 'Payment successful but verification error occurred.');
              setLoading(false);
            }
          },
          prefill: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            contact: shippingInfo.phone,
          },
          theme: { color: '#A65D3D' },
          modal: {
            ondismiss: function() {
              setLoading(false);
              toast('Payment cancelled');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          toast.error('Payment Failed: ' + (response.error.description || 'Unknown error'));
          setLoading(false);
        });
        rzp.open();
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      toast.error(error.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  const updateShippingInfo = (field, value) => {
    setShippingInfo(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('shippingInfo', JSON.stringify(updated));
      return updated;
    });
  };

  const selectSavedAddress = (address) => {
    setShippingInfo({
      firstName: address.fullName.split(' ')[0] || '',
      lastName: address.fullName.split(' ')[1] || '',
      address: address.address,
      city: address.city,
      zipCode: address.pinCode,
      phone: address.phone,
      apartment: '',
      state: '',
      country: 'India'
    });
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-rice-paper mb-4">Your cart is empty</h1>
            <Link href="/shop" className="text-clay hover:underline">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Header />
      
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-charcoal-light rounded-lg p-6 border border-clay/30 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-clay border-t-transparent"></div>
              <span className="text-rice-paper font-medium">Processing...</span>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow px-4 py-8 md:py-12 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 px-2 sm:px-0">
             <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <div className={`flex items-center transition-all duration-700 ease-out ${step >= 1 ? 'text-clay scale-105' : 'text-stone-500'}`}>
                <div className={`relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-700 ease-out ${
                  step >= 1 ? 'bg-gradient-to-br from-clay to-clay/90 text-white shadow-lg shadow-clay/30 scale-110' : 'bg-charcoal-light border-2 border-stone-600'
                }`}>1</div>
                <span className="ml-2 text-sm font-semibold uppercase tracking-wider">Shipping</span>
              </div>
              <div className={`h-1 w-12 transition-all duration-700 ${step >= 2 ? 'bg-clay' : 'bg-stone-700'}`}></div>
              <div className={`flex items-center transition-all duration-700 ease-out ${step >= 2 ? 'text-clay scale-105' : 'text-stone-500'}`}>
                <div className={`relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-700 ease-out ${
                  step >= 2 ? 'bg-gradient-to-br from-clay to-clay/90 text-white shadow-lg shadow-clay/30 scale-110' : 'bg-charcoal-light border-2 border-stone-600'
                }`}>2</div>
                <span className="ml-2 text-sm font-semibold uppercase tracking-wider">{isMobile ? 'Summary' : 'Payment'}</span>
              </div>
            </div>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
            {/* Left Column */}
            <div className={isMobile ? '' : 'lg:col-span-2'}>
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="bg-charcoal-light rounded-lg p-6 border border-border-subtle">
                  <h2 className="text-xl font-serif text-rice-paper mb-6">Shipping Information</h2>
                  
                  {savedAddresses.length > 0 && (
                    <div className="mb-6 p-4 bg-charcoal/50 rounded-md border border-border-subtle">
                      <h3 className="text-sm font-medium text-rice-paper mb-4">Saved Addresses</h3>
                      <div className="space-y-3">
                        {savedAddresses.map((address, index) => (
                          <div key={index} className="p-3 border border-border-subtle rounded-md hover:border-clay/30 cursor-pointer" onClick={() => selectSavedAddress(address)}>
                             <div className="flex justify-between"><p className="text-sm text-rice-paper">{address.fullName}</p></div>
                             <p className="text-xs text-stone-400">{address.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">First Name</label>
                      <input required type="text" value={shippingInfo.firstName} onChange={(e) => updateShippingInfo('firstName', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay" />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">Last Name</label>
                      <input required type="text" value={shippingInfo.lastName} onChange={(e) => updateShippingInfo('lastName', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-stone-300 mb-2">Email</label>
                    <input required type="email" value={shippingInfo.email} onChange={(e) => updateShippingInfo('email', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-stone-300 mb-2">Phone</label>
                    <input required type="tel" value={shippingInfo.phone} onChange={(e) => updateShippingInfo('phone', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay" />
                  </div>

                  <div className="mb-4">
                     <label className="block text-sm text-stone-300 mb-2">Address</label>
                     <input required type="text" value={shippingInfo.address} onChange={(e) => updateShippingInfo('address', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                     <input required placeholder="City" type="text" value={shippingInfo.city} onChange={(e) => updateShippingInfo('city', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper" />
                     <input required placeholder="State" type="text" value={shippingInfo.state} onChange={(e) => updateShippingInfo('state', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper" />
                     <input required placeholder="ZIP" type="text" value={shippingInfo.zipCode} onChange={(e) => updateShippingInfo('zipCode', e.target.value)} className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper" />
                  </div>

                  <button type="submit" className="w-full bg-clay hover:bg-clay/90 text-white py-3 rounded-md font-medium transition-all">Continue to Payment</button>
                </form>
              )}

              {((!isMobile && step >= 2) || (isMobile && step === 3)) && (
                <form onSubmit={handlePaymentSubmit} className="bg-charcoal-light rounded-lg p-6 border border-border-subtle">
                  <h2 className="text-xl font-serif text-rice-paper mb-6">Payment Information</h2>
                  
                  <div className="mb-6 space-y-3">
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-clay bg-clay/10' : 'border-border-subtle'}`}>
                      <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 text-clay focus:ring-clay" />
                      <span className="text-rice-paper font-medium">Razorpay (UPI, Cards, Net Banking)</span>
                    </label>
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-clay bg-clay/10' : 'border-border-subtle'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 text-clay focus:ring-clay" />
                      <span className="text-rice-paper font-medium">Cash on Delivery</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(isMobile ? 2 : 1)} className="flex-1 border border-clay text-clay py-3 rounded-md font-medium hover:bg-clay/10">Back</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-clay hover:bg-clay/90 text-white py-3 rounded-md font-medium disabled:opacity-50">
                      {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </form>
              )}
              
              {/* Mobile Summary Step (2) */}
              {isMobile && step === 2 && (
                 <div className="bg-charcoal-light rounded-lg p-6 border border-border-subtle">
                    <h2 className="text-xl font-serif text-rice-paper mb-4">Summary</h2>
                    <div className="mb-4 text-stone-300 text-sm">
                       <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                       <p>{shippingInfo.address}, {shippingInfo.city}</p>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-4 mb-4">
                       <span className="text-rice-paper font-bold">Total</span>
                       <span className="text-white font-bold">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex gap-3">
                       <button onClick={() => setStep(1)} className="flex-1 border border-clay text-clay py-2 rounded">Edit</button>
                       <button onClick={() => setStep(3)} className="flex-1 bg-clay text-white py-2 rounded">Pay Now</button>
                    </div>
                 </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-charcoal/70 rounded-xl border border-white/5 p-6">
                  <h3 className="text-xl font-semibold text-rice-paper mb-4 border-b border-border-subtle pb-3">Order Summary</h3>
                  <div className="space-y-3">
                    {filteredCartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-charcoal rounded overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover"/></div>
                           <div><p className="text-rice-paper">{item.name}</p><p className="text-xs text-stone-400">Qty: {item.quantity}</p></div>
                        </div>
                        <span className="text-white">₹{calculateItemTotal(item.price, item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="border-t border-border-subtle my-4 pt-4 space-y-2">
                       <div className="flex justify-between text-sm"><span className="text-stone-400">Subtotal</span><span className="text-rice-paper">₹{filteredSubtotal.toLocaleString('en-IN')}</span></div>
                       <div className="flex justify-between text-sm"><span className="text-stone-400">Shipping</span><span className="text-rice-paper">{shippingCost > 0 ? `₹${shippingCost}` : 'Free'}</span></div>
                       <div className="flex justify-between text-sm"><span className="text-stone-400">GST (18%)</span><span className="text-rice-paper">₹{taxAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span></div>
                       <div className="flex justify-between font-bold text-lg pt-2 border-t border-border-subtle"><span className="text-rice-paper">Total</span><span className="text-white">₹{total.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-clay border-t-transparent"></div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}