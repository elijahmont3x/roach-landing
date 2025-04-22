// --- START OF FILE components/sections/04_MarketScenarios.tsx ---

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
import { Activity, Award, BarChartHorizontal, ChevronsDown, HelpCircle, MessageCircleWarning, Scale, ShieldAlert, ShieldCheck, TrendingDown, TrendingUp, Zap, MinusCircle } from "lucide-react"; // Import MinusCircle for fixed response
import React, { useMemo, useState } from 'react';

// Refined data: clearer examples, consistent language
const marketScenarios = [
    { id: 'stable', label: "Equilibrium", icon: Activity, description: "Balanced trading; minor fluctuations (e.g., typical +/- 2-5% intraday).", roach: { tier: 2, priceImpact: "Stable Range", rewardLevel: "Standard", sentiment: "Neutral/Building", outcome: "Operates at baseline Tier 2. 4% reflections sustain holder interest; 5% buy/7% sell taxes maintain balance." }, resilient: { priceImpact: "Stable Range", rewardLevel: "Fixed Low", sentiment: "Neutral", outcome: "Standard fixed tax (e.g., 3-5%) applies. No dynamic adjustment; system is passive." }, color: "gray" },
    { id: 'dip', label: "Moderate Dip", icon: ChevronsDown, description: "Noticeable sell-off (e.g., 10-20% correction over hours).", roach: { tier: 3, priceImpact: "Dip Cushioned", rewardLevel: "Increased", sentiment: "Opportunistic", outcome: "Tier 3 activates: Sell tax rises to 9% (boosting reflections to 6%), buy tax drops to 4% (encouraging entry). Starts active defense." }, resilient: { priceImpact: "Noticeable Dip", rewardLevel: "Fixed Low", sentiment: "Slight Concern", outcome: "Price follows market down. Fixed mechanics unchanged, offering no adaptive support or heightened incentive." }, color: "yellow" },
    { id: 'selloff', label: "Heavy Sell-off", icon: TrendingDown, description: "Significant downturn (e.g., 20-40% drop driven by market FUD).", roach: { tier: 4, priceImpact: "Defense Active", rewardLevel: "High", sentiment: "Contrarian Buying", outcome: "Tier 4 defense: Sell tax hits 12% (reflections 8%), strongly deterring panic. Buy tax lowers to 3%. System actively resists." }, resilient: { priceImpact: "Sharp Drop", rewardLevel: "Fixed Low", sentiment: "Anxious", outcome: "Price drops sharply with market trend. Static system provides no buffer against momentum selling." }, color: "orange" },
    { id: 'crash', label: "Market Flash Crash", icon: ShieldAlert, description: "Extreme volatility event (e.g., >40% plunge in short period).", roach: { tier: 5, priceImpact: "Antifragile Potential", rewardLevel: "Maximum", sentiment: "Strategic Accumulation", outcome: "Tier 5 peak: 15% sell tax / 10% reflection maximizes rewards from chaos. 2% buy tax creates prime entry. Designed to benefit." }, resilient: { priceImpact: "Severe Plunge", rewardLevel: "Fixed Low", sentiment: "Panic/Distress", outcome: "Experiences full market drawdown. Static nature offers no protection or benefit mechanism during extreme stress." }, color: "red" },
];

// Use tierColorMap for consistency
const tierColorMap = { /* ... import or define as in TokenMechanics ... */ };
// Assuming tierColorMap is available (imported or defined above)
const scenarioColorMap = {
    gray: { name: "Equilibrium", text: 'text-gray-600', bg: 'bg-gray-500/5 dark:bg-gray-800/20', border: 'border-gray-500/20 dark:border-gray-700/30', indicator: 'bg-gray-500', darkText: 'dark:text-gray-400' },
    yellow: { name: "Pressure", text: 'text-yellow-600', bg: 'bg-yellow-500/5 dark:bg-yellow-800/20', border: 'border-yellow-500/20 dark:border-yellow-700/30', indicator: 'bg-yellow-500', darkText: 'dark:text-yellow-400' },
    orange: { name: "Defense", text: 'text-orange-600', bg: 'bg-orange-500/5 dark:bg-orange-800/20', border: 'border-orange-500/20 dark:border-orange-700/30', indicator: 'bg-orange-500', darkText: 'dark:text-orange-400' },
    red: { name: "Recovery", text: 'text-red-600', bg: 'bg-red-500/5 dark:bg-red-900/20', border: 'border-red-500/20 dark:border-red-700/30', indicator: 'bg-red-500', darkText: 'dark:text-red-400' },
};

