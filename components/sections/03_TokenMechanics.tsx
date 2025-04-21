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
import { TrendingDown, TrendingUp, Users, Droplets, Megaphone, Timer, Play, Pause, Settings2, HelpCircle, Percent, RefreshCw, Info, Network, Scale } from "lucide-react"; // Added Scale icon
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

// --- Constants and Helpers ---
const CYCLE_INTERVAL_MS = 4000; // Slower cycle for better observation
const TRANSITION_DURATION_MS = 800; // Smoother progress transition

// Calculate ratio for visualization - map tier condition to a %
const mapConditionToRatio = (condition: string): number => {
    // Example: "< 0.8" -> maybe 0.6; "0.8 - 1.2" -> 1.0; "> 3.0" -> 3.5
    if (condition.includes('< 0.8')) return 0.6;
    if (condition.includes('0.8 - 1.2')) return 1.0;
    if (condition.includes('1.2 - 2.0')) return 1.6;
    if (condition.includes('2.0 - 3.0')) return 2.5;
    if (condition.includes('> 3.0')) return 3.5;
    return 1.0; // Default for Equilibrium
};

// Map ratio to progress bar value (0-100 scale, non-linear)
const mapRatioToProgress = (ratio: number): number => {
    if (ratio < 0.8) return 15;    // Tier 1 Area
    if (ratio <= 1.2) return 35;   // Tier 2 Area
    if (ratio <= 2.0) return 55;   // Tier 3 Area
    if (ratio <= 3.0) return 75;   // Tier 4 Area
    return 90;                    // Tier 5 Area
};

