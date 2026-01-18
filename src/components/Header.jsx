"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Collaborations", href: "/corporate" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsub();
  }, []);

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
        <div className={`absolute inset-0 bg-gradient-to-b from-charcoal/20 to-transparent pointer-events-none transition-opacity duration-[900ms] ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="relative px-6 md:px-12 max-w-[1440px] mx-auto w-full">
          {/* GRID LAYOUT: [1fr_auto_1fr] */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[3.5rem]">
            
            {/* LEFT: LOGO */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-3 group relative z-50" onMouseEnter={() => setActiveLink("")}>
                <div className="absolute -inset-2 bg-clay/0 rounded-full blur-xl transition-all duration-700 group-hover:bg-clay/5" />
                <div className="relative w-40 h-12 md:w-56 md:h-16 transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-150">
                  <Image src="/images/bgr_logo.png" alt="Clay & Soul" fill sizes="(max-width: 768px) 160px, 224px" className="object-contain object-left brightness-200 drop-shadow-lg" priority />
                </div>
              </Link>
            </div>

            {/* CENTER: NAV LINKS (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <MagneticButton key={link.label} href={link.href}>
                  <span 
                    className="relative group py-2 block px-2"
                    onMouseEnter={() => setActiveLink(link.label)}
                    onMouseLeave={() => setActiveLink("")}
                  >
                    <span className="relative text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm transition-all duration-700 group-hover:text-rice-paper group-hover:tracking-[0.24em] whitespace-nowrap">
                      {link.label}
                    </span>
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-clay/60 via-clay to-clay/60 transition-all duration-700 group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </span>
                </MagneticButton>
              ))}
            </nav>

            {/* RIGHT: ACTIONS (Cart, Wishlist, Profile) & MOBILE TOGGLE */}
            <div className="flex justify-end items-center gap-1 sm:gap-3 md:gap-6 z-50">
              
              {/* 1. Cart Bag */}
              <Link
                href="/cart"
                className="relative group flex items-center justify-center w-10 h-10 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* 2. Wishlist Heart */}
              <Link 
                href="/wishlist"
                className="relative group flex items-center justify-center w-10 h-10 text-stone-warm transition-all duration-500 hover:text-rice-paper hover:-translate-y-0.5"
              >
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                  {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-clay to-clay/90 text-[9px] font-bold text-white shadow-sm">
                      {wishlistCount}
                  </span>
                  )}
              </Link>

              {/* 3. Profile / Login */}
              {/* Added -translate-y-0.5 to move it up slightly base state, and increased hover to -translate-y-1 */}
              <Link
                href={user ? "/profile" : "/auth/login"}
                aria-label="Account"
                className="relative group flex items-center justify-center w-10 h-10 transition-all duration-500 -translate-y-0.5 hover:-translate-y-1"
              >
                <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:bg-clay/5 group-hover:opacity-0" />

                {!user ? (
                  <span className="material-symbols-outlined text-[20px] font-light text-stone-warm relative drop-shadow-sm group-hover:text-rice-paper">
                    account_circle
                  </span>
                ) : user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="User Profile"
                    width={28}
                    height={28}
                    className="rounded-full object-cover ring-1 ring-white/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-clay flex items-center justify-center text-[11px] font-bold text-charcoal">
                    {user.displayName?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group ml-1">
                <span className={`h-[1px] bg-stone-warm transition-all duration-500 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[7px] bg-rice-paper" : "w-6 group-hover:w-8"}`} />
                <span className={`h-[1px] bg-stone-warm transition-all duration-500 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-8"}`} />
                <span className={`h-[1px] bg-stone-warm transition-all duration-500 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[7px] bg-rice-paper" : "w-6 group-hover:w-8"}`} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div className={`fixed inset-0 z-40 bg-charcoal/60 backdrop-blur-[2px] transition-opacity duration-[800ms] ease-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-500"}`} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[360px] bg-charcoal/85 backdrop-blur-2xl border-l border-white/[0.08] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative h-full flex flex-col px-8 py-10">
          <div className="flex justify-end mb-16">
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-stone-warm hover:bg-white/5">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-light tracking-[0.1em] text-stone-warm/80 hover:text-rice-paper transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}