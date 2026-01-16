"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { fetchAllProducts } from "../../lib/productService";

// Enhanced Notification Component with animation
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

const categories = ["All", "Tableware", "Vases", "Sets", "Decorative"];

export default function ProductsPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  
  // State for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const sectionRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  // Fetch Products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        
        // Transform data to ensure it matches UI expectations
        const processedProducts = fetchedProducts.map(p => ({
          ...p,
          // Ensure price is a number for logic, create formatted string for display
          price: Number(p.price),
          priceFormatted: p.priceFormatted || `₹${Number(p.price).toFixed(2)}`,
          // Ensure tags is an array
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',') : [])
        }));

        // Filter only active products
        const activeProducts = processedProducts.filter(p => p.status !== 'inactive');
        setProducts(activeProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        showNotification("Failed to load products. Please try refreshing.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Intersection Observer for page animation
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

  // Filter products
  const filteredProducts = products.filter((product) => {
    const productTags = product.tags.map(t => t.toLowerCase());
    const productCategory = product.category ? product.category.toLowerCase() : "";

    const matchesCategory =
      selectedCategory === "All" ||
      productCategory === selectedCategory.toLowerCase() ||
      productTags.includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Tableware" && productTags.includes("tableware")) ||
      (selectedCategory === "Vases" && productTags.includes("vases")) ||
      (selectedCategory === "Sets" && productTags.includes("sets")) ||
      (selectedCategory === "Decorative" && productTags.includes("decorative"));

    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subtitle && product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      productCategory.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0; // default (usually by creation date from fetch)
  });

  return (
    <div className="relative min-h-screen bg-charcoal">
      <Header />

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      )}

      <section
        ref={sectionRef}
        className="pt-32 pb-24 px-4 md:px-12 lg:px-24 bg-charcoal relative overflow-hidden min-h-screen"
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
          <div className={`mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-rice-paper tracking-tight mb-6 transition-all duration-700 hover:tracking-tighter hover:text-clay/90">
              The Studio Shop
            </h1>
            <p className="text-stone-warm text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Handcrafted ceramics, each piece unique. Discover our collection of functional art for your daily rituals.
            </p>
          </div>

          {/* Filters and Search Bar */}
          <div className={`mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            {/* Search */}
            <div className="relative w-full md:w-auto flex-1 md:flex-initial">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-warm text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 bg-charcoal-light border border-border-subtle text-rice-paper placeholder-stone-warm pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-clay transition-all duration-500"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500 ${selectedCategory === category
                      ? 'bg-clay text-white border border-clay'
                      : 'bg-charcoal-light text-stone-warm border border-border-subtle hover:border-clay/40 hover:text-clay'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-charcoal-light border border-border-subtle text-rice-paper text-xs font-bold uppercase tracking-[0.15em] px-4 py-2.5 pr-8 focus:outline-none focus:border-clay transition-all duration-500 appearance-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-stone-warm text-sm pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
             <div className="flex justify-center items-center py-24 min-h-[400px]">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-stone-warm text-sm uppercase tracking-widest animate-pulse">Loading Collection...</p>
               </div>
             </div>
          ) : (
            <>
              {/* Results Count */}
              <div className={`mb-8 text-stone-warm text-sm transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </div>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      onMouseEnter={() => setHoveredCard(product.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`group flex flex-col gap-4 bg-charcoal-light border border-border-subtle p-4 transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                      style={{ transitionDelay: `${400 + index * 50}ms` }}
                      onClick={() => router.push(`/shop/products/${product.id}`)}
                    >
                      {/* Image Container with Moving Background */}
                      <div className="h-[280px] w-full overflow-hidden relative bg-black/20 group">
                        {/* Main Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                          style={{
                            backgroundImage: `url("${product.image || '/api/placeholder/400/400'}")`,
                          }}
                        />

                        {/* Moving Gradient Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-clay/5 to-transparent animate-gradient-shift"></div>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(210,180,140,0.03)_70%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        </div>

                        {/* Subtle Noise Texture */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-1000"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                            backgroundSize: '200px 200px'
                          }}
                        ></div>

                        {/* Overlay with Color Shift */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id)) {
                              removeFromWishlist(product.id);
                              showNotification(`Removed ${product.name} from wishlist`, 'success');
                            } else {
                              addToWishlist(product);
                              showNotification(`Added ${product.name} to wishlist`, 'success');
                            }
                          }}
                          className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full transition-all duration-500 ${hoveredCard === product.id || isInWishlist(product.id)
                              ? 'opacity-100 translate-y-0 scale-100'
                              : 'opacity-0 translate-y-2 scale-75'
                            } ${isInWishlist(product.id)
                              ? 'text-red-500 hover:text-red-400'
                              : 'text-stone-warm hover:text-clay'
                            } hover:bg-charcoal hover:scale-110 hover:shadow-lg z-10`}
                          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <span className="material-symbols-outlined text-[16px] block transition-transform duration-300 hover:scale-110">
                            {isInWishlist(product.id) ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>

                        {/* Quick View Overlay */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/shop/products/${product.id}`);
                          }}
                          className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${hoveredCard === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/shop/products/${product.id}`);
                            }
                          }}
                        >
                          <span className="text-white text-sm uppercase tracking-[0.2em] font-bold border border-white/20 px-6 py-3 transition-all duration-500 group-hover:bg-clay group-hover:border-clay group-hover:scale-105 group-hover:shadow-lg">
                            Quick View
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col flex-1 justify-between px-1">
                        <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                          <h3 className="text-xl font-serif text-rice-paper transition-all duration-500 group-hover:text-clay group-hover:tracking-tight">
                            {product.name}
                          </h3>
                          <p className="text-[10px] text-stone-warm uppercase tracking-[0.15em] mt-2 transition-all duration-500 group-hover:text-stone-300 group-hover:tracking-[0.2em]">
                            {product.subtitle || product.category}
                          </p>
                        </div>

                        {/* Price & Add to Bag */}
                        <div className="flex items-center justify-between mt-3 pt-4 border-t border-white/5 transition-colors duration-500 group-hover:border-clay/20">
                          <span className="text-lg font-light font-serif text-white transition-all duration-500 group-hover:text-clay group-hover:scale-105 origin-left">
                            {product.priceFormatted}
                          </span>
                          {cartItems.some(item => item.id === product.id) ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push('/cart');
                              }}
                              className="relative text-stone-warm hover:text-clay transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]"
                              aria-label={`View cart for ${product.name}`}
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
                                handleAddToCart(e, product);
                              }}
                              className="relative text-stone-warm hover:text-clay transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]"
                              aria-label={`Add ${product.name} to cart`}
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
                </div>
              ) : (
                <div className={`text-center py-20 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <p className="text-stone-warm text-lg mb-4">No products found</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="text-clay text-sm uppercase tracking-wider hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />

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

        .animate-grain-shift {
          animation: grain-shift 12s ease-in-out infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}