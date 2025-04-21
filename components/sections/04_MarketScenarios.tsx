// MarketScenarios.tsx
"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { tierData } from '@/lib/tier-data';
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertCircle, Award, BarChartHorizontal, ChevronsDown, HelpCircle, LineChart, MessageSquareWarning, Scale, ShieldAlert, ShieldCheck, TrendingDown, TrendingUp, Zap } from "lucide-react";

// Market Scenario Data (realistic but illustrative examples)
const marketScenarios = [
    { 
        id: 'stable', 
        label: "Stable Market", 
        icon: Activity, 
        description: "Balanced buy/sell activity with equal market participation, similar to SOL's periods of consolidation.", 
        roach: { 
            tier: 2, 
            priceImpact: "Stable Orbit", 
            rewardLevel: "Standard", 
            sentiment: "Neutral", 
            outcome: "Baseline operations. Reflections accrue steadily at 4% from sell tax. System maintains equilibrium and builds long-term holder value." 
        }, 
        resilient: { 
            priceImpact: "Stable", 
            rewardLevel: "None/Fixed", 
            sentiment: "Neutral", 
            outcome: "Systems like $IMG maintain static 3% reflection rates. No adaptive mechanisms engaged, missing opportunities to build reserves." 
        }, 
        color: "gray",
        simulationData: {
            roach: [50, 52, 50, 51, 50, 49, 51, 52, 50],
            typical: [50, 51, 49, 50, 49, 50, 51, 50, 49]
        }
    },
    { 
        id: 'dip', 
        label: "Minor Dip", 
        icon: ChevronsDown, 
        description: "Moderate increase in selling pressure (10-20%), similar to BTC's typical 5-10% correction phases.", 
        roach: { 
            tier: 3, 
            priceImpact: "Dip Cushioned", 
            rewardLevel: "Increased", 
            sentiment: "Opportunistic", 
            outcome: "Higher sell tax (9%) applied, increasing holder reflection pool to 6%. Buy tax reduced to 4%, encouraging new entries. Early defensive positioning outperforms static systems." 
        }, 
        resilient: { 
            priceImpact: "Noticeable Dip", 
            rewardLevel: "None/Fixed", 
            sentiment: "Slight Concern", 
            outcome: "Tokens like $BONK with unchanging tokenomics follow market trend downward. Fixed 3-5% mechanisms continue regardless of pressure, missing adaptation opportunity." 
        }, 
        color: "yellow",
        simulationData: {
            roach: [50, 47, 45, 44, 45, 46, 48, 49, 50],
            typical: [50, 46, 43, 40, 42, 43, 45, 46, 47] 
        }
    },
    { 
        id: 'selloff', 
        label: "Significant Sell-off", 
        icon: TrendingDown, 
        description: "Strong selling volume (20-40% price drop), comparable to ETH's reaction during broader market downturns.", 
        roach: { 
            tier: 4, 
            priceImpact: "Defense Activated", 
            rewardLevel: "High", 
            sentiment: "Confident / Contrarian", 
            outcome: "Sharp sell tax increase to 12% heavily disincentivizes panic selling, boosting reflections to 8%. Lower 3% buy tax encourages strategic entry. Reward mechanisms strengthen holder loyalty exactly when needed most." 
        }, 
        resilient: { 
            priceImpact: "Sharp Drop", 
            rewardLevel: "None/Fixed", 
            sentiment: "Anxious", 
            outcome: "Static tokens like PEPE or DOGE drop significantly with market. Fixed tax rate systems (e.g., 5% regardless of conditions) fail to disincentivize selling or reward holders through volatility." 
        }, 
        color: "orange",
        simulationData: {
            roach: [50, 42, 37, 35, 38, 40, 42, 45, 48],
            typical: [50, 38, 30, 25, 22, 24, 28, 32, 35]
        }
    },
    { 
        id: 'crash', 
        label: "Market Crash", 
        icon: ShieldAlert, 
        description: "Extreme panic selling (40%+ drops), similar to the March 2023 banking crisis or major regulatory FUD events.", 
        roach: { 
            tier: 5, 
            priceImpact: "Antifragile Advantage*", 
            rewardLevel: "Maximum", 
            sentiment: "Strengthened / Strategic", 
            outcome: "Peak sell tax (15%) & reflections (10%) convert market chaos into maximum holder rewards. Lowest buy tax (2%) creates ideal entry conditions. Project benefits from volatility rather than being harmed by it." 
        }, 
        resilient: { 
            priceImpact: "Severe Drop", 
            rewardLevel: "None/Fixed", 
            sentiment: "Distressed", 
            outcome: "Most tokens experience catastrophic value erosion. Many 'pump.fun' style tokens collapse entirely. Even established projects with static mechanisms (e.g., fixed 4-5% rates) see overwhelming sell pressure with nothing to counterbalance." 
        }, 
        color: "red",
        simulationData: {
            roach: [50, 35, 28, 25, 28, 31, 35, 39, 42],
            typical: [50, 30, 20, 15, 10, 12, 15, 18, 20]
        }
    },
];

