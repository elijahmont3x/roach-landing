// --- START OF FILE components/ui/CockroachMascot.tsx ---
// Simplified Placeholder Implementation - Replace with actual SVG/Image
import React from 'react';
import { cn } from '@/lib/utils';
import { Bug } from 'lucide-react'; // Using Lucide Bug as a readily available placeholder

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

  // TODO: Replace 'Bug' icon with the actual Roach mascot SVG component or Image tag
  // Example replacement:
  // import RoachIcon from './RoachIcon.svg'; // Assuming RoachIcon.svg exists
  // <RoachIcon className={cn(sizeClasses[size], 'text-primary', className)} />

  return (
    <Bug className={cn(
        sizeClasses[size],
        'text-primary', // Default color, override with className if needed
        className
    )} />
  );
}
// --- END OF FILE components/ui/CockroachMascot.tsx ---