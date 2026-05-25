"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LottieLoader from "./LottieLoader";

// ─── Framer Motion Variants ───────────────────────────────────────────────────

/** Brand name characters animate in one-by-one */
const charVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.4 + i * 0.06,
    },
  }),
};

/** Tagline fades in after the brand name */
const taglineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.1 },
  },
};

/** Counter fades out right before exit */
const counterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
};

/** Thin horizontal rule that grows from left */
const ruleVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.85 },
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────
const BRAND = "BASHO";           // Characters to reveal one-by-one
const DURATION_MS   = 2600;      // Total splash duration before exit begins
const PROGRESS_TICK = 40;        // ms between each counter increment

// ─── Component ────────────────────────────────────────────────────────────────
export default function InitialLoader({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [exiting,  setExiting]    = useState(false);
  const [mounted,  setMounted]    = useState(false);
  const intervalRef               = useRef(null);
  const timeoutRef                = useRef(null);

  // Prevent body scroll while splash is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setMounted(true);
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Drive the progress counter
  useEffect(() => {
    if (!mounted) return;

    const steps     = DURATION_MS / PROGRESS_TICK;   // ~65 steps
    const increment = 100 / steps;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return next;
      });
    }, PROGRESS_TICK);

    // Trigger exit animation once loading "completes"
    timeoutRef.current = setTimeout(() => {
      setExiting(true);
    }, DURATION_MS);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [mounted]);

  // After the exit panels have fully slid away, unmount and restore scroll
  const handleExitComplete = () => {
    document.body.style.overflow = "";
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-charcoal"
          aria-hidden="true"
        >



          {/* ── Radial ambient glow (clay tint) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(166,93,61,0.08) 0%, transparent 75%)",
              zIndex: 3,
            }}
          />

          {/* ── Splash content ── */}
          <div className="relative flex flex-col items-center justify-center gap-6 z-[4] select-none">

            {/* Lottie animation — swap for your real component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <LottieLoader className="w-20 h-20" />
            </motion.div>

            {/* Thin decorative rule */}
            <motion.div
              variants={ruleVariants}
              initial="hidden"
              animate="visible"
              className="w-16 h-px bg-clay/40 origin-left"
            />

            {/* Brand name — character-by-character reveal */}
            <div
              className="flex items-end gap-0 overflow-hidden"
              aria-label={BRAND}
            >
              {BRAND.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-serif text-5xl md:text-7xl tracking-[0.22em] text-rice-paper"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              className="font-sans text-[10px] uppercase tracking-[0.55em] text-stone-warm"
            >
              by Shivangi
            </motion.p>

            {/* Progress counter */}
            <motion.div
              variants={counterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 flex flex-col items-center gap-2"
            >
              {/* Numeric percentage */}
              <span className="font-sans text-[11px] tabular-nums text-stone-warm/60 tracking-widest">
                {String(Math.floor(progress)).padStart(3, "0")}
              </span>

              {/* Progress bar */}
              <div className="relative w-40 h-px bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 loader-bar-shimmer"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
