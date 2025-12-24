// import { Manrope, Playfair_Display } from "next/font/google";
// import "./globals.css";

// const manrope = Manrope({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600"],
//   variable: "--font-manrope",
// });

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal", "italic"],
//   variable: "--font-playfair",
// });

// export const metadata = {
//   title: "Clay & Soul - Handcrafted Pottery",
//   description: "Handcrafted pottery for the mindful home. Embracing the soulful asymmetry of wabi-sabi.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="dark">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className={`${manrope.variable} ${playfair.variable} font-sans bg-charcoal text-rice-paper selection:bg-clay selection:text-white transition-colors duration-500 overflow-x-hidden`}>
//         {children}
//       </body>
//     </html>
//   );
// }

"use client";

import { Manrope, Playfair_Display } from "next/font/google";
import { useState, useEffect } from "react";
import "./globals.css";

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

function CursorGlow({ children }) {
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

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            background:
              "radial-gradient(circle, rgba(210,180,140,0.06) 0%, rgba(210,180,140,0.03) 30%, transparent 60%)",
            filter: "blur(25px)",
            transition: "left 0.1s ease-out, top 0.1s ease-out",
          }}
        />
        
        {/* Core bright spot */}
        <div
          className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            background:
              "radial-gradient(circle, rgba(210,180,140,0.08) 0%, rgba(210,180,140,0.04) 40%, transparent 70%)",
            filter: "blur(12px)",
            transition: "left 0.08s ease-out, top 0.08s ease-out",
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <title>Clay & Soul - Handcrafted Pottery</title>
        <meta
          name="description"
          content="Handcrafted pottery for the mindful home. Embracing the soulful asymmetry of wabi-sabi."
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans bg-charcoal text-rice-paper selection:bg-clay selection:text-white transition-colors duration-500 overflow-x-hidden`}
      >
        <CursorGlow>{children}</CursorGlow>
      </body>
    </html>
  );
}