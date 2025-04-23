// --- START OF FILE components/sections/03_TokenMechanics.tsx ---
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { tierData, Tier } from "@/lib/tier-data";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Users, Droplets, Megaphone, Timer, Play, Pause, Settings2, HelpCircle, Percent, RefreshCw, Info, Network, BarChartHorizontal, ExternalLink } from "lucide-react"; // Import more icons
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

// Constants and Helpers (Remain mostly the same, adjust timing)
const CYCLE_INTERVAL_MS = 5000; // Slower for user observation
const TRANSITION_DURATION_MS = 1000; // Slightly longer for smoothness

const mapConditionToRatio = (condition: string): number => {
    if (condition.includes('< 0.8')) return 0.6;
    if (condition.includes('0.8 - 1.2')) return 1.0;
    if (condition.includes('1.2 - 2.0')) return 1.6;
    if (condition.includes('2.0 - 3.0')) return 2.5;
    if (condition.includes('> 3.0')) return 3.5;
    return 1.0;
};

const mapRatioToProgress = (ratio: number): number => {
    // Slightly adjusted for better visual spacing
    if (ratio < 0.8) return 10;    // Tier 1 Zone Start
    if (ratio <= 1.2) return 30;   // Tier 2 Zone Start
    if (ratio <= 2.0) return 50;   // Tier 3 Zone Start
    if (ratio <= 3.0) return 70;   // Tier 4 Zone Start
    return 90;                    // Tier 5 Zone Start
};

