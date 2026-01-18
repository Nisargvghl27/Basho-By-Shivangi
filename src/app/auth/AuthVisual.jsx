"use client";

import React, { useEffect, useState } from 'react';

const AuthVisual = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="visual-storytelling">
      <div 
        className="bg-layer"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1565193566173-092e7f2464d4?q=80&w=2940&auto=format&fit=crop')",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />
      
      <div className="gradient-overlay" />
      
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="texture-overlay" />

      <div className="visual-content">
        <div className="brand-header">
          <div className="logo-mark">
            <span className="basho-logo">芭蕉</span>
            <span className="basho-text">Basho</span>
          </div>
          <p className="tagline">by Shivangi</p>
        </div>
        
        <div className="philosophy-section">
          <div className="quote-mark">"</div>
          <h2 className="philosophy-text">
            In every curve of clay,
            <br />a story whispers—
            <br />imperfect, honest, alive
          </h2>
          <div className="philosophy-footer">
            <span className="separator">—</span>
            <p className="philosophy-source">The Way of Wabi-Sabi</p>
          </div>
        </div>

        <div className="visual-footer">
          <div className="footer-divider" />
          <p className="footer-text">Handcrafted Japanese Tableware</p>
          <div className="footer-accent" />
        </div>
      </div>
    </div>
  );
};

export default AuthVisual;

