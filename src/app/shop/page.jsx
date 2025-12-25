"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
// Enhanced Notification Component with animation
const Notification = ({ message, onClose, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const bgColor = type === 'success' ? 'bg-charcoal-light' : 'bg-red-900';
  const borderColor = type === 'success' ? 'border-clay/50' : 'border-red-700';
  const icon = type === 'success' ? 'check_circle' : 'error';

  return (
    <div
      className={`fixed bottom-8 right-8 ${bgColor} border ${borderColor} text-rice-paper px-6 py-4 rounded-xl shadow-2xl flex items-start gap-3 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
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

const allProducts = [
  {
    id: 1,
    name: "Morning Ritual Mug",
    category: "Stoneware • Hand-dipped",
    price: "$32.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
    tags: ["mugs", "tableware", "stoneware"]
  },
  {
    id: 2,
    name: "Ikebana Vase",
    category: "Speckled Clay • Organic Shape",
    price: "$85.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
    tags: ["vases", "decorative"]
  },
  {
    id: 3,
    name: "Chawan Matcha Bowl",
    category: "Raku Fired • Unique Glaze",
    price: "$55.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
    tags: ["bowls", "tableware", "raku"]
  },
  {
    id: 4,
    name: "Incense Burner",
    category: "Black Clay • Minimalist",
    price: "$28.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC",
    tags: ["decorative", "minimalist"]
  },
  {
    id: 5,
    name: "Sake Set",
    category: "Porcelain • Traditional",
    price: "$120.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF",
    tags: ["tableware", "sets"]
  },
  {
    id: 6,
    name: "Tea Ceremony Set",
    category: "Stoneware • Hand-thrown",
    price: "$180.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
    tags: ["sets", "tableware", "stoneware"]
  },
  {
    id: 7,
    name: "Planter Series",
    category: "Terracotta • Organic",
    price: "$45.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
    tags: ["planters", "decorative"]
  },
  {
    id: 8,
    name: "Dinner Plate Set",
    category: "Stoneware • Set of 4",
    price: "$95.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
    tags: ["plates", "tableware", "sets"]
  }
];

const categories = ["All", "Tableware", "Vases", "Sets", "Decorative"];

export default function ProductsPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Convert price from string to number (remove $ and convert to number)
      const price = parseFloat(product.price.replace('$', ''));

      // Add to cart with the correct price format
      addToCart({
        ...product,
        price: price,
        quantity: 1
      });

      // Show success notification
      setNotification({
        show: true,
        message: `${product.name} has been added to your cart`,
        type: 'success'
      });
    } catch (error) {
      // Show error notification if something goes wrong
      setNotification({
        show: true,
        message: 'Failed to add item to cart. Please try again.',
        type: 'error'
      });
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const sectionRef = useRef(null);

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

  // Filter and sort products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) ||
      (selectedCategory === "Tableware" && product.tags.includes("tableware")) ||
      (selectedCategory === "Vases" && product.tags.includes("vases")) ||
      (selectedCategory === "Sets" && product.tags.includes("sets")) ||
      (selectedCategory === "Decorative" && product.tags.includes("decorative"));

    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
    } else if (sortBy === "price-high") {
      return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
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

          {/* Results Count */}
          <div className={`mb-8 text-stone-warm text-sm transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group flex flex-col gap-4 bg-charcoal-light border border-border-subtle p-4 transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  {/* Image Container with Moving Background */}
                  <div className="h-[280px] w-full overflow-hidden relative bg-black/20 group">
                    {/* Main Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                      style={{
                        backgroundImage: `url("${product.image}")`,
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
                    {/* <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle favorite
                      }}
                      className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full text-stone-warm transition-all duration-500 ${
                        hoveredCard === product.id 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-2 scale-75'
                      } hover:text-clay hover:bg-charcoal hover:scale-110 hover:shadow-lg z-10`}
                      aria-label="Add to favorites"
                    >
                      <span className="material-symbols-outlined text-[16px] block transition-transform duration-300 hover:scale-110">
                        favorite
                      </span>
                    </button> */}
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                          setNotification({
                            show: true,
                            message: `Removed ${product.name} from wishlist`,
                            type: 'success'
                          });
                        } else {
                          addToWishlist(product);
                          setNotification({
                            show: true,
                            message: `Added ${product.name} to wishlist`,
                            type: 'success'
                          });
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
                    <div className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${hoveredCard === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}>
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
                        {product.category}
                      </p>
                    </div>

                    {/* Price & Add to Bag */}
                    <div className="flex items-center justify-between mt-3 pt-4 border-t border-white/5 transition-colors duration-500 group-hover:border-clay/20">
                      <span className="text-lg font-light font-serif text-white transition-all duration-500 group-hover:text-clay group-hover:scale-105 origin-left">
                        {product.price}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="relative text-stone-warm hover:text-clay transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span className="relative">
                          Add to Bag
                          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover:w-full" />
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
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
        </div>
      </section>

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      )}

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
