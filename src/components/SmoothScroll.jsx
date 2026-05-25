"use client";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 📱 Safely detect mobile screen size on client-side
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (isAdmin || isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.14, duration: 0.9, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}