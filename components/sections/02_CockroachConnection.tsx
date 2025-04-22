// --- START OF FILE components/sections/02_CockroachConnection.tsx ---
"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dna, Link2, Network, RotateCw, ShieldCheck, Zap, Info, Microscope } from "lucide-react"; // Use ShieldCheck, RotateCw, Zap more directly

// Trait Data - Aligned icons with functions
const traits = [
    {
        icon: Zap, title: "Extreme Stress Resilience",
        cockroachFact: "Can withstand pressures that destroy most organisms, adapting physiologically.",
        tokenLinkTitle: "Parallel: Tier 5 'Recovery' Dynamics",
        tokenLinkText: "Maximum Sell Tax (15%) and Reflections (10%) designed to thrive under extreme market volatility, echoing natural survivability.",
        color: "red",
    },
    {
        icon: ShieldCheck, title: "Defensive Structure",
        cockroachFact: "A hardened exoskeleton provides robust physical protection against immediate threats.",
        tokenLinkTitle: "Parallel: High-Tier Sell Tax Pressure",
        tokenLinkText: "Increased Sell Taxes (Tiers 4 & 5, up to 15%) act as an economic deterrent against sudden, large sell-offs, stabilizing the system.",
        color: "orange",
    },
    {
        icon: RotateCw, title: "Adaptive Mechanisms",
        cockroachFact: "Can rapidly develop resistance to environmental toxins and behavioral adaptations.",
        tokenLinkTitle: "Parallel: 4-Hour Dynamic Adjustment Cycle",
        tokenLinkText: "The contract's 4-hour re-evaluation cycle allows for swift adaptation of tax tiers to evolving market conditions.",
        color: "yellow",
    },
    {
        icon: Network, title: "Decentralized Functionality",
        cockroachFact: "Distributed nervous system and breathing through spiracles allows continued function even with significant damage.",
        tokenLinkTitle: "Parallel: Automated Reflection Distribution",
        tokenLinkText: "Rewards are automatically distributed network-wide to holders via the smart contract, ensuring decentralized benefit flow.",
        color: "blue",
    },
];

