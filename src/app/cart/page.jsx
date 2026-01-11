"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Helper function to calculate item total
const calculateItemTotal = (price, quantity) => {
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
    : price;
  return numericPrice * quantity;
};

const CartPage = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    setSelectedItems(prev => prev.filter(id => id !== itemId));
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleRemoveClick = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    setItemToRemove(itemId);
    setShowRemoveModal(true);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      } else {
        setItemToRemove(itemId);
        setShowRemoveModal(true);
      }
    }
  };

  const selectedSubtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
        : item.price;
      return sum + (price * item.quantity);
    }, 0);

  const shipping = selectedSubtotal > 1000 ? 0 : 50;
  const tax = selectedSubtotal * 0.18;
  const total = selectedSubtotal + shipping + tax;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-rice-paper">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-charcoal">
      <Header />
      
      {/* Remove Item Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal/95 border border-stone-700/50 rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-[modalFadeIn_0.2s_ease-out_forwards] shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-charcoal mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.73 4.99c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-rice-paper mb-2">Remove Item</h3>
              <p className="text-stone-400 mb-6">Are you sure you want to remove this item from your cart?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowRemoveModal(false);
                    setItemToRemove(null);
                  }}
                  className="px-6 py-2 border border-stone-600/50 text-rice-paper/90 rounded-lg hover:bg-charcoal/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (itemToRemove) {
                      removeFromCart(itemToRemove);
                      setSelectedItems(prev => prev.filter(id => id !== itemToRemove));
                      setShowRemoveModal(false);
                      setItemToRemove(null);
                    }
                  }}
                  className="px-6 py-2 bg-clay/90 hover:bg-clay text-charcoal rounded-lg transition-colors font-medium shadow-md hover:shadow-clay/30"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Grain Texture */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0">
          <div 
            className="absolute inset-0 animate-grain-shift" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
              backgroundSize: '200px 200px'
            }}
          />
        </div>

        {/* Subtle Radial Gradient */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{
          background: 'radial-gradient(ellipse at center top, rgba(210,180,140,0.03) 0%, transparent 60%)'
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl mx-auto md:max-w-7xl">
            <h1 className="text-4xl font-serif text-rice-paper mb-8">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-7">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="group bg-charcoal/70 p-5 rounded-2xl shadow-lg mb-6 border border-white/5 transition-all duration-500 ease-out hover:bg-charcoal/80 hover:border-clay/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:scale-[1.02]">
                      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <input
                          type="checkbox"
                          className="mt-2 size-4 accent-clay"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                        />
                        <img
                          src={item.image}
                          alt={item.name || 'Product image'}
                          className="w-32 h-32 object-cover rounded-xl shadow-sm"
                          loading="lazy"
                        />
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <h3 className="text-lg font-medium text-rice-paper">{item.name}</h3>
                              <p className="text-sm text-stone-400 mt-1">{item.category}</p>
                              <p className="text-xs text-stone-500 mt-1">Free shipping</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-white transition-colors duration-500 group-hover:text-clay">
                                ₹{calculateItemTotal(item.price, item.quantity).toLocaleString('en-IN')}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-stone-500">
                                  ₹{typeof item.price === 'string' 
                                    ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")).toLocaleString('en-IN') 
                                    : item.price.toLocaleString('en-IN')} each
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-border-subtle rounded-md">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleQuantityChange(item.id, -1);
                                  }}
                                  className="px-3 py-1 text-stone-400 hover:text-white hover:bg-charcoal/50 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center text-sm text-rice-paper">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleQuantityChange(item.id, 1);
                                  }}
                                  className="px-3 py-1 text-stone-400 hover:text-white hover:bg-charcoal/50 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => handleRemoveClick(e, item.id)}
                                className="text-xs text-stone-400 hover:text-clay transition-colors flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-medium text-rice-paper mb-2">Your cart is empty</h3>
                    <p className="text-stone-400 mb-6">Browse our collection and add some items to your cart</p>
                    <Link 
                      href="/shop" 
                      className="inline-block bg-clay hover:bg-clay/90 text-white font-medium py-2 px-6 rounded-full transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5 mt-8 lg:mt-0">
                <div className="sticky top-8 bg-charcoal/70 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 ease-out hover:bg-charcoal/80 hover:border-clay/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-rice-paper mb-4 pb-3 border-b border-border-subtle">
                      Order Summary
                    </h3>

                    <div className="space-y-3 text-sm">
                      {selectedItems.length === 0 ? (
                        <div className="text-center py-4 text-stone-400">
                          Select items to see order summary
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            {cartItems
                              .filter(item => selectedItems.includes(item.id))
                              .map(item => (
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
                                ₹{selectedSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="group flex justify-between rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                              <div className="flex items-center gap-1">
                                <span className="text-stone-400">Shipping</span>
                                <span className="text-xs text-stone-500">
                                  {selectedSubtotal > 1000 ? '(Free over ₹1,000)' : '(Standard)'}
                                </span>
                              </div>
                              <span className={shipping > 0 ? 'text-rice-paper' : 'text-green-400'}>
                                {shipping > 0 ? `₹${shipping.toLocaleString('en-IN')}` : 'Free'}
                              </span>
                            </div>
                            
                            <div className="group flex justify-between rounded-lg px-2 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/20">
                              <div className="flex items-center gap-1">
                                <span className="text-stone-400">Tax (GST)</span>
                                <span className="text-xs text-stone-500">18%</span>
                              </div>
                              <span className="text-rice-paper">
                                ₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-charcoal/50 border-t border-border-subtle">
                    <button
                      className={`w-full py-3.5 px-4 rounded-lg transition-all font-medium flex items-center justify-center gap-2 ${
                        selectedItems.length > 0
                          ? 'bg-clay hover:bg-clay/90 text-white shadow-lg hover:shadow-clay/20'
                          : 'bg-gray-700 cursor-not-allowed text-gray-500'
                      }`}
                      disabled={selectedItems.length === 0}
                      onClick={() => {
                        if (selectedItems.length > 0) {
                          // Pass selected item IDs as query parameters
                          const selectedParams = selectedItems.map(id => `selected=${id}`).join('&');
                          router.push(`/checkout?${selectedParams}`);
                        }
                      }}
                    >
                      <span className="material-symbols-outlined text-lg">shopping_bag</span>
                      {selectedItems.length > 0 
                        ? `Checkout (${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'})` 
                        : 'Select items to checkout'}
                    </button>

                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-stone-500 text-xs mb-1">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span>Secure Checkout</span>
                      </div>
                      <p className="text-xs text-stone-500">
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <p className="text-xs text-stone-500 text-center mt-4">
                      or{' '}
                      <Link href="/shop" className="text-clay hover:underline font-medium">
                        Continue Shopping
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer className="relative z-10" />
      
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;