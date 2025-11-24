import React from 'react';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6924b66f55ba847b888b6f71/c890524c7_20251119_2228_FuturisticVEXAHUBLogo_simple_compose_01kafdzkwqejqaz3k2n175cdry1.png';

export default function VexaLogo({ size = 'default', showText = false, className = '' }: { size?: 'sm' | 'default' | 'lg' | 'xl' | 'full', showText?: boolean, className?: string }) {
  const sizes = {
    sm: 'w-8 h-8',
    default: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    full: 'w-32 h-auto'
  };

  if (showText) {
    return (
      <img 
        src={LOGO_URL} 
        alt="VEXA Hub" 
        className={`${sizes.full} object-contain ${className}`}
      />
    );
  }

  return (
    <img 
      src={LOGO_URL} 
      alt="VEXA Hub" 
      className={`${sizes[size]} object-contain ${className}`}
    />
  );
}

export { LOGO_URL };