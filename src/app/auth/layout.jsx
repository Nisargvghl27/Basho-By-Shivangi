import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Floating Back to Home Button */}
      <Link
        href="/"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 hover:text-[#EAE8E4] transition-all duration-300 ease-out group"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>
      {children}
    </div>
  );
}
