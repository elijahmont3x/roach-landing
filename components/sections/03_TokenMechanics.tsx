// TokenMechanics.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { tierData, Tier } from "@/lib/tier-data";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Users, Droplets, Megaphone, Timer, Play, Pause, Settings2, HelpCircle, Percent, RefreshCw, Info, Network, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

// --- Constants and Helpers ---
const CYCLE_INTERVAL_MS = 4000; // Animation cycle for demo
const TRANSITION_DURATION_MS = 800; // Transition smoothness

// Calculate ratio for visualization - map tier condition to a percentage
const mapConditionToRatio = (condition: string): number => {
    if (condition.includes('< 0.8')) return 0.6;
    if (condition.includes('0.8 - 1.2')) return 1.0;
    if (condition.includes('1.2 - 2.0')) return 1.6;
    if (condition.includes('2.0 - 3.0')) return 2.5;
    if (condition.includes('> 3.0')) return 3.5;
    return 1.0; // Default for Equilibrium
};

// Map ratio to progress bar value (0-100 scale)
const mapRatioToProgress = (ratio: number): number => {
    if (ratio < 0.8) return 15;    // Tier 1 Area
    if (ratio <= 1.2) return 35;   // Tier 2 Area
    if (ratio <= 2.0) return 55;   // Tier 3 Area
    if (ratio <= 3.0) return 75;   // Tier 4 Area
    return 90;                     // Tier 5 Area
};