// Color mapping for scenarios (for visual consistency)
const scenarioColorMap: { [key: string]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string; } } = {
    gray: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    yellow: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    red: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

// Helper functions to map reward levels and price impacts to visual elements
const mapRewardLevelToVisual = (level: string): { text: string; value: number; colorClass: string; icon: React.ElementType } => {
    switch (level.toLowerCase()) {
        case 'none/fixed': return { text: "None / Fixed", value: 5, colorClass: "bg-muted", icon: HelpCircle };
        case 'standard': return { text: "Standard", value: 25, colorClass: scenarioColorMap['gray'].indicator, icon: Activity };
        case 'increased': return { text: "Increased", value: 55, colorClass: scenarioColorMap['yellow'].indicator, icon: TrendingUp };
        case 'high': return { text: "High", value: 80, colorClass: scenarioColorMap['orange'].indicator, icon: Award };
        case 'maximum': return { text: "Maximum", value: 100, colorClass: scenarioColorMap['red'].indicator, icon: Zap };
        default: return { text: level, value: 0, colorClass: "bg-muted", icon: HelpCircle };
    }
};

const mapPriceImpactToVisual = (impact: string, isRoach: boolean): { text: string; icon: React.ElementType; colorClass: string } => {
    const iL = impact.toLowerCase();
    if (iL === 'stable' || iL === 'stable orbit') return { text: "Stable", icon: Activity, colorClass: cn(scenarioColorMap['gray'].text, scenarioColorMap['gray'].darkText) };
    if (iL === 'noticeable dip') return { text: "Dip", icon: ChevronsDown, colorClass: cn(scenarioColorMap['yellow'].text, scenarioColorMap['yellow'].darkText) };
    if (iL === 'sharp drop') return { text: "Sharp Drop", icon: TrendingDown, colorClass: cn(scenarioColorMap['orange'].text, scenarioColorMap['orange'].darkText) };
    if (iL === 'severe drop') return { text: "Severe Drop", icon: TrendingDown, colorClass: cn(scenarioColorMap['red'].text, scenarioColorMap['red'].darkText) };
    if (isRoach) {
        if (iL === 'dip cushioned') return { text: "Cushioned", icon: ShieldCheck, colorClass: cn(scenarioColorMap['yellow'].text, scenarioColorMap['yellow'].darkText) };
        if (iL === 'defense activated') return { text: "Defended", icon: ShieldCheck, colorClass: cn(scenarioColorMap['orange'].text, scenarioColorMap['orange'].darkText) };
        if (iL.includes('antifragile advantage')) return { text: "Advantage*", icon: TrendingUp, colorClass: "text-primary dark:text-primary" };
    }
    return { text: impact, icon: HelpCircle, colorClass: "text-muted-foreground" };
};

// Tier color mapping for consistency with other sections
const tierColorMap: { [key: number]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string; } } = {
    1: { text: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30', indicator: 'bg-blue-500', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-500/20', darkBorder: 'dark:border-blue-500/40' },
    2: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    3: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    4: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    5: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

export function MarketScenarios() {
    const [activeScenarioId, setActiveScenarioId] = useState(marketScenarios[1].id);
    const [isSimulationPlaying, setIsSimulationPlaying] = useState(false);
    const [simulationStep, setSimulationStep] = useState(0);
    
    const activeScenario = useMemo(() => 
        marketScenarios.find(s => s.id === activeScenarioId) || marketScenarios[1], 
        [activeScenarioId]
    );

    // Reset simulation when scenario changes
    React.useEffect(() => {
        setSimulationStep(0);
        setIsSimulationPlaying(false);
    }, [activeScenarioId]);

    // Animation for simulation playback
    React.useEffect(() => {
        if (!isSimulationPlaying) return;

        const maxSteps = activeScenario.simulationData.roach.length - 1;
        if (simulationStep >= maxSteps) {
            setIsSimulationPlaying(false);
            return;
        }

        const timer = setTimeout(() => {
            setSimulationStep(prev => prev + 1);
        }, 800);

        return () => clearTimeout(timer);
    }, [isSimulationPlaying, simulationStep, activeScenario]);

    const handlePlaySimulation = useCallback(() => {
        if (simulationStep >= activeScenario.simulationData.roach.length - 1) {
            setSimulationStep(0);
        }
        setIsSimulationPlaying(prev => !prev);
    }, [simulationStep, activeScenario]);

    const contentVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
    };

    return (
        <TooltipProvider>
            <Section id="market-scenarios" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 via-background to-muted/5 dark:from-background/5 dark:via-background dark:to-background/5">
                <SectionHeader
                    title="Performance Under Pressure: $ROACH vs. Static Resilience"
                    description="Explore simulated responses during market volatility. See how $ROACH's adaptive 5-tier system aims to turn stress into strength, compared to typical static token models."
                    subtitle={<><Scale className="inline h-4 w-4 mr-1.5" /> Scenario Comparison</>}
                    alignment="center" className="mb-16"
                />

                <Tabs value={activeScenarioId} onValueChange={setActiveScenarioId} className="max-w-6xl mx-auto">
                    <TabsList variant="segmented" className="md:grid-cols-4 mb-10">
                        {marketScenarios.map((scenario) => {
                            const colors = scenarioColorMap[scenario.color as keyof typeof scenarioColorMap];
                            const isActive = scenario.id === activeScenarioId;
                            return (
                                <TabsTrigger
                                    key={scenario.id} value={scenario.id}
                                    className={cn(
                                        "flex-col h-auto py-3 px-1 sm:px-2 text-xs sm:text-sm relative group",
                                        isActive
                                            ? cn("font-semibold", colors.text, colors.darkText)
                                            : "text-muted-foreground hover:text-foreground opacity-80 hover:opacity-100",
                                        isActive && `border-b-2 ${colors.border.replace('border-', 'border-b-')} border-transparent`
                                    )}
                                >
                                    <scenario.icon className={cn("h-5 w-5 mb-1 transition-colors", isActive ? colors.text : 'text-muted-foreground group-hover:text-foreground/80', isActive && colors.darkText)} />
                                    <span className="text-center leading-tight">{scenario.label}</span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent key={activeScenarioId} value={activeScenarioId} forceMount className="mt-0 outline-none">
                            <motion.div variants={contentVariants} initial="initial" animate="animate" exit="exit">
                                {/* Scenario Context Banner */}
                                <div className={cn(
                                    "mb-10 p-4 rounded-lg border-l-4 flex items-start sm:items-center gap-3 sm:gap-4 shadow-sm",
                                    scenarioColorMap[activeScenario.color].border.replace('border-', 'border-l-'),
                                    scenarioColorMap[activeScenario.color].bg,
                                    scenarioColorMap[activeScenario.color].darkBg,
                                    scenarioColorMap[activeScenario.color].darkBorder?.replace('border-', 'border-l-')
                                )}>
                                    <activeScenario.icon className={cn("h-6 w-6 sm:h-7 sm:w-7 shrink-0 mt-0.5 sm:mt-0", scenarioColorMap[activeScenario.color].text, scenarioColorMap[activeScenario.color].darkText)} />
                                    <div>
                                        <h4 className={cn("font-semibold text-base sm:text-lg", scenarioColorMap[activeScenario.color].text, scenarioColorMap[activeScenario.color].darkText)}>Scenario: {activeScenario.label}</h4>
                                        <p className="text-sm text-muted-foreground">{activeScenario.description}</p>
                                    </div>
                                </div>
                                
                                {/* Interactive Price Simulation */}
                                <div className="mb-8 bg-muted/10 border border-border/20 rounded-lg p-4">
                                    <div className="flex flex-wrap justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">Token Price Behavior Simulation</h3>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={handlePlaySimulation}
                                            className="gap-2"
                                        >
                                            {isSimulationPlaying ? (
                                                <>
                                                    <Pause className="h-4 w-4" />
                                                    <span>Pause</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-4 w-4" />
                                                    <span>{simulationStep > 0 ? "Resume" : "Play Simulation"}</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    
                                    <div className="aspect-[16/7] relative bg-card/50 rounded-lg p-4 overflow-hidden">
                                        {/* Chart Grid Lines */}
                                        <div className="absolute inset-0 grid grid-cols-8 grid-rows-5">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <div key={`h-${i}`} className="col-span-8 border-t border-border/10 last:border-0" />
                                            ))}
                                            {Array.from({ length: 9 }).map((_, i) => (
                                                <div key={`v-${i}`} className="row-span-5 border-l border-border/10 last:border-0" />
                                            ))}
                                        </div>
                                        
                                        {/* Chart Axis Labels */}
                                        <div className="absolute right-0 bottom-0 left-0 h-6 flex justify-between px-4 items-center text-[10px] text-muted-foreground">
                                            <span>Day 0</span>
                                            <span>Day 2</span>
                                            <span>Day 4</span>
                                            <span>Day 6</span>
                                            <span>Day 8</span>
                                        </div>
                                        <div className="absolute top-0 bottom-6 left-0 w-6 flex flex-col justify-between py-2 items-center text-[10px] text-muted-foreground">
                                            <span>+50%</span>
                                            <span>+25%</span>
                                            <span>0%</span>
                                            <span>-25%</span>
                                            <span>-50%</span>
                                        </div>
                                        
                                        {/* Price Lines */}
                                        <div className="absolute inset-6 z-10">
                                            {/* ROACH Token Line */}
                                            <svg className="w-full h-full" viewBox="0 0 8 5" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="roachGradient" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                                                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                                                    </linearGradient>
                                                </defs>
                                                
                                                {/* Fill area under the ROACH line */}
                                                <path 
                                                    d={`M0,${5 - (activeScenario.simulationData.roach[0] * 5) / 100} 
                                                        ${activeScenario.simulationData.roach.slice(0, simulationStep + 1).map((value, i) => 
                                                            `L${i},${5 - (value * 5) / 100}`).join(' ')}
                                                        L${simulationStep},5 L0,5 Z`}
                                                    fill="url(#roachGradient)" 
                                                    opacity="0.3"
                                                />
                                                
                                                {/* ROACH Line */}
                                                <path 
                                                    d={`M0,${5 - (activeScenario.simulationData.roach[0] * 5) / 100} 
                                                        ${activeScenario.simulationData.roach.slice(0, simulationStep + 1).map((value, i) => 
                                                            `L${i},${5 - (value * 5) / 100}`).join(' ')}`}
                                                    fill="none" 
                                                    stroke="var(--color-primary)" 
                                                    strokeWidth="0.1" 
                                                    strokeLinecap="round"
                                                />
                                                
                                                {/* ROACH current point */}
                                                {simulationStep > 0 && (
                                                    <circle 
                                                        cx={simulationStep} 
                                                        cy={5 - (activeScenario.simulationData.roach[simulationStep] * 5) / 100}
                                                        r="0.1" 
                                                        fill="var(--color-primary)" 
                                                    />
                                                )}
                                                
                                                {/* Typical Token Line */}
                                                <path 
                                                    d={`M0,${5 - (activeScenario.simulationData.typical[0] * 5) / 100} 
                                                        ${activeScenario.simulationData.typical.slice(0, simulationStep + 1).map((value, i) => 
                                                            `L${i},${5 - (value * 5) / 100}`).join(' ')}`}
                                                    fill="none" 
                                                    stroke="var(--color-muted-foreground)" 
                                                    strokeWidth="0.1" 
                                                    strokeLinecap="round" 
                                                    strokeDasharray="0.1,0.1"
                                                />
                                                
                                                {/* Typical Token current point */}
                                                {simulationStep > 0 && (
                                                    <circle 
                                                        cx={simulationStep} 
                                                        cy={5 - (activeScenario.simulationData.typical[simulationStep] * 5) / 100}
                                                        r="0.1" 
                                                        fill="var(--color-muted-foreground)" 
                                                    />
                                                )}
                                            </svg>
                                        </div>
                                        
                                        {/* Legend */}
                                        <div className="absolute top-2 right-4 flex flex-col gap-1 bg-card/80 backdrop-blur-sm rounded-md p-1.5 border border-border/20 shadow-sm">
                                            <div className="flex items-center gap-2 text-xs">
                                                <div className="w-3 h-[2px] bg-primary"></div>
                                                <span className="text-primary font-medium">$ROACH</span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {simulationStep > 0 ? (
                                                        `${activeScenario.simulationData.roach[simulationStep]}%`
                                                    ) : (
                                                        "50%"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <div className="w-3 h-[2px] bg-muted-foreground border-dashed"></div>
                                                <span className="text-muted-foreground">Typical Token</span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {simulationStep > 0 ? (
                                                        `${activeScenario.simulationData.typical[simulationStep]}%`
                                                    ) : (
                                                        "50%"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Tier Indicator (only for ROACH) */}
                                        {activeScenario.roach.tier && (
                                            <div className="absolute left-4 top-2 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-md p-1.5 border border-border/20 shadow-sm">
                                                <Badge 
                                                    variant="outline" 
                                                    className={cn(
                                                        "text-xs px-1.5 py-0.5",
                                                        tierColorMap[activeScenario.roach.tier].bg,
                                                        tierColorMap[activeScenario.roach.tier].text,
                                                        tierColorMap[activeScenario.roach.tier].border
                                                    )}
                                                >
                                                    Tier {activeScenario.roach.tier} Active
                                                </Badge>
                                            </div>
                                        )}
                                        
                                        {/* Scenario Phase Indicators */}
                                        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-10 text-xs">
                                            <div className="text-muted-foreground/70 text-center">
                                                <Badge variant="outline" className="mb-1 bg-muted/20">Initial</Badge>
                                            </div>
                                            <div className="text-muted-foreground/70 text-center">
                                                <Badge 
                                                    variant="outline" 
                                                    className={cn(
                                                        "mb-1",
                                                        scenarioColorMap[activeScenario.color].bg,
                                                        scenarioColorMap[activeScenario.color].text,
                                                        scenarioColorMap[activeScenario.color].border,
                                                    )}
                                                >
                                                    {activeScenario.label}
                                                </Badge>
                                            </div>
                                            <div className="text-muted-foreground/70 text-center">
                                                <Badge variant="outline" className="mb-1 bg-muted/20">Recovery</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comparison Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                                    <ScenarioCard
                                        tokenName="$ROACH Adaptive Response"
                                        tokenIcon={CockroachMascot}
                                        isRoach={true}
                                        tier={activeScenario.roach.tier}
                                        priceData={mapPriceImpactToVisual(activeScenario.roach.priceImpact, true)}
                                        rewardData={mapRewardLevelToVisual(activeScenario.roach.rewardLevel)}
                                        sentiment={activeScenario.roach.sentiment}
                                        outcome={activeScenario.roach.outcome}
                                        scenarioColor={activeScenario.color}
                                        simulationData={activeScenario.simulationData.roach}
                                        simulationStep={simulationStep}
                                    />
                                    <ScenarioCard
                                        tokenName="Typical Static Response"
                                        tokenIcon={ShieldCheck}
                                        isRoach={false}
                                        priceData={mapPriceImpactToVisual(activeScenario.resilient.priceImpact, false)}
                                        rewardData={mapRewardLevelToVisual(activeScenario.resilient.rewardLevel)}
                                        sentiment={activeScenario.resilient.sentiment}
                                        outcome={activeScenario.resilient.outcome}
                                        scenarioColor={activeScenario.color}
                                        clarification="Represents tokens with fixed mechanics (e.g., static tax/LP lock). Endures stress but lacks dynamic adaptation or benefit generation from chaos."
                                        simulationData={activeScenario.simulationData.typical}
                                        simulationStep={simulationStep}
                                    />
                                </div>
                                
                                {/* Comparative Analysis */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="mt-12 p-6 bg-muted/10 border border-border/20 rounded-lg"
                                >
                                    <h3 className="text-lg font-semibold mb-4">Key Performance Differences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-primary" />
                                                Initial Impact
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                During a {activeScenario.label.toLowerCase()}, typical tokens follow market momentum with no defensive mechanism, while $ROACH immediately adjusts tax parameters to optimize for the current conditions.
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                                <LineChart className="h-4 w-4 text-primary" />
                                                Recovery Pattern
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                $ROACH's tiered system creates stronger buy incentives and sell deterrents during stress, potentially enabling faster recovery after market pressure subsides.
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                                <Users className="h-4 w-4 text-primary" />
                                                Holder Benefits
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                While traditional tokens maintain fixed rewards regardless of conditions, $ROACH automatically increases holder reflections up to {tierData[4].distribution.sell.reflection}% in extreme scenarios.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>

                {/* Disclaimer */}
                <div className="mt-12 text-center text-xs text-muted-foreground/80 max-w-3xl mx-auto border-t pt-5 border-border/20 dark:border-border/15">
                    * <span className="font-semibold text-foreground/80">Antifragile Advantage Disclaimer:</span> Performance simulations are illustrative and based on theoretical models. Actual market behavior may vary. While the adaptive mechanisms are designed to create advantages during stress, all cryptocurrency investments carry significant risk. DYOR and invest responsibly.
                </div>
            </Section>
        </TooltipProvider>
    );
}

// ScenarioCard Component 
interface ScenarioCardProps { 
    tokenName: string; 
    tokenIcon: React.ElementType; 
    tier?: number; 
    priceData: { text: string; icon: React.ElementType; colorClass: string }; 
    rewardData: { text: string; value: number; colorClass: string; icon: React.ElementType }; 
    sentiment: string; 
    outcome: string; 
    isRoach: boolean; 
    scenarioColor: string; 
    clarification?: string; 
    simulationData: number[];
    simulationStep: number;
}

function ScenarioCard({ 
    tokenName, 
    tokenIcon: TokenIcon, 
    tier, 
    priceData, 
    rewardData, 
    sentiment, 
    outcome, 
    isRoach, 
    scenarioColor, 
    clarification, 
    simulationData,
    simulationStep
}: ScenarioCardProps) {
    const baseCardColors = isRoach ? tierColorMap[tier ?? 2] : scenarioColorMap['gray'];
    const activeTierColors = isRoach && tier ? tierColorMap[tier] : null;
    
    // Calculate current price and change percentage
    const initialPrice = simulationData[0];
    const currentPrice = simulationData[Math.min(simulationStep, simulationData.length - 1)];
    const priceChange = currentPrice - initialPrice;
    const priceChangePercent = (priceChange / initialPrice) * 100;

    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.01 }} 
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
        >
            <Card className={cn(
                "flex flex-col h-full transition-all duration-300 overflow-hidden",
                isRoach && activeTierColors ? activeTierColors.border : "border-border/30",
                isRoach && activeTierColors ? activeTierColors.darkBorder : "dark:border-border/40"
            )}>
                <CardHeader className={cn(
                    "flex-row items-center justify-between gap-2",
                    isRoach && activeTierColors ? activeTierColors.bg : "bg-muted/30 dark:bg-muted/10",
                    isRoach && activeTierColors ? activeTierColors.border.replace('border-', 'border-b-') : "border-b-border/20"
                )}>
                    <div className="flex items-center gap-2">
                        {isRoach ? 
                            <TokenIcon size="xs" className={cn("shrink-0", activeTierColors?.text, activeTierColors?.darkText)} /> : 
                            <TokenIcon className={cn("h-5 w-5 shrink-0 text-muted-foreground")} />
                        }
                        <CardTitle className={cn(
                            "text-sm sm:text-base font-semibold leading-tight", 
                            isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-foreground/90'
                        )}>
                            {tokenName}
                        </CardTitle>
                    </div>
                    {isRoach && tier && activeTierColors && (
                        <TooltipProvider><Tooltip>
                            <TooltipTrigger asChild>
                                <Badge 
                                    variant="secondary" 
                                    className={cn(
                                        "text-[0.7rem] sm:text-xs px-2 py-0.5 whitespace-nowrap transition-colors duration-300 shadow-sm", 
                                        activeTierColors.bg, 
                                        activeTierColors.text, 
                                        activeTierColors.border, 
                                        activeTierColors.darkBorder, 
                                        activeTierColors.darkText
                                    )}
                                >
                                    Tier {tier} Active
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent><p className="text-xs">Current simulated tier: {tierData[tier - 1]?.name}</p></TooltipContent>
                        </Tooltip></TooltipProvider>
                    )}
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col">
                    {clarification && <p className="text-xs italic text-muted-foreground/80 border-l-2 border-border pl-2">{clarification}</p>}
                    
                    {/* Current Price Change Display */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Current Price:</span>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold">{currentPrice}%</span>
                            <Badge 
                                variant="outline" 
                                className={cn(
                                    "text-xs",
                                    priceChangePercent > 0 ? "bg-green-500/10 text-green-600 border-green-500/20" :
                                    priceChangePercent < 0 ? "bg-red-500/10 text-red-600 border-red-500/20" :
                                    "bg-gray-500/10 text-gray-600 border-gray-500/20"
                                )}
                            >
                                {priceChangePercent > 0 && "+"}
                                {priceChangePercent.toFixed(1)}%
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm flex-grow min-h-[100px]">
                        <MetricDisplay label="Est. Price Impact" value={priceData.text} icon={priceData.icon} colorClass={priceData.colorClass} />
                        <div className="space-y-1.5">
                            <MetricDisplay label="Holder Rewards" value={rewardData.text} icon={rewardData.icon} colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground'} />
                            <Progress 
                                value={rewardData.value} 
                                className={cn("h-2 [&>div]:transition-all [&>div]:duration-500 [&>div]:ease-out", `[&>div]:${rewardData.colorClass}`)} 
                                aria-label={`Reward level: ${rewardData.text}`} 
                            />
                        </div>
                        <MetricDisplay 
                            label="Est. Sentiment" 
                            value={sentiment} 
                            icon={sentiment === 'Neutral' || sentiment === 'Slight Concern' ? 
                                MessageSquareWarning : 
                                sentiment === 'Strengthened / Strategic' || sentiment === 'Confident / Contrarian' || sentiment === 'Opportunistic' ? 
                                Award : TrendingDown
                            } 
                            colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground'} 
                        />
                    </div>
                    
                    <div className={cn(
                        "mt-auto pt-4 text-center text-sm font-medium leading-snug border-t border-border/20",
                        isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : "text-foreground/90"
                    )}>
                        {outcome}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// MetricDisplay Sub-Component
interface MetricDisplayProps { label: string; value: string; icon: React.ElementType; colorClass: string; }

function MetricDisplay({ label, value, icon: Icon, colorClass }: MetricDisplayProps) {
    return (
        <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center gap-1">
                <Icon className={cn("h-4 w-4 opacity-80", colorClass)} /> {label}:
            </span>
            <span className={cn("font-semibold text-base leading-tight", colorClass)}>{value}</span>
        </div>
    );
}

export default MarketScenarios;