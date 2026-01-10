"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // Clear any remaining cart data if needed
    localStorage.removeItem('guest_cart');
    // Generate order number only on client side using timestamp
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    setOrderNumber(`BAS-${timestamp.toString().slice(-6)}-${randomSuffix}`);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 pt-32">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-clay/20 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl text-clay">check_circle</span>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-serif text-rice-paper mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-stone-warm mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been received and is being processed. 
            You will receive a confirmation email shortly with your order details.
          </p>

          {/* Order Details */}
          <div className="bg-charcoal-light rounded-lg p-6 border border-border-subtle mb-8">
            <h2 className="text-lg font-medium text-rice-paper mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-warm">Order Number:</span>
                <span className="text-rice-paper">{orderNumber || 'Loading...'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-warm">Status:</span>
                <span className="text-green-400">Processing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-warm">Estimated Delivery:</span>
                <span className="text-rice-paper">5-7 business days</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/shop"
              className="block w-full bg-clay hover:bg-clay/90 text-white py-3 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </Link>
            
            <Link 
              href="/profile/orders"
              className="block w-full border border-clay text-clay hover:bg-clay hover:text-white py-3 rounded-md font-medium transition-colors"
            >
              View My Orders
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-charcoal/50 rounded-md">
            <h3 className="text-sm font-medium text-rice-paper mb-2">What's Next?</h3>
            <ul className="text-xs text-stone-warm space-y-1 text-left">
              <li>• Order confirmation email sent to your inbox</li>
              <li>• Your items will be carefully packed and shipped</li>
              <li>• You'll receive tracking information once shipped</li>
              <li>• Expected delivery within 5-7 business days</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