// Color mapping for tiers (for visual consistency)
const tierColorMap: { [key: number]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string } } = {
    1: { text: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30', indicator: 'bg-blue-500', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-500/20', darkBorder: 'dark:border-blue-500/40' },
    2: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    3: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    4: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    5: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

// ------------------------------------------

export function TokenMechanics() {
    const [activeTierIndex, setActiveTierIndex] = useState<number>(1); // Start at Equilibrium
    const [currentRatio, setCurrentRatio] = useState<number>(mapConditionToRatio(tierData[1].condition));
    const [isPlaying, setIsPlaying] = useState(true);
    const [showTaxDetails, setShowTaxDetails] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const activeTier: Tier = useMemo(() => tierData[activeTierIndex], [activeTierIndex]);
    const progressValue = useMemo(() => mapRatioToProgress(currentRatio), [currentRatio]);
    const currentTierColors = useMemo(() => tierColorMap[activeTier.id], [activeTier]);

    // Simulation Cycle Logic
    const cycleTier = useCallback(() => {
        setActiveTierIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % tierData.length;
            setCurrentRatio(mapConditionToRatio(tierData[nextIndex].condition));
            return nextIndex;
        });
    }, []);

    // Manage simulation playback
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(cycleTier, CYCLE_INTERVAL_MS);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, cycleTier]);

    const togglePlayPause = () => setIsPlaying(!isPlaying);

    // Allow manual tier selection (stops simulation)
    const setManualTier = (index: number) => {
        setIsPlaying(false);
        setActiveTierIndex(index);
        setCurrentRatio(mapConditionToRatio(tierData[index].condition));
    };

    // Animation variant for content transitions
    const displayVariants = {
        initial: { opacity: 0.6, x: 15, filter: 'blur(2px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0.6, x: -15, filter: 'blur(2px)', transition: { duration: 0.3, ease: 'easeIn' } }
    };

    return (
        <TooltipProvider>
            <Section id="mechanics" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-background/70 dark:from-background/10 dark:via-background dark:to-background/50">
                <SectionHeader
                    title="The $ROACH Engine: Adaptive 5-Tier System"
                    description="Observe how $ROACH dynamically adjusts transaction taxes and rewards based on real-time market conditions (Sell/Buy Volume Ratio). This active adaptation forms its antifragile core."
                    subtitle={<><Settings2 className="inline h-4 w-4 mr-1.5" /> Core Mechanics </>}
                    alignment="center" className="mb-16"
                />

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 max-w-7xl mx-auto items-start">
                    {/* --- Interactive Tier Visualizer Card (Span 5 columns) --- */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border border-border/10 dark:border-border/20 h-full flex flex-col overflow-hidden">
                            <CardHeader className="border-b border-border/10 dark:border-border/20">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                    <div>
                                        <CardTitle className="text-xl md:text-2xl font-semibold">Dynamic System Visualizer</CardTitle>
                                        <CardDescription className="mt-1 text-sm flex items-center">
                                            Simulating response to market Sell / Buy Ratio
                                            <Tooltip delayDuration={100}>
                                                <TooltipTrigger className="ml-1.5 cursor-help"><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-[250px] text-xs">
                                                        The system continuously monitors the ratio of sell volume to buy volume over a 4-hour window.
                                                        When this ratio changes, the system automatically shifts between tiers to optimize tokenomics.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 self-start sm:self-center">
                                        <span className="text-xs font-medium text-muted-foreground mr-1 hidden sm:inline">Simulation:</span>
                                        <Button variant="outline" size="icon" onClick={togglePlayPause} className="h-8 w-8 shrink-0">
                                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                            <span className="sr-only">{isPlaying ? "Pause" : "Play"} Simulation</span>
                                        </Button>
                                    </div>
                                </div>
                                {/* Progress Bar Section */}
                                <div className="mt-6 space-y-2 relative">
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="marketPressure" className="text-xs font-medium text-muted-foreground">Market Pressure (Sell/Buy Ratio)</label>
                                        <Badge variant="secondary" className={cn("font-mono text-xs px-1.5 py-0.5 transition-colors", currentTierColors.bg, currentTierColors.text, currentTierColors.border)}>
                                            {currentRatio.toFixed(1)}x
                                        </Badge>
                                    </div>
                                    <div className="relative h-3">
                                        <Progress
                                            id="marketPressure"
                                            value={progressValue}
                                            className={cn(
                                                "h-3 absolute inset-0 transition-all ease-out",
                                                `[&>div]:${currentTierColors.indicator}`
                                            )}
                                            style={{ transitionDuration: `${TRANSITION_DURATION_MS}ms` }}
                                        />
                                        {/* Active Tier Bubble Indicator */}
                                        <motion.div
                                            key={`bubble-${activeTier.id}`}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }}
                                            className={cn(
                                                "absolute bottom-[calc(100%+6px)] z-10 transition-all ease-out transform -translate-x-1/2",
                                                "px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap leading-none shadow-md",
                                                "flex items-center gap-1",
                                                currentTierColors.bg, currentTierColors.text, currentTierColors.border
                                            )}
                                            style={{ left: `${progressValue}%`, transitionDuration: `${TRANSITION_DURATION_MS}ms` }}
                                        >
                                            Tier {activeTier.id}: {activeTier.name}
                                            <HelpCircle className="h-3 w-3 opacity-70 cursor-help" onClick={(e) => { e.stopPropagation(); setManualTier(activeTier.id - 1); }} />
                                        </motion.div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted-foreground/80 pt-0.5 px-0.5">
                                        <span>Accumulation</span>
                                        <span>Equilibrium</span>
                                        <span>Pressure</span>
                                        <span>Defense</span>
                                        <span>Recovery</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-grow flex flex-col overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTier.id} // Key drives the animation change
                                        variants={displayVariants} initial="initial" animate="animate" exit="exit"
                                        className="flex flex-col flex-grow"
                                    >
                                        {/* --- Top: Mascot & Tier Info --- */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
                                            <motion.div
                                                key={`mascot-${activeTier.id}`}
                                                initial={{ scale: 0.9, opacity: 0.8 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
                                            >
                                                <CockroachMascot size="md" className={cn("transition-colors duration-300 flex-shrink-0", currentTierColors.text)} />
                                            </motion.div>
                                            <div className="flex-1">
                                                <Badge variant="secondary" className={cn("text-base md:text-lg px-4 py-1 shadow-md font-semibold transition-colors duration-300", currentTierColors.bg, currentTierColors.text, currentTierColors.border, currentTierColors.darkBorder)}>
                                                    Tier {activeTier.id}: {activeTier.name}
                                                </Badge>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Triggered when Sell/Buy Ratio is <strong className={cn("transition-colors duration-300", currentTierColors.text)}>{activeTier.condition.replace('Sell/Buy Ratio ', '')}</strong>
                                                </p>
                                                <p className="text-xs italic text-muted-foreground/80 mt-1">{activeTier.status}</p>
                                            </div>
                                        </div>

                                        {/* --- Middle: Key Metrics Grid --- */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                                            <MetricCard label="Buy Tax" value={`${activeTier.taxes.buy}%`} delta={activeTier.taxes.buy - tierData[1].taxes.buy} icon={TrendingUp} iconColor="text-green-600 dark:text-green-400" tooltip={`Tax paid on buy transactions. Lower tax encourages buying during high sell pressure (Tiers ${tierData.length - 1}, ${tierData.length}).`} />
                                            <MetricCard label="Sell Tax" value={`${activeTier.taxes.sell}%`} delta={activeTier.taxes.sell - tierData[1].taxes.sell} icon={TrendingDown} iconColor="text-red-600 dark:text-red-400" tooltip={`Tax paid on sell transactions. Higher tax discourages selling during downturns and funds reflections.`} />
                                            <MetricCard label="Sell Reflections" value={`${activeTier.distribution.sell.reflection}%`} delta={activeTier.distribution.sell.reflection - tierData[1].distribution.sell.reflection} icon={Users} iconColor="text-primary" tooltip={`Percentage of the SELL tax automatically redistributed to all $ROACH holders. Maximized in high-pressure tiers.`} />
                                        </div>
                                        
                                        {/* --- Interactive Tax Distribution Section --- */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-semibold text-sm">Tax Distribution & Allocation</h4>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => setShowTaxDetails(!showTaxDetails)}
                                                    className="text-xs h-7 px-2"
                                                >
                                                    {showTaxDetails ? "Hide Details" : "Show Details"}
                                                    <ArrowRight className={cn(
                                                        "ml-1 h-3.5 w-3.5 transition-transform duration-200",
                                                        showTaxDetails ? "rotate-90" : ""
                                                    )} />
                                                </Button>
                                            </div>
                                            
                                            {/* Basic Tax Flow Visualization */}
                                            <div className="bg-muted/20 rounded-lg p-4 relative overflow-hidden">
                                                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-12 relative z-10">
                                                    {/* Buy Side */}
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <Badge variant="outline" className="mb-2 px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">Buy Tax: {activeTier.taxes.buy}%</Badge>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                                                                <span>Reflections: {activeTier.distribution.buy.reflection}%</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 rounded-full bg-blue-500/80"></div>
                                                                <span>Liquidity: {activeTier.distribution.buy.liquidity}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Sell Side */}
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <Badge variant="outline" className="mb-2 px-2 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">Sell Tax: {activeTier.taxes.sell}%</Badge>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                                                                <span>Reflections: {activeTier.distribution.sell.reflection}%</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 rounded-full bg-blue-500/80"></div>
                                                                <span>Liquidity: {activeTier.distribution.sell.liquidity}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Animated Flow Lines */}
                                                <div className="absolute inset-0 z-0 opacity-20">
                                                    <div className={cn(
                                                        "absolute left-[40%] right-[40%] top-[60%] h-px bg-gradient-to-r from-transparent via-primary to-transparent",
                                                        "before:absolute before:left-0 before:right-0 before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:animate-flow"
                                                    )}></div>
                                                </div>
                                            </div>
                                            
                                            {/* Detailed Tax Allocation Table */}
                                            <AnimatePresence>
                                                {showTaxDetails && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden mt-4"
                                                    >
                                                        <div className={cn("border rounded-lg p-4 text-xs space-y-3 transition-colors duration-300 shadow-sm", currentTierColors.border, currentTierColors.darkBorder, currentTierColors.bg)}>
                                                            <h4 className="font-semibold text-center text-sm text-foreground/90 mb-2">Tier {activeTier.id}: Tax Allocation Details</h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {/* Buy Side Allocation */}
                                                                <div className="space-y-1.5">
                                                                    <p className="font-medium text-green-700 dark:text-green-400 border-b border-green-500/20 pb-1 mb-2">Buy Tax Allocation ({activeTier.taxes.buy}%)</p>
                                                                    <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.buy.reflection} tooltip="Share of buy tax distributed to holders." color="text-primary" />
                                                                    <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.buy.liquidity} tooltip="Share of buy tax added to the DEX liquidity pool for stability." color="text-blue-600 dark:text-blue-400" />
                                                                    <DistributionItem icon={Megaphone} label="Marketing/Dev" value={activeTier.distribution.buy.marketing} tooltip="Share of buy tax allocated to the marketing and development treasury." color="text-orange-600 dark:text-orange-400" />
                                                                </div>
                                                                {/* Sell Side Allocation */}
                                                                <div className="space-y-1.5 md:border-l md:border-border/40 md:pl-4">
                                                                    <p className="font-medium text-red-700 dark:text-red-400 border-b border-red-500/20 pb-1 mb-2">Sell Tax Allocation ({activeTier.taxes.sell}%)</p>
                                                                    <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.sell.reflection} tooltip="Share of sell tax distributed to holders (major reward mechanism)." color="text-primary" />
                                                                    <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.sell.liquidity} tooltip="Share of sell tax added to the DEX liquidity pool." color="text-blue-600 dark:text-blue-400" />
                                                                    <DistributionItem icon={Megaphone} label="Marketing/Dev" value={activeTier.distribution.sell.marketing} tooltip="Share of sell tax allocated to the marketing and development treasury." color="text-orange-600 dark:text-orange-400" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* System Flow Visualization */}
                                        <div className="mt-auto pt-4 border-t border-border/10 dark:border-border/20">
                                            <div className="relative aspect-[16/6] bg-muted/10 dark:bg-muted/5 rounded-lg p-3 overflow-hidden">
                                                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-4/5 h-4/5 relative">
                                                        {/* Market Conditions Input */}
                                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                                                            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center shadow-md border border-border/30">
                                                                <div className="text-xs text-center">
                                                                    <div>Sell/Buy</div>
                                                                    <div className="font-bold">{currentRatio.toFixed(1)}x</div>
                                                                </div>
                                                            </div>
                                                            <div className="h-8 w-px bg-border/30 my-1"></div>
                                                            <div className="text-xs text-muted-foreground">Market Condition</div>
                                                        </div>
                                                        
                                                        {/* Processing Core */}
                                                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                                            <div className={cn(
                                                                "w-24 h-24 rounded-lg border flex items-center justify-center transition-colors duration-500 shadow-md",
                                                                currentTierColors.border, currentTierColors.bg
                                                            )}>
                                                                <div className="text-center">
                                                                    <div className="text-xs mb-1">$ROACH Tier</div>
                                                                    <div className={cn("font-bold text-lg", currentTierColors.text)}>{activeTier.id}</div>
                                                                    <div className="text-xs mt-1">{activeTier.name}</div>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mt-2">Adaptive Engine</div>
                                                        </div>
                                                        
                                                        {/* Outputs */}
                                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="flex flex-col items-center">
                                                                    <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-md">
                                                                        <div className="text-xs text-center">
                                                                            <div className="text-red-600 dark:text-red-400 font-bold">{activeTier.taxes.sell}%</div>
                                                                            <div>Sell Tax</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-center">
                                                                    <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-md">
                                                                        <div className="text-xs text-center">
                                                                            <div className="text-green-600 dark:text-green-400 font-bold">{activeTier.taxes.buy}%</div>
                                                                            <div>Buy Tax</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-center col-span-2 mt-2">
                                                                    <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-md">
                                                                        <div className="text-xs text-center">
                                                                            <div className="text-primary font-bold">{activeTier.distribution.sell.reflection}%</div>
                                                                            <div>Reflect</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mt-2">Optimized Parameters</div>
                                                        </div>
                                                        
                                                        {/* Flow Arrows */}
                                                        <div className="absolute left-[18%] top-1/2 w-[25%] h-px bg-border/50 transform -translate-y-1/2">
                                                            <div className={cn(
                                                                "absolute top-0 left-0 h-full w-1/2 bg-primary/30",
                                                                "animate-flow-right"
                                                            )}></div>
                                                            <div className="absolute -right-1 -top-1.5 border-l-[6px] border-l-transparent border-b-[6px] border-b-border/50 border-r-[6px] border-r-transparent"></div>
                                                        </div>
                                                        <div className="absolute right-[18%] top-1/2 w-[25%] h-px bg-border/50 transform -translate-y-1/2">
                                                            <div className={cn(
                                                                "absolute top-0 left-0 h-full w-1/2 bg-primary/30",
                                                                "animate-flow-right"
                                                            )}></div>
                                                            <div className="absolute -right-1 -top-1.5 border-l-[6px] border-l-transparent border-b-[6px] border-b-border/50 border-r-[6px] border-r-transparent"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* --- Static Tier Reference Table Card (Span 2 columns) --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 sticky top-20"
                    >
                        <Card className="max-h-[80vh] overflow-hidden flex flex-col">
                            <CardHeader className="flex-shrink-0 border-b border-border/10">
                                <CardTitle className="text-lg sm:text-xl font-semibold">Tier Reference</CardTitle>
                                <CardDescription className="text-xs">Tax & Reflection levels per tier. Click row to focus visualizer.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pt-0 pb-2 flex-grow overflow-y-auto scrollbar-hide">
                                <Table className="min-w-[360px]">
                                    <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                        <TableRow className="text-[10px] uppercase tracking-wider">
                                            <TableHead className="w-[12%] text-center px-1 py-1 h-8 font-semibold">Tier</TableHead>
                                            <TableHead className="w-[28%] text-left px-1 py-1 h-8 font-semibold">S/B Ratio</TableHead>
                                            <TableHead className="w-[15%] text-center text-green-600 px-1 py-1 h-8 font-semibold">Buy Tax</TableHead>
                                            <TableHead className="w-[15%] text-center text-red-600 px-1 py-1 h-8 font-semibold">Sell Tax</TableHead>
                                            <TableHead className="w-[30%] text-center text-primary px-1 py-1 h-8 font-semibold">Sell Reflect</TableHead>
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
                                                        "text-xs text-center cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/10 h-11 transition-colors duration-150",
                                                        isActive && `bg-primary/10 dark:bg-primary/15 border-l-4 ${colors.border}`,
                                                        !isActive && "opacity-80"
                                                    )}
                                                    aria-current={isActive ? 'step' : undefined}
                                                >
                                                    <TableCell className={cn("font-bold py-1 px-1", colors.text)}>{tier.id}</TableCell>
                                                    <TableCell className="py-1 px-1 text-left font-mono text-muted-foreground text-[11px]">{tier.condition.replace('Sell/Buy Ratio ', '')}</TableCell>
                                                    <TableCell className="py-1 px-1 text-green-700 dark:text-green-400 font-semibold">{tier.taxes.buy}%</TableCell>
                                                    <TableCell className="py-1 px-1 text-red-700 dark:text-red-400 font-semibold">{tier.taxes.sell}%</TableCell>
                                                    <TableCell className={cn("py-1 px-1 font-semibold", colors.text)}>{tier.distribution.sell.reflection}%</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <div className="p-3 border-t border-border/10 text-center flex-shrink-0">
                                <p className="text-[11px] text-muted-foreground/80 italic flex items-center justify-center gap-1">
                                    <Timer className="h-3 w-3" /> System evaluates & adapts tiers every 4 hours.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                
                {/* Key Mechanics Explainer */}
                <motion.div 
                    className="mt-16 max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6 border border-border/20">
                        <h3 className="text-xl font-bold mb-4 text-center">How The Adaptive Tier System Creates Antifragility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-500/10 p-3 rounded-full mb-3 border border-blue-500/20">
                                    <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-semibold mb-2">4-Hour Evaluation Cycle</h4>
                                <p className="text-sm text-muted-foreground">The system recalculates the Sell/Buy volume ratio every 4 hours to determine the current market pressure and automatically select the appropriate tier.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-green-500/10 p-3 rounded-full mb-3 border border-green-500/20">
                                    <Percent className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h4 className="font-semibold mb-2">Progressive Tax Structure</h4>
                                <p className="text-sm text-muted-foreground">As selling pressure increases, the system raises sell taxes (up to 15%) while simultaneously lowering buy taxes (down to 2%) to discourage selling and encourage buying.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 p-3 rounded-full mb-3 border border-primary/20">
                                    <Network className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="font-semibold mb-2">Auto-Scaling Rewards</h4>
                                <p className="text-sm text-muted-foreground">During high sell pressure, holder rewards increase dramatically (up to 10% reflection), turning market volatility into a benefit for loyal community members.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}

