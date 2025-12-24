"use client";
import React, { useState, useEffect } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle parallax calculations
  const parallaxOffset = scrollY * 0.5;
  const fadeOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div className="w-full">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
          style={{ 
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuVBKg5R8BQ98bLvmSRZr_JtsluSdDs-ck4GdifTFrFOtqKJCfWD3swZ9sIcgedJgiUc5IUJNbt-ez0rWo7SJAm8JTsmTkqA7ZwgorQkaQYgs7AqAtMshNOsfZSl9DwKOSTFfJLGqp8rCkolDt4ZrWs0fkg9p9tnGZvPZN7nKoEp7s2XvX6Y1DIcIShYbViy8BBLgdZ7HgJ3kpcNnjRy93bVueqobZigt2Xm6YkQZJNdsd4xrRUcquFkoEfmwbTIjMCDe7IOCxs76u")',
            transform: `translateY(${parallaxOffset}px) scale(1.1)`
          }}
        />
        
        {/* Organic Grain Texture */}
        <div className="absolute inset-0 opacity-[0.08] bg-noise mix-blend-overlay pointer-events-none">
          <div className="absolute inset-0 animate-grain-shift" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }} />
        </div>
        
        {/* Layered Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/25 via-40% to-charcoal to-90%" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-obsidian/25 mix-blend-multiply" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-charcoal/60" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
        }} />

        {/* Content Container with Parallax Fade */}
        <div 
          className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-6xl mt-10 transition-all duration-300"
          style={{ 
            opacity: fadeOpacity,
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          {/* Eyebrow */}
          <span
            className={`text-white/70 text-xs font-bold uppercase tracking-[0.4em] border-b border-white/15 pb-3 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block transition-all duration-500 hover:tracking-[0.45em] hover:text-white/90">
              Est. 2023 • Kyoto Inspired
            </span>
          </span>

          {/* Main Headline with Staggered Animation */}
          <h1 className="text-rice-paper text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight leading-[0.95] drop-shadow-2xl">
            <span
              className={`block transition-all duration-1200 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <span className="inline-block transition-all duration-700 hover:tracking-tighter hover:text-clay/90">
                Imperfection
              </span>
            </span>
            <span
              className={`block italic font-light opacity-75 text-stone-200 mt-2 transition-all duration-1200 delay-600 ease-out ${
                isVisible ? 'opacity-75 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
              }`}
            >
              <span className="inline-block transition-all duration-700 hover:tracking-wide hover:opacity-90">
                is Beauty
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <h2
            className={`text-stone-300 text-lg md:text-xl font-sans font-light max-w-2xl leading-relaxed mt-4 tracking-wide transition-all duration-1200 delay-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
            }`}
          >
            <span className="inline-block transition-all duration-500 hover:text-stone-200">
              Handcrafted pottery for the mindful home.
            </span>
            <br className="hidden md:block" />
            <span className="inline-block transition-all duration-500 hover:text-stone-200 hover:tracking-wider">
              Embracing the soulful asymmetry of wabi-sabi.
            </span>
          </h2>

          {/* CTA Button */}
          <div
            className={`pt-10 transition-all duration-1200 delay-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-white/5 px-12 backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-white/40 w-52 hover:shadow-[0_0_40px_rgba(210,180,140,0.15)] hover:scale-105">
              <span className="relative text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 group-hover:text-rice-paper group-hover:tracking-[0.3em] z-10">
                Discover
              </span>
              
              {/* Organic fill animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-clay/70 via-clay/85 to-clay/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out" />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator with Enhanced Animation */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 transition-all duration-1200 delay-[1400ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ opacity: fadeOpacity * 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-widest font-light transition-all duration-500 hover:text-white/60 hover:tracking-[0.3em]">
            Scroll
          </span>
          
          {/* Animated Arrow with Organic Bounce */}
          <div className="relative">
            <span className="material-symbols-outlined text-2xl font-light animate-bounce-organic">
              keyboard_arrow_down
            </span>
            {/* Trailing ghost arrow */}
            <span className="material-symbols-outlined text-2xl font-light absolute inset-0 animate-bounce-organic-delayed opacity-20">
              keyboard_arrow_down
            </span>
          </div>
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

        @keyframes bounce-organic {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(8px); 
            opacity: 0.6;
          }
        }

        @keyframes bounce-organic-delayed {
          0%, 100% { 
            transform: translateY(-4px); 
            opacity: 0;
          }
          50% { 
            transform: translateY(4px); 
            opacity: 0.2;
          }
        }

        .animate-grain-shift {
          animation: grain-shift 8s ease-in-out infinite;
        }

        .animate-bounce-organic {
          animation: bounce-organic 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .animate-bounce-organic-delayed {
          animation: bounce-organic-delayed 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
}