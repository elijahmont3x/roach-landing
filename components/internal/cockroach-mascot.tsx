// --- START OF FILE components/ui/CockroachMascot.tsx ---
// Simplified Placeholder Implementation - Replace with actual SVG/Image
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CockroachMascotProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  // state?: 'normal' | 'glowing' | 'shielded'; // Example states for future enhancement
}

export function CockroachMascot({ size = 'md', className }: CockroachMascotProps) {
  const sizeClasses = {
    xs: 'h-5 w-5',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-18 w-18',
    xl: 'h-24 w-24',
  };

  return (
    <div 
      className={cn(
        sizeClasses[size],
        'relative flex-shrink-0',
        'shadow-md transition-all duration-300',
        'rounded-full',
        'border-2 border-solid border-border/70', // Removed hover:border-border/100
        'bg-background',
        'roach-mascot', // Custom class for targeting
        className
      )}
    >
      {/* Default image - CSS handles visibility */}
      <Image
        src="roach-landing/logo.png"
        alt="Roach Mascot"
        fill
        quality={100}
        unoptimized={true}
        sizes={`(max-width: 768px) ${parseInt(sizeClasses[size].split('-')[1])}px, ${parseInt(sizeClasses[size].split('-')[1])}px`}
        className="object-contain !scale-116"
        priority={true}
      />
      
      {/* Wink image - CSS handles visibility */}
      <Image
        src="roach-landing/logo-wink.png"
        alt="Roach Mascot Wink"
        fill
        quality={100}
        unoptimized={true}
        sizes={`(max-width: 768px) ${parseInt(sizeClasses[size].split('-')[1])}px, ${parseInt(sizeClasses[size].split('-')[1])}px`}
        className="object-contain !scale-116 absolute inset-0 opacity-0"
        priority={true}
      />
    </div>
  );
}
// --- END OF FILE components/ui/CockroachMascot.tsx ---