"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { tierData } from '@/lib/tier-data';
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Award, BarChartHorizontal, ChevronsDown, HelpCircle, MessageCircleWarning, ShieldAlert, ShieldCheck, TrendingDown, TrendingUp, Zap } from "lucide-react";
import React, { useMemo, useState } from 'react';

// --- Scenario Data (Refined descriptions, ROACH tier mapping) ---
const marketScenarios = [
    { id: 'stable', label: "Stable Market", icon: Activity, description: "Balanced buy/sell activity, low volatility, minimal external pressure.", roach: { tier: 2, priceImpact: "Stable Orbit", rewardLevel: "Standard", sentiment: "Neutral", outcome: "Baseline operations. Reflections accrue steadily. System maintains equilibrium." }, resilient: { priceImpact: "Stable", rewardLevel: "None/Fixed", sentiment: "Neutral", outcome: "System remains static. No adaptive response." }, color: "gray" },
    { id: 'dip', label: "Minor Dip", icon: ChevronsDown, description: "Moderate increase in selling pressure, perhaps profit-taking or slight FUD.", roach: { tier: 3, priceImpact: "Dip Cushioned", rewardLevel: "Increased", sentiment: "Opportunistic", outcome: "Higher sell tax (9%) applied, increasing reflection pool (6%). Buy tax reduced slightly (4%). Defenses engage." }, resilient: { priceImpact: "Noticeable Dip", rewardLevel: "None/Fixed", sentiment: "Slight Concern", outcome: "Price follows market trend downward. Fixed defenses provide minimal active benefit." }, color: "yellow" },
    { id: 'selloff', label: "Significant Sell-off", icon: TrendingDown, description: "Strong selling volume, likely due to negative news or broader market downturn.", roach: { tier: 4, priceImpact: "Defense Activated", rewardLevel: "High", sentiment: "Confident / Contrarian", outcome: "Sharp sell tax increase (12%) heavily disincentivizes panic selling, significantly boosting reflections (8%). Lower buy tax (3%) encourages entry." }, resilient: { priceImpact: "Sharp Drop", rewardLevel: "None/Fixed", sentiment: "Anxious", outcome: "Price drops considerably. Lacks adaptive mechanics to mitigate loss or reward holders during stress." }, color: "orange" },
    { id: 'crash', label: "Market Crash", icon: ShieldAlert, description: "Extreme panic selling, potentially correlated with major market disruption.", roach: { tier: 5, priceImpact: "Antifragile Advantage", rewardLevel: "Maximum", sentiment: "Strengthened / Strategic", outcome: "Peak sell tax (15%) & reflections (10%) turn chaos into maximum holder rewards. Lowest buy tax (2%) primes for recovery/accumulation." }, resilient: { priceImpact: "Severe Drop", rewardLevel: "None/Fixed", sentiment: "Distressed", outcome: "System experiences significant value erosion; static defenses overwhelmed. Survival potential reduced." }, color: "red" },
];

