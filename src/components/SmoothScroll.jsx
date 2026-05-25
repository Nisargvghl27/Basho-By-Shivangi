"use client";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.14, duration: 0.9, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}