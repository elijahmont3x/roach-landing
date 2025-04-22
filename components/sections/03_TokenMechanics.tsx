// --- START OF FILE components/sections/03_TokenMechanics.tsx ---
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
import { TrendingDown, TrendingUp, Users, Droplets, Megaphone, Timer, Play, Pause, Settings2, HelpCircle, Percent, RefreshCw, Info, Network, BarChartHorizontal, ExternalLink } from "lucide-react"; // Import more icons
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

// Dynamically import Mermaid to avoid SSR issues
const MermaidChart = dynamic(
  () => import('@/components/ui/mermaid-chart').then(mod => mod.MermaidChart),
  { ssr: false, loading: () => <div className="h-32 flex items-center justify-center"><p className="text-xs text-muted-foreground">Loading flowchart...</p></div> }
);

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

    const displayVariants = {
        initial: { opacity: 0.7, x: 20, filter: 'blur(3px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0.7, x: -20, filter: 'blur(3px)', transition: { duration: 0.3, ease: 'easeIn' } }
    };

    const cardMotionProps = { initial:{ opacity: 0, y: 20 }, whileInView:{ opacity: 1, y: 0 }, viewport:{ once: true, amount: 0.1 }, transition:{ duration: 0.5 } };

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

    return (
        <TooltipProvider>
            <Section id="mechanics" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 via-background to-background/70 dark:from-background/5 dark:via-background dark:to-background/50 overflow-x-clip">
                <SectionHeader
                    title="The $ROACH Engine: Adaptive 5-Tier System"
                    description="Observe how $ROACH dynamically adjusts transaction taxes and rewards based on real-time market pressure (Sell/Buy Volume Ratio). This active adaptation defines its antifragile nature."
                    subtitle={<><Settings2 className="inline h-4 w-4 mr-1.5" /> Adaptive Core Mechanics </>}
                    alignment="center" className="mb-16"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 max-w-7xl mx-auto items-start">
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

                            <CardContent className="flex-grow flex flex-col overflow-hidden px-4 md:px-5 py-5">
                                 <AnimatePresence mode="wait">
                                     <motion.div
                                        key={activeTier.id} variants={displayVariants} initial="initial" animate="animate" exit="exit"
                                         className="flex flex-col flex-grow"
                                    >
                                        {/* Tier Info & Mascot */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-5 text-center sm:text-left">
                                             <motion.div
                                                 key={`mascot-${activeTier.id}`} initial={{ rotate: -5, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }}
                                                 transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.1 }}
                                            >
                                                 <CockroachMascot size="md" className={cn("transition-colors duration-300 flex-shrink-0 w-16 h-16", currentTierColors.text, currentTierColors.darkText)} />
                                             </motion.div>
                                            <div className="flex-1">
                                                 <Badge variant="secondary" className={cn("text-base md:text-lg px-4 py-1 shadow font-semibold transition-colors duration-300 border", currentTierColors.bg, currentTierColors.text, currentTierColors.border, currentTierColors.darkBorder)}>
                                                     Tier {activeTier.id}: {activeTier.name}
                                                 </Badge>
                                                 <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                                                     Condition: Ratio <strong className={cn("transition-colors duration-300", currentTierColors.text, currentTierColors.darkText)}>{activeTier.condition.replace('Sell/Buy Ratio ', '')}</strong>
                                                 </p>
                                                 <p className="text-[11px] italic text-muted-foreground/80 mt-0.5">{activeTier.status}</p>
                                            </div>
                                         </div>

                                        {/* Key Metrics Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-5">
                                             <MetricCard label="Buy Tax" value={`${activeTier.taxes.buy}%`} delta={activeTier.taxes.buy - tierData[1].taxes.buy} icon={TrendingUp} iconColor="text-green-600 dark:text-green-400" tooltip={`Lower tax encourages buying (${tierData.length-1}, ${tierData.length}).`} />
                                            <MetricCard label="Sell Tax" value={`${activeTier.taxes.sell}%`} delta={activeTier.taxes.sell - tierData[1].taxes.sell} icon={TrendingDown} iconColor="text-red-600 dark:text-red-400" tooltip="Higher tax deters selling, funds rewards." />
                                            <MetricCard label="Holder Rewards (Sell Reflect)" value={`${activeTier.distribution.sell.reflection}%`} delta={activeTier.distribution.sell.reflection - tierData[1].distribution.sell.reflection} icon={Users} iconColor={cn("text-primary", currentTierColors.text, currentTierColors.darkText)} tooltip="Share of SELL tax automatically redistributed. Max in high pressure." />
                                        </div>

                                         {/* Tax Allocation Breakdown */}
                                        <div className={cn("border rounded-lg p-3 text-xs space-y-3 transition-colors duration-300 shadow-sm relative overflow-hidden", currentTierColors.border, currentTierColors.bg, currentTierColors.darkBorder, "dark:shadow-md dark:shadow-black/20")}>
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
                                         </div>

                                         {/* Placeholder Section */}
                                        <div className="mt-auto pt-4 border-t border-border/10 dark:border-border/20">
                                            <div className={cn("relative overflow-hidden bg-white dark:bg-black/20 rounded-lg border", currentTierColors.border)}>
                                                <div className="p-1">
                                                    <h4 className="text-xs font-semibold text-center py-1 text-muted-foreground">Tier Adaptation Flow</h4>
                                                    <div className="overflow-x-auto">
                                                        <MermaidChart 
                                                            chart={mermaidMarkup} 
                                                            config={{
                                                                theme: 'neutral',
                                                                flowchart: {
                                                                    curve: 'basis',
                                                                    rankSpacing: 50,
                                                                    nodeSpacing: 40,
                                                                    padding: 15
                                                                }
                                                            }}
                                                            className="min-w-[500px] py-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     </motion.div>
                                 </AnimatePresence>
                            </CardContent>
                         </Card>
                     </motion.div>

                    {/* --- Static Tier Reference Table Card (Span 5/4) --- */}
                    <motion.div {...cardMotionProps} transition={{ delay: 0.1 }} className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
                        <Card className="max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col border shadow-md shadow-primary/5">
                            <CardHeader className="flex-shrink-0 border-b pt-4 pb-3 px-4">
                                <CardTitle className="text-lg font-semibold">Tier Reference Guide</CardTitle>
                                <CardDescription className="text-xs">Tax & reflection levels. Click row to focus visualizer.</CardDescription>
                             </CardHeader>
                             <CardContent className="px-0 pt-0 pb-1 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                                <Table className="min-w-[400px] text-xs">
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
                             <div className="p-2 border-t text-center flex-shrink-0 bg-muted/20 dark:bg-muted/10">
                                 <p className="text-[10px] text-muted-foreground/80 italic flex items-center justify-center gap-1">
                                     <Timer className="h-3 w-3" /> Tier evaluation & adaptation occurs every 4 hours.
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

interface MetricCardProps { label: string; value: string; delta: number; icon: React.ElementType; iconColor: string; tooltip: string; }
function MetricCard({ label, value, delta, icon: Icon, iconColor, tooltip }: MetricCardProps) {
    const deltaSign = delta > 0 ? '+' : ''; // delta < 0 is already handled by default negative sign
    const deltaColor = delta > 0 ? 'text-red-600 dark:text-red-400' : delta < 0 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground/70';
    // Refine delta text for clarity, show +/- only if not zero
    const deltaText = delta !== 0 ? `${deltaSign}${delta.toFixed(1)}%` : '±0.0%';


    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
                 <Card className="p-0 text-left w-full h-full cursor-help transition-all duration-200 border border-border/15 hover:border-border/30 dark:bg-card/60 hover:shadow-sm dark:hover:shadow-md dark:shadow-black/10">
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