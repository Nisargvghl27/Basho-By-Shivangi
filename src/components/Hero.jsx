"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  // Set video speed to 50% (Slow Motion)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="w-full relative h-screen overflow-hidden">
      {/* --- VIDEO BACKGROUND (Desktop) --- */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlays for readability and atmosphere */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/50" />
        <div className="hidden md:block absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* --- MOBILE BACKGROUND (Image Fallback) --- */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-black/30" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <span className="text-white/80 text-xs font-bold uppercase tracking-[0.4em] mb-6 animate-fade-in-up">
          Est. 2023 • Kyoto Inspired
        </span>

        <h1 className="text-rice-paper text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight leading-none drop-shadow-2xl mb-6">
          <span className="block animate-fade-in-up delay-100">Imperfection</span>
          <span className="block italic font-light text-stone-200 animate-fade-in-up delay-200">
            is Beauty
          </span>
        </h1>

        <p className="text-stone-300 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-300">
          Handcrafted pottery for the mindful home.<br/>
          Embracing the soulful asymmetry of wabi-sabi.
        </p>

        <button className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md rounded-sm transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:scale-105 animate-fade-in-up delay-500">
          <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-white group-hover:text-rice-paper">
            Discover Collection
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-clay/0 via-clay/40 to-clay/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </button>
      </div>
    </div>
  );
}
