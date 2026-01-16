"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { loadRazorpay } from '../../utils/razorpayUtils';

// --- 1. The Content Component (Contains your main logic) ---
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, cartSubtotal, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Mobile: 1: Shipping, 2: Order Summary, 3: Payment | Desktop: 1: Shipping, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Helper function to calculate item total
  const calculateItemTotal = (price, quantity) => {
    const itemPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.-]+/g, "")) 
      : price;
    return itemPrice * quantity;
  };
  
  // Get selected item IDs from URL parameters
  const selectedItemIds = searchParams.getAll('selected');
  
  // Filter cart items to only include selected ones
  const filteredCartItems = selectedItemIds.length > 0 
    ? cartItems.filter(item => selectedItemIds.includes(item.id))
    : cartItems;
  
  // Recalculate subtotal for filtered items
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

  // Saved addresses management
  const [savedAddresses, setSavedAddresses] = useState([]);

  // Load saved shipping info and addresses from localStorage on component mount
  useEffect(() => {
    // Check if mobile view
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      console.log('Mobile detection:', mobile, 'Window width:', window.innerWidth, 'Step:', step);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      try {
        const parsed = JSON.parse(savedShippingInfo);
        setShippingInfo(prev => ({
          ...prev,
          ...parsed
        }));
      } catch (error) {
        console.error('Error parsing saved shipping info:', error);
      }
    }

    // Load saved addresses
    const savedAddressesData = localStorage.getItem('savedAddresses');
    if (savedAddressesData) {
      try {
        const addresses = JSON.parse(savedAddressesData);
        setSavedAddresses(addresses);
      } catch (error) {
        console.error('Error parsing saved addresses:', error);
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Shipping prices constants
  const SHIPPING_PRICES = {
    standard: 50,
    express: 150,
  };

  // Calculations
  const shippingCost = SHIPPING_PRICES[shippingMethod];
  const taxRate = 0.18; // 18% GST
  const taxAmount = filteredSubtotal * taxRate;
  const total = filteredSubtotal + shippingCost + taxAmount;

  useEffect(() => {
    // Only redirect to cart if not processing payment and no items to checkout
    if (filteredCartItems.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cartItems, filteredCartItems, selectedItemIds, router, isProcessing]);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing delay for better UX
    setTimeout(() => {
      setStep(2); // Always go to step 2 (Payment for desktop, Order Summary for mobile)
      setLoading(false);
    }, 300);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if COD is selected
      if (paymentMethod === 'cod') {
        // Handle Cash on Delivery
        const response = await fetch('/api/create-cod-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: filteredCartItems,
            shipping: shippingInfo,
            total: total,
            paymentMethod: 'cod'
          }),
        });

        const order = await response.json();
        
        if (order.id) {
          // Navigate first, then remove only purchased items
          router.push('/order-success');
          // Remove only the purchased items from cart
          setTimeout(() => {
            if (selectedItemIds.length > 0) {
              // Remove specific selected items
              selectedItemIds.forEach(id => removeFromCart(id));
            } else {
              // If no specific items selected, clear entire cart (for Buy Now)
              clearCart();
            }
          }, 100);
          // Set processing flag to prevent redirect
          setIsProcessing(true);
          setTimeout(() => setIsProcessing(false), 2000); // Clear flag after 2 seconds
        } else {
          console.error('Failed to create COD order');
          setLoading(false);
        }
        return;
      }
      
      // Handle Razorpay payment
      console.log('Processing Razorpay payment...');
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: filteredCartItems,
          shipping: shippingInfo,
          total: total
        }),
      });

      const order = await response.json();
      
      if (order.id) {
        const Razorpay = await loadRazorpay();
        
        if (!Razorpay) {
          console.error('Razorpay SDK failed to load');
          setLoading(false);
          return;
        }
        
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
        
        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: 'INR',
          name: 'Basho by Shivangi',
          description: 'Purchase of pottery items',
          order_id: order.id,
          handler: async function (response) {
            // Payment successful
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verification = await verifyResponse.json();
            
            if (verification.success) {
              // Navigate first, then remove only purchased items
              router.push('/order-success');
              // Remove only the purchased items from cart
              setTimeout(() => {
                if (selectedItemIds.length > 0) {
                  // Remove specific selected items
                  selectedItemIds.forEach(id => removeFromCart(id));
                } else {
                  // If no specific items selected, clear entire cart (for Buy Now)
                  clearCart();
                }
              }, 100);
            } else {
              console.error('Payment verification failed');
              setLoading(false);
            }
          },
          prefill: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            contact: shippingInfo.phone,
          },
          theme: {
            color: '#A65D3D', // Clay color
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            },
            escape: true,
            backdropclose: true,
            handleback: true,
          }
        };

        const rzp = new Razorpay(options);
        
        // Add payment event handlers
        rzp.on('payment.failed', function (response) {
          setLoading(false);
        });
        
        rzp.on('payment.cancel', function (response) {
          setLoading(false);
        });
        
        rzp.open();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const updateShippingInfo = (field, value) => {
    setShippingInfo(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      // Save to localStorage for future use
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
        phone: shippingInfo.phone
      };
      
      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    }
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-rice-paper mb-4">Your cart is empty</h1>
            <Link href="/shop" className="text-clay hover:underline">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Header />
      
      {/* Loading Overlay */}
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
                  step >= 1 
                    ? 'bg-gradient-to-br from-clay to-clay/90 text-white shadow-lg shadow-clay/30 scale-110' 
                    : 'bg-charcoal-light border-2 border-stone-600'
                }`}>
                  {step >= 1 && (
                    <div className="absolute inset-0 rounded-full bg-clay/20 animate-ping"></div>
                  )}
                  1
                </div>
                <span className="ml-1 sm:ml-2 lg:ml-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-700">Shipping</span>
              </div>
              
              {(isMobile || true) && (
                <>
                  <div className={`h-1 w-8 sm:w-12 lg:w-16 transition-all duration-700 ease-out relative ${
                    step >= 2 ? 'bg-gradient-to-r from-clay to-clay/80' : 'bg-stone-700'
                  }`}>
                    {step === 2 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-clay to-clay/80 animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className={`flex items-center transition-all duration-700 ease-out ${step >= 2 ? 'text-clay scale-105' : 'text-stone-500'}`}>
                    <div className={`relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-700 ease-out ${
                      step >= 2 
                        ? 'bg-gradient-to-br from-clay to-clay/90 text-white shadow-lg shadow-clay/30 scale-110' 
                        : 'bg-charcoal-light border-2 border-stone-600'
                    }`}>
                      {step >= 2 && (
                        <div className="absolute inset-0 rounded-full bg-clay/20 animate-ping"></div>
                      )}
                      2
                    </div>
                    <span className="ml-1 sm:ml-2 lg:ml-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-700">
                      {isMobile ? 'Summary' : 'Payment'}
                    </span>
                  </div>
                </>
              )}
              
              {isMobile && (
                <>
                  <div className={`h-1 w-8 sm:w-12 lg:w-16 transition-all duration-700 ease-out relative ${
                    step >= 3 ? 'bg-gradient-to-r from-clay to-clay/80' : 'bg-stone-700'
                  }`}>
                    {step === 3 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-clay to-clay/80 animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className={`flex items-center transition-all duration-700 ease-out ${step >= 3 ? 'text-clay scale-105' : 'text-stone-500'}`}>
                    <div className={`relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-700 ease-out ${
                      step >= 3 
                        ? 'bg-gradient-to-br from-clay to-clay/90 text-white shadow-lg shadow-clay/30 scale-110' 
                        : 'bg-charcoal-light border-2 border-stone-600'
                    }`}>
                      {step >= 3 && (
                        <div className="absolute inset-0 rounded-full bg-clay/20 animate-ping"></div>
                      )}
                      3
                    </div>
                    <span className="ml-1 sm:ml-2 lg:ml-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-700">Payment</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
            {/* Main Content */}
            <div className={isMobile ? '' : 'lg:col-span-2'}>
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="bg-charcoal-light rounded-lg p-6 border border-border-subtle">
                  <h2 className="text-xl font-serif text-rice-paper mb-6">Shipping Information</h2>
                  
                  {/* Saved Addresses Section */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-6 p-4 bg-charcoal/50 rounded-md border border-border-subtle">
                      <h3 className="text-sm font-medium text-rice-paper mb-4">Saved Addresses</h3>
                      <div className="space-y-3">
                        {savedAddresses.map((address, index) => (
                          <div 
                            key={index}
                            className="p-3 border border-border-subtle rounded-md hover:border-clay/30 cursor-pointer transition-colors"
                            onClick={() => selectSavedAddress(address)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-rice-paper">{address.fullName}</p>
                                <p className="text-xs text-stone-400">{address.address}, {address.city}</p>
                                <p className="text-xs text-stone-500">PIN: {address.pinCode}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  // Remove address from saved list
                                  const updatedAddresses = savedAddresses.filter((_, i) => i !== index);
                                  setSavedAddresses(updatedAddresses);
                                  localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
                                }}
                                className="text-red-400 hover:text-red-300 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          // Save current address
                          saveNewAddress();
                        }}
                        className="w-full mt-3 bg-clay hover:bg-clay/90 text-white py-2 rounded-md font-medium transition-colors"
                      >
                        Save Current Address
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <label className="block text-sm text-stone-300 mb-2">First Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">person</span>
                        <input
                          type="text"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => updateShippingInfo('firstName', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-stone-300 mb-2">Last Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">person</span>
                        <input
                          type="text"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => updateShippingInfo('lastName', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-stone-300 mb-2">Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">mail</span>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => updateShippingInfo('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-stone-300 mb-2">Phone</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">phone</span>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => updateShippingInfo('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-stone-300 mb-2">Address</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">home</span>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => updateShippingInfo('address', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => updateShippingInfo('city', e.target.value)}
                        className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">State</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => updateShippingInfo('state', e.target.value)}
                        className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-300 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => updateShippingInfo('zipCode', e.target.value)}
                        className="w-full px-4 py-2 bg-charcoal border border-border-subtle rounded-md text-rice-paper focus:outline-none focus:border-clay"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-stone-300 mb-2">Shipping Method</label>
                    <div className="space-y-2">
                      <label className={`flex items-center p-3 border border-border-subtle rounded-md cursor-pointer transition-colors ${
                        shippingMethod === 'standard'
                          ? 'border-clay bg-clay/10'
                          : 'border-border-subtle hover:border-clay/50'
                      }`}>
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="mr-3 text-clay focus:ring-clay"
                        />
                        <div className="flex-1">
                          <span className="text-rice-paper">Standard Shipping</span>
                          <span className="text-stone-400 text-sm ml-2">(5-7 business days)</span>
                        </div>
                        <span className="text-clay">₹{SHIPPING_PRICES.standard}</span>
                      </label>
                      <label className={`flex items-center p-3 border border-border-subtle rounded-md cursor-pointer transition-colors ${
                        shippingMethod === 'express'
                          ? 'border-clay bg-clay/10'
                          : 'border-border-subtle hover:border-clay/50'
                      }`}>
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="mr-3 text-clay focus:ring-clay"
                        />
                        <div className="flex-1">
                          <span className="text-rice-paper">Express Shipping</span>
                          <span className="text-stone-400 text-sm ml-2">(2-3 business days)</span>
                        </div>
                        <span className="text-clay">₹150</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-clay to-clay/90 hover:from-clay/90 hover:to-clay text-white py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-clay/30 hover:-translate-y-0.5 transform"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {((!isMobile && step >= 2) || (isMobile && step === 3)) && (
                <form onSubmit={handlePaymentSubmit} className="bg-charcoal-light rounded-lg p-6 border border-border-subtle transition-all duration-500 ease-out hover:bg-charcoal/80 hover:border-clay/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1">
                  <h2 className="text-xl font-serif text-rice-paper mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={billingInfo.sameAsShipping}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, sameAsShipping: e.target.checked }))}
                        className="mr-2 text-clay focus:ring-clay"
                      />
                      <span className="text-rice-paper text-sm">Billing address same as shipping</span>
                    </label>
                  </div>

                  {!billingInfo.sameAsShipping && (
                    <div className="mb-6 p-4 border border-border-subtle rounded-md">
                      <h3 className="text-sm font-medium text-rice-paper mb-4">Billing Address</h3>
                      {/* Add billing address fields similar to shipping */}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm text-stone-300 mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <label className={`group flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                        paymentMethod === 'razorpay' 
                          ? 'border-clay bg-clay/10 shadow-lg shadow-clay/20' 
                          : 'border-border-subtle hover:border-clay/50 hover:bg-charcoal/50'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                            paymentMethod === 'razorpay' 
                              ? 'border-clay bg-clay' 
                              : 'border-stone-600 bg-transparent'
                          }`}>
                            {paymentMethod === 'razorpay' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-lg transition-colors duration-300 ${
                              paymentMethod === 'razorpay' ? 'text-clay' : 'text-stone-400'
                            }`}></span>
                            <div>
                              <p className={`font-medium transition-colors duration-300 ${
                                paymentMethod === 'razorpay' ? 'text-rice-paper' : 'text-stone-300'
                              }`}>Razorpay</p>
                              <p className={`text-xs transition-colors duration-300 ${
                                paymentMethod === 'razorpay' ? 'text-stone-400' : 'text-stone-500'
                              }`}>UPI, Cards, Net Banking</p>
                            </div>
                          </div>
                        </div>
                      </label>
                      
                      <label className={`group flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                        paymentMethod === 'cod' 
                          ? 'border-clay bg-clay/10 shadow-lg shadow-clay/20' 
                          : 'border-border-subtle hover:border-clay/50 hover:bg-charcoal/50'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                            paymentMethod === 'cod' 
                              ? 'border-clay bg-clay' 
                              : 'border-stone-600 bg-transparent'
                          }`}>
                            {paymentMethod === 'cod' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-lg transition-colors duration-300 ${
                              paymentMethod === 'cod' ? 'text-clay' : 'text-stone-400'
                            }`}></span>
                            <div>
                              <p className={`font-medium transition-colors duration-300 ${
                                paymentMethod === 'cod' ? 'text-rice-paper' : 'text-stone-300'
                              }`}>Cash on Delivery</p>
                              <p className={`text-xs transition-colors duration-300 ${
                                paymentMethod === 'cod' ? 'text-stone-400' : 'text-stone-500'
                              }`}>Pay when you receive</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="p-4 border border-border-subtle rounded-md bg-charcoal/50">
                      <div className="flex items-center mb-2">
                        <span className="material-symbols-outlined text-clay mr-2">lock</span>
                        <span className="text-rice-paper text-sm font-medium">Secure Payment</span>
                      </div>
                      <p className="text-stone-400 text-xs">Your payment information is encrypted and secure. We accept all major credit cards, debit cards, and UPI payments.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(isMobile ? 2 : 1)}
                      className="flex-1 border border-clay text-clay py-3 rounded-md font-medium hover:bg-clay/10 transition-colors"
                    >
                      {isMobile ? 'Back to Summary' : 'Back to Shipping'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-clay hover:bg-clay/90 text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Complete Payment'}
                    </button>
                  </div>

                  </form>
              )}

              {/* Mobile Order Summary Step */}
              {isMobile && step === 2 && (
                <div className="bg-charcoal-light rounded-lg p-6 border border-border-subtle">
                  <h2 className="text-xl font-serif text-rice-paper mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {/* Shipping Information Summary */}
                    <div className="p-4 bg-charcoal/50 rounded-md border border-border-subtle">
                      <h3 className="text-sm font-medium text-rice-paper mb-3">Shipping Information</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-stone-300">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p className="text-stone-300">{shippingInfo.email}</p>
                        <p className="text-stone-300">{shippingInfo.phone}</p>
                        <p className="text-stone-300">{shippingInfo.address}</p>
                        <p className="text-stone-300">
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                        <p className="text-stone-300">{shippingInfo.country}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-rice-paper">Order Items</h3>
                      {filteredCartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-charcoal rounded-md overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name || 'Product image'}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <p className="text-rice-paper text-sm font-medium">{item.name}</p>
                              <p className="text-stone-400 text-xs">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-white font-medium">
                            ₹{calculateItemTotal(item.price, item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-border-subtle pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Subtotal</span>
                        <span className="text-rice-paper">
                          ₹{filteredSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Shipping</span>
                        <span className={shippingCost > 0 ? 'text-rice-paper' : 'text-green-400'}>
                          {shippingCost > 0 ? `₹${shippingCost.toLocaleString('en-IN')}` : 'Free'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Tax (GST)</span>
                        <span className="text-rice-paper">
                          ₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="border-t border-border-subtle pt-2">
                        <div className="flex justify-between">
                          <span className="text-rice-paper font-medium">Total</span>
                          <span className="text-2xl font-semibold text-white">
                            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-clay text-clay py-3 rounded-md font-medium hover:bg-clay/10 transition-colors"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 bg-clay hover:bg-clay/90 text-white py-3 rounded-md font-medium transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar - Desktop Only */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-charcoal/70 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 ease-out hover:bg-charcoal/80 hover:border-clay/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-rice-paper mb-4 pb-3 border-b border-border-subtle">
                      Order Summary
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="space-y-1.5">
                        {filteredCartItems.map(item => (
                          <div key={item.id} className="group flex justify-between items-center rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-charcoal rounded-md overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name || 'Product image'}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div>
                                <p className="text-rice-paper text-sm font-medium transition-colors duration-500 group-hover:text-clay">{item.name}</p>
                                <p className="text-stone-400 text-xs transition-colors duration-500 group-hover:text-rice-paper/70">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="text-white font-medium transition-colors duration-500 group-hover:text-clay">
                              ₹{calculateItemTotal(item.price, item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border-subtle my-4"></div>

                      <div className="space-y-1.5">
                        <div className="group flex justify-between rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                          <span className="text-stone-400">Subtotal</span>
                          <span className="text-rice-paper">
                            ₹{filteredSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        
                        <div className="group flex justify-between rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                          <div className="flex items-center gap-1">
                            <span className="text-stone-400">Shipping</span>
                            <span className="text-xs text-stone-500">
                              {filteredSubtotal > 1000 ? '(Free over ₹1,000)' : '(Standard)'}
                            </span>
                          </div>
                          <span className={shippingCost > 0 ? 'text-rice-paper' : 'text-green-400'}>
                            {shippingCost > 0 ? `₹${shippingCost.toLocaleString('en-IN')}` : 'Free'}
                          </span>
                        </div>
                        
                        <div className="group flex justify-between rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                          <div className="flex items-center gap-1">
                            <span className="text-stone-400">Tax (GST)</span>
                            <span className="text-xs text-stone-500">18%</span>
                          </div>
                          <span className="text-rice-paper">
                            ₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="pt-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Discount code"
                              className="flex-1 px-3 py-2 text-sm bg-charcoal border border-border-subtle rounded-md text-rice-paper placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-clay/50"
                            />
                            <button 
                              className="px-4 py-2 bg-charcoal hover:bg-charcoal/80 text-stone-400 text-sm font-medium rounded-md transition-colors border border-border-subtle"
                              onClick={(e) => {
                                e.preventDefault();
                                alert('Discount code functionality will be implemented soon!');
                              }}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border-subtle my-4"></div>

                      <div className="group flex justify-between items-center rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                        <span className="text-rice-paper font-medium">Total</span>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-white">
                            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-stone-500">Inclusive of all taxes</p>
                        </div>
                      </div>
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

// --- 2. The Default Export (Wrapper) ---
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-clay border-t-transparent mx-auto mb-4"></div>
          <p className="text-rice-paper">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}