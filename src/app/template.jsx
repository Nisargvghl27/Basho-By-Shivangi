"use client";

/**
 * src/app/template.jsx
 *
 * Next.js App Router re-mounts this component on every navigation,
 * which gives us a free enter animation on every route change.
 *
 * Exit animations are handled via AnimatePresence at the layout level,
 * but since template.jsx is re-mounted per route, the `exit` variant
 * fires automatically when the component unmounts during navigation.
 *
 * Performance notes:
 *  - Only `opacity` and `transform: translateY` are animated.
 *  - Both are composited on the GPU — zero layout/paint cost.
 *  - `will-change` is NOT set explicitly; Framer Motion handles it
 *    internally and removes it after the animation completes.
 */

import React, { useState } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion";

// ─── Variants ────────────────────────────────────────────────────────────────

/**
 * Cinematic page transition:
 *  Enter  — fades in + drifts up 18px, eased with an expo-out curve.
 *  Exit   — fades out + drifts up a further 10px, eased with a fast
 *            ease-in so the outgoing page leaves quickly.
 *
 * Total visible motion budget: ~18px upward — subtle but intentional.
 */
const pageVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // Expo-out: starts very fast, decelerates to rest — cinematic "settle"
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      // Fast ease-in: page disappears quickly so the next one isn't held up
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// ─── Wrapper Component ───────────────────────────────────────────────────────

function PageTransitionWrapper({ children }) {
  const [isPresent] = usePresence();
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          setAnimationDone(true);
        }
      }}
      style={{
        willChange: isPresent && !animationDone ? "opacity, transform" : "opacity",
        transform: isPresent && animationDone ? "none" : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Template({ children }) {
  return (
    <>
      {/*
        AnimatePresence is required here so that the `exit` variant fires
        before the component unmounts on navigation.

        mode="wait"  → outgoing page finishes exiting before the incoming
                       page starts entering, preventing two pages being
                       visible simultaneously. Remove if you prefer instant
                       crossfades.
        initial={false} is intentionally NOT set here so the enter
                       animation always plays on first load too.
      */}
      <AnimatePresence mode="wait">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </AnimatePresence>
    </>
  );
}