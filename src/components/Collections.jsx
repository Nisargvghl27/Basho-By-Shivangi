"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getBestSellers } from "../lib/bestSellerService";
import { fetchAllProducts } from "../lib/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Notification Component
const Notification = ({ message, onClose, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  const bgColor = type === 'success' ? 'bg-charcoal-light' : 'bg-red-900';
  const borderColor = type === 'success' ? 'border-clay/50' : 'border-red-700';
  const icon = type === 'success' ? 'check_circle' : 'error';

  return (
    <div
      className={`fixed bottom-8 right-8 ${bgColor} border ${borderColor} text-rice-paper px-6 py-4 rounded-xl shadow-2xl flex items-start gap-3 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <span className="material-symbols-outlined text-clay mt-0.5">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-rice-paper">{type === 'success' ? 'Added to Cart' : 'Error'}</p>
        <p className="text-sm text-stone-300">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="text-stone-400 hover:text-white transition-colors ml-2"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};

export default function Collections() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const sectionRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      addToCart({
        ...product,
        price: Number(product.price),
        quantity: 1
      });

      showNotification(`${product.name} has been added to your cart`, 'success');
    } catch (error) {
      showNotification('Failed to add item to cart. Please try again.', 'error');
    }
  };

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showNotification(`Removed ${product.name} from wishlist`, 'success');
    } else {
      addToWishlist(product);
      showNotification(`Added ${product.name} to wishlist`, 'success');
    }
  };

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const bestSellersData = await getBestSellers();
        setBestSellers(bestSellersData);
        setProducts([]); 
      } catch (error) {
        console.error("Error loading collections data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  return (  
    <section 
      ref={sectionRef}
      className="py-32 px-4 md:px-12 lg:px-24 bg-charcoal-light border-b border-border-subtle relative overflow-hidden"
    >
      {/* Enhanced Grain Texture */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <div 
          className="absolute inset-0 animate-grain-shift" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center top, rgba(210,180,140,0.03) 0%, transparent 60%)'
      }} />

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-rice-paper tracking-tight mb-4 transition-all duration-700 hover:tracking-tighter hover:text-clay/90">
              Curated Collections
            </h2>
            <p className={`text-stone-warm text-lg md:text-xl font-light max-w-xl leading-relaxed transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Discover our latest kiln firings, limited editions, and seasonal sets crafted with intention.
            </p>
          </div>
          
          <Link
            href="/shop"
            className={`group relative text-clay font-bold uppercase text-[11px] tracking-[0.2em] hover:text-white transition-all duration-500 flex items-center gap-3 pb-3 border-b border-clay/30 hover:border-white hover:tracking-[0.25em] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="relative">
              View All Collections
              <span className="absolute inset-0 blur-sm text-clay opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                View All Collections
              </span>
            </span>
            <span className="material-symbols-outlined text-sm transition-all duration-700 group-hover:translate-x-2 group-hover:scale-110">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Products Grid - Only Best Sellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[380px]">
          
          {/* Featured Product - Large (First Best Seller) */}
          {bestSellers.length > 0 && (
            <div 
              className={`group relative sm:col-span-2 sm:row-span-2 overflow-hidden bg-charcoal border border-border-subtle cursor-pointer shadow-2xl transition-all duration-1000 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-clay/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: '200ms' }}
              onClick={() => router.push(`/shop/products/${bestSellers[0].id}`)}
            >
              {/* Background Image with Enhanced Parallax */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out group-hover:scale-110 opacity-85 group-hover:opacity-75"
                style={{
                  backgroundImage: `url("${bestSellers[0].image || 'https://via.placeholder.com/600x600'}")`,
                }}
              />
              
              {/* Gradient Overlay with Organic Transition */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-all duration-700 group-hover:opacity-85 group-hover:from-charcoal/95" />
              
              {/* Subtle Top Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistToggle(e, bestSellers[0])}
                className={`absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full transition-all duration-500 ${
                  hoveredCard === bestSellers[0].id || isInWishlist(bestSellers[0].id)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-2 scale-75'
                } ${isInWishlist(bestSellers[0].id)
                    ? 'text-red-500 hover:text-red-400'
                    : 'text-stone-warm hover:text-clay'
                  } hover:bg-charcoal hover:scale-110 hover:shadow-lg z-10`}
                aria-label={isInWishlist(bestSellers[0].id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <span className="material-symbols-outlined text-[18px] block transition-transform duration-300 hover:scale-110">
                  {isInWishlist(bestSellers[0].id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white w-full">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  
                  {/* Badge with Floating Animation - Conditional Display */}
                  {bestSellers[0].isBestSeller && (
                    <span className="bg-gradient-to-r from-clay/90 to-clay text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] mb-4 inline-block backdrop-blur-md shadow-lg transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(210,180,140,0.3)] group-hover:scale-105">
                        <span className="relative inline-block animate-subtle-float">
                        Best Seller
                        </span>
                    </span>
                  )}

                  {/* Title with Staggered Animation */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 text-rice-paper drop-shadow-2xl transition-all duration-700 group-hover:text-clay/95 group-hover:tracking-tight leading-tight">
                    {bestSellers[0].name}
                  </h3>

                  {/* Description with Fade-in */}
                  <p className="text-stone-300 mb-6 font-light text-base md:text-lg max-w-lg leading-relaxed drop-shadow-md transition-all duration-700 group-hover:text-stone-200 line-clamp-2">
                    {bestSellers[0].description || bestSellers[0].category || 'Handcrafted with care and attention to detail.'}
                  </p>

                  {/* Price & CTA - Reveal on Hover */}
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-6 group-hover:translate-y-0">
                    <span className="text-2xl md:text-3xl font-serif font-light text-white transition-all duration-500 group-hover:text-clay/90">
                      {bestSellers[0].priceFormatted || `₹${Number(bestSellers[0].price || 0).toFixed(2)}`}
                    </span>
                    <span className="h-[2px] w-12 bg-gradient-to-r from-white/40 via-white/60 to-white/40 transition-all duration-500 group-hover:w-16" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, bestSellers[0]);
                      }}
                      className="relative uppercase text-[10px] tracking-[0.2em] font-bold hover:text-clay transition-all duration-500 flex items-center gap-2 group/cta hover:tracking-[0.25em]"
                    >
                      <span className="relative">
                        Add to Bag
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover/cta:w-full" />
                      </span>
                      <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover/cta:translate-x-1">
                        shopping_bag
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Best Sellers (Regular Size) */}
          {bestSellers.slice(1).map((bestSeller, index) => (
            <div
              key={bestSeller.id}
              onMouseEnter={() => setHoveredCard(bestSeller.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onClick={() => router.push(`/shop/products/${bestSeller.id}`)}
            >
              {/* Best Seller Badge - Conditional */}
              {bestSeller.isBestSeller && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-clay/90 to-clay text-white px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em] inline-block backdrop-blur-md shadow-lg">
                    Best Seller
                    </span>
                </div>
              )}

              {/* Image Container */}
              <div className="h-[75%] w-full overflow-hidden relative bg-black/20 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                  style={{
                    backgroundImage: `url("${bestSeller.image}")`,
                  }}
                />
                
                {/* Overlay with Color Shift */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
                
                {/* Favorite Button with Organic Reveal */}
                <button 
                  onClick={(e) => handleWishlistToggle(e, bestSeller)}
                  className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full transition-all duration-500 z-20 ${
                    hoveredCard === bestSeller.id || isInWishlist(bestSeller.id)
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-2 scale-75'
                  } ${isInWishlist(bestSeller.id)
                    ? 'text-red-500 hover:text-red-400'
                    : 'text-stone-warm hover:text-clay'
                  } hover:bg-charcoal hover:scale-110 hover:shadow-lg`}
                  aria-label={isInWishlist(bestSeller.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <span className="material-symbols-outlined text-[16px] block transition-transform duration-300 hover:scale-110">
                    {isInWishlist(bestSeller.id) ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Quick View Overlay */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/shop/products/${bestSeller.id}`);
                  }}
                  className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 z-10 ${
                    hoveredCard === bestSeller.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <button className="text-white text-sm uppercase tracking-[0.2em] font-bold border border-white/20 px-6 py-3 transition-all duration-500 hover:bg-clay hover:border-clay hover:scale-105 hover:shadow-lg">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 justify-between px-1">
                <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                  <h3 className="text-xl font-serif text-rice-paper transition-all duration-500 group-hover:text-clay group-hover:tracking-tight">
                    {bestSeller.name}
                  </h3>
                  <p className="text-[10px] text-stone-warm uppercase tracking-[0.15em] mt-2 transition-all duration-500 group-hover:text-stone-300 group-hover:tracking-[0.2em]">
                    {bestSeller.category}
                  </p>
                </div>

                {/* Price & Add to Bag */}
                <div className="flex items-center justify-between mt-3 pt-4 border-t border-white/5 transition-colors duration-500 group-hover:border-clay/20">
                  <span className="text-lg font-light font-serif text-white transition-all duration-500 group-hover:text-clay group-hover:scale-105 origin-left">
                    {bestSeller.priceFormatted || `₹${Number(bestSeller.price || 0).toFixed(2)}`}
                  </span>
                  {cartItems.some(item => item.id === bestSeller.id) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push('/cart');
                      }}
                      className="relative text-stone-warm hover:text-clay transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]"
                      aria-label={`View cart for ${bestSeller.name}`}
                    >
                      <span className="relative">
                        View Cart
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover:w-full" />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, bestSeller);
                      }}
                      className="relative text-stone-warm hover:text-clay transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]"
                      aria-label={`Add ${bestSeller.name} to cart`}
                    >
                      <span className="relative">
                        Add to Bag
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover:w-full" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading State for Featured Best Seller */}
          {loading && bestSellers.length === 0 && (
            <div className="md:col-span-2 md:row-span-2 flex items-center justify-center bg-charcoal border border-border-subtle">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-stone-warm text-sm">Loading Best Sellers...</p>
              </div>
            </div>
          )}

          {/* No Best Sellers State */}
          {!loading && bestSellers.length === 0 && (
            <div className="md:col-span-2 md:row-span-2 flex items-center justify-center bg-charcoal border border-border-subtle">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-clay/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl text-clay">star</span>
                </div>
                <p className="text-stone-warm text-lg font-light mb-2">No Best Sellers Yet</p>
                <p className="text-stone-warm/60 text-sm">Set best sellers from the admin panel to feature them here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      )}

      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }

        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        .animate-grain-shift {
          animation: grain-shift 12s ease-in-out infinite;
        }

        .animate-subtle-float {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}