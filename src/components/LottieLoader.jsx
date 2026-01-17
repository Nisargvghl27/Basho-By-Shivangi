"use client";

import React from 'react';
import dynamic from 'next/dynamic';
// Import your JSON file
import loaderAnimation from '../assets/Loader.json';

// Dynamically import Lottie to prevent Server-Side Rendering (SSR) issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottieLoader({ className = "w-32 h-32", text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={className}>
        <Lottie 
          animationData={loaderAnimation} 
          loop={true} 
          autoplay={true}
        />
      </div>
      {text && <p className="mt-4 text-stone-500 font-medium animate-pulse">{text}</p>}
    </div>
  );
}