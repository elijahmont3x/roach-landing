// --- START OF FILE components/internal/particle-layer.tsx ---
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ParticleData } from "./theme-toggle-button";

// Persistent Particle Component (Mostly Unchanged Internally)
const PersistentParticle = React.memo(({ id, x, y, rotate, scale, z }: ParticleData) => {
    const { resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => setIsMounted(true), []);
    const initialDelay = React.useMemo(() => Math.random() * 0.6, []); // Slightly longer random delay

    if (!isMounted) return null;

    const isVisible = resolvedTheme === 'light';

    return (
        <motion.div
            key={id} // Ensure key is present for list updates
            className={cn(
                "absolute w-[4px] h-[7px] rounded-[1.5px] origin-center", // Sharper corners
                "transition-opacity duration-500 ease-out", // Slower fade transition
                 isVisible ? "bg-[#7f613d]/65 dark:bg-[#6a5032]/70 shadow-[1px_1px_1.5px_rgba(0,0,0,0.15)]" : "opacity-0 pointer-events-none", // Adjusted visible style
                 "pointer-events-none" // Already set
            )}
            style={{
                // Using percentages relative to the ParticleLayer container
                left: `${x}%`,
                top: `${y}%`,
                transform: `translateZ(${z}px) rotate(${rotate}deg) scale(${scale})`,
                 willChange: 'opacity, transform'
            }}
            initial={{ opacity: 0, scale: 0.1 * scale }}
             // Only animate visibility based on theme
            animate={{ opacity: isVisible ? 1 : 0, scale: scale }}
            transition={{ duration: 0.7, ease: "easeOut", delay: initialDelay }} // Longer animation duration
            aria-hidden="true"
        />
    );
});
PersistentParticle.displayName = 'PersistentParticle';

// Particle Layer Container - CHANGE: Position Absolute
interface ParticleLayerProps {
    particles: ParticleData[];
}

export const ParticleLayer = React.memo(({ particles }: ParticleLayerProps) => {
    return (
        <div
            className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" // Lower z-index, absolute positioning
            style={{ perspective: '1000px' }} // Keeps perspective for child particles
            aria-hidden="true"
        >
            {/* Particles are positioned relative to this layer using percentages */}
            {particles.map(p => (
                <PersistentParticle key={p.id} {...p} />
            ))}
        </div>
    );
});
ParticleLayer.displayName = 'ParticleLayer';
// --- END OF FILE components/internal/particle-layer.tsx ---