"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * AuthVisual
 * Left-hand decorative panel on the auth pages.
 *
 * Performance fix: the mousemove handler is throttled via requestAnimationFrame
 * so React state is only updated once per rendered frame (~60fps) instead of on
 * every raw DOM event, preventing unnecessary re-renders.
 */
const AuthVisual = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);
  const pendingPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Store the latest values without touching React state
      pendingPos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      };

      // Schedule a single state update per animation frame
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setMousePosition({ ...pendingPos.current });
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  return (
    <div className="visual-storytelling">
      <div
        className="bg-layer"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565193566173-092e7f2464d4?q=80&w=2940&auto=format&fit=crop')",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />

      <div className="gradient-overlay" />

      <div className="particles" aria-hidden="true">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
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
          <div className="quote-mark">&ldquo;</div>
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
