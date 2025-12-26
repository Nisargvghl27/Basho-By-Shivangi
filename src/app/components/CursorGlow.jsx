"use client";

import { useState, useEffect } from 'react';

export default function CursorGlow({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        className={`fixed w-8 h-8 rounded-full bg-clay/20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          boxShadow: '0 0 20px 10px rgba(210, 180, 140, 0.2)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
        }}
      />
      <div 
        className={`fixed w-4 h-4 rounded-full bg-clay/40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transition: 'all 0.1s ease-out',
        }}
      />
      {children}
    </>
  );
}
