"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Philosophy from "./Philosophy";
import Collections from "./Collections";
import Workshop from "./Workshop";
import Journal from "./Journal";
import Footer from "./Footer";

// ─── RevealSection ────────────────────────────────────────────────────────────
// Optimisations vs. original:
//  • Captures ref.current in a local var before cleanup to avoid the stale-ref
//    warning and potential memory leaks.
//  • Calls observer.disconnect() (not just unobserve) after the element has
//    become visible — the observer is no longer needed and can be GC'd.
//  • Uses `translate3d` so the browser can use the compositor thread.
// ─────────────────────────────────────────────────────────────────────────────
const RevealSection = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Done — no need to keep observing
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        // rootMargin gives a small early-start buffer so the reveal fires just
        // before the element reaches the viewport edge, preventing a visible
        // "pop-in" at slow scroll speeds.
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      // Use the captured `el` — not ref.current — to avoid the React
      // "cleanup captures stale ref" warning.
      observer.disconnect();
    };
  }, []);

  const hiddenTransform =
    direction === "left"
      ? "translate3d(-50px, 0, 0)"
      : direction === "right"
      ? "translate3d(50px, 0, 0)"
      : "translate3d(0, 50px, 0)";

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        opacity: isVisible ? 1 : 0,
        // Use transform + opacity only — both are compositor-only properties
        // that avoid layout and paint entirely.
        // 0.55 s feels snappy while still being smooth on the cubic ease
        transition: `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

// ─── AmbientBackground ────────────────────────────────────────────────────────
// Extracted into its own memoised component so it NEVER re-renders once
// mounted — it has no props that change, no state, and no hooks that update.
//
// GPU strategy for the blurred orbs:
//  • `will-change: transform` promotes each orb to its own compositor layer
//    before the animation starts, preventing layer promotion jank mid-animation.
//  • `contain: strict` tells the browser this subtree does not affect layout
//    outside itself, so paint invalidations are scoped.
//  • `mix-blend-mode` is removed from the cursor glow in this component because
//    it forces the browser to composite against every layer below — extremely
//    expensive. The real cursor glow is handled in layout.js via CSS vars.
// ─────────────────────────────────────────────────────────────────────────────
const AmbientBackground = memo(function AmbientBackground() {
  return (
    <>
      {/* Film grain — pure CSS animation, no JS involvement */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.06,
          pointerEvents: "none",
          zIndex: 1,
          // contain layout+paint to this element
          contain: "strict",
        }}
      >
        <div
          className="basho-grain"
          style={{
            position: "absolute",
            inset: "-50%",
            width: "200%",
            height: "200%",
            backgroundImage:
              'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")',
            backgroundSize: "150px 150px",
          }}
        />
      </div>

      {/* Floating ambient orb — top-left */}
      <div
        aria-hidden="true"
        className="basho-orb-slow"
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          // ⚡ Optimization: Use radial-gradient instead of heavy CSS blur filters
          background: "radial-gradient(circle, rgba(166, 93, 61, 0.06) 0%, rgba(166, 93, 61, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
          contain: "strict",
        }}
      />

      {/* Floating ambient orb — bottom-right */}
      <div
        aria-hidden="true"
        className="basho-orb-slower"
        style={{
          position: "fixed",
          bottom: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          // ⚡ Optimization: Use radial-gradient instead of heavy CSS blur filters
          background: "radial-gradient(circle, rgba(100, 100, 100, 0.06) 0%, rgba(100, 100, 100, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
          contain: "strict",
        }}
      />
    </>
  );
});

// ─── LandingPage ─────────────────────────────────────────────────────────────
// Mouse tracking is gone from this component entirely — the global CursorGlow
// in layout.js handles it with zero React re-renders via RAF + CSS custom props.
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-charcoal text-rice-paper overflow-x-hidden">
      {/* ── Ambient effects (memoised — never re-renders) ── */}
      <AmbientBackground />

      {/* ── Main Content ── */}
      <Header />

      <main className="relative z-10">
        {/* Hero component directly displayed */}
        <section className="relative">
          <Hero />
        </section>

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

      {/* ── Keyframe definitions (CSS-only, no JS) ── */}
      <style jsx global>{`
        @keyframes basho-grain {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          10% {
            transform: translate3d(-5%, -10%, 0);
          }
          20% {
            transform: translate3d(-15%, 5%, 0);
          }
          30% {
            transform: translate3d(7%, -25%, 0);
          }
          40% {
            transform: translate3d(-5%, 25%, 0);
          }
          50% {
            transform: translate3d(-15%, 10%, 0);
          }
          60% {
            transform: translate3d(15%, 0%, 0);
          }
          70% {
            transform: translate3d(0%, 15%, 0);
          }
          80% {
            transform: translate3d(3%, 35%, 0);
          }
          90% {
            transform: translate3d(-10%, 10%, 0);
          }
        }

        @keyframes basho-float-slow {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(30px, -50px, 0) scale(1.1);
          }
        }

        @keyframes basho-float-slower {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-50px, 30px, 0) scale(0.9);
          }
        }

        /* ⚡ Optimization: Disable film grain step animation on mobile viewports to prevent full-screen layout invalidation */
        @media (min-width: 769px) {
          .basho-grain {
            animation: basho-grain 8s steps(10) infinite;
          }
        }

        .basho-orb-slow {
          animation: basho-float-slow 10s ease-in-out infinite;
        }

        .basho-orb-slower {
          animation: basho-float-slower 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}