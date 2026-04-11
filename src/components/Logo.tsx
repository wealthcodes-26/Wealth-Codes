import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Background Glow */}
    <circle cx="50" cy="50" r="45" fill="url(#logo-glow)" fillOpacity="0.1" />
    
    {/* Background Graph (Subtle) */}
    <g opacity="0.5">
      <rect x="15" y="65" width="8" height="20" rx="1" fill="#064e3b" />
      <rect x="30" y="55" width="8" height="30" rx="1" fill="#064e3b" />
      <rect x="45" y="60" width="8" height="25" rx="1" fill="#064e3b" />
      <rect x="60" y="45" width="8" height="40" rx="1" fill="#064e3b" />
      <rect x="75" y="35" width="8" height="50" rx="1" fill="#064e3b" />
    </g>
    
    {/* The 'W' Zigzag Line */}
    <path 
      d="M12 55 L25 70 L42 52 L62 85 L88 12" 
      stroke="#10b981" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="drop-shadow-sm"
    />
    
    {/* Arrow Head at the end of the 'W' */}
    <path 
      d="M75 19 L88 12 L83 25" 
      stroke="#10b981" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Decorative Tech/Code Accents */}
    <circle cx="12" cy="55" r="3" fill="#34d399" />
    <circle cx="25" cy="70" r="3" fill="#059669" />
    <circle cx="42" cy="52" r="3" fill="#34d399" />
    <circle cx="62" cy="85" r="3" fill="#059669" />
    <circle cx="88" cy="12" r="4" fill="#10b981" className="animate-pulse" />
    
    {/* Gradient Definition */}
    <defs>
      <radialGradient id="logo-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(45)">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