const mapRewardLevelToVisual = (level: string): { text: string; value: number; colorClass: string; icon: React.ElementType } => {
    switch (level.toLowerCase()) {
        case 'fixed low': return { text: "Fixed Low", value: 10, colorClass: scenarioColorMap['gray'].indicator, icon: MinusCircle };
        case 'standard': return { text: "Standard", value: 30, colorClass: scenarioColorMap['gray'].indicator, icon: Activity };
        case 'increased': return { text: "Increased", value: 60, colorClass: scenarioColorMap['yellow'].indicator, icon: TrendingUp };
        case 'high': return { text: "High", value: 85, colorClass: scenarioColorMap['orange'].indicator, icon: Award };
        case 'maximum': return { text: "Maximum", value: 100, colorClass: scenarioColorMap['red'].indicator, icon: Zap };
        default: return { text: level, value: 0, colorClass: "bg-muted", icon: HelpCircle };
    }
};

const mapPriceImpactToVisual = (impact: string, isRoach: boolean): { text: string; icon: React.ElementType; colorClass: string } => {
    const iL = impact.toLowerCase();
    const scenarioColorKey = Object.keys(scenarioColorMap).find(key =>
        iL.includes(scenarioColorMap[key as keyof typeof scenarioColorMap].name.toLowerCase().split(' ')[0])
    ) || 'gray';
    const colors = scenarioColorMap[scenarioColorKey as keyof typeof scenarioColorMap];

    if (iL.includes('stable')) return { text: "Stable", icon: Activity, colorClass: cn(colors.text, colors.darkText) };
    if (iL.includes('noticeable dip')) return { text: "Dip", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) }; // Used TrendingDown for dips too
    if (iL.includes('sharp drop')) return { text: "Sharp Drop", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) };
    if (iL.includes('severe plunge')) return { text: "Plunge", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) };

    if (isRoach) {
        if (iL.includes('cushioned')) return { text: "Cushioned", icon: ShieldCheck, colorClass: cn(colors.text, colors.darkText) };
        if (iL.includes('defense active')) return { text: "Defended", icon: ShieldCheck, colorClass: cn(colors.text, colors.darkText) };
        if (iL.includes('antifragile potential')) return { text: "Advantage*", icon: TrendingUp, colorClass: "text-primary dark:text-primary" }; // Primary for advantage
    }
    // Fallback for resilient price impacts if not explicitly covered above
    if (iL.includes('dip')) return { text: "Dip", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) };
    if (iL.includes('drop')) return { text: "Drop", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) };
    if (iL.includes('plunge')) return { text: "Plunge", icon: TrendingDown, colorClass: cn(colors.text, colors.darkText) };

    return { text: impact, icon: HelpCircle, colorClass: "text-muted-foreground" };
};

