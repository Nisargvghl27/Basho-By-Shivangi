"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function MagneticButton({ children, href, onClick, className = "", ...props }) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Move element 20% of the distance (magnetic strength)
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const style = { transform: `translate(${position.x}px, ${position.y}px)` };

  // The inner element is the one that moves magnetically
  const content = (
    <span 
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`inline-flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer ${className}`}
    >
      {children}
    </span>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className="inline-block" {...props}>
        {content}
      </Link>
    );
  }

  // Otherwise render as Button (The 'onClick' and other props go here)
  return (
    <button onClick={onClick} className="inline-block" type="button" {...props}>
      {content}
    </button>
  );
}