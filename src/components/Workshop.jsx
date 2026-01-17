"use client";

import React, { useState, useEffect, useRef } from "react";
import { getUpcomingWorkshop } from "../lib/workshopService";
import Link from "next/link"; 

export default function Workshop() {
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // 1. Generate particles
    setParticles(
      Array.from({ length: 15 }, () => ({
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 60,
        animationDelay: Math.random() * 5,
        animationDuration: 10 + Math.random() * 5
      }))
    );

    // 2. Observer for scroll animation
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

    // 3. Fetch Real Workshop Data
    const fetchWorkshop = async () => {
      try {
        const data = await getUpcomingWorkshop();
        setWorkshop(data);
      } catch (error) {
        console.error("Failed to load workshop", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 4. Real Countdown Logic
  useEffect(() => {
    if (!workshop?.date) return;

    const calculateTimeLeft = () => {
      const targetString = workshop.time 
        ? `${workshop.date}T${workshop.time}` 
        : `${workshop.date}T00:00:00`;
        
      const difference = +new Date(targetString) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [workshop]);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    }
  };

  if (!loading && !workshop) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-charcoal relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Spinning wheel inspiration */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 border border-clay/5 rounded-full animate-spin-slow-reverse will-change-transform" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border-2 border-clay/10 rounded-full animate-spin-slower will-change-transform" />
        
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-clay/10 rounded-full animate-float-random will-change-transform"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-charcoal-light/30 to-transparent pointer-events-none" />

      <div className="layout-container max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          className={`bg-charcoal-light border border-border-subtle overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:min-h-[600px] group transition-all duration-1000 ease-out hover:shadow-[0_20px_60px_rgba(210,180,140,0.2)] hover:border-clay/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{
            transform: isHovered 
              ? `perspective(1500px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * -2}deg) translateY(-8px)`
              : 'none',
            transition: isHovered ? 'transform 0.2s ease-out, box-shadow 1s, border 1s' : 'all 1s ease-out'
          }}
        >
          {/* Image Section with Enhanced Effects */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] overflow-hidden">
            {/* Parallax background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out group-hover:scale-110"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqPHp0lQAScI4atlNSbs-dI3zrZ2nmcw7B87KkrrfHulxT-y52_VUndKiJ-9ROyZngKLCtZYDBjG5rWtic-fbpGeEwaq6-RdxnB3yLtsNcvCdA7MZLNlzVWeimpAC2xs5P9YgOMg58SJpYyohN1REMXU1ALbHP4PwBWD8Ia0DuFpjlB2o89BwSZXPpa16FmpBtTWFWHpCZIvuy2qUBc_MtQ6RKdA1I2sqVroZW63TNjbKi1aVuUGA-ExeqsL0X2KzK4wnHK4a_7Pno")',
                transform: isHovered 
                  ? `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) scale(1.15)`
                  : 'scale(1.05)',
                transition: isHovered ? 'transform 0.3s ease-out' : 'transform 2.5s ease-out'
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-light/85 via-charcoal-light/40 to-transparent transition-all duration-700 group-hover:from-charcoal-light/70" />
            
            {/* Animated spots of interest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-clay/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 group-hover:border-clay/10 will-change-transform" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 delay-200 will-change-transform" />
            </div>

            {/* Spots available indicator */}
            <div className="absolute top-6 right-6 bg-clay/95 backdrop-blur-md text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
              <span className="inline-block animate-pulse-subtle will-change-transform">6 Spots Left</span>
            </div>
          </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center gap-10 relative z-10 bg-charcoal-light/95 lg:bg-transparent">
              
              <span 
                className="absolute top-8 right-8 text-[120px] leading-none text-white/5 font-serif select-none pointer-events-none transition-all duration-700 group-hover:text-white/10 group-hover:scale-110"
                style={{
                  transform: isHovered 
                    ? `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) scale(1.1)`
                    : 'scale(1)',
                  transition: isHovered ? 'transform 0.3s ease-out' : 'all 0.7s ease-out'
                }}
              >
                01
              </span>

            {/* Header */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge with animated border */}
              <div className="relative inline-block mb-6">
                <span className="relative inline-block px-4 py-2 bg-clay/10 text-clay border border-clay/20 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm transition-all duration-500 group-hover:bg-clay/20 group-hover:border-clay/40">
                  <span className="relative z-10">Upcoming Workshop</span>
                  {/* Animated corner accents */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-clay transition-all duration-500 group-hover:w-3 group-hover:h-3 will-change-transform" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-clay transition-all duration-500 group-hover:w-3 group-hover:h-3 will-change-transform" />
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif text-rice-paper leading-tight mb-3 transition-all duration-700 group-hover:text-clay/90">
                The Art of <br />
                <span className="relative inline-block italic text-clay">
                  Wheel Throwing
                  {/* Animated underline */}
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-clay to-transparent opacity-50 animate-shimmer will-change-transform" />
                </span>
              </h2>
              <p className="text-stone-warm font-light text-lg transition-colors duration-500 group-hover:text-stone-200">
                Beginner's Intensive
              </p>
            </div>

              <div className={`flex gap-4 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' }
                ].map((item, index) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-charcoal border border-clay/20 px-4 py-3 min-w-[60px] text-center transition-all duration-500 group-hover:border-clay/40 group-hover:bg-charcoal/80">
                      <span className="text-2xl font-serif text-clay font-bold">{item.value.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-warm mt-2 font-bold">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className={`flex flex-col gap-6 py-6 border-y border-white/5 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="group/item flex items-center gap-5 cursor-default transition-all duration-500 hover:translate-x-2">
                    <div className="relative">
                      <div className="p-2.5 bg-white/5 rounded-full text-clay transition-all duration-500 group-hover/item:bg-clay group-hover/item:text-white group-hover/item:scale-110 relative z-10">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-stone-200 tracking-wide">{formatDate(workshop.date)}</span>
                </div>

                <div className="group/item flex items-center gap-5 cursor-default transition-all duration-500 hover:translate-x-2">
                    <div className="relative">
                      <div className="p-2.5 bg-white/5 rounded-full text-clay transition-all duration-500 group-hover/item:bg-clay group-hover/item:text-white group-hover/item:scale-110 relative z-10">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-stone-200 tracking-wide">{workshop.time}</span>
                </div>
              </div>

            {/* CTA Section */}
            <div className={`flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-2 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="group/btn relative w-full sm:w-auto bg-rice-paper text-obsidian font-bold py-4 px-10 uppercase tracking-[0.15em] text-xs shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                  Reserve Spot (₹1200)
                </span>
                
                {/* Animated background fill */}
                <div className="absolute inset-0 bg-clay translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out will-change-transform" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 will-change-transform" />
              </button>

                <Link
                  className="group/link relative text-stone-warm hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-500 pb-1 flex items-center gap-2"
                  href="/workshops"
                >
                  <span className="relative">
                    View All Workshops
                    <span className="absolute bottom-0 left-0 h-[1px] w-full bg-stone-warm/30 transition-all duration-500 group-hover/link:bg-clay" />
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-clay transition-all duration-500 group-hover/link:w-full" />
                  </span>
                  <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover/link:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-random {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          25% { transform: translate(30px, -40px) scale(1.5); opacity: 0.3; }
          50% { transform: translate(-20px, -80px) scale(1); opacity: 0.5; }
          75% { transform: translate(40px, -120px) scale(1.2); opacity: 0.3; }
        }

        @keyframes shimmer {
          0%, 100% { transform: scaleX(1) translateX(-100%); opacity: 0.3; }
          50% { transform: scaleX(1.5) translateX(0%); opacity: 0.8; }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-spin-slow-reverse { animation: spin-slow-reverse 30s linear infinite; }
        .animate-spin-slower { animation: spin-slower 40s linear infinite; }
        .animate-float-random { animation: float-random linear infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}