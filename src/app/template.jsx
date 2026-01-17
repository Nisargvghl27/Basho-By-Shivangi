"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// ============================================================
// 1. CONFIGURATION & PHYSICS
// ============================================================

// "Basho" Easing: Heavy entrance, smooth settling
const CURVE_EASE = [0.76, 0, 0.24, 1]; 

const COLORS = {
  charcoal: "#1a1a1a", // Deep Kiln Black
  clay: "#A67C58",     // Earthy Terracotta
  ricePaper: "#FDFBF7" // Soft White text
};

const ROUTES = {
  "/": "Basho Studio",
  "/shop": "The Collection",
  "/workshops": "Workshops",
  "/journal": "Journal",
  "/about": "Our Story",
  "/cart": "Your Cart",
  "/checkout": "Checkout",
  "/auth": "Account",
  "/profile": "My Profile"
};

const getPageTitle = (path) => {
  if (!path) return "Basho";
  if (ROUTES[path]) return ROUTES[path];
  const key = Object.keys(ROUTES).find(key => key !== "/" && path.startsWith(key));
  return key ? ROUTES[key] : "Basho";
};

// ============================================================
// 2. MAIN COMPONENT
// ============================================================

export default function Template({ children }) {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTitle(getPageTitle(pathname));

    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [pathname]);

  // ============================================================
  // 3. ANIMATION VARIANTS
  // ============================================================

  // CONTENT: Slides UP from the bottom (Entering)
  // "Old page slides down" effect is simulated by the new page covering it.
  const contentVariants = {
    initial: { y: "100vh" },
    animate: { 
      y: 0, 
      transition: { 
        duration: 0.9, 
        ease: CURVE_EASE,
        delay: 0.2 // Wait for curtain to start
      } 
    },
    exit: { 
      y: "100vh", 
      transition: { duration: 0.9, ease: CURVE_EASE } 
    }
  };

  // CURTAIN (Decorative Background Layer): 
  // Adds depth behind the content
  const curtainVariants = {
    initial: { d: `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width/2} ${dimensions.height + 300} 0 ${dimensions.height} L0 0` },
    animate: { 
      d: `M0 0 L${dimensions.width} 0 L${dimensions.width} 0 Q${dimensions.width/2} 0 0 0 L0 0`,
      transition: { duration: 0.9, ease: CURVE_EASE } 
    }
  };

  // TEXT: Staggered Blur Reveal
  const textContainer = {
    initial: { opacity: 1 },
    animate: { opacity: 0, transition: { delay: 0.6, duration: 0.4 } }
  };

  const textLetter = {
    initial: { y: 40, opacity: 0, filter: "blur(10px)" },
    animate: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  if (!isClient) return <div className="min-h-screen bg-[#1a1a1a]">{children}</div>;

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] overflow-hidden">
      
      {/* --- 1. TITLE OVERLAY (Fades out) --- */}
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        variants={textContainer}
        initial="initial"
        animate="animate"
      >
        <div className="overflow-hidden flex gap-2 md:gap-4">
          {title.split(" ").map((word, i) => (
            <div key={i} className="flex">
              {word.split("").map((char, j) => (
                <motion.span
                  key={j}
                  variants={textLetter}
                  className="text-6xl md:text-9xl font-serif italic text-[#FDFBF7]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- 2. LIQUID CURTAIN (The "Clay" Slide) --- */}
      <motion.svg 
        className="fixed inset-0 z-40 w-full h-full pointer-events-none"
        style={{ fill: COLORS.clay }}
      >
        <motion.path 
          variants={curtainVariants} 
          initial="initial" 
          animate="animate" 
        />
      </motion.svg>

      {/* --- 3. PAGE CONTENT (Slides Up) --- */}
      <motion.div
        className="relative z-30 min-h-screen bg-[#1a1a1a] origin-top"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
         {/* --- GRAIN TEXTURE (Inside Content) --- */}
        <div className="fixed inset-0 opacity-15 pointer-events-none z-[60] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        
        {children}
      </motion.div>
    </div>
  );
}