// Color map - Keep for thematic styling
const colorMap = {
    red: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/5 dark:bg-red-900/30', border: 'border-red-500/20 dark:border-red-700/30', iconBg: 'bg-red-100 dark:bg-red-900/50', hoverBorder: 'hover:border-red-500/40' },
    orange: { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/5 dark:bg-orange-900/30', border: 'border-orange-500/20 dark:border-orange-700/30', iconBg: 'bg-orange-100 dark:bg-orange-900/50', hoverBorder: 'hover:border-orange-500/40' },
    yellow: { text: 'text-yellow-600 dark:text-yellow-500', bg: 'bg-yellow-500/5 dark:bg-yellow-800/30', border: 'border-yellow-500/20 dark:border-yellow-700/30', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', hoverBorder: 'hover:border-yellow-500/40' },
    blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/5 dark:bg-blue-900/30', border: 'border-blue-500/20 dark:border-blue-700/30', iconBg: 'bg-blue-100 dark:bg-blue-900/50', hoverBorder: 'hover:border-blue-500/40' },
};

// Animation Variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 25, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } } };

export function CockroachConnection() {

    return (
        <Section
            id="cockroach-connection"
            className="py-20 md:py-28 lg:py-32 bg-muted/5 dark:bg-background/5"
            gradientBackground
            patternBackground="/patterns/hexagons.svg" // Example pattern
            gradientOpacity={0.08}
            patternOpacity={0.01}
        >
            <SectionHeader
                title="Nature's Masterpiece: The Resilience Blueprint"
                description="More than a mascot, the cockroach's unparalleled survival engineering informs $ROACH's core mechanics. Discover the bio-inspired connection."
                subtitle={<><Dna className="inline h-4 w-4 mr-1.5" /> Bio-Inspired Tokenomics</>}
                alignment="center"
                className="mb-16 md:mb-20"
            />

            {/* Intro Row with Framer Motion */}
            <motion.div
                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto mb-16 md:mb-24" // Increased gap and bottom margin
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                        Engineering Inspired by Evolution
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-prose mb-6">
                        For ~300 million years, cockroaches have perfected survival. They embody true antifragility, adapting and thriving where others perish. $ROACH translates these biological principles into a crypto-economic system designed for the inherent volatility of the market.
                    </p>
                    {/* Optional small badge or highlight */}
                     <div className="flex items-center gap-2 text-sm text-primary/80 font-medium">
                        <Microscope className="h-4 w-4" />
                        <span>Applying Nature's Algorithms</span>
                    </div>
                </motion.div>

                {/* Combined Mascot and Diagram Placeholder */}
                <motion.div variants={itemVariants} className="relative flex items-center justify-center order-1 lg:order-2 aspect-[5/4] lg:aspect-square">
                    {/* Visual Placeholder for the diagram */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent border border-dashed border-border/20 rounded-lg p-4 flex items-center justify-center shadow-inner opacity-60">
                        <p className="text-xs text-muted-foreground/60 italic text-center">
                           AI Prompt: Design a schematic linking biological traits (exoskeleton, decentralized function, adaptation) to corresponding $ROACH tokenomic features (sell tax walls, auto-reflections, dynamic tiers). Use clear icons and connecting lines. Style: Clean, technical, blueprint-like. Palette: Use $ROACH primary color accents.
                            <span className="block mt-1 text-[9px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                Research: Metaphorical Framing, Conceptual Mapping
                            </span>
                        </p>
                    </div>
                    {/* Mascot overlaps slightly */}
                    <motion.div whileHover={{ scale: 1.05, rotate: 2 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="relative z-10 w-[70%] lg:w-[80%]">
                        <CockroachMascot size="xl" className="text-primary drop-shadow-lg" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Trait Cards grid */}
            <motion.div
                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto" // Increased max-width slightly
            >
                {traits.map((trait, index) => {
                    const colors = colorMap[trait.color as keyof typeof colorMap];
                    return (
                        <motion.div key={trait.title} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                            <HoverCard openDelay={150} closeDelay={100}>
                                <HoverCardTrigger asChild>
                                    {/* Use consistent Card application */}
                                    <Card className={cn(
                                        "h-full flex flex-col group cursor-help overflow-hidden shadow-sm dark:shadow-md dark:shadow-black/10",
                                        "border transition-colors duration-300 dark:bg-card/50 backdrop-blur-sm", // Added backdrop
                                        colors.border,
                                        colors.hoverBorder
                                    )}>
                                        <CardContent className="flex-grow flex flex-col gap-3 pt-5 pb-4 px-4 md:px-5"> {/* Adjusted padding */}
                                            {/* Top part: Icon and Title */}
                                            <div className="flex items-start gap-3">
                                                 <div className={cn("p-2 rounded-lg shrink-0 border", colors.iconBg, colors.border)}>
                                                    <trait.icon className={cn("h-5 w-5", colors.text)} />
                                                 </div>
                                                <CardTitle className={cn("text-base sm:text-lg font-semibold leading-snug", colors.text, "transition-colors duration-200 group-hover:", colors.text.replace('-600','-700').replace('-400','-500'))}>{trait.title}</CardTitle>
                                            </div>
                                            {/* Middle part: Fact */}
                                            <p className="text-sm text-muted-foreground flex-grow leading-relaxed my-1 text-balance">{trait.cockroachFact}</p>
                                            {/* Footer part: Link Hint */}
                                            <div className={cn(
                                                "mt-auto pt-2 border-t border-border/20 text-xs text-muted-foreground flex items-center justify-end gap-1",
                                                "opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" // Only show on hover
                                            )}>
                                                <Info className="h-3.5 w-3.5" /> Hover for $ROACH link
                                            </div>
                                        </CardContent>
                                    </Card>
                                </HoverCardTrigger>
                                {/* Hover Card Content (Pop-up) */}
                                <HoverCardContent side="top" align="center" className={cn(
                                    "w-72 max-w-[calc(100vw-2rem)] shadow-xl border rounded-lg p-4 backdrop-blur-lg", // Enhanced pop-up style
                                    colors.border, colors.bg.replace('/5','/10').replace('/15','/25') // Slightly stronger bg on hover
                                )}>
                                     <div className="space-y-2">
                                        <h4 className={cn("text-sm font-semibold flex items-center gap-1.5", colors.text)}>
                                            <Link2 className="h-4 w-4 opacity-80" /> $ROACH Parallel:
                                        </h4>
                                        <p className="text-xs font-medium text-foreground/90 mb-1">{trait.tokenLinkTitle}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{trait.tokenLinkText}</p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
}
// --- END OF FILE components/sections/02_CockroachConnection.tsx ---