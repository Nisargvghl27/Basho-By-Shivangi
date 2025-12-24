"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Handle scroll detection for the glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isScrolled
          ? "bg-charcoal/80 backdrop-blur-2xl border-b border-white/[0.08] py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      {/* Subtle gradient overlay for depth */}
      <div className={`absolute inset-0 bg-gradient-to-b from-charcoal/20 to-transparent pointer-events-none transition-opacity duration-[900ms] ${
        isScrolled ? "opacity-100" : "opacity-0"
      }`} />

      <div className="relative flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto">
        
        {/* --- Brand / Logo --- */}
<a 
  href="/" 
  className="flex items-center gap-3 group relative"
  onMouseEnter={() => setActiveLink("")}
>
  {/* Subtle glow effect on hover */}
  <div className="absolute -inset-2 bg-clay/0 rounded-lg blur-xl transition-all duration-700 group-hover:bg-clay/5" />
  
  {/* Logo Image */}
  {/* I set w-32 h-10 (approx 128px x 40px) as a standard logo size. Adjust 'w-32' to fit your logo's aspect ratio. */}
  <div className="relative w-32 h-10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110">
    <Image 
      src="/images/logo.jpg" 
      alt="Clay & Soul" 
      fill 
      sizes="(max-width: 768px) 100vw, 150px"
      className="object-contain object-left drop-shadow-sm"
      priority // Loads the logo immediately since it's above the fold
    />
  </div>
</a>

        {/* --- Primary Navigation --- */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group py-2"
              onMouseEnter={() => setActiveLink(link.label)}
              onMouseLeave={() => setActiveLink("")}
            >
              <span className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm transition-all duration-700 group-hover:text-rice-paper group-hover:tracking-[0.24em]">
                {link.label}
                
                {/* Subtle glow behind text */}
                <span className="absolute inset-0 blur-sm text-clay opacity-0 transition-opacity duration-700 group-hover:opacity-20">
                  {link.label}
                </span>
              </span>
              
              {/* Organic brushstroke underline with variable width */}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-clay/60 via-clay to-clay/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full shadow-sm opacity-0 group-hover:opacity-100" />
              
              {/* Secondary accent line for depth */}
              <span className="absolute bottom-[-2px] left-[5%] h-[0.5px] w-0 bg-clay/30 transition-all duration-[900ms] delay-75 ease-out group-hover:w-[90%] opacity-0 group-hover:opacity-60" />
            </a>
          ))}
        </nav>

        {/* --- Action Icons --- */}
        <div className="flex items-center gap-5 md:gap-8">
          {/* Search */}
          <button 
            aria-label="Search"
            className="relative group text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
          >
            {/* Subtle pulse ring on hover */}
            <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
            <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">search</span>
          </button>

          {/* Cart Bag */}
          <button 
            aria-label="View Cart"
            className="relative group text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
            <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">shopping_bag</span>
            
            {/* Badge: Organic reveal with soft shadow */}
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-0 scale-75 translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
              2
            </span>
          </button>

          {/* Profile / Login */}
          <Link 
            href="/auth/login"
            aria-label="Sign In"
            className="relative group text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
            <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}