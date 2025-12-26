"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  
  // --- 1. State Declarations ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- 2. Context Access ---
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  // --- 3. Scroll Detection Effect ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 4. Body Lock Effect (For Mobile Menu) ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Helper to calculate total cart quantity
  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled || isMobileMenuOpen
            ? "bg-charcoal/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        {/* Subtle gradient overlay for depth */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-charcoal/20 to-transparent pointer-events-none transition-opacity duration-[900ms] ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto">
          
          {/* --- Brand / Logo (Using Next/Image) --- */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-50"
            onMouseEnter={() => setActiveLink("")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-2 bg-clay/0 rounded-lg blur-xl transition-all duration-700 group-hover:bg-clay/5" />

            {/* Logo Image Container */}
            <div className="relative w-40 h-12 md:w-48 md:h-14 transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-150">
              <Image
                src="/images/bgr_logo.png"
                alt="Clay & Soul"
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain object-left brightness-200 drop-shadow-lg"
                priority
              />
            </div>
          </Link>

          {/* --- Desktop Primary Navigation (Hidden on Mobile) --- */}
          <nav className="hidden md:flex items-center gap-10 ml-16">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative group py-2"
                onMouseEnter={() => setActiveLink(link.label)}
                onMouseLeave={() => setActiveLink("")}
              >
                <span className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm transition-all duration-700 group-hover:text-rice-paper group-hover:tracking-[0.24em]">
                  {link.label}
                  <span className="absolute inset-0 blur-sm text-clay opacity-0 transition-opacity duration-700 group-hover:opacity-20">
                    {link.label}
                  </span>
                </span>
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-clay/60 via-clay to-clay/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full shadow-sm opacity-0 group-hover:opacity-100" />
                <span className="absolute bottom-[-2px] left-[5%] h-[0.5px] w-0 bg-clay/30 transition-all duration-[900ms] delay-75 ease-out group-hover:w-[90%] opacity-0 group-hover:opacity-60" />
              </Link>
            ))}
          </nav>

          {/* --- Action Icons & Mobile Toggle --- */}
          {/* UPDATED: Added h-8 to parent and explicit sizing to children ensures alignment */}
          <div className="flex items-center gap-3 md:gap-8 z-50 h-8">
            
            {/* Search */}
            <button
              aria-label="Search"
              className="relative group flex items-center justify-center w-8 h-8 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
              <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">
                search
              </span>
            </button>

            {/* Cart Bag */}
            <Link
              href="/cart"
              aria-label="View Cart"
              className="relative group flex items-center justify-center w-8 h-8 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
              <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">
                shopping_bag
              </span>
              
              {/* Dynamic Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-100 scale-100 translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="View Wishlist"
              className="relative group flex items-center justify-center w-8 h-8 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
            >
               <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
               <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">favorite</span>
               
               {/* Dynamic Badge */}
               {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  {wishlistCount}
                </span>
               )}
            </Link>

            {/* Profile / Login */}
            <Link
              href="/auth/login"
              aria-label="Sign In"
              className="relative group hidden sm:flex items-center justify-center w-8 h-8 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />
              <span className="material-symbols-outlined text-[20px] font-light relative drop-shadow-sm">
                account_circle
              </span>
            </Link>

            {/* --- Mobile Hamburger Button --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Toggle Menu"
            >
              {/* Top Line */}
              <span
                className={`h-[1px] bg-stone-warm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMobileMenuOpen
                    ? "w-6 rotate-45 translate-y-[7px] bg-rice-paper"
                    : "w-6 group-hover:w-8"
                }`}
              />
              {/* Middle Line */}
              <span
                className={`h-[1px] bg-stone-warm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMobileMenuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-8"
                }`}
              />
              {/* Bottom Line */}
              <span
                className={`h-[1px] bg-stone-warm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMobileMenuOpen
                    ? "w-6 -rotate-45 -translate-y-[7px] bg-rice-paper"
                    : "w-6 group-hover:w-8"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu (The "Undo" Sequence Effect) --- */}
      
      {/* 1. Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-charcoal/60 backdrop-blur-[2px] transition-opacity duration-[800ms] ease-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-500"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. The Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[360px] bg-charcoal/85 backdrop-blur-2xl border-l border-white/[0.08] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] rounded-tl-[40px] transform transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen 
            ? "translate-x-0 delay-0" 
            : "translate-x-full delay-[400ms]" 
        }`}
      >
        {/* Decorative Background Blob */}
        <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-clay/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

        <div className="relative h-full flex flex-col px-8 py-10">
          
          {/* --- Header: Close Button --- */}
          <div className="flex justify-end mb-16">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all duration-500 hover:bg-white/5 ${
                 isMobileMenuOpen ? "rotate-0 opacity-100 delay-300" : "-rotate-90 opacity-0 delay-0"
              }`}
            >
              <span className="material-symbols-outlined text-stone-warm font-light text-2xl group-hover:text-rice-paper">close</span>
            </button>
          </div>

          {/* --- Navigation Links --- */}
          <nav className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative flex items-center gap-4 overflow-hidden"
              >
                {/* Animated Text Container */}
                <div 
                  className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMobileMenuOpen 
                      ? "translate-x-0 opacity-100" 
                      : "translate-x-12 opacity-0"
                  }`}
                  // Staggered delay for entering, instant for leaving
                  style={{ transitionDelay: isMobileMenuOpen ? `${150 + (i * 100)}ms` : "0ms" }}
                >
                  <span className="block text-3xl font-light tracking-[0.1em] text-stone-warm/80 transition-colors duration-300 group-hover:text-rice-paper group-hover:pl-2">
                    {link.label}
                  </span>
                </div>

                {/* Hover Dot */}
                <span className="h-1.5 w-1.5 rounded-full bg-clay opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125" />
              </Link>
            ))}
          </nav>

          {/* --- Footer --- */}
          <div 
            className={`mt-auto flex flex-col gap-6 pt-12 border-t border-white/5 transition-all duration-700 ease-out ${
               isMobileMenuOpen 
                 ? "opacity-100 translate-y-0 delay-500" 
                 : "opacity-0 translate-y-8 delay-0"
            }`}
          >
            <Link 
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-white/[0.02] border border-white/[0.02] transition-all hover:bg-white/[0.05]"
            >
              <span className="material-symbols-outlined text-clay text-xl">account_circle</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-warm">My Account</span>
            </Link>

            <div className="text-center text-[9px] uppercase tracking-[0.2em] text-stone-warm/30">
              © Basho by Shivangi
            </div>
          </div>

        </div>
      </div>
    </>
  );
}