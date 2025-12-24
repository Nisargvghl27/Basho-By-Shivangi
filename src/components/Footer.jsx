"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [focusedInput, setFocusedInput] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const shopLinks = [
    { label: "All Ceramics", href: "#" },
    { label: "Tableware", href: "#" },
    { label: "Vases", href: "#" },
    { label: "Workshops", href: "/workshops" }
  ];

  const supportLinks = [
    { label: "Care Guide", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact", href: "#" }
  ];

  const socialLinks = [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Pinterest", href: "#", icon: "push_pin" },
    { label: "Facebook", href: "#", icon: "facebook" }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-obsidian text-stone-300 pt-24 pb-12 border-t border-white/5 relative overflow-hidden"
    >


      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-20">
          
          {/* Brand Section */}
          <div 
            className={`md:col-span-5 flex flex-col gap-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Logo with Rotation */}
              <div className="size-8 text-clay transition-all duration-[2000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-180 group-hover:scale-110">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-white transition-all duration-700 group-hover:text-clay/90 group-hover:tracking-tighter">
                Clay & Soul
              </h2>
            </div>
            
            <p className="text-stone-warm text-sm leading-7 max-w-sm font-light transition-all duration-700 hover:text-stone-200">
              Handcrafted in small batches. Designed to bring warmth and intention to your daily rituals. We honor the
              clay and the process.
            </p>

            {/* Decorative Element */}
            <div className="flex items-center gap-3 opacity-40">
              <span className="h-px w-12 bg-gradient-to-r from-clay/60 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-clay/60 font-bold">Est. 2023</span>
            </div>
          </div>

          {/* Shop Links */}
          <div 
            className={`md:col-span-2 transition-all duration-1000 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white transition-all duration-500 hover:text-clay hover:tracking-[0.25em]">
              Shop
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-stone-warm font-light">
              {shopLinks.map((link, index) => (
                <li key={link.label}>
                  <a 
                    className="group relative inline-flex items-center gap-2 hover:text-clay transition-all duration-500 hover:translate-x-2"
                    href={link.href}
                  >
                    <span className="h-px w-0 bg-clay transition-all duration-500 group-hover:w-3 opacity-0 group-hover:opacity-100" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay/50 transition-all duration-500 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div 
            className={`md:col-span-2 transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white transition-all duration-500 hover:text-clay hover:tracking-[0.25em]">
              Support
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-stone-warm font-light">
              {supportLinks.map((link, index) => (
                <li key={link.label}>
                  <a 
                    className="group relative inline-flex items-center gap-2 hover:text-clay transition-all duration-500 hover:translate-x-2"
                    href={link.href}
                  >
                    <span className="h-px w-0 bg-clay transition-all duration-500 group-hover:w-3 opacity-0 group-hover:opacity-100" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay/50 transition-all duration-500 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div 
            className={`md:col-span-3 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white transition-all duration-500 hover:text-clay hover:tracking-[0.25em]">
              Join the community
            </h4>
            <p className="text-stone-warm text-sm mb-6 font-light leading-relaxed transition-all duration-500 hover:text-stone-200">
              Subscribe to receive updates on new kiln firings and workshops.
            </p>
            
            <div className="flex flex-col gap-5">
              {/* Email Input with Enhanced States */}
              <div className="relative">
                <input
                  className={`bg-transparent border-b w-full py-3 text-white focus:outline-none placeholder-stone-600 text-sm transition-all duration-500 ${
                    focusedInput 
                      ? 'border-clay' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                />
                
                {/* Animated Underline Accent */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-clay via-clay/80 to-transparent transition-all duration-500 ${
                  focusedInput ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} />
              </div>

              {/* Subscribe Button with Enhanced Effects */}
              <button
                className="group relative text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian bg-rice-paper hover:bg-clay hover:text-white transition-all duration-700 py-3.5 w-fit px-10 overflow-hidden hover:shadow-[0_8px_24px_rgba(210,180,140,0.3)] hover:scale-105 hover:tracking-[0.25em]"
                onClick={() => console.log('Subscribe:', email)}
              >
                <span className="relative z-10">Subscribe</span>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Hover Fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-clay/0 via-clay to-clay/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className={`flex flex-col md:flex-row justify-between items-center pt-10 text-[10px] text-stone-600 gap-6 font-bold uppercase tracking-widest transition-all duration-1000 delay-400 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="transition-all duration-500 hover:text-stone-400">
            © 2023 Clay & Soul. All rights reserved.
          </p>
          
          {/* Social Links with Icons */}
          <div className="flex gap-8 items-center">
            {socialLinks.map((social, index) => (
              <a 
                key={social.label}
                className="group relative flex items-center gap-2 hover:text-white transition-all duration-500 hover:-translate-y-1"
                href={social.href}
              >
                {/* Glow Effect */}
                <span className="absolute -inset-2 bg-clay/0 rounded-full blur-xl transition-all duration-700 group-hover:bg-clay/10" />
                
                <span className="relative transition-all duration-500 group-hover:text-clay">
                  {social.label}
                </span>
                
                {/* Animated Arrow */}
                <span className="material-symbols-outlined text-[12px] opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-clay">
                  arrow_outward
                </span>
              </a>
            ))}
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

        .animate-grain-shift {
          animation: grain-shift 15s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}