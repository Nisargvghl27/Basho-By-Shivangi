"use client";
import React, { useState, useEffect, useRef } from "react";

const principles = [
  {
    id: 1,
    icon: "spa",
    title: "Wabi-Sabi Spirit",
    description: "Celebrating the beauty in imperfections and the natural cycle of growth and decay.",
    rotation: 12
  },
  {
    id: 2,
    icon: "fingerprint",
    title: "Hand-Thrown",
    description: "Each bowl, cup, and vase is individually shaped on the wheel by master artisans.",
    rotation: -12
  },
  {
    id: 3,
    icon: "eco",
    title: "Earth-Sourced",
    description: "We use locally sourced organic clays and lead-free, natural mineral glazes.",
    rotation: 12
  }
];

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 8 + Math.random() * 4
      }))
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (quoteRef.current) {
      const rect = quoteRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 md:px-20 lg:px-40 bg-charcoal relative overflow-hidden border-b border-border-subtle"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-clay/20 rounded-full animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Radial Gradient with Scroll Animation */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(210,180,140,0.08) 0%, transparent 70%)',
          opacity: 0.4 + scrollProgress * 0.3
        }}
      />

      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay">
        <div 
          className="absolute inset-0 animate-grain-shift" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      <div className="max-w-[1024px] mx-auto text-center flex flex-col items-center gap-20 relative z-10">
        
        {/* Header Section with Parallax */}
        <div 
          className={`flex flex-col items-center gap-8 transition-all duration-1200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Eyebrow with Animated Lines */}
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-clay/60 to-clay animate-expand-line" />
              <span className="text-clay text-[11px] font-bold uppercase tracking-[0.3em] relative">
                Our Philosophy
                {/* Orbiting dot */}
                <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-clay rounded-full animate-orbit" />
              </span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-clay/60 to-clay animate-expand-line-reverse" />
            </div>
          </div>

          {/* Main Quote with 3D Effect */}
          <div 
            ref={quoteRef}
            className="relative"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * -1}deg) rotateY(${mousePosition.x * 1}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.3] text-rice-paper max-w-4xl relative">
              <span className="inline-block">
                "We create pieces that invite you to{" "}
              </span>
              
              {/* Highlighted word with special effect */}
              <span className="relative inline-block group">
                <span className="italic text-clay relative z-10 transition-all duration-700 inline-block group-hover:scale-110">
                  slow down
                </span>
                {/* Glowing underline */}
                <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-clay to-transparent opacity-50 animate-pulse-glow" />
                {/* Circular highlight */}
                <span className="absolute inset-0 -m-2 border border-clay/30 rounded-full scale-90 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
              </span>
              
              <span className="inline-block">
                , to hold, and to savor the moment."
              </span>
            </h2>

            {/* Decorative quote marks */}
            <div className="absolute -top-6 -left-6 text-6xl text-clay/20 font-serif leading-none">"</div>
            <div className="absolute -bottom-6 -right-6 text-6xl text-clay/20 font-serif leading-none rotate-180">"</div>
          </div>
        </div>

        {/* Principles Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              className={`group relative transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* Connecting lines between cards */}
              {index < principles.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-[1px] bg-gradient-to-r from-clay/30 via-clay/10 to-transparent" />
              )}

              <div className="flex flex-col items-center gap-6 text-center relative">
                
                {/* Icon Circle with Multiple Layers */}
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 -m-3 rounded-full bg-clay/0 blur-xl transition-all duration-700 group-hover:bg-clay/20 group-hover:-m-4" />
                  
                  {/* Rotating border ring */}
                  <div className="absolute inset-0 -m-1 rounded-full border border-clay/0 transition-all duration-700 group-hover:border-clay/30 group-hover:animate-spin-slow" />
                  
                  {/* Main circle */}
                  <div 
                    className="relative size-20 rounded-full border border-white/5 bg-charcoal-light flex items-center justify-center transition-all duration-700 group-hover:border-clay/50 group-hover:bg-clay/10 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(210,180,140,0.3)]"
                    style={{
                      transform: `rotate(0deg)`,
                      transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Icon with bounce */}
                    <span 
                      className="material-symbols-outlined text-3xl text-stone-warm group-hover:text-clay transition-all duration-500 font-light group-hover:scale-110"
                      style={{
                        transform: `rotate(${principle.rotation}deg)`,
                        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {principle.icon}
                    </span>

                    {/* Pulse rings */}
                    <span className="absolute inset-0 rounded-full border-2 border-clay/30 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
                    <span className="absolute inset-0 rounded-full border-2 border-clay/20 scale-100 opacity-0 group-hover:scale-[2] group-hover:opacity-0 transition-all duration-1500 delay-100" />
                  </div>
                </div>

                {/* Content with reveal animation */}
                <div className="space-y-4 overflow-hidden">
                  <h3 className="text-lg font-serif font-medium text-rice-paper tracking-wide transition-all duration-700 group-hover:text-clay group-hover:tracking-wider">
                    {principle.title.split('').map((char, i) => (
                      <span
                        key={i}
                        className="inline-block transition-all duration-500"
                        style={{
                          transitionDelay: `${i * 30}ms`,
                          transform: 'translateY(0)',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h3>
                  
                  <p className="text-stone-warm text-sm leading-relaxed px-2 font-light transition-all duration-700 group-hover:text-stone-200 group-hover:scale-105">
                    {principle.description}
                  </p>

                  {/* Animated underline accent */}
                  <div className="flex justify-center pt-2">
                    <div className="h-[2px] w-0 bg-gradient-to-r from-transparent via-clay to-transparent transition-all duration-700 group-hover:w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% { 
            transform: translate(20px, -40px) scale(1.5);
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
        }

        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5%, -5%); }
          50% { transform: translate(-10%, 5%); }
          75% { transform: translate(5%, -10%); }
        }

        @keyframes expand-line {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes expand-line-reverse {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(20px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(20px) rotate(-360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.8; transform: scaleX(1.2); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-grain-shift {
          animation: grain-shift 15s ease-in-out infinite;
        }

        .animate-expand-line {
          animation: expand-line 1s ease-out forwards;
          transform-origin: center;
        }

        .animate-expand-line-reverse {
          animation: expand-line-reverse 1s ease-out forwards;
          transform-origin: center;
        }

        .animate-orbit {
          animation: orbit 4s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}