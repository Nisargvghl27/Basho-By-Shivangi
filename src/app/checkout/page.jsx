"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { loadRazorpay } from '../../utils/razorpayUtils';
import { calculateShipping, formatCurrency, getShippingEstimate } from '../../utils/shippingUtils';

// ==============================================================================
// INTERNAL COMPONENT: CheckoutContent
// Handles all the logic, state, and UI for the checkout process
// ==============================================================================
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Context Data
  const { cartItems, clearCart, removeFromCart } = useCart();
  
  // Local UI State
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment (or Summary on Mobile)
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ----------------------------------------------------------------------------
  // 1. DATA PREPARATION & CALCULATIONS
  // ----------------------------------------------------------------------------

  // Helper: Parse price strings that might contain symbols
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    }
    return price;
  };

  const calculateItemTotal = (price, quantity) => parsePrice(price) * quantity;
  
  // Identify which items are being checked out (from URL or all items)
  const selectedItemIds = searchParams.getAll('selected');
  
  const filteredCartItems = selectedItemIds.length > 0 
    ? cartItems.filter(item => selectedItemIds.includes(item.id))
    : cartItems;
  
  // Calculation: Subtotal
  const filteredSubtotal = filteredCartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item.price, item.quantity),
    0
  );

  // Calculation: Total Weight
  // Logic: Use item.weight if available, otherwise default to 0.5kg per item
  const totalWeight = filteredCartItems.reduce((acc, item) => {
    const itemWeight = item.weight ? parseFloat(item.weight) : 0.5;
    return acc + (itemWeight * item.quantity);
  }, 0);
  
  // ----------------------------------------------------------------------------
  // 2. FORM STATE MANAGEMENT
  // ----------------------------------------------------------------------------

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gstNumber: '', // NEW: GST Field
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculation: Shipping Cost (Dynamic based on Weight)
  const shippingCost = calculateShipping(filteredSubtotal, shippingMethod, totalWeight);

  // Calculation: Tax & Final Total
  const taxRate = 0.18; // 18% GST
  const taxAmount = filteredSubtotal * taxRate;
  const total = filteredSubtotal + shippingCost + taxAmount;

  // ----------------------------------------------------------------------------
  // 3. EFFECTS (Lifecycle)
  // ----------------------------------------------------------------------------

  useEffect(() => {
    // 1. Detect Mobile View
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 2. Load Saved Shipping Info
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      try {
        setShippingInfo(prev => ({ ...prev, ...JSON.parse(savedShippingInfo) }));
      } catch (error) {
        console.error('Error parsing saved shipping info:', error);
      }
    }

    // 3. Load Saved Addresses
    const savedAddressesData = localStorage.getItem('savedAddresses');
    if (savedAddressesData) {
      try {
        setSavedAddresses(JSON.parse(savedAddressesData));
      } catch (error) {
        console.error('Error parsing saved addresses:', error);
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (filteredCartItems.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [filteredCartItems, router, isProcessing]);

  // ----------------------------------------------------------------------------
  // 4. HANDLERS & ACTIONS
  // ----------------------------------------------------------------------------

  const updateShippingInfo = (field, value) => {
    setShippingInfo(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('shippingInfo', JSON.stringify(updated));
      return updated;
    });
  };

  const saveNewAddress = () => {
    if (shippingInfo.firstName && shippingInfo.address && shippingInfo.city) {
      const newAddress = {
        fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        address: shippingInfo.address,
        city: shippingInfo.city,
        pinCode: shippingInfo.zipCode,
        phone: shippingInfo.phone,
        state: shippingInfo.state
      };
      
      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    }
  };

  const selectSavedAddress = (address) => {
    setShippingInfo(prev => ({
      ...prev,
      firstName: address.fullName.split(' ')[0] || '',
      lastName: address.fullName.split(' ')[1] || '',
      address: address.address,
      city: address.city,
      zipCode: address.pinCode,
      phone: address.phone,
      state: address.state || prev.state,
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API/Validation delay
    setTimeout(() => {
      setStep(2); 
      setLoading(false);
    }, 400);
  };

  const handleOrderSuccess = () => {
    router.push('/order-success');
    setIsProcessing(true);
    
    // Clean up cart
    setTimeout(() => {
      if (selectedItemIds.length > 0) {
        selectedItemIds.forEach(id => removeFromCart(id));
      } else {
        clearCart();
      }
      setIsProcessing(false);
    }, 500);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Construct Order Payload
      const orderPayload = {
        items: filteredCartItems,
        shipping: shippingInfo, // Contains GST Number
        billing: billingInfo.sameAsShipping ? shippingInfo : billingInfo,
        total: total,
        subtotal: filteredSubtotal,
        tax: taxAmount,
        shippingCost: shippingCost,
        paymentMethod: paymentMethod,
        totalWeight: totalWeight
      };

      // 2. Handle Cash on Delivery
      if (paymentMethod === 'cod') {
        const response = await fetch('/api/create-cod-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });

        const order = await response.json();
        
        if (order.id) {
          handleOrderSuccess();
        } else {
          toast.error('Failed to place COD order');
          setLoading(false);
          alert('Failed to place order. Please try again.');
        }
        return;
      }
      
      // 3. Handle Razorpay
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
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
          description: 'Handcrafted Pottery',
          order_id: order.id,
          image: "/images/bgr_logo.png",
          handler: async function (response) {
            // Verify Signature
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verification = await verifyResponse.json();
            if (verification.success) {
              handleOrderSuccess();
            } else {
              console.error('Payment verification failed');
              setLoading(false);
              alert('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            contact: shippingInfo.phone,
          },
          theme: { color: '#A65D3D' },
          modal: {
            ondismiss: function() { setLoading(false); }
          }
        };

        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error(response.error);
          setLoading(false);
          alert(`Payment Failed: ${response.error.description}`);
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  // ----------------------------------------------------------------------------
  // 5. RENDER
  // ----------------------------------------------------------------------------

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
      
      {/* --- Loading Overlay --- */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-charcoal-light rounded-lg p-8 border border-clay/30 shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-clay border-t-transparent mb-4"></div>
            <span className="text-rice-paper font-medium text-lg">Processing...</span>
          </div>
        </div>
      )}
      
      <main className="flex-grow px-4 py-8 md:py-12 mt-12">
        <div className="max-w-6xl mx-auto">
          
          {/* --- Progress Steps --- */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center space-x-4">
              {/* Step 1 Indicator */}
              <div className={`flex items-center ${step >= 1 ? 'text-clay' : 'text-stone-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 ? 'border-clay bg-clay text-white' : 'border-stone-600 bg-transparent'
                }`}>1</div>
                <span className="ml-2 font-medium hidden sm:block">Shipping</span>
              </div>
              
              <div className="w-12 h-[1px] bg-stone-700"></div>
              
              {/* Step 2 Indicator */}
              <div className={`flex items-center ${step >= 2 ? 'text-clay' : 'text-stone-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 ? 'border-clay bg-clay text-white' : 'border-stone-600 bg-transparent'
                }`}>2</div>
                <span className="ml-2 font-medium hidden sm:block">Payment</span>
              </div>
            </div>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
            
            {/* --- LEFT COLUMN: Forms --- */}
            <div className={isMobile ? '' : 'lg:col-span-2'}>
              
              {/* STEP 1: Shipping Form */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="bg-charcoal-light rounded-xl p-6 md:p-8 border border-border-subtle shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-rice-paper">Shipping Information</h2>
                  </div>
                  
                  {/* Saved Addresses List */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-8 p-4 bg-charcoal/50 rounded-lg border border-border-subtle">
                      <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-4">Saved Addresses</h3>
                      <div className="grid gap-3">
                        {savedAddresses.map((address, index) => (
                          <div 
                            key={index}
                            className="p-4 border border-stone-700 rounded-lg hover:border-clay/50 hover:bg-charcoal/80 cursor-pointer transition-all group"
                            onClick={() => selectSavedAddress(address)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-rice-paper">{address.fullName}</p>
                                <p className="text-sm text-stone-400 mt-1">{address.address}</p>
                                <p className="text-sm text-stone-400">{address.city}, {address.state} - {address.pinCode}</p>
                              </div>
                              <span className="text-clay opacity-0 group-hover:opacity-100 text-sm font-medium transition-opacity">
                                Select
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">First Name</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingInfo.firstName} 
                        onChange={(e) => updateShippingInfo('firstName', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingInfo.lastName} 
                        onChange={(e) => updateShippingInfo('lastName', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm text-stone-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            required 
                            value={shippingInfo.email} 
                            onChange={(e) => updateShippingInfo('email', e.target.value)} 
                            className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-2">Phone</label>
                        <input 
                            type="tel" 
                            required 
                            value={shippingInfo.phone} 
                            onChange={(e) => updateShippingInfo('phone', e.target.value)} 
                            className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                        />
                    </div>
                  </div>

                  {/* GST SECTION */}
                  <div className="mb-6">
                    <label className="block text-sm text-stone-300 mb-2">
                        GST Number <span className="text-stone-500 text-xs ml-1">(Optional for Business Invoice)</span>
                    </label>
                    <div className="relative">
                        <input
                        type="text"
                        placeholder="e.g. 27AAAAA0000A1Z5"
                        value={shippingInfo.gstNumber}
                        onChange={(e) => updateShippingInfo('gstNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay uppercase placeholder:text-stone-600"
                        />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-stone-300 mb-2">Address</label>
                    <input 
                        type="text" 
                        required 
                        value={shippingInfo.address} 
                        onChange={(e) => updateShippingInfo('address', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">City</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingInfo.city} 
                        onChange={(e) => updateShippingInfo('city', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">State</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingInfo.state} 
                        onChange={(e) => updateShippingInfo('state', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingInfo.zipCode} 
                        onChange={(e) => updateShippingInfo('zipCode', e.target.value)} 
                        className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-lg text-rice-paper focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-8">
                    <input 
                        type="checkbox" 
                        id="saveAddress"
                        className="w-4 h-4 rounded border-stone-600 bg-charcoal text-clay focus:ring-clay"
                        onChange={(e) => { if(e.target.checked) saveNewAddress(); }}
                    />
                    <label htmlFor="saveAddress" className="ml-2 text-sm text-stone-300 cursor-pointer">
                        Save this address for future orders
                    </label>
                  </div>

                  {/* Shipping Method Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-rice-paper mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {/* Standard */}
                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'standard' ? 'border-clay bg-clay/10' : 'border-border-subtle hover:border-stone-500'
                      }`}>
                        <input 
                            type="radio" 
                            name="shipping" 
                            value="standard" 
                            checked={shippingMethod === 'standard'} 
                            onChange={(e) => setShippingMethod(e.target.value)} 
                            className="w-4 h-4 text-clay border-stone-500 focus:ring-clay bg-transparent" 
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium text-rice-paper">Standard Shipping</span>
                            <span className="font-bold text-clay">
                                {formatCurrency(calculateShipping(filteredSubtotal, 'standard', totalWeight))}
                            </span>
                          </div>
                          <p className="text-sm text-stone-400 mt-1">{getShippingEstimate('standard')}</p>
                        </div>
                      </label>
                      
                      {/* Express */}
                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'express' ? 'border-clay bg-clay/10' : 'border-border-subtle hover:border-stone-500'
                      }`}>
                        <input 
                            type="radio" 
                            name="shipping" 
                            value="express" 
                            checked={shippingMethod === 'express'} 
                            onChange={(e) => setShippingMethod(e.target.value)} 
                            className="w-4 h-4 text-clay border-stone-500 focus:ring-clay bg-transparent" 
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium text-rice-paper">Express Shipping</span>
                            <span className="font-bold text-clay">
                                {formatCurrency(calculateShipping(filteredSubtotal, 'express', totalWeight))}
                            </span>
                          </div>
                          <p className="text-sm text-stone-400 mt-1">{getShippingEstimate('express')}</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-clay hover:bg-clay-dark text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-lg shadow-clay/20"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* STEP 2: Payment Form */}
              {((!isMobile && step >= 2) || (isMobile && step === 2)) && (
                <form onSubmit={handlePaymentSubmit} className="bg-charcoal-light rounded-xl p-6 md:p-8 border border-border-subtle shadow-lg animate-fade-in-up">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif text-rice-paper">Payment Details</h2>
                    <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="text-sm text-clay hover:text-white underline"
                    >
                        Edit Shipping
                    </button>
                  </div>
                  
                  {/* Summary of Shipping Info */}
                  <div className="mb-8 p-4 bg-charcoal/50 rounded-lg border border-border-subtle text-sm">
                     <div className="flex justify-between mb-2">
                        <span className="text-stone-400">Ship to:</span>
                        <span className="text-rice-paper text-right">{shippingInfo.address}, {shippingInfo.city}</span>
                     </div>
                     <div className="flex justify-between mb-2">
                        <span className="text-stone-400">Contact:</span>
                        <span className="text-rice-paper text-right">{shippingInfo.phone}</span>
                     </div>
                     {shippingInfo.gstNumber && (
                         <div className="flex justify-between">
                            <span className="text-stone-400">GSTIN:</span>
                            <span className="text-rice-paper font-mono">{shippingInfo.gstNumber}</span>
                         </div>
                     )}
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-stone-300 mb-4">Select Payment Method</label>
                    <div className="space-y-4">
                      {/* Razorpay Option */}
                      <label className={`relative flex items-start p-5 border rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'razorpay' ? 'border-clay bg-clay/10' : 'border-border-subtle hover:border-stone-500'
                      }`}>
                        <div className="flex items-center h-5">
                            <input 
                                type="radio" 
                                name="payment" 
                                value="razorpay" 
                                checked={paymentMethod === 'razorpay'} 
                                onChange={(e) => setPaymentMethod(e.target.value)} 
                                className="w-4 h-4 text-clay border-stone-500 focus:ring-clay bg-transparent" 
                            />
                        </div>
                        <div className="ml-4">
                            <span className="block font-medium text-rice-paper">Online Payment (Razorpay)</span>
                            <span className="block text-sm text-stone-400 mt-1">UPI, Credit/Debit Cards, NetBanking, Wallets</span>
                            <div className="mt-2 flex gap-2">
                                {/* Placeholders for card icons could go here */}
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                            </div>
                        </div>
                      </label>
                      
                      {/* COD Option */}
                      <label className={`relative flex items-start p-5 border rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'cod' ? 'border-clay bg-clay/10' : 'border-border-subtle hover:border-stone-500'
                      }`}>
                        <div className="flex items-center h-5">
                            <input 
                                type="radio" 
                                name="payment" 
                                value="cod" 
                                checked={paymentMethod === 'cod'} 
                                onChange={(e) => setPaymentMethod(e.target.value)} 
                                className="w-4 h-4 text-clay border-stone-500 focus:ring-clay bg-transparent" 
                            />
                        </div>
                        <div className="ml-4">
                            <span className="block font-medium text-rice-paper">Cash on Delivery</span>
                            <span className="block text-sm text-stone-400 mt-1">Pay when you receive the order. Additional verification may be required.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Billing Address Toggle */}
                  <div className="mb-8">
                     <label className="flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={billingInfo.sameAsShipping}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, sameAsShipping: e.target.checked }))}
                            className="w-4 h-4 rounded border-stone-600 bg-charcoal text-clay focus:ring-clay"
                        />
                        <span className="ml-2 text-sm text-stone-300">Billing address same as shipping</span>
                     </label>
                  </div>
                  
                  {/* Expanded Billing Address Form (if different) */}
                  {!billingInfo.sameAsShipping && (
                      <div className="mb-8 p-4 border border-stone-700 rounded-lg bg-charcoal animate-fade-in">
                          <h3 className="text-sm font-medium text-rice-paper mb-4">Billing Address</h3>
                          {/* Simplified fields for brevity in UI, but logic handles full object */}
                          <div className="space-y-4">
                             <input 
                                type="text" placeholder="Full Name" 
                                value={billingInfo.firstName}
                                onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                                className="w-full px-3 py-2 bg-charcoal-light border border-stone-700 rounded text-rice-paper"
                             />
                             <input 
                                type="text" placeholder="Address"
                                value={billingInfo.address}
                                onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                                className="w-full px-3 py-2 bg-charcoal-light border border-stone-700 rounded text-rice-paper"
                             />
                             <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="text" placeholder="City"
                                    value={billingInfo.city}
                                    onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                                    className="w-full px-3 py-2 bg-charcoal-light border border-stone-700 rounded text-rice-paper"
                                />
                                <input 
                                    type="text" placeholder="ZIP Code"
                                    value={billingInfo.zipCode}
                                    onChange={(e) => setBillingInfo({...billingInfo, zipCode: e.target.value})}
                                    className="w-full px-3 py-2 bg-charcoal-light border border-stone-700 rounded text-rice-paper"
                                />
                             </div>
                          </div>
                      </div>
                  )}

                  <div className="flex gap-4">
                    <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="flex-1 py-4 border border-stone-600 text-stone-300 rounded-xl hover:bg-charcoal font-medium transition-colors"
                    >
                        Back
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-[2] bg-clay hover:bg-clay-dark text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-lg shadow-clay/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : `Pay ${formatCurrency(total)}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* --- RIGHT COLUMN: Order Summary --- */}
            {/* Displayed always on Desktop, conditionally on Mobile */}
            <div className={`lg:col-span-1 ${isMobile && step === 1 ? 'hidden' : 'block'}`}>
              <div className="sticky top-8">
                <div className="bg-charcoal-light rounded-xl border border-border-subtle shadow-xl overflow-hidden">
                  <div className="p-6 bg-charcoal/30 border-b border-border-subtle">
                    <h3 className="text-xl font-medium text-rice-paper">Order Summary</h3>
                  </div>
                  
                  <div className="p-6">
                    {/* Cart Items List */}
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                      {filteredCartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-stone-700">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                            />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-clay text-white text-xs flex items-center justify-center rounded-full">
                                {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-rice-paper text-sm font-medium line-clamp-1">{item.name}</h4>
                            <p className="text-stone-500 text-xs mt-1">Weight: {item.weight || 0.5}kg</p>
                          </div>
                          <div className="text-right">
                             <p className="text-rice-paper text-sm font-medium">
                                {formatCurrency(calculateItemTotal(item.price, item.quantity))}
                             </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-3 py-6 border-t border-stone-800">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Subtotal</span>
                        <span className="text-rice-paper">{formatCurrency(filteredSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Total Weight</span>
                        <span className="text-stone-400">{totalWeight.toFixed(2)} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Shipping</span>
                        <span className={shippingCost === 0 ? 'text-green-400 font-medium' : 'text-rice-paper'}>
                          {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">GST (18%)</span>
                        <span className="text-rice-paper">{formatCurrency(taxAmount)}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-6 border-t border-stone-800">
                      <div className="flex justify-between items-end">
                        <span className="text-stone-300 font-medium">Total</span>
                        <span className="text-2xl font-serif text-clay font-bold">
                            {formatCurrency(total)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 text-right mt-2">
                        Including {formatCurrency(taxAmount)} in taxes
                      </p>
                    </div>
                  </div>
                  
                  {/* Security Badge */}
                  <div className="bg-charcoal/50 p-4 border-t border-stone-800 flex items-center justify-center gap-2 text-xs text-stone-500">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      Secure Checkout powered by Razorpay
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ==============================================================================
// DEFAULT EXPORT
// Wraps content in Suspense for SearchParams compatibility
// ==============================================================================
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="flex flex-col items-center">
           <div className="animate-spin rounded-full h-12 w-12 border-4 border-clay border-t-transparent mb-4"></div>
           <p className="text-stone-400">Loading Checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

