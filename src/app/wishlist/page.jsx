// src/app/wishlist/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlistItems, removeFromWishlist, isInWishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "₹0";
    if (typeof price === 'string' && (price.includes('₹') || price.includes('$'))) {
      return price;
    }
    const num = Number(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      <main className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-2xl mx-auto md:max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-rice-paper tracking-tight mb-8">
            Your Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
          </h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col gap-4 bg-charcoal-light border border-border-subtle p-4 transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Container */}
                  <div className="h-[280px] w-full overflow-hidden relative bg-black/20">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                      style={{
                        backgroundImage: `url("${item.image}")`,
                      }}
                    />

                    {/* Overlay with Color Shift */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />

                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(item.id);
                        setNotificationMessage(`Removed ${item.name} from wishlist`);
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000);
                      }}
                      className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full text-rice-paper transition-all duration-500 ${hoveredCard === item.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-75'
                        } hover:bg-clay hover:scale-110 hover:shadow-lg z-10`}
                      aria-label="Remove from wishlist"
                    >
                      <span className="material-symbols-outlined text-[16px] block transition-transform duration-300 hover:scale-110">
                        close
                      </span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-lg font-medium text-rice-paper group-hover:text-clay transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-stone-warm text-sm mt-1">{item.category}</p>
                    
                    {/* Stock Status Indicator */}
                    <div className="mt-2 flex items-center justify-between text-xs">
                      {item.stock !== undefined && item.stock <= 0 ? (
                        <span className="text-stone-600 text-[10px] uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-600 inline-block" /> Out of Stock
                        </span>
                      ) : (
                        <span className="text-emerald-500/60 text-[10px] uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> In Stock
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-light font-serif text-white transition-all duration-500 group-hover:scale-105 origin-left self-center">
                          {formatPrice(item.price)}
                        </span>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            if (isInWishlist(item.id)) {
                              removeFromWishlist(item.id);
                              setNotificationMessage(`Removed ${item.name} from wishlist`);
                              setShowNotification(true);
                              setTimeout(() => setShowNotification(false), 3000);
                            } else {
                              const result = await addToWishlist(item);
                              if (result && result.success) {
                                setNotificationMessage(`Added ${item.name} to wishlist`);
                                setShowNotification(true);
                                setTimeout(() => setShowNotification(false), 3000);
                              } else {
                                setNotificationMessage((result && result.message) || 'Failed to add to wishlist');
                                setShowNotification(true);
                                setTimeout(() => setShowNotification(false), 3000);
                                if (result && result.requiresAuth) {
                                  setTimeout(() => {
                                    router.push('/auth/login');
                                  }, 1500);
                                }
                              }
                            }
                          }}
                          className={`p-2 rounded-full transition-all duration-300 ${isInWishlist(item.id)
                              ? 'text-red-500 hover:text-red-400'
                              : 'text-stone-warm hover:text-clay'
                            }`}
                          aria-label={isInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <span className="material-symbols-outlined text-xl">
                            {isInWishlist(item.id) ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          if (item.stock !== undefined && item.stock <= 0) return;
                          
                          if (!addedToCart[item.id]) {
                            const result = await addToCart(item);
                            if (result && result.success) {
                              setAddedToCart(prev => ({ ...prev, [item.id]: true }));
                              setNotificationMessage(`Added ${item.name} to cart`);
                              setShowNotification(true);
                              setTimeout(() => setShowNotification(false), 3000);
                            } else {
                              setNotificationMessage((result && result.message) || 'Failed to add to cart');
                              setShowNotification(true);
                              setTimeout(() => setShowNotification(false), 3000);
                              if (result && result.requiresAuth) {
                                  setTimeout(() => {
                                    router.push('/auth/login');
                                  }, 1500);
                              }
                            }
                          }
                        }}
                        disabled={addedToCart[item.id] || (item.stock !== undefined && item.stock <= 0)}
                        className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                          addedToCart[item.id]
                            ? 'bg-green-600 text-white cursor-not-allowed'
                            : item.stock !== undefined && item.stock <= 0
                            ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5'
                            : 'bg-clay hover:bg-clay/90 text-white shadow-lg hover:shadow-clay/20'
                        }`}
                        aria-label="Add to cart"
                      >
                        {addedToCart[item.id]
                          ? 'Added to cart'
                          : item.stock !== undefined && item.stock <= 0
                          ? 'Out of Stock'
                          : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-medium text-rice-paper mb-2">Your wishlist is empty</h3>
              <p className="text-stone-400 mb-6">Save items you love to your wishlist</p>
              <Link
                href="/shop"
                className="inline-block bg-clay hover:bg-clay/90 text-white font-medium py-2 px-6 rounded-full transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}