import React from 'react';
import { cn } from '../../lib/utils';

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const NeonCard = React.forwardRef<HTMLDivElement, NeonCardProps>(({ 
  children, 
  className, 
  glow = false,
  hover = true,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "relative bg-[#0a0f0a]/80 backdrop-blur-xl rounded-2xl border border-[#00ff88]/20",
        hover && "hover:border-[#00ff88]/40 transition-all duration-300",
        glow && "shadow-[0_0_30px_rgba(0,255,136,0.1)]",
        hover && "hover:shadow-[0_0_40px_rgba(0,255,136,0.15)]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ff88]/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

NeonCard.displayName = "NeonCard";

export default NeonCard;