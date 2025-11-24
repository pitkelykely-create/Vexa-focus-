import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function GlowButton({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'default',
  className,
  ...props 
}: GlowButtonProps) {
  const baseStyles = "relative font-medium rounded-lg transition-all duration-300 overflow-hidden group inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#00ff88] text-black hover:bg-[#00ff88]/90 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]",
    secondary: "bg-transparent border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]",
    ghost: "bg-white/5 text-white hover:bg-white/10 hover:text-[#00ff88]"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/0 via-white/20 to-[#00ff88]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </>
  );

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={combinedClassName} {...props}>
      {buttonContent}
    </button>
  );
}