const tierColorMap: { [key: number]: { name: string; text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string; darkIndicator?: string; } } = {
    1: { name: "Accumulation", text: 'text-blue-600', bg: 'bg-blue-500/5 dark:bg-blue-900/20', border: 'border-blue-500/20 dark:border-blue-700/30', indicator: 'bg-blue-500', darkText: 'dark:text-blue-400', darkIndicator: 'dark:bg-blue-400'},
    2: { name: "Equilibrium", text: 'text-gray-600', bg: 'bg-gray-500/5 dark:bg-gray-800/20', border: 'border-gray-500/20 dark:border-gray-700/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkIndicator: 'dark:bg-gray-400' },
    3: { name: "Pressure", text: 'text-yellow-600', bg: 'bg-yellow-500/5 dark:bg-yellow-800/20', border: 'border-yellow-500/20 dark:border-yellow-700/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkIndicator: 'dark:bg-yellow-400' },
    4: { name: "Defense", text: 'text-orange-600', bg: 'bg-orange-500/5 dark:bg-orange-800/20', border: 'border-orange-500/20 dark:border-orange-700/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkIndicator: 'dark:bg-orange-400' },
    5: { name: "Recovery", text: 'text-red-600', bg: 'bg-red-500/5 dark:bg-red-900/20', border: 'border-red-500/20 dark:border-red-700/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkIndicator: 'dark:bg-red-400' },
};


export function TokenMechanics() {
    const [activeTierIndex, setActiveTierIndex] = useState<number>(1);
    const [currentRatio, setCurrentRatio] = useState<number>(mapConditionToRatio(tierData[1].condition));
    const [isPlaying, setIsPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const activeTier: Tier = useMemo(() => tierData[activeTierIndex], [activeTierIndex]);
    const progressValue = useMemo(() => mapRatioToProgress(currentRatio), [currentRatio]);
    const currentTierColors = useMemo(() => tierColorMap[activeTier.id], [activeTier.id]);

    const cycleTier = useCallback(() => {
        setActiveTierIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % tierData.length;
            setCurrentRatio(mapConditionToRatio(tierData[nextIndex].condition));
            return nextIndex;
        });
    }, []);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(cycleTier, CYCLE_INTERVAL_MS);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, cycleTier]);

    const togglePlayPause = () => setIsPlaying(!isPlaying);

    const setManualTier = (index: number) => {
        setIsPlaying(false);
        setActiveTierIndex(index);
        setCurrentRatio(mapConditionToRatio(tierData[index].condition));
    };

    // Add the missing cardMotionProps definition
    const cardMotionProps = { 
        initial: { opacity: 0, y: 20 }, 
        whileInView: { opacity: 1, y: 0 }, 
        viewport: { once: true, amount: 0.1 }, 
        transition: { duration: 0.5 } 
    };
    
    // Simplified item variants for cleaner transitions
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.4, 
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            y: -20, 
            transition: { 
                duration: 0.3, 
                ease: "easeIn" 
            }
        }
    };

    // Enhance display variants to be more dramatic
    const displayVariants = {
        initial: { opacity: 0, x: 40, filter: 'blur(4px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: 40, filter: 'blur(4px)', transition: { duration: 0.4, ease: 'easeIn' } }
    };

    // Title badge variants
    const badgeVariants = {
        hidden: { opacity: 0, x: 20, scale: 0.9 },
        visible: { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            transition: { 
                duration: 0.8, 
                ease: [0.25, 1, 0.5, 1] 
            } 
        },
        exit: { 
            opacity: 0, 
            x: -20, 
            scale: 0.9,
            transition: { 
                duration: 0.6, 
                ease: "easeIn" 
            }
        }
    };

    // Animation variants - add these new variants for the cascading effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.15,  // Controls the delay between each child
                delayChildren: 0.2      // Initial delay before starting animations
            } 
        }
    };

    // Create allocation container variants with slightly slower stagger
    const allocationContainerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.1
            } 
        }
    };

    // Flowchart element variants
    const flowchartContainerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.1
            } 
        }
    };

    // Enhanced sequence container with reduced stagger time
    const sequenceContainerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.25, // Reduced from 0.4 to 0.25 for faster sequence
                delayChildren: 0.1     // Reduced from 0.2 to 0.1
            } 
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1 // Reverse stagger on exit
            }
        }
    };

    // Define the Mermaid flowchart markup based on the active tier
    const mermaidMarkup = useMemo(() => {
        // Get colors based on active tier
        const tierColor = tierColorMap[activeTier.id];
        const baseColor = tierColor.text.replace('text-', '').split(' ')[0];
        
        // Create dynamic chart with appropriate colors - using horizontal layout with better spacing
        return `
        flowchart LR
            start([Start]) --> market{"Sell/Buy<br/>Ratio"}
            market -->|"${activeTier.condition}"| tier["Tier ${activeTier.id}"]
            tier --> tax["Apply Taxes"]
            tax --> dist["${activeTier.distribution.sell.reflection}% Reflect"]
            dist --> cycle([4hr Cycle])
            cycle -.->|Re-eval| market
            
            classDef default fill:#f9f9f9,stroke:#ddd,color:#333;
            classDef current fill:#${baseColor === 'green' ? '4ade80' : baseColor === 'blue' ? '60a5fa' : baseColor === 'yellow' ? 'fcd34d' : baseColor === 'orange' ? 'fdba74' : baseColor === 'red' ? 'f87171' : 'e5e5e5'},stroke:#${baseColor === 'green' ? '22c55e' : baseColor === 'blue' ? '3b82f6' : baseColor === 'yellow' ? 'eab308' : baseColor === 'orange' ? 'f97316' : baseColor === 'red' ? 'ef4444' : 'a3a3a3'},color:#333;
            classDef highlight stroke-width:2px;
            classDef rounded rx:10,ry:10;
            
            class tier,tax,dist current;
            class market highlight;
            class start,cycle rounded;
        `;
    }, [activeTier]);

    // Add texture patterns for each tier background with higher fill opacity
    const tierPatterns = {
        1: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e6db9' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        2: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235a5a5a' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        3: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='0.15'%3E%3Cpath d='M0 0l10 10-10 10 10 10-10 10 10 10-10 10h60l-10-10 10-10-10-10 10-10-10-10 10-10H0zm19 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm22 26a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3C/g%3E%3C/svg%3E")`,
        4: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.15'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        5: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='%23ef4444' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    };

    return (
        <TooltipProvider>
            <Section
                id="mechanics"
                align="left" 
                className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 via-background to-background/70 dark:from-background/5 dark:via-background dark:to-background/50 overflow-x-clip"
                useSuspense
            >
                <SectionHeader
                    title="The $ROACH Engine: Adaptive 5-Tier System"
                    description="Observe how $ROACH dynamically adjusts transaction taxes and rewards based on real-time market pressure (Sell/Buy Volume Ratio). This active adaptation defines its antifragile nature."
                    subtitle={<><Settings2 className="inline h-4 w-4 mr-1.5" /> Adaptive Core Mechanics </>}
                    align="inherit"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 w-full mx-auto items-start">
                    {/* --- Interactive Visualizer Card (Span 7) --- */}
                    <motion.div {...cardMotionProps} className="lg:col-span-7 xl:col-span-8">
                        <Card className={cn(
                            "border shadow-md shadow-primary/5 h-full flex flex-col",
                             currentTierColors.border, // Dynamic border color based on tier
                             "transition-colors duration-500 ease-out", // Smooth border transition
                             "overflow-hidden"
                         )}>
                            <CardHeader className={cn("border-b", currentTierColors.border, "transition-colors duration-500 ease-out pb-4")}>
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                                    <div>
                                        <CardTitle className="text-xl md:text-2xl font-semibold">Dynamic System Visualizer</CardTitle>
                                        <CardDescription className="mt-1 text-sm flex items-center gap-1">
                                            Simulating response to Sell/Buy Ratio
                                             <Tooltip delayDuration={100}><TooltipTrigger className="ml-0.5 cursor-help"><Info className="h-3.5 w-3.5 text-muted-foreground/80" /></TooltipTrigger><TooltipContent side="right"><p className="max-w-[220px] text-xs">Ratio of sell volume vs buy volume over the last 4 hours. High ratio = high sell pressure.</p></TooltipContent></Tooltip>
                                         </CardDescription>
                                    </div>
                                     <div className="flex items-center gap-2 self-start sm:self-center">
                                        <span className="text-xs font-medium text-muted-foreground mr-1 hidden sm:inline">Sim:</span>
                                        <Button variant="outline" size="icon" onClick={togglePlayPause} className="h-8 w-8 shrink-0">
                                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                            <span className="sr-only">{isPlaying ? "Pause" : "Play"} Simulation</span>
                                        </Button>
                                    </div>
                                </div>
                                 {/* Progress Bar Section Refined */}
                                <div className="mt-3 space-y-1 relative">
                                    <div className="flex justify-between items-end mb-1.5 px-1">
                                         <label htmlFor="marketPressure" className="text-xs font-medium text-muted-foreground flex items-center gap-1">Pressure <BarChartHorizontal className="h-3 w-3"/>:</label>
                                        <Badge variant="secondary" className={cn("font-mono text-xs px-1.5 py-0.5 transition-colors border", currentTierColors.bg, currentTierColors.text, currentTierColors.border, currentTierColors.darkBorder)}>
                                             {currentRatio.toFixed(1)}x Ratio
                                         </Badge>
                                     </div>
                                     <div className="relative h-3.5 rounded-full bg-muted/50 dark:bg-muted/30 overflow-hidden border border-border/30">
                                         {/* Animated Progress Bar */}
                                        <motion.div
                                             className={cn("absolute top-0 left-0 h-full rounded-full", currentTierColors.indicator, currentTierColors.darkIndicator)}
                                             initial={{ width: '0%' }}
                                             animate={{ width: `${progressValue}%` }}
                                             transition={{ duration: TRANSITION_DURATION_MS / 1000, ease: [0.25, 1, 0.5, 1] }} // Smoother easing
                                         />
                                         {/* Tier Threshold Markers */}
                                         {[10, 30, 50, 70].map((val, idx) => ( // Values based on mapRatioToProgress
                                             <div key={`marker-${idx}`} className="absolute top-0 h-full w-px bg-border/50" style={{ left: `${val}%` }} />
                                         ))}
                                     </div>
                                     {/* Labels Below */}
                                    <div className="flex justify-between text-[9px] text-muted-foreground/80 pt-0.5 px-1">
                                        <span>Low Pressure</span>
                                        <span>Balanced</span>
                                        <span>Medium Pressure</span>
                                        <span>High Pressure</span>
                                        <span>Extreme Pressure</span>
                                     </div>
                                 </div>
                             </CardHeader>

                            <CardContent className="flex-grow flex flex-col overflow-hidden px-4 md:px-5 relative">
                                {/* Tier-specific texture background with reduced opacity and gradients at both top and bottom */}
                                <div 
                                    className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-30 transition-all duration-500"
                                    style={{ 
                                        backgroundImage: tierPatterns[activeTier.id],
                                        backgroundRepeat: 'repeat',
                                        backgroundSize: '250px auto',
                                        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                                    }}
                                />
                                
                                {/* Fade gradient overlay with tier color - adjusted to fade at both top and bottom */}
                                <div 
                                    className="absolute inset-0 pointer-events-none transition-all duration-500"
                                    style={{ 
                                        background: `linear-gradient(to bottom, 
                                            transparent 0%,
                                            rgba(var(--${currentTierColors.text.replace('text-', '').split(' ')[0]}-rgb), 0.08) 10%, 
                                            rgba(var(--${currentTierColors.text.replace('text-', '').split(' ')[0]}-rgb), 0.08) 70%, 
                                            rgba(var(--card), 0.95) 100%)`,
                                    }}
                                />

                                {/* Softer content shadow for better readability */}
                                <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-card/90 to-transparent z-0"></div>
                                <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-card/95 to-transparent z-0"></div>
                                
                                <div className="relative flex flex-col"> {/* Container adapts to content */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTier.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                key={activeTier.id} variants={displayVariants} initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="flex flex-col flex-grow"
                                            >
                                                {/* Tier Info & Mascot with staggered animation */}
                                                <motion.div 
                                                    className="flex flex-col sm:flex-row items-center gap-4 mb-5 text-center sm:text-left"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.div
                                                        key={`mascot-${activeTier.id}`} 
                                                        initial={{ rotate: -5, scale: 0.9, opacity: 0 }} 
                                                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                                        exit={{ rotate: 5, scale: 0.9, opacity: 0 }}
                                                        transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.1 }}
                                                    >
                                                        <CockroachMascot size="md" className={cn("transition-colors duration-300 flex-shrink-0 w-16 h-16", currentTierColors.text, currentTierColors.darkText)} />
                                                    </motion.div>
                                                    
                                                    <div className="flex-1">
                                                        {/* Animated badge */}
                                                        <AnimatePresence mode="wait">
                                                            <motion.div
                                                                key={`tier-badge-${activeTier.id}`}
                                                                variants={badgeVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >
                                                                <Badge variant="secondary" className={cn("text-base md:text-lg px-4 py-1 shadow font-semibold transition-colors duration-300 border", currentTierColors.bg, currentTierColors.text, currentTierColors.border, currentTierColors.darkBorder)}>
                                                                    Tier {activeTier.id}: {activeTier.name}
                                                                </Badge>
                                                            </motion.div>
                                                        </AnimatePresence>
                                                        
                                                        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                                                            Condition: Ratio <strong className={cn("transition-colors duration-300", currentTierColors.text, currentTierColors.darkText)}>{activeTier.condition.replace('Sell/Buy Ratio ', '')}</strong>
                                                        </p>
                                                        <p className="text-[11px] italic text-muted-foreground/80 mt-0.5">{activeTier.status}</p>
                                                    </div>
                                                </motion.div>

                                                {/* Main Sequence Container for the entire content flow */}
                                                <motion.div
                                                    variants={sequenceContainerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    viewport={{ once: true, amount: 0.1 }}
                                                    className="flex flex-col flex-grow"
                                                >
                                                    {/* Key Metrics Grid - First item in sequence */}
                                                    <motion.div 
                                                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-5"
                                                        variants={containerVariants}
                                                        viewport={{ once: true }}
                                                    >
                                                        {/* ...existing metric cards... */}
                                                        <motion.div variants={itemVariants}>
                                                            <MetricCard 
                                                                label="Buy Tax" 
                                                                value={`${activeTier.taxes.buy}%`} 
                                                                delta={activeTier.taxes.buy - tierData[1].taxes.buy} 
                                                                icon={TrendingUp} 
                                                                iconColor="text-green-600 dark:text-green-400" 
                                                                tooltip={`Lower tax encourages buying (${tierData.length-1}, ${tierData.length}).`} 
                                                                activeTier={activeTier.id}
                                                            />
                                                        </motion.div>
                                                        <motion.div variants={itemVariants}>
                                                            <MetricCard 
                                                                label="Sell Tax" 
                                                                value={`${activeTier.taxes.sell}%`} 
                                                                delta={activeTier.taxes.sell - tierData[1].taxes.sell} 
                                                                icon={TrendingDown} 
                                                                iconColor="text-red-600 dark:text-red-400" 
                                                                tooltip="Higher tax deters selling, funds rewards." 
                                                                activeTier={activeTier.id}
                                                            />
                                                        </motion.div>
                                                        <motion.div variants={itemVariants}>
                                                            <MetricCard 
                                                                label="Holder Rewards (Sell Reflect)" 
                                                                value={`${activeTier.distribution.sell.reflection}%`} 
                                                                delta={activeTier.distribution.sell.reflection - tierData[1].distribution.sell.reflection} 
                                                                icon={Users} 
                                                                iconColor={cn("text-primary", currentTierColors.text, currentTierColors.darkText)} 
                                                                tooltip="Share of SELL tax automatically redistributed. Max in high pressure." 
                                                                activeTier={activeTier.id}
                                                            />
                                                        </motion.div>
                                                    </motion.div>

                                                    {/* Tax Allocation Breakdown - Second item in sequence */}
                                                    <motion.div 
                                                        variants={itemVariants}
                                                        viewport={{ once: true }}
                                                        className={cn("border rounded-lg p-3 text-xs space-y-3 transition-colors duration-300 shadow-sm relative overflow-hidden", 
                                                            currentTierColors.border, currentTierColors.bg, currentTierColors.darkBorder, "dark:shadow-md dark:shadow-black/20")}
                                                    >
                                                        <div className={cn("absolute inset-0 opacity-[0.03] bg-gradient-to-br", currentTierColors.indicator, 'to-transparent')} /> {/* Subtle BG element */}
                                                        <h4 className="font-semibold text-center text-[11px] uppercase tracking-wider text-foreground/90 mb-2">Tax Allocation: Tier {activeTier.id}</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative z-10">
                                                            {/* Buy Allocation */}
                                                            <div className="space-y-1 pr-2">
                                                                <p className="font-medium text-green-700 dark:text-green-400 border-b border-green-500/15 pb-1 mb-1.5 text-[11px]">Buy Allocation ({activeTier.taxes.buy}%)</p>
                                                                <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.buy.reflection} tooltip="Share of buy tax to holders." color={cn("text-primary", currentTierColors.text, currentTierColors.darkText)} />
                                                                <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.buy.liquidity} tooltip="Added to DEX liquidity." color="text-blue-600 dark:text-blue-400" />
                                                                <DistributionItem icon={Megaphone} label="Ecosystem Fund" value={activeTier.distribution.buy.marketing} tooltip="For marketing & development." color="text-orange-600 dark:text-orange-400" />
                                                            </div>
                                                            {/* Sell Allocation */}
                                                            <div className="space-y-1 md:border-l md:border-border/30 md:dark:border-border/20 md:pl-4">
                                                                <p className="font-medium text-red-700 dark:text-red-400 border-b border-red-500/15 pb-1 mb-1.5 text-[11px]">Sell Allocation ({activeTier.taxes.sell}%)</p>
                                                                <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.sell.reflection} tooltip="Share of sell tax to holders (core reward)." color={cn("text-primary", currentTierColors.text, currentTierColors.darkText)} isPrimary={true} />
                                                                <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.sell.liquidity} tooltip="Added to DEX liquidity." color="text-blue-600 dark:text-blue-400" />
                                                                <DistributionItem icon={Megaphone} label="Ecosystem Fund" value={activeTier.distribution.sell.marketing} tooltip="For marketing & development." color="text-orange-600 dark:text-orange-400" />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </CardContent>
                         </Card>
                     </motion.div>

                    {/* --- Static Tier Reference Table Card (Span 5/4) --- */}
                    <motion.div {...cardMotionProps} transition={{ delay: 0.1 }} className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
                        <Card className="max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col border shadow-md shadow-primary/5 gap-0">
                            <CardHeader className="flex-shrink-0 border-b pb-3 px-4">
                                <CardTitle className="text-lg font-semibold">Tier Reference Guide</CardTitle>
                                <CardDescription className="text-xs">Tax & reflection levels. Click row to focus visualizer.</CardDescription>
                             </CardHeader>
                             <CardContent className="px-0 py- flex flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                                <Table className="text-xs">
                                    <TableHeader className="sticky top-0 bg-card z-10 shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                                         <TableRow className="text-[10px] uppercase tracking-wider h-9">
                                             <TableHead className="w-[10%] text-center px-1 font-bold sticky left-0 bg-card z-20">Tier</TableHead>
                                            <TableHead className="w-[30%] text-left px-2">S/B Ratio</TableHead>
                                            <TableHead className="w-[15%] text-center text-green-600 px-1">Buy Tax</TableHead>
                                             <TableHead className="w-[15%] text-center text-red-600 px-1">Sell Tax</TableHead>
                                             <TableHead className="w-[30%] text-center text-primary px-1">Sell Reflection</TableHead>
                                         </TableRow>
                                    </TableHeader>
                                     <TableBody>
                                        {tierData.map((tier, index) => {
                                            const colors = tierColorMap[tier.id];
                                            const isActive = index === activeTierIndex;
                                            return (
                                                 <TableRow
                                                    key={tier.id}
                                                    onClick={() => setManualTier(index)}
                                                     className={cn(
                                                         "cursor-pointer h-11 transition-all duration-200 ease-in-out",
                                                         "hover:bg-muted/40 dark:hover:bg-muted/20",
                                                         isActive && `bg-primary/5 dark:bg-primary/15 ${colors.border.replace('border-', 'border-l-4')}`, // Enhanced active row highlight
                                                         !isActive && "opacity-85 hover:opacity-100"
                                                     )}
                                                    aria-current={isActive ? 'step' : undefined}
                                                >
                                                    <TableCell className={cn("font-bold text-center py-1 px-1 sticky left-0 z-20", isActive ? 'bg-primary/5 dark:bg-primary/15' : 'bg-card', colors.text, colors.darkText)}>{tier.id}</TableCell>
                                                    <TableCell className="py-1 px-2 text-left font-mono text-[11px] text-muted-foreground">{tier.condition.replace('Sell/Buy Ratio ', '')}</TableCell>
                                                    <TableCell className="py-1 px-1 text-center text-green-700 dark:text-green-400 font-semibold">{tier.taxes.buy}%</TableCell>
                                                    <TableCell className="py-1 px-1 text-center text-red-700 dark:text-red-400 font-semibold">{tier.taxes.sell}%</TableCell>
                                                    <TableCell className={cn("py-1 px-1 text-center font-semibold", colors.text, colors.darkText)}>{tier.distribution.sell.reflection}%</TableCell>
                                                 </TableRow>
                                            );
                                        })}
                                     </TableBody>
                                </Table>
                             </CardContent>
                             <div className="pt-4 -mb-2 border-t text-center flex-shrink-0">
                                <p className="text-[10px] text-muted-foreground/80 italic flex items-center justify-center gap-1">
                                    <Timer className="h-3 w-3" /> <strong>Tier evaluation & adaptation occurs every 4 hours.</strong>
                                </p>
                             </div>
                         </Card>
                    </motion.div>
                </div>
            </Section>
        </TooltipProvider>
    );
}


