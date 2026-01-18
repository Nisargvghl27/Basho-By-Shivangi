"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Heart, Search, SlidersHorizontal, ChevronDown, ShoppingBag, Check, X } from 'lucide-react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { fetchAllProducts } from "../../lib/productService";

// Enhanced Notification Component
const Notification = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-sm shadow-2xl flex items-center gap-4 animate-fade-in-up ${
      type === 'error' ? 'bg-red-900/90 text-white border border-red-700/50' : 'bg-charcoal-light border border-clay/30 text-rice-paper'
    }`}>
      <span className={type === 'error' ? 'text-red-300' : 'text-clay'}>
        {type === 'error' ? <X size={18} /> : <Check size={18} />}
      </span>
      <p className="font-sans text-sm tracking-wide">{message}</p>
    </div>
  );
};

const categories = ["All", "Mugs", "Plates", "Platter/Cheeseboard", "Bowls", "Vase", "Dinner Sets", "Trinket Trays", "Bookends", "Fancy", "Picasso Limited Collection"];

export default function Shop() {
  const router = useRouter();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems = [], addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() || {};
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
        showNotification("Failed to load products", 'error');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
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

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showNotification(`Added ${product.name} to cart`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(localSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="relative min-h-screen bg-charcoal overflow-x-hidden selection:bg-clay selection:text-charcoal">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay animate-grain-shift" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
              backgroundSize: '200px 200px',
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}></div>
      </div>
      <div className="fixed top-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-clay/5 rounded-full blur-[120px] animate-float-slow pointer-events-none z-0" style={{ willChange: 'transform' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-stone-500/5 rounded-full blur-[100px] animate-float-delayed pointer-events-none z-0" style={{ willChange: 'transform' }} />

      <Header />

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      )}

      <main
        ref={sectionRef}
        className="pt-32 pb-24 px-6 md:px-12 lg:px-24 relative z-10 min-h-screen"
      >
        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Header Section */}
          <div className={`mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex items-center gap-3 mb-6">
                <span className="text-clay text-[10px] uppercase font-bold tracking-[0.3em]">Curated Collection</span>
                <div className="h-px w-16 bg-clay/30"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-rice-paper leading-[0.95] mb-8">
              The Studio <br className="hidden md:block" />
              <span className="italic text-stone-500">Shop</span>
            </h1>
            <p className="text-stone-warm text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Handcrafted ceramics, each piece unique. Discover our collection of functional art for your daily rituals.
            </p>
          </div>

          {/* Filters Bar */}
          <div className={`mb-16 space-y-8 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Search & Sort Row */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 text-rice-paper placeholder-stone-600 pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-clay/50 transition-all duration-500 rounded-sm"
                />
              </div>

              {/* Sort */}
              <div className="relative min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 text-rice-paper text-xs font-bold uppercase tracking-[0.15em] px-4 py-3.5 pr-10 focus:outline-none focus:border-clay/50 transition-all duration-500 appearance-none cursor-pointer rounded-sm"
                >
                  <option value="default" className="bg-charcoal">Sort By</option>
                  <option value="name" className="bg-charcoal">Name A-Z</option>
                  <option value="price-low" className="bg-charcoal">Price: Low → High</option>
                  <option value="price-high" className="bg-charcoal">Price: High → Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-sm border ${
                    selectedCategory === category
                      ? 'bg-clay text-white border-clay shadow-lg'
                      : 'bg-white/[0.02] text-stone-400 border-white/10 hover:border-clay/40 hover:text-clay hover:bg-white/[0.04]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
             <div className="flex justify-center items-center py-32 min-h-[500px]">
               <div className="flex flex-col items-center gap-6">
                 <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border-t border-clay rounded-full animate-spin"></div>
                    <div className="w-2 h-2 bg-clay rounded-full"></div>
                 </div>
                 <p className="text-clay text-xs tracking-[0.3em] uppercase animate-pulse">Loading Collection</p>
               </div>
             </div>
          ) : (
            <>
              {/* Results Count */}
              <div className={`mb-10 flex items-center gap-4 text-stone-500 text-xs uppercase tracking-widest transition-all duration-1000 delay-300 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span>{sortedProducts.length} {sortedProducts.length === 1 ? 'Piece' : 'Pieces'}</span>
                <div className="h-px flex-1 max-w-[100px] bg-white/10"></div>
              </div>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      onMouseEnter={() => setHoveredCard(product.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                      style={{ 
                        transitionDelay: `${400 + index * 30}ms`, 
                        transitionProperty: 'all',
                        transitionDuration: '0.8s',
                        transitionTimingFunction: 'ease-out'
                      }}
                      onClick={() => router.push(`/shop/products/${product.id}`)}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/[0.02] mb-4 rounded-sm border border-white/5 group-hover:border-clay/30 transition-all duration-700">
                        {/* Main Image */}
                        <img
                          src={product.image || '/api/placeholder/400/500'}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id)) {
                              removeFromWishlist(product.id);
                              showNotification(`Removed from wishlist`, 'success');
                            } else {
                              addToWishlist(product);
                              showNotification(`Added to wishlist`, 'success');
                            }
                          }}
                          className={`absolute top-4 right-4 z-20 p-2.5 bg-charcoal/60 backdrop-blur-md rounded-full transition-all duration-500 border border-white/10 ${
                            hoveredCard === product.id || isInWishlist(product.id)
                              ? 'opacity-100 translate-y-0 scale-100'
                              : 'opacity-0 translate-y-2 scale-90'
                          } hover:bg-white hover:scale-110`}
                        >
                          <Heart 
                            size={16} 
                            className={`transition-colors ${isInWishlist(product.id) ? 'fill-clay text-clay' : 'text-white'}`}
                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                          />
                        </button>

                        {/* Quick Add to Cart Overlay */}
                        <div className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 ${
                          hoveredCard === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          {cartItems.some(item => item.id === product.id) ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push('/cart');
                              }}
                              className="w-full py-3 bg-white text-charcoal font-bold uppercase tracking-widest text-[10px] hover:bg-clay hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                            >
                              View in Cart
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(e, product);
                              }}
                              className="w-full py-3 bg-clay text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-clay transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                            >
                              <ShoppingBag size={14} /> Add to Cart
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-serif text-rice-paper group-hover:text-clay transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-stone-600 uppercase tracking-[0.2em]">
                          {product.category || 'Collection'}
                        </p>
                        <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
                          <span className="text-xl font-serif text-stone-300">
                            ₹{Number(product.price).toLocaleString('en-IN')}
                          </span>
                          {product.stock > 0 ? (
                            <span className="text-emerald-500/60 text-[9px] uppercase tracking-wider flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-emerald-500" /> In Stock
                            </span>
                          ) : (
                            <span className="text-stone-600 text-[9px] uppercase tracking-wider">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-32 border border-dashed border-white/10 rounded-sm transition-all duration-1000 delay-300 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-6 h-6 text-stone-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-500 mb-3">No Pieces Found</h3>
                  <p className="text-stone-600 text-sm mb-8 max-w-md mx-auto">
                    We couldn&apos;t find any pieces matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={() => {
                      setLocalSearchQuery("");
                      setSelectedCategory("All");
                      setSortBy("default");
                    }}
                    className="text-clay text-xs uppercase tracking-widest font-bold hover:text-rice-paper transition-colors border-b border-clay/30 hover:border-rice-paper pb-1"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}