const tierColorMap: { [key: number]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string } } = {
    1: { text: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30', indicator: 'bg-blue-500', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-500/20', darkBorder: 'dark:border-blue-500/40' },
    2: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    3: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    4: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    5: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

// ------------------------------------------

export function TokenMechanics() {
    const [activeTierIndex, setActiveTierIndex] = useState<number>(1); // Start at Tier 2 (Equilibrium)
    const [currentRatio, setCurrentRatio] = useState<number>(mapConditionToRatio(tierData[1].condition));
    const [isPlaying, setIsPlaying] = useState(true);
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
            <Section id="mechanics" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-background/70 dark:from-background/10 dark:via-background dark:to-background/50"> {/* OK: Layout BG */}
                <SectionHeader
                    title="The $ROACH Engine: Adaptive 5-Tier System"
                    description={
                        `Observe how $ROACH dynamically adjusts transaction taxes and rewards based on real-time market conditions (Sell/Buy Volume Ratio). This active adaptation forms its antifragile core.`
                    }
                    subtitle={<><Settings2 className="inline h-4 w-4 mr-1.5" /> Core Mechanics </>}
                    alignment="center" className="mb-16" // OK: Layout margin
                />

                {/* OK: Layout grid */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 max-w-7xl mx-auto items-start">
                    {/* --- Interactive Tier Visualizer Card (Span 5 columns) --- */}
                    <motion.div
                        className="lg:col-span-5" // OK: Layout grid span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Card: Removed shadow-xl, rely on base. border overrides OK for context. */}
                        <Card className={cn(
                            "border border-border/10 dark:border-border/20 h-full flex flex-col", // OK: Specific border
                            "overflow-hidden" // OK: Layout
                        )}>
                            {/* CardHeader relies on Card py-6. Removed pb-4. border-b OK */}
                            <CardHeader className="border-b border-border/10 dark:border-border/20">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2"> {/* OK: Layout */}
                                    <div>
                                        <CardTitle className="text-xl md:text-2xl font-semibold">Dynamic System Visualizer</CardTitle> {/* OK: Text style */}
                                        <CardDescription className="mt-1 text-sm flex items-center"> {/* OK: Text style */}
                                            Simulating response to market Sell / Buy Ratio
                                            <Tooltip delayDuration={100}>
                                                <TooltipTrigger className="ml-1.5 cursor-help"><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger> {/* OK: Style on trigger */}
                                                <TooltipContent><p className="max-w-[200px] text-xs">{/* OK: Content style */} </p></TooltipContent>
                                            </Tooltip>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 self-start sm:self-center"> {/* OK: Layout */}
                                        <span className="text-xs font-medium text-muted-foreground mr-1 hidden sm:inline">Simulation:</span> {/* OK: Text style */}
                                        {/* Use Button component */}
                                        <Button variant="outline" size="icon" onClick={togglePlayPause} className="h-8 w-8 shrink-0"> {/* OK: Specific size */}
                                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                            <span className="sr-only">{isPlaying ? "Pause" : "Play"} Simulation</span>
                                        </Button>
                                    </div>
                                </div>
                                {/* Progress Bar Section */}
                                <div className="mt-6 space-y-2 relative"> {/* OK: Layout */}
                                    <div className="flex justify-between items-center mb-1"> {/* OK: Layout */}
                                        <label htmlFor="marketPressure" className="text-xs font-medium text-muted-foreground">Market Pressure (Sell/Buy Ratio)</label> {/* OK: Text style */}
                                        {/* Badge: Use base component, rely on variants. Overrides are for contextual color/border. */}
                                        <Badge variant="secondary" className={cn("font-mono text-xs px-1.5 py-0.5 transition-colors", currentTierColors.bg, currentTierColors.text, currentTierColors.border)}>
                                            {currentRatio.toFixed(1)}x
                                        </Badge>
                                    </div>
                                    <div className="relative h-3"> {/* OK: Layout Wrapper */}
                                        {/* Progress: Rely on base component style. ClassName applies contextual indicator color */}
                                        <Progress
                                            id="marketPressure"
                                            value={progressValue}
                                            className={cn(
                                                "h-3 absolute inset-0 transition-all ease-out", // OK: Layout / transition tweak
                                                `[&>div]:${currentTierColors.indicator}` // OK: Contextual color
                                            )}
                                            style={{ transitionDuration: `${TRANSITION_DURATION_MS}ms` }}
                                        />
                                        {/* Active Tier Bubble Indicator - OK: Positional styling, contextual color */}
                                        <motion.div
                                            key={`bubble-${activeTier.id}`} // Ensure re-animation
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
                                            Tier {activeTier.id}
                                            <HelpCircle className="h-3 w-3 opacity-70 cursor-help" onClick={(e) => { e.stopPropagation(); setManualTier(activeTier.id - 1); }} />
                                        </motion.div>
                                    </div>
                                     {/* OK: Text styling for labels */}
                                    <div className="flex justify-between text-[10px] text-muted-foreground/80 pt-0.5 px-0.5">
                                        <span>Accumulation</span>
                                        <span>Equilibrium</span>
                                        <span>Pressure</span>
                                        <span>Defense</span>
                                        <span>Recovery</span>
                                    </div>
                                </div>
                            </CardHeader>

                             {/* CardContent relies on Card base gap. Removed pt-6, pb-6, px-6. */}
                            <CardContent className="flex-grow flex flex-col overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTier.id} // Key drives the animation change
                                        variants={displayVariants} initial="initial" animate="animate" exit="exit"
                                        className="flex flex-col flex-grow" // OK: Layout
                                    >
                                        {/* --- Top: Mascot & Tier Info --- */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left"> {/* OK: Layout */}
                                            <motion.div
                                                key={`mascot-${activeTier.id}`}
                                                initial={{ scale: 0.9, opacity: 0.8 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
                                            >
                                                 {/* OK: Contextual color, layout */}
                                                <CockroachMascot size="md" className={cn("transition-colors duration-300 flex-shrink-0", currentTierColors.text)} />
                                            </motion.div>
                                            <div className="flex-1"> {/* OK: Layout */}
                                                 {/* Badge: Use base component, rely on variants. Overrides are for contextual color/border/size/shadow */}
                                                <Badge variant="secondary" className={cn("text-base md:text-lg px-4 py-1 shadow-md font-semibold transition-colors duration-300", currentTierColors.bg, currentTierColors.text, currentTierColors.border, currentTierColors.darkBorder)}>
                                                    Tier {activeTier.id}: {activeTier.name}
                                                </Badge>
                                                {/* OK: Text styles */}
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Triggered when Sell/Buy Ratio is <strong className={cn("transition-colors duration-300", currentTierColors.text)}>{activeTier.condition.replace('Sell/Buy Ratio ', '')}</strong>
                                                </p>
                                                <p className="text-xs italic text-muted-foreground/80 mt-1">{activeTier.status}</p>
                                            </div>
                                        </div>

                                        {/* --- Middle: Key Metrics Grid --- */}
                                         {/* OK: Layout grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                                            {/* MetricCard uses Card internally */}
                                            <MetricCard label="Buy Tax" value={`${activeTier.taxes.buy}%`} delta={activeTier.taxes.buy - tierData[1].taxes.buy} icon={TrendingUp} iconColor="text-green-600 dark:text-green-400" tooltip={`Tax paid on buy transactions. Lower tax encourages buying during high sell pressure (Tiers ${tierData.length - 1}, ${tierData.length}).`} />
                                            <MetricCard label="Sell Tax" value={`${activeTier.taxes.sell}%`} delta={activeTier.taxes.sell - tierData[1].taxes.sell} icon={TrendingDown} iconColor="text-red-600 dark:text-red-400" tooltip={`Tax paid on sell transactions. Higher tax discourages selling during downturns and funds reflections.`} />
                                            <MetricCard label="Sell Reflections" value={`${activeTier.distribution.sell.reflection}%`} delta={activeTier.distribution.sell.reflection - tierData[1].distribution.sell.reflection} icon={Users} iconColor="text-primary" tooltip={`Percentage of the SELL tax automatically redistributed to all $ROACH holders. Maximized in high-pressure tiers.`} />
                                        </div>

                                        {/* --- Tax Distribution Breakdown --- */}
                                         {/* OK: Contextual border, bg, layout styles */}
                                        <div className={cn("border rounded-lg p-4 text-xs space-y-3 mb-6 transition-colors duration-300 shadow-sm", currentTierColors.border, currentTierColors.darkBorder, currentTierColors.bg)}>
                                            <h4 className="font-semibold text-center text-sm text-foreground/90 mb-2">Tier {activeTier.id}: Tax Allocation Details</h4> {/* OK: Text styles */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* OK: Layout */}
                                                {/* Buy Side Allocation */}
                                                <div className="space-y-1.5"> {/* OK: Layout */}
                                                    <p className="font-medium text-green-700 dark:text-green-400 border-b border-green-500/20 pb-1 mb-2">Buy Tax Allocation ({activeTier.taxes.buy}%)</p> {/* OK: Text style */}
                                                    <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.buy.reflection} tooltip="Share of buy tax distributed to holders." color="text-primary" />
                                                    <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.buy.liquidity} tooltip="Share of buy tax added to the DEX liquidity pool for stability." color="text-blue-600 dark:text-blue-400" />
                                                    <DistributionItem icon={Megaphone} label="Marketing/Dev" value={activeTier.distribution.buy.marketing} tooltip="Share of buy tax allocated to the marketing and development treasury." color="text-orange-600 dark:text-orange-400" />
                                                </div>
                                                {/* Sell Side Allocation */}
                                                 {/* OK: Layout */}
                                                <div className="space-y-1.5 md:border-l md:border-border/40 md:pl-4">
                                                    <p className="font-medium text-red-700 dark:text-red-400 border-b border-red-500/20 pb-1 mb-2">Sell Tax Allocation ({activeTier.taxes.sell}%)</p> {/* OK: Text style */}
                                                    <DistributionItem icon={Users} label="Reflections" value={activeTier.distribution.sell.reflection} tooltip="Share of sell tax distributed to holders (major reward mechanism)." color="text-primary" />
                                                    <DistributionItem icon={Droplets} label="Liquidity Pool" value={activeTier.distribution.sell.liquidity} tooltip="Share of sell tax added to the DEX liquidity pool." color="text-blue-600 dark:text-blue-400" />
                                                    <DistributionItem icon={Megaphone} label="Marketing/Dev" value={activeTier.distribution.sell.marketing} tooltip="Share of sell tax allocated to the marketing and development treasury." color="text-orange-600 dark:text-orange-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- Visual Placeholder for Flowchart --- */}
                                        <div className="mt-auto pt-4 border-t border-border/10 dark:border-border/20"> {/* OK: Layout */}
                                             {/* OK: Placeholder layout/style */}
                                            <div className="relative aspect-[16/6] bg-muted/30 dark:bg-muted/10 border border-dashed border-border/30 rounded-lg p-3 flex items-center justify-center">
                                                <p className="text-xs text-muted-foreground/70 italic max-w-md text-center">
                                                    AI Prompt: Create a clean, horizontal flowchart...
                                                    <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                        Research: Cognitive Load...
                                                    </span>
                                                </p>
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
                        className="lg:col-span-2 sticky top-20" // OK: Layout grid span, positioning
                    >
                        {/* Card: Removed shadow-lg, rely on base. Removed border overrides. */}
                        {/* Added max-h, overflow-hidden, flex for sticky layout structure. */}
                        <Card className="max-h-[80vh] overflow-hidden flex flex-col">
                             {/* CardHeader relies on Card py-6. Removed pb-3. Removed border-b override, CardHeader already has it. */}
                            <CardHeader className="flex-shrink-0 border-b border-border/10"> {/* OK: Layout */}
                                <CardTitle className="text-lg sm:text-xl font-semibold">Tier Reference</CardTitle> {/* OK: Text style */}
                                <CardDescription className="text-xs">Tax & Reflection levels per tier. Click row to focus visualizer.</CardDescription> {/* OK: Text style */}
                            </CardHeader>
                            {/* CardContent: OK to remove default px-6 for full-width table. Specific padding overrides needed for this layout. */}
                            <CardContent className="px-0 pt-0 pb-2 flex-grow overflow-y-auto scrollbar-hide">
                                {/* Table uses base styling */}
                                <Table className="min-w-[360px]"> {/* OK: Layout constraint */}
                                    {/* TableHeader: OK: Layout/positioning */}
                                    <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                         {/* OK: Text styling overrides for header */}
                                        <TableRow className="text-[10px] uppercase tracking-wider">
                                            <TableHead className="w-[12%] text-center px-1 py-1 h-8 font-semibold">Tier</TableHead>
                                            <TableHead className="w-[28%] text-left px-1 py-1 h-8 font-semibold">S/B Ratio</TableHead>
                                            <TableHead className="w-[15%] text-center text-green-600 px-1 py-1 h-8 font-semibold">Buy Tax</TableHead>
                                            <TableHead className="w-[15%] text-center text-red-600 px-1 py-1 h-8 font-semibold">Sell Tax</TableHead>
                                            <TableHead className="w-[30%] text-center text-primary px-1 py-1 h-8 font-semibold">Sell Reflect</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    {/* TableBody uses base styling */}
                                    <TableBody>
                                        {tierData.map((tier, index) => {
                                            const colors = tierColorMap[tier.id];
                                            const isActive = index === activeTierIndex;
                                            return (
                                                // TableRow uses base styling. className overrides OK for interaction/state/contextual color.
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
                                                     {/* TableCell uses base styling. className overrides OK for contextual color/style. */}
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
                            {/* This div doesn't use CardFooter - it's a custom footer area */}
                             {/* OK: Layout and text style */}
                            <div className="p-3 border-t border-border/10 text-center flex-shrink-0">
                                <p className="text-[11px] text-muted-foreground/80 italic flex items-center justify-center gap-1">
                                    <Timer className="h-3 w-3" /> System evaluates & adapts tiers every 4 hours.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
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
                {/* Card: Removed shadow overrides, rely on base. Removed explicit padding, rely on CardContent. */}
                {/* OK: border/bg overrides for context, cursor-help interaction */}
                <Card className="p-0 text-left w-full h-full cursor-help transition-all duration-300 border border-border/20 hover:border-border/40 dark:bg-card/50">
                    {/* CardContent handles padding */}
                    <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-3 sm:px-4"> {/* Reduced padding */}
                        <div className="flex items-center justify-between mb-1.5"> {/* OK: Layout */}
                             {/* OK: Text/Icon style */}
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                <Icon className={cn("h-4 w-4", iconColor)} /> {label}
                            </span>
                            <Info className="h-3.5 w-3.5 text-muted-foreground/50" /> {/* OK: Icon style */}
                        </div>
                        <div className="flex items-baseline justify-between gap-2"> {/* OK: Layout */}
                            <p className="text-xl sm:text-2xl font-bold text-foreground">{value}</p> {/* OK: Text style */}
                            <p className={cn("text-xs font-semibold", deltaColor)}>{deltaText}</p> {/* OK: Contextual color */}
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
             {/* OK: Interaction/Layout styles */}
            <TooltipTrigger className="w-full text-left cursor-help group">
                <div className="flex items-center justify-between text-xs hover:bg-black/5 dark:hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                    {/* OK: Group interaction/layout/style */}
                    <span className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
                         {/* OK: Group interaction/color */}
                        <Icon className={cn("h-3.5 w-3.5 group-hover:scale-110 transition-transform", color)} /> {label}
                    </span>
                    <span className={cn("font-semibold text-foreground/90")}>{value.toFixed(1)}%</span> {/* OK: Text style */}
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" align="start"><p className="text-xs max-w-[180px]">{tooltip}</p></TooltipContent>
        </Tooltip>
    );
}
// --- END OF FILE components/sections/03_TokenMechanics.tsx ---