// --- Sub-Components Refined ---

interface MetricCardProps { label: string; value: string; delta: number; icon: React.ElementType; iconColor: string; tooltip: string; activeTier: number; }
function MetricCard({ label, value, delta, icon: Icon, iconColor, tooltip, activeTier }: MetricCardProps) {
    const deltaSign = delta > 0 ? '+' : ''; // delta < 0 is already handled by default negative sign
    const deltaColor = delta > 0 ? 'text-red-600 dark:text-red-400' : delta < 0 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground/70';
    // Refine delta text for clarity, show +/- only if not zero
    const deltaText = delta !== 0 ? `${deltaSign}${delta.toFixed(1)}%` : '±0.0%';

    // Get the color class from the active tier
    const activeTierColor = tierData.find(t => t.id === activeTier)?.colorClass || 'blue';
  
    // Map tier color classes to Tailwind border classes
    const tierColorMap = {
        'blue': 'border-blue-400/50 dark:border-blue-500/50',
        'gray': 'border-gray-400/50 dark:border-gray-500/50',
        'yellow': 'border-yellow-400/50 dark:border-yellow-500/50',
        'orange': 'border-orange-400/50 dark:border-orange-500/50',
        'red': 'border-red-400/50 dark:border-red-500/50',
    };

    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
                 <Card className={cn(
                    "p-0 text-left w-full h-full cursor-help transition-all duration-200 border border-border/15 hover:border-border/30 dark:bg-card/60 hover:shadow-sm dark:hover:shadow-md dark:shadow-black/10",
                    // Apply the active tier's color to the border
                    `${tierColorMap[activeTierColor]}/50` || 'border-primary/50',
                 )}>
                    <CardContent className="pt-3 pb-3 px-3"> {/* Reduced padding */}
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                                <Icon className={cn("h-3.5 w-3.5", iconColor)} /> {label}
                            </span>
                            <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                         </div>
                         <div className="flex items-baseline justify-between gap-2 mt-0.5">
                            <p className="text-xl font-bold text-foreground">{value}</p>
                             <p className={cn("text-[11px] font-semibold font-mono", deltaColor)}>{deltaText}</p>
                         </div>
                    </CardContent>
                 </Card>
            </TooltipTrigger>
             <TooltipContent side="top" align="center" className="max-w-[190px]"><p className="text-xs">{tooltip}</p></TooltipContent>
         </Tooltip>
    );
}

interface DistributionItemProps { icon: React.ElementType; label: string; value: number; tooltip: string; color: string; isPrimary?: boolean; }
function DistributionItem({ icon: Icon, label, value, tooltip, color, isPrimary = false }: DistributionItemProps) {
    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger className="w-full text-left cursor-help group">
                 <div className={cn("flex items-center justify-between text-xs py-0.5 rounded transition-colors px-1", isPrimary && "font-semibold")}>
                    <span className={cn("flex items-center gap-1 text-muted-foreground transition-colors", isPrimary ? "group-hover:text-foreground/90" : "group-hover:text-foreground/80")}>
                         <Icon className={cn("h-3 w-3 shrink-0 group-hover:scale-110 transition-transform", color)} /> {label}
                    </span>
                    <span className={cn("font-medium text-foreground/80 group-hover:text-foreground transition-colors", isPrimary && "text-foreground/95")}>{value.toFixed(1)}%</span>
                 </div>
             </TooltipTrigger>
            <TooltipContent side="left" align="start" className="max-w-[180px]"><p className="text-xs">{tooltip}</p></TooltipContent>
        </Tooltip>
    );
}
// --- END OF FILE components/sections/03_TokenMechanics.tsx ---