export function MarketScenarios() {
    const [activeScenarioId, setActiveScenarioId] = useState(marketScenarios[0].id); // Start with Stable
    const activeScenario = useMemo(() => marketScenarios.find(s => s.id === activeScenarioId) || marketScenarios[0], [activeScenarioId]);
    const currentColors = useMemo(() => scenarioColorMap[activeScenario.color as keyof typeof scenarioColorMap], [activeScenario.color]);

    const contentVariants = {
        initial: { opacity: 0, y: 15, filter: 'blur(3px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -15, filter: 'blur(3px)', transition: { duration: 0.3, ease: 'easeIn' } }
    };

    const cardMotionProps = { whileHover:{ y: -4, scale: 1.015, zIndex: 10 }, transition:{ type: "spring", stiffness: 400, damping: 15 }};

    return (
        <Section id="market-scenarios" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background/50 via-muted/5 to-background/80 dark:from-background/80 dark:via-background/10 dark:to-background">
            <SectionHeader
                title="Performance Under Pressure: $ROACH vs. Static Models"
                description="Compare simulated responses across market volatility levels. Observe how $ROACH's dynamic system aims to outperform static token models by adapting to stress."
                subtitle={<><Scale className="inline h-4 w-4 mr-1.5" /> Adaptive Scenario Comparison</>}
                alignment="center" className="mb-16"
            />

            <Tabs value={activeScenarioId} onValueChange={setActiveScenarioId} className="max-w-6xl mx-auto">
                <TabsList variant="segmented" className="md:grid-cols-4 mb-10 shadow-inner bg-muted/50 dark:bg-background/40 p-1.5 rounded-xl">
                    {marketScenarios.map((scenario) => {
                        const colors = scenarioColorMap[scenario.color as keyof typeof scenarioColorMap];
                        const isActive = scenario.id === activeScenarioId;
                        return (
                            <TabsTrigger
                                key={scenario.id} value={scenario.id}
                                variant="panel" // Use the defined panel variant
                                className={cn(
                                     "flex-col h-auto py-2 sm:py-2.5 px-1 sm:px-2 text-xs sm:text-sm gap-1 items-center justify-center relative group data-[state=active]:shadow-md rounded-lg", // Base styles for panel variant
                                     isActive
                                     ? cn("font-semibold z-10", colors.text, colors.darkText, "bg-card dark:bg-card border-border/50 dark:border-border/30 shadow-primary/10 dark:shadow-black/30") // Active state relies on panel variant's styling
                                     : "text-muted-foreground hover:text-foreground/90 hover:bg-accent/30 dark:hover:bg-accent/10 opacity-80 hover:opacity-100" // Inactive state
                                )}
                            >
                                <scenario.icon className={cn("h-5 w-5 mb-0.5 transition-colors", isActive ? cn(colors.text, colors.darkText) : 'text-muted-foreground group-hover:text-foreground/80')} />
                                <span className="text-center leading-tight">{scenario.label}</span>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                <AnimatePresence mode="wait">
                    <TabsContent key={activeScenarioId} value={activeScenarioId} forceMount className="mt-0 outline-none focus-visible:ring-0">
                         <motion.div variants={contentVariants} initial="initial" animate="animate" exit="exit">
                             {/* Context Banner */}
                             <div className={cn(
                                "mb-10 p-4 rounded-lg border-l-4 flex items-start sm:items-center gap-3 sm:gap-4 shadow-md",
                                currentColors.border.replace('border-', 'border-l-'), currentColors.darkBorder?.replace('border-', 'border-l-'), // Use dynamic border color
                                currentColors.bg, currentColors.darkBg // Use dynamic bg color
                            )}>
                                <activeScenario.icon className={cn("h-6 w-6 sm:h-7 sm:w-7 shrink-0 mt-0.5 sm:mt-0", currentColors.text, currentColors.darkText)} />
                                <div>
                                    <h4 className={cn("font-semibold text-base sm:text-lg", currentColors.text, currentColors.darkText)}>Scenario: {activeScenario.label}</h4>
                                    <p className="text-sm text-muted-foreground">{activeScenario.description}</p>
                                </div>
                             </div>
                              {/* Comparison Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch relative">
                                 {/* Card 1: $ROACH */}
                                <motion.div {...cardMotionProps}>
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
                                         visualPrompt={`AI Prompt: Graph for $ROACH: Show initial dip then recovery/strengthening correlated with Tier ${activeScenario.roach.tier} activation. Highlight reward spikes. Style: Dynamic, green/primary accents.`}
                                     />
                                 </motion.div>
                                 {/* Card 2: Typical Static */}
                                 <motion.div {...cardMotionProps} style={{ zIndex: 5 }}> {/* Adjust zIndex if overlap occurs during animation */}
                                     <ScenarioCard
                                        tokenName="Typical Static Response"
                                        tokenIcon={ShieldCheck} // Keeping shield for 'resilient' visual
                                        isRoach={false}
                                        priceData={mapPriceImpactToVisual(activeScenario.resilient.priceImpact, false)}
                                        rewardData={mapRewardLevelToVisual(activeScenario.resilient.rewardLevel)}
                                        sentiment={activeScenario.resilient.sentiment}
                                        outcome={activeScenario.resilient.outcome}
                                        scenarioColor={activeScenario.color} // Use scenario color to show external conditions
                                        clarification="Represents tokens with fixed mechanics (static tax, basic LP lock). Endures stress but doesn't adapt or gain from it."
                                        visualPrompt={`AI Prompt: Graph for Static: Show price following market trend closely. Indicate fixed, low reward levels. Style: Simple, baseline, ${activeScenario.color} accents.`}
                                     />
                                 </motion.div>
                             </div>
                         </motion.div>
                    </TabsContent>
                </AnimatePresence>
            </Tabs>

            {/* Disclaimer */}
            <div className="mt-12 text-center text-xs text-muted-foreground/80 max-w-3xl mx-auto border-t border-border/20 pt-5">
                * <strong className="text-foreground/80">Antifragile Potential:</strong> Performance simulations are illustrative conceptual models based on the whitepaper's mechanics and intended behavior. Actual market performance involves numerous unpredictable factors. Always conduct your own thorough research (DYOR) before making any investment decisions.
            </div>
        </Section>
    );
}


// --- ScenarioCard Sub-Component Refined ---
interface ScenarioCardProps {
    tokenName: string; tokenIcon: React.ElementType; tier?: number; priceData: { text: string; icon: React.ElementType; colorClass: string }; rewardData: { text: string; value: number; colorClass: string; icon: React.ElementType };
    sentiment: string; outcome: string; isRoach: boolean; scenarioColor: string; clarification?: string; visualPrompt: string;
}

function ScenarioCard({ tokenName, tokenIcon: TokenIcon, tier, priceData, rewardData, sentiment, outcome, isRoach, scenarioColor, clarification, visualPrompt }: ScenarioCardProps) {
    const activeTierColors = isRoach && tier ? tierColorMap[tier] : null; // Assuming tierColorMap definition from TokenMechanics
    const currentScenarioColors = scenarioColorMap[scenarioColor as keyof typeof scenarioColorMap];

    return (
        <Card className={cn(
            "flex flex-col h-full transition-all duration-300 overflow-hidden border dark:bg-card/60 backdrop-blur-sm shadow-md",
             isRoach && activeTierColors ? activeTierColors.border : "border-border/20 dark:border-border/30", // Dynamic border for Roach
             isRoach ? "dark:shadow-primary/10" : "dark:shadow-black/20" // Subtle shadow differences
        )}>
            <CardHeader className={cn(
                "flex-row items-center justify-between gap-2 border-b",
                isRoach && activeTierColors ? `${activeTierColors.bg} ${activeTierColors.border.replace('border-','border-b-')}` : "bg-muted/20 dark:bg-muted/10 border-b-border/20",
                 "transition-colors duration-300 py-3 px-4" // Adjusted padding
            )}>
                <div className="flex items-center gap-2.5">
                    {isRoach ? <TokenIcon size="xs" className={cn("shrink-0 w-6 h-6 transition-colors duration-300", activeTierColors?.text, activeTierColors?.darkText)} />
                             : <TokenIcon className={cn("h-5 w-5 shrink-0 text-muted-foreground/80")} />}
                    <CardTitle className={cn(
                        "text-sm sm:text-base font-semibold leading-tight transition-colors duration-300",
                         isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-foreground/95'
                    )}>{tokenName}</CardTitle>
                 </div>
                 {isRoach && tier && activeTierColors && (
                     <TooltipProvider><Tooltip delayDuration={100}>
                         <TooltipTrigger asChild>
                            <Badge variant="secondary" className={cn("text-[10px] sm:text-[11px] px-1.5 py-0.5 whitespace-nowrap transition-colors duration-300 shadow-sm border", activeTierColors.bg, activeTierColors.text, activeTierColors.border, activeTierColors.darkBorder)}>
                                Tier {tier} Active
                             </Badge>
                         </TooltipTrigger>
                         <TooltipContent><p className="text-xs">Active simulated tier: {tierData[tier - 1]?.name}</p></TooltipContent>
                    </Tooltip></TooltipProvider>
                 )}
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-5 flex-grow flex flex-col">
                {clarification && <p className="text-xs italic text-muted-foreground/90 border-l-2 border-border/40 pl-2 py-1 bg-muted/10 rounded-r-sm">{clarification}</p>}

                <div className="grid grid-cols-2 gap-4 text-sm flex-grow min-h-[100px]">
                    <MetricDisplay label="Price Impact" value={priceData.text} icon={priceData.icon} colorClass={priceData.colorClass} />
                    <div className="space-y-1">
                        <MetricDisplay label="Holder Rewards" value={rewardData.text} icon={rewardData.icon} colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground/80'} />
                        <Progress value={rewardData.value} className={cn("h-1.5 [&>div]:transition-all [&>div]:duration-500 [&>div]:ease-out", `[&>div]:${rewardData.colorClass}`)} aria-label={`Reward level: ${rewardData.text}`} />
                    </div>
                     <MetricDisplay label="Est. Sentiment" value={sentiment}
                                  icon={
                                    sentiment.toLowerCase().includes('neutral') || sentiment.toLowerCase().includes('concern') ? MessageCircleWarning :
                                    sentiment.toLowerCase().includes('opportunistic') || sentiment.toLowerCase().includes('contrarian') || sentiment.toLowerCase().includes('strategic') || sentiment.toLowerCase().includes('building') ? Award :
                                    sentiment.toLowerCase().includes('anxious') || sentiment.toLowerCase().includes('panic') || sentiment.toLowerCase().includes('distress') ? ShieldAlert : TrendingDown
                                  }
                                  colorClass={isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : 'text-muted-foreground/80'} />
                 </div>

                 {/* Enhanced Visual Placeholder */}
                 <div className="relative mt-4 border border-dashed border-border/30 dark:border-border/40 rounded-lg flex items-center justify-center p-3 aspect-[16/6] min-h-[100px] overflow-hidden bg-gradient-to-br from-muted/10 via-transparent to-muted/10 shadow-inner">
                    <p className="text-[10px] leading-snug text-muted-foreground/70 italic text-center px-2 z-10">
                         {visualPrompt}
                         <span className="block mt-1 text-[9px] tracking-wider font-medium uppercase text-muted-foreground/50">
                           Research: Comparative Visualization Best Practices
                       </span>
                    </p>
                    {/* Background elements */}
                     <TokenIcon className={cn("absolute -bottom-2 -left-2 h-12 w-12 opacity-[0.04] pointer-events-none transform rotate-[-10deg]", isRoach && activeTierColors?.text, !isRoach && 'text-muted-foreground')} />
                 </div>

                 <div className={cn(
                     "mt-auto pt-4 text-center text-sm font-medium leading-normal border-t border-border/20 dark:border-border/30 text-balance",
                     isRoach && activeTierColors ? cn(activeTierColors.text, activeTierColors.darkText) : "text-foreground/90"
                 )}>
                    {outcome}
                 </div>
             </CardContent>
         </Card>
     );
}


// --- MetricDisplay Sub-Component Refined ---
interface MetricDisplayProps { label: string; value: string; icon: React.ElementType; colorClass: string; }
function MetricDisplay({ label, value, icon: Icon, colorClass }: MetricDisplayProps) {
    return (
        <div className="flex flex-col">
             <span className="text-[11px] font-medium text-muted-foreground mb-0 flex items-center gap-1">
                 <Icon className={cn("h-3.5 w-3.5 opacity-80", colorClass)} /> {label}:
             </span>
            <span className={cn("font-semibold text-base sm:text-lg leading-tight", colorClass)}>{value}</span>
        </div>
    );
}
// --- END OF FILE components/sections/04_MarketScenarios.tsx ---