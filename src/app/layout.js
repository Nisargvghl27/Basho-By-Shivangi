"use client";

import { Manrope, Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from '../context/WishlistContext';
import { Toaster } from "react-hot-toast";
import SmoothScroll from "../components/SmoothScroll";
import AuthGlobalListener from "../components/AuthGlobalListener";
import "./globals.css";
import { metadata } from './metadata';

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

// ─── Zero-React-render cursor glow ───────────────────────────────────────────
// Mouse coordinates are written directly to CSS custom properties on the DOM
// element via requestAnimationFrame, so React's render cycle is never touched.
function CursorGlow({ children }) {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  // Pending mouse position — raw values captured synchronously
  const pendingPos = useRef({ x: -9999, y: -9999 });
  const isPointer = useRef(false);

  useEffect(() => {
    // Only run on true pointer devices (desktops/laptops with mice)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    isPointer.current = true;

    const el = glowRef.current;
    if (!el) return;

    // Show the element now that we know we have a mouse
    el.style.opacity = '0';

    // The RAF loop: flush the latest position to the CSS vars once per frame.
    // This is the only work done per frame — one style write, no VDOM diff.
    const tick = () => {
      const { x, y } = pendingPos.current;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e) => {
      pendingPos.current = { x: e.clientX, y: e.clientY };
      // Fade in on first move
      if (el.style.opacity === '0') el.style.opacity = '1';
    };

    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/*
        The glow element reads --mx / --my via CSS calc() inside the transform.
        Because we never call setState, React never re-renders this subtree.
        `will-change: transform` tells the compositor to keep this on its own
        GPU layer so the transform update never triggers a paint.
      */}
      <div
        ref={glowRef}
        className="cursor-glow-root"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Outer soft halo — large, very faint */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '16rem',
            height: '16rem',
            transform: 'translate3d(calc(var(--mx, 0px) - 50%), calc(var(--my, 0px) - 50%), 0)',
            background: 'radial-gradient(circle, rgba(210,180,140,0.06) 0%, rgba(210,180,140,0.03) 30%, transparent 60%)',
            filter: 'blur(25px)',
            willChange: 'transform',
          }}
        />
        {/* Inner tighter glow */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '8rem',
            height: '8rem',
            transform: 'translate3d(calc(var(--mx, 0px) - 50%), calc(var(--my, 0px) - 50%), 0)',
            background: 'radial-gradient(circle, rgba(210,180,140,0.08) 0%, rgba(210,180,140,0.04) 40%, transparent 70%)',
            filter: 'blur(12px)',
            willChange: 'transform',
          }}
        />
      </div>
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans bg-charcoal text-rice-paper selection:bg-clay selection:text-white transition-colors duration-500 overflow-x-hidden`}
      >
        <AuthGlobalListener />
        <WishlistProvider>
          <CartProvider>
            {/* Wrap everything in SmoothScroll */}
            <SmoothScroll>
              <CursorGlow>
                {children}
                <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
              </CursorGlow>
            </SmoothScroll>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}