// --- MetricCard Sub-Component ---
interface MetricCardProps { label: string; value: string; delta: number; icon: React.ElementType; iconColor: string; tooltip: string; }

function MetricCard({ label, value, delta, icon: Icon, iconColor, tooltip }: MetricCardProps) {
    const deltaSign = delta > 0 ? '+' : delta < 0 ? '' : '';
    const deltaColor = delta > 0 ? 'text-red-600 dark:text-red-400' : delta < 0 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground';
    const deltaText = delta !== 0 ? `${deltaSign}${delta}%` : '-';

    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                <Card className="p-0 text-left w-full h-full cursor-help transition-all duration-300 border border-border/20 hover:border-border/40 dark:bg-card/50">
                    <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-3 sm:px-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                <Icon className={cn("h-4 w-4", iconColor)} /> {label}
                            </span>
                            <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                            <p className="text-xl sm:text-2xl font-bold text-foreground">{value}</p>
                            <p className={cn("text-xs font-semibold", deltaColor)}>{deltaText}</p>
                        </div>
                    </CardContent>
                </Card>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-[200px]"><p className="text-xs">{tooltip}</p></TooltipContent>
        </Tooltip>
    );
}


// --- DistributionItem Sub-Component ---
interface DistributionItemProps { icon: React.ElementType; label: string; value: number; tooltip: string; color: string; }

function DistributionItem({ icon: Icon, label, value, tooltip, color }: DistributionItemProps) {
    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger className="w-full text-left cursor-help group">
                <div className="flex items-center justify-between text-xs hover:bg-black/5 dark:hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                    <span className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Icon className={cn("h-3.5 w-3.5 group-hover:scale-110 transition-transform", color)} /> {label}
                    </span>
                    <span className={cn("font-semibold text-foreground/90")}>{value.toFixed(1)}%</span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" align="start"><p className="text-xs max-w-[180px]">{tooltip}</p></TooltipContent>
        </Tooltip>
    );
}

export default TokenMechanics;