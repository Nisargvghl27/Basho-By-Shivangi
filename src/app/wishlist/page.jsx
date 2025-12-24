// src/app/wishlist/page.jsx
"use client";

import { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, isInWishlist, addToWishlist } = useWishlist();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

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
                      className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full text-rice-paper transition-all duration-500 ${
                        hoveredCard === item.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-75'
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
                    <div className="mt-auto pt-3 flex justify-between items-center">
                      <span className="text-clay text-lg font-medium">{item.price}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInWishlist(item.id)) {
                            removeFromWishlist(item.id);
                            setNotificationMessage(`Removed ${item.name} from wishlist`);
                          } else {
                            addToWishlist(item);
                            setNotificationMessage(`Added ${item.name} to wishlist`);
                          }
                          setShowNotification(true);
                          setTimeout(() => setShowNotification(false), 3000);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          isInWishlist(item.id) 
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