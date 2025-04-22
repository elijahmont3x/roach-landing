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
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28',
  };

  return (
    <div className={cn(
      sizeClasses[size],
      'relative flex-shrink-0',
      // 'shadow-md rounded-full', 
      // 'border border-border', 
      // 'bg-background', // Added theme-aware border
      className
    )}>
      <Image
        src="/logo.png"
        alt="Roach Mascot"
        fill
        quality={100} // Ensures highest quality, no compression
        unoptimized={true} // Bypasses Next.js image optimization completely
        sizes={`(max-width: 768px) ${parseInt(sizeClasses[size].split('-')[1])}px, ${parseInt(sizeClasses[size].split('-')[1])}px`}
        className="object-contain"
        priority={size === 'lg' || size === 'xl'}
      />
    </div>
  );
}

// --- END OF FILE components/ui/CockroachMascot.tsx ---