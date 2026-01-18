"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Philosophy from "./Philosophy";
import Collections from "./Collections";
import Workshop from "./Workshop";
import Journal from "./Journal";
import Footer from "./Footer";

// --- Utility: Reveal on Scroll Component ---
const RevealSection = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    if (direction === "up") return "translate(0, 50px)";
    if (direction === "left") return "translate(-50px, 0)";
    if (direction === "right") return "translate(50px, 0)";
    return "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // --- Global Mouse Tracker ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Simulate loading delay for the intro
    setTimeout(() => setLoaded(true), 500);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative min-h-screen bg-charcoal text-rice-paper overflow-x-hidden transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- Ambient Background Effects --- */}
      
      {/* Grain Texture */}
      <div className="fixed inset-0 opacity-[0.08] pointer-events-none z-[1]">
        <div
          className="absolute inset-0 animate-grain"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stichTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
            backgroundSize: '150px 150px'
          }}
        />
      </div>

      {/* Cursor Glow */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[0] mix-blend-soft-light transition-transform duration-100 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(188, 143, 107, 0.15) 0%, rgba(0,0,0,0) 70%)',
          left: 0,
          top: 0,
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`
        }}
      />

      {/* Floating Fog / Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-clay/5 rounded-full blur-[120px] animate-float-slow pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-stone-500/5 rounded-full blur-[150px] animate-float-slower pointer-events-none z-0" />

      {/* --- Main Content --- */}
      
      <Header />

      <main className="relative z-10">
        
        {/* Hero with Intro Overlay */}
        <section className="relative">
             <div className={`absolute inset-0 bg-charcoal z-50 transition-transform duration-[1500ms] ease-[cubic-bezier(0.83, 0, 0.17, 1)] origin-top ${loaded ? 'scale-y-0 delay-300' : 'scale-y-100'}`} />
             <Hero />
        </section>

        {/* Sections with Scroll Reveals */}
        <RevealSection direction="up" delay={0.1}>
          <div className="relative">
             <div className="absolute left-1/2 -translate-x-1/2 -top-20 h-20 w-[1px] bg-gradient-to-b from-transparent to-white/10" />
             <Philosophy />
          </div>
        </RevealSection>

        <RevealSection direction="up" delay={0.1}>
           <Collections />
        </RevealSection>

        <RevealSection direction="up" delay={0.1}>
           <Workshop />
        </RevealSection>

        <RevealSection direction="up" delay={0.1}>
           <Journal />
        </RevealSection>

      </main>

      <Footer />

      {/* --- Global Styles for Animations --- */}
      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -50px) scale(1.1); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(0.9); }
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}