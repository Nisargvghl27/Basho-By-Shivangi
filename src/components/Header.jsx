"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
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
          <div className="absolute -inset-2 bg-clay/0 rounded-full blur-xl transition-all duration-700 group-hover:bg-clay/5" />
          
          {/* Logo Icon: Organic, slow rotation with scale */}
          <div className="relative size-8 text-clay transition-all duration-[2200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-180 group-hover:scale-110">
            <svg viewBox="0 0 48 48" fill="currentColor" className="drop-shadow-sm">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" />
            </svg>
          </div>

          <h1 className="relative text-xl font-serif font-bold tracking-tight text-rice-paper transition-all duration-700 group-hover:text-clay/95 group-hover:tracking-wide">
            Clay & Soul
          </h1>
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
          <Link 
            href="/cart"
            aria-label="View Cart"
            className="relative group text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
            <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">shopping_bag</span>
            
            {/* Badge: Show actual cart item count */}
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-100 scale-100 translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link 
            href="/wishlist"
            aria-label="View Wishlist"
            className="relative group text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
            <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">favorite</span>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                {wishlistItems.length}
              </span>
            )}
          </Link>

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