"use client";

import React, { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Morning Ritual Mug",
    category: "Stoneware • Hand-dipped",
    price: "₹3200.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b"
  },
  {
    id: 2,
    name: "Ikebana Vase",
    category: "Speckled Clay • Organic Shape",
    price: "₹8500.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ"
  },
  {
    id: 3,
    name: "Chawan Matcha Bowl",
    category: "Raku Fired • Unique Glaze",
    price: "₹5500.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84"
  },
  {
    id: 4,
    name: "Incense Burner",
    category: "Black Clay • Minimalist",
    price: "₹2800.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC"
  }
];

export default function Collections() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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
          
          <a
            className={`group relative text-clay font-bold uppercase text-[11px] tracking-[0.2em] hover:text-white transition-all duration-500 flex items-center gap-3 pb-3 border-b border-clay/30 hover:border-white hover:tracking-[0.25em] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
            href="#"
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
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[460px]">
          
          {/* Featured Product - Large */}
          <div 
            className={`group relative md:col-span-2 md:row-span-2 overflow-hidden bg-charcoal border border-border-subtle cursor-pointer shadow-2xl transition-all duration-1000 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-clay/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Background Image with Enhanced Parallax */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out group-hover:scale-110 opacity-85 group-hover:opacity-75"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF")',
              }}
            />
            
            {/* Gradient Overlay with Organic Transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-all duration-700 group-hover:opacity-85 group-hover:from-charcoal/95" />
            
            {/* Subtle Top Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-10 md:p-14 text-white w-full">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                
                {/* Badge with Floating Animation */}
                <span className="bg-gradient-to-r from-clay/90 to-clay text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 inline-block backdrop-blur-md shadow-lg transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(210,180,140,0.3)] group-hover:scale-105">
                  <span className="relative inline-block animate-subtle-float">
                    Best Seller
                  </span>
                </span>

                {/* Title with Staggered Animation */}
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-5 text-rice-paper drop-shadow-2xl transition-all duration-700 group-hover:text-clay/95 group-hover:tracking-tight leading-tight">
                  The Kyoto <br className="md:hidden" />Dinner Set
                </h3>

                {/* Description with Fade-in */}
                <p className="text-stone-300 mb-8 font-light text-lg md:text-xl max-w-xl leading-relaxed drop-shadow-md transition-all duration-700 group-hover:text-stone-200">
                  Complete service for four, finished in matte stone glaze. A tribute to traditional Kaiseki dining.
                </p>

                {/* Price & CTA - Reveal on Hover */}
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-6 group-hover:translate-y-0">
                  <span className="text-3xl md:text-4xl font-serif font-light text-white transition-all duration-500 group-hover:text-clay/90">
                    ₹24000.00
                  </span>
                  <span className="h-[2px] w-16 bg-gradient-to-r from-white/40 via-white/60 to-white/40 transition-all duration-500 group-hover:w-20" />
                  <button className="relative uppercase text-[11px] tracking-[0.2em] font-bold hover:text-clay transition-all duration-500 flex items-center gap-2 group/cta hover:tracking-[0.25em]">
                    <span className="relative">
                      Shop Now
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover/cta:w-full" />
                    </span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover/cta:translate-x-1">
                      arrow_right_alt
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {products.map((product, index) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="h-[75%] w-full overflow-hidden relative bg-black/20">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                  style={{
                    backgroundImage: `url("${product.image}")`,
                  }}
                />
                
                {/* Overlay with Color Shift */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
                
                {/* Favorite Button with Organic Reveal */}
                <button 
                  className={`absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2.5 rounded-full text-stone-warm transition-all duration-500 ${
                    hoveredCard === product.id 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-2 scale-75'
                  } hover:text-clay hover:bg-charcoal hover:scale-110 hover:shadow-lg`}
                  aria-label="Add to favorites"
                >
                  <span className="material-symbols-outlined text-[16px] block transition-transform duration-300 hover:scale-110">
                    favorite
                  </span>
                </button>

                {/* Quick View Overlay */}
                <div className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                  hoveredCard === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <button className="text-white text-sm uppercase tracking-[0.2em] font-bold border border-white/20 px-6 py-3 transition-all duration-500 hover:bg-clay hover:border-clay hover:scale-105 hover:shadow-lg">
                    Quick View
                  </button>
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
                  <button className="relative text-stone-warm hover:text-white transition-all duration-500 text-[10px] font-bold uppercase tracking-wider group-hover:tracking-[0.15em]">
                    <span className="relative">
                      Add to Bag
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover:w-full" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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