// Color mapping utility
const scenarioColorMap: { [key: string]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string; } } = {
    gray: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    yellow: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    red: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

// Reward level mapping to visual elements (progress bar value)
const mapRewardLevelToVisual = (level: string): { text: string; value: number; colorClass: string; icon: React.ElementType } => {
    switch (level.toLowerCase()) {
        case 'none/fixed': return { text: "None / Fixed", value: 5, colorClass: "bg-muted", icon: HelpCircle };
        case 'standard': return { text: "Standard", value: 25, colorClass: scenarioColorMap['gray'].indicator, icon: Activity };
        case 'increased': return { text: "Increased", value: 55, colorClass: scenarioColorMap['yellow'].indicator, icon: TrendingUp }; // Increased magnitude
        case 'high': return { text: "High", value: 80, colorClass: scenarioColorMap['orange'].indicator, icon: Award }; // Changed icon
        case 'maximum': return { text: "Maximum", value: 100, colorClass: scenarioColorMap['red'].indicator, icon: Zap }; // Changed icon
        default: return { text: level, value: 0, colorClass: "bg-muted", icon: HelpCircle };
    }
};

// Price impact mapping to visual elements (icon, color)
const mapPriceImpactToVisual = (impact: string, isRoach: boolean): { text: string; icon: React.ElementType; colorClass: string } => {
    const iL = impact.toLowerCase();
    if (iL === 'stable' || iL === 'stable orbit') return { text: "Stable", icon: Activity, colorClass: cn(scenarioColorMap['gray'].text, scenarioColorMap['gray'].darkText) };
    if (iL === 'noticeable dip') return { text: "Dip", icon: ChevronsDown, colorClass: cn(scenarioColorMap['yellow'].text, scenarioColorMap['yellow'].darkText) };
    if (iL === 'sharp drop') return { text: "Sharp Drop", icon: TrendingDown, colorClass: cn(scenarioColorMap['orange'].text, scenarioColorMap['orange'].darkText) };
    if (iL === 'severe drop') return { text: "Severe Drop", icon: TrendingDown, colorClass: cn(scenarioColorMap['red'].text, scenarioColorMap['red'].darkText) };

    // $ROACH Specific Responses
    if (isRoach) {
        if (iL === 'dip cushioned') return { text: "Cushioned", icon: ShieldCheck, colorClass: cn(scenarioColorMap['yellow'].text, scenarioColorMap['yellow'].darkText) };
        if (iL === 'defense activated') return { text: "Defended", icon: ShieldCheck, colorClass: cn(scenarioColorMap['orange'].text, scenarioColorMap['orange'].darkText) };
        if (iL.includes('antifragile advantage')) return { text: "Advantage*", icon: TrendingUp, colorClass: "text-primary dark:text-primary" }; // Changed icon
    }
    // Default / Fallback
    return { text: impact, icon: HelpCircle, colorClass: "text-muted-foreground" };
};

// Tier color mapping (needed for badge)
const tierColorMap: { [key: number]: { text: string; bg: string; border: string; indicator: string; darkText?: string; darkBg?: string; darkBorder?: string; } } = {
    1: { text: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30', indicator: 'bg-blue-500', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-500/20', darkBorder: 'dark:border-blue-500/40' },
    2: { text: 'text-gray-600', bg: 'bg-gray-500/10', border: 'border-gray-500/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/20', darkBorder: 'dark:border-gray-500/40' },
    3: { text: 'text-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400', darkBg: 'dark:bg-yellow-500/20', darkBorder: 'dark:border-yellow-500/40' },
    4: { text: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-500/20', darkBorder: 'dark:border-orange-500/40' },
    5: { text: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400', darkBg: 'dark:bg-red-500/20', darkBorder: 'dark:border-red-500/40' },
};

// ----------------------------------------------------------------------

export function MarketScenarios() {
    const [activeScenarioId, setActiveScenarioId] = useState(marketScenarios[1].id); // Default to Minor Dip scenario
    const activeScenario = useMemo(() => marketScenarios.find(s => s.id === activeScenarioId) || marketScenarios[1], [activeScenarioId]);

    // Animation variant for content fade/slide
    const contentVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
    };

    return (
        <Section id="market-scenarios" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 via-background to-muted/5 dark:from-background/5 dark:via-background dark:to-background/5">
            <SectionHeader
                title="Performance Under Pressure: $ROACH vs. Static Resilience"
                description="Explore simulated responses during market volatility. See how $ROACH's adaptive 5-tier system aims to turn stress into strength, compared to typical static token models."
                subtitle={<><BarChartHorizontal className="inline h-4 w-4 mr-1.5" /> Scenario Comparison</>}
                alignment="center" className="mb-16"
            />

            <Tabs value={activeScenarioId} onValueChange={setActiveScenarioId} className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-10 gap-1.5 p-1.5 bg-muted dark:bg-background/40 rounded-lg">
                    {marketScenarios.map((scenario) => {
                        const colors = scenarioColorMap[scenario.color as keyof typeof scenarioColorMap];
                        const isActive = scenario.id === activeScenarioId;
                        return (
                            <TabsTrigger
                                key={scenario.id} value={scenario.id}
                                className={cn(
                                    "flex-col items-center justify-center h-auto py-3 px-1 sm:px-2 rounded-md text-xs sm:text-sm transition-all duration-200 border border-transparent relative group focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background",
                                    // Active State Styling
                                    isActive
                                        ? cn("shadow-md bg-card font-semibold border-border/50 dark:border-border/30 scale-[1.03]", colors.text, colors.darkText)
                                        : cn("text-muted-foreground hover:bg-accent/50 hover:text-foreground scale-100 opacity-80 hover:opacity-100"), // Inactive State
                                    // Unique border bottom for active state
                                    isActive && `border-b-2 ${colors.border.replace('border-', 'border-b-')}`
                                )}
                            >
                                <scenario.icon className={cn("h-5 w-5 mb-1 transition-colors", isActive ? colors.text : 'text-muted-foreground group-hover:text-foreground/80', isActive && colors.darkText)} />
                                <span className="text-center leading-tight">{scenario.label}</span>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {/* Ensure AnimatePresence wraps the TabsContent */}
                <AnimatePresence mode="wait">
                    <TabsContent key={activeScenarioId} value={activeScenarioId} forceMount className="mt-0 outline-none">
                        <motion.div variants={contentVariants} initial="initial" animate="animate" exit="exit">
                            {/* --- Scenario Context Banner --- */}
                            <div className={cn(
                                "mb-10 p-4 rounded-lg border-l-4 flex items-start sm:items-center gap-3 sm:gap-4 shadow-sm",
                                scenarioColorMap[activeScenario.color].border.replace('border-', 'border-l-'), // Left border color
                                scenarioColorMap[activeScenario.color].bg, // Background color
                                scenarioColorMap[activeScenario.color].darkBg, // Dark background
                                scenarioColorMap[activeScenario.color].darkBorder?.replace('border-', 'border-l-') // Dark left border
                            )}>
                                <activeScenario.icon className={cn("h-6 w-6 sm:h-7 sm:w-7 shrink-0 mt-0.5 sm:mt-0", scenarioColorMap[activeScenario.color].text, scenarioColorMap[activeScenario.color].darkText)} />
                                <div>
                                    <h4 className={cn("font-semibold text-base sm:text-lg", scenarioColorMap[activeScenario.color].text, scenarioColorMap[activeScenario.color].darkText)}>Scenario: {activeScenario.label}</h4>
                                    <p className="text-sm text-muted-foreground">{activeScenario.description}</p>
                                </div>
                            </div>

                            {/* --- Comparison Grid --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                                {/* $ROACH Card */}
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
                                    visualPrompt={`AI Prompt: Comparative line graph: Time (X-axis) vs. Price/Value (Y-axis). Line 1 ('Typical Resilient', use amber/muted color) shows price dropping according to '${activeScenario.resilient.priceImpact}' and recovering partially/fully. Line 2 ('$ROACH', use primary green color) shows a response based on '${activeScenario.roach.priceImpact}' (e.g., smaller dip, faster recovery, potential gain post-stress). Shade 'Stress Event' zone. Clean infographic style, match theme colors. Research: Tufte's Principles (Data-Ink Ratio), Visual Comparison Effectiveness.`}
                                />
                                {/* Static Resilient Token Card */}
                                <ScenarioCard
                                    tokenName="Typical Static Response"
                                    tokenIcon={ShieldCheck} // Using Shield icon for static resilience
                                    isRoach={false}
                                    priceData={mapPriceImpactToVisual(activeScenario.resilient.priceImpact, false)}
                                    rewardData={mapRewardLevelToVisual(activeScenario.resilient.rewardLevel)}
                                    sentiment={activeScenario.resilient.sentiment}
                                    outcome={activeScenario.resilient.outcome}
                                    scenarioColor={activeScenario.color} // Base color from scenario
                                    clarification="Represents tokens with fixed mechanics (e.g., static tax/LP lock). Endures stress but lacks dynamic adaptation or benefit generation from chaos."
                                    visualPrompt={`AI Prompt: Focus on the 'Typical Resilient' line from the comparison prompt. Show the line dipping during the 'Stress Event' according to '${activeScenario.resilient.priceImpact}', potentially with slower recovery compared to $ROACH if applicable to the scenario. Use amber/yellow/muted color. Title: Static Resilience Behavior. Research: Mental Models (Illustrate Baseline Behavior).`}
                                />
                            </div>
                        </motion.div>
                    </TabsContent>
                </AnimatePresence>
            </Tabs>

            <div className="mt-12 text-center text-xs text-muted-foreground/80 max-w-3xl mx-auto border-t pt-5 border-border/20 dark:border-border/15">
                * <span className="font-semibold text-foreground/80">Antifragile Advantage Disclaimer:</span> Performance simulations are illustrative, based on theoretical mechanics. Actual market outcomes depend on numerous complex factors including overall market conditions, liquidity depth, trading volume, and participant behavior. $ROACH's design *aims* to benefit from volatility, but this does not guarantee profit or prevent losses. DYOR.
            </div>
        </Section>
    );
}

// --- ScenarioCard Sub-Component ---
interface ScenarioCardProps { tokenName: string; tokenIcon: React.ElementType; tier?: number; priceData: { text: string; icon: React.ElementType; colorClass: string }; rewardData: { text: string; value: number; colorClass: string; icon: React.ElementType }; sentiment: string; outcome: string; isRoach: boolean; scenarioColor: string; clarification?: string; visualPrompt: string; }

function ScenarioCard({ tokenName, tokenIcon: TokenIcon, tier, priceData, rewardData, sentiment, outcome, isRoach, scenarioColor, clarification, visualPrompt }: ScenarioCardProps) {
    const baseCardColors = isRoach ? tierColorMap[tier ?? 2] : scenarioColorMap['gray']; // Default gray for resilient, tier color for ROACH
    const activeTierColors = isRoach && tier ? tierColorMap[tier] : null; // Specific tier colors for badge/accenting

    return (
        <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 350, damping: 15 }}>
            <Card className={cn(
                "flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 border overflow-hidden",
                // Apply subtle border color based on type, maybe tier for ROACH
                isRoach && activeTierColors ? activeTierColors.border : "border-border/30",
                isRoach && activeTierColors ? activeTierColors.darkBorder : "dark:border-border/40",
                "bg-card" // Standard card background
            )}>
                {/* Card Header: Icon, Title, Tier Badge */}
                <CardHeader className={cn(
                    "pb-3 pt-4 px-4 border-b flex-row items-center justify-between gap-2",
                    // Subtle bg/border matching card type
                    isRoach && activeTierColors ? activeTierColors.bg : "bg-muted/30 dark:bg-muted/10",
                    isRoach && activeTierColors ? activeTierColors.border.replace('border-', 'border-b-') : "border-b-border/20"
                )}>
                    <div className="flex items-center gap-2">
                        {isRoach ? <TokenIcon size="xs" className={cn("shrink-0", activeTierColors?.text, activeTierColors?.darkText)} /> : <TokenIcon className={cn("h-5 w-5 shrink-0 text-muted-foreground")} />}
                        <CardTitle className={cn("text-sm sm:text-base font-semibold leading-tight", isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-foreground/90')}>{tokenName}</CardTitle>
                    </div>
                    {isRoach && tier && activeTierColors && (
                        <TooltipProvider><Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant="secondary" className={cn("text-[0.7rem] sm:text-xs px-2 py-0.5 whitespace-nowrap transition-colors duration-300 shadow-sm", activeTierColors.bg, activeTierColors.text, activeTierColors.border, activeTierColors.darkBorder, activeTierColors.darkText)}>
                                    Tier {tier} Active
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent><p className="text-xs">Current simulated tier: {tierData[tier - 1]?.name}</p></TooltipContent>
                        </Tooltip></TooltipProvider>
                    )}
                </CardHeader>

                {/* Card Content: Metrics, Visual Placeholder, Outcome */}
                <CardContent className="p-4 space-y-4 flex-grow flex flex-col">
                    {clarification && <p className="text-xs italic text-muted-foreground/80 border-l-2 border-border pl-2">{clarification}</p>}

                    {/* Key Metrics Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm flex-grow min-h-[100px]">
                        {/* Price Impact Metric */}
                        <MetricDisplay label="Est. Price Impact" value={priceData.text} icon={priceData.icon} colorClass={priceData.colorClass} />
                        {/* Holder Rewards Metric (with Progress Bar) */}
                        <div className="space-y-1.5">
                            <MetricDisplay label="Holder Rewards" value={rewardData.text} icon={rewardData.icon} colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground'} />
                            <Progress value={rewardData.value} className="h-2" indicatorClassName={cn(rewardData.colorClass, 'transition-all duration-500 ease-out')} aria-label={`Reward level: ${rewardData.text}`} />
                        </div>
                        {/* Estimated Sentiment Metric */}
                        <MetricDisplay label="Est. Sentiment" value={sentiment} icon={sentiment === 'Neutral' || sentiment === 'Slight Concern' ? MessageCircleWarning : sentiment === 'Strengthened / Strategic' || sentiment === 'Confident / Contrarian' || sentiment === 'Opportunistic' ? Award : TrendingDown} colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground'} />
                    </div>

                    {/* Visual Placeholder Area */}
                    <div className="relative mt-4 bg-muted/20 dark:bg-white/5 border border-dashed border-border/40 rounded-lg flex items-center justify-center p-3 aspect-[16/7] min-h-[100px]">
                        <p className="text-[0.7rem] leading-snug text-muted-foreground/70 italic text-center px-2">
                            {visualPrompt}
                        </p>
                    </div>

                    {/* Outcome Footer */}
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

// --- MetricDisplay Sub-Component for Consistency ---
interface MetricDisplayProps { label: string; value: string; icon: React.ElementType; colorClass: string; }
function MetricDisplay({ label, value, icon: Icon, colorClass }: MetricDisplayProps) {
    return (
        <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center gap-1">
                <Icon className={cn("h-4 w-4 opacity-80", colorClass)} /> {label}:
            </span>
            <span className={cn("font-semibold text-base leading-tight", colorClass)}> {value}</span>
        </div>
    );
}
