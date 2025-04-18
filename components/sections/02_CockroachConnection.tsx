// --- START OF FILE components/sections/CockroachConnection.tsx ---
"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Atom, Bug, Dna, Info, Link2, Network, RotateCw, Shield, Zap } from "lucide-react"; // Added Dna, Atom for bio/tech link

// Updated Trait Data with Clearer Connections
const traits = [
    {
        icon: Zap, // Extreme resilience / Energy Absorption
        title: "Extreme Stress Tolerance",
        cockroachFact: "Can withstand high radiation doses, survive decapitation for weeks, and endure extreme environments.",
        tokenLinkTitle: "Parallel: Tier 5 'Recovery' Mode",
        tokenLinkText: "Max sell tax (15%) & reflection (10%) engage under extreme duress, mirroring inherent survivability. Low buy tax (2%) incentivizes recovery.",
        color: "red",
    },
    {
        icon: Shield, // Defense / Exoskeleton
        title: "Structural Defense",
        cockroachFact: "Possesses a hardened exoskeleton providing significant physical protection against external forces.",
        tokenLinkTitle: "Parallel: High-Tier Sell Pressure Deterrence",
        tokenLinkText: "Steeply increased sell taxes in Tiers 4 (12%) & 5 (15%) create an economic 'exoskeleton' discouraging large, destabilizing sell-offs.",
        color: "orange",
    },
    {
        icon: RotateCw, // Adaptation / Resistance
        title: "Rapid Adaptation",
        cockroachFact: "Populations can quickly develop behavioral or physiological resistance to pesticides and threats.",
        tokenLinkTitle: "Parallel: Dynamic 4-Hour Adjustment Cycle",
        tokenLinkText: "The system re-evaluates the Sell/Buy Ratio every 4 hours, enabling swift tier adjustments to adapt to changing market conditions.",
        color: "yellow",
    },
    {
        icon: Network, // Decentralized function / Resilience
        title: "Distributed Functionality",
        cockroachFact: "Can operate with a decentralized nervous system; breathing occurs through body spiracles.",
        tokenLinkTitle: "Parallel: Automated Reflection Distribution",
        tokenLinkText: "Reflections are automatically sent network-wide to all holders via the smart contract, enhancing collective benefit without central bottlenecks.",
        color: "blue",
    },
];

// Color map remains useful
const colorMap = {
    red: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 dark:bg-red-500/15', border: 'border-red-500/30 dark:border-red-500/35', hoverBorder: 'hover:border-red-500/50 dark:hover:border-red-400/50' },
    orange: { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 dark:bg-orange-500/15', border: 'border-orange-500/30 dark:border-orange-500/35', hoverBorder: 'hover:border-orange-500/50 dark:hover:border-orange-400/50' },
    yellow: { text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 dark:bg-yellow-500/15', border: 'border-yellow-500/30 dark:border-yellow-500/35', hoverBorder: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50' },
    blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-500/15', border: 'border-blue-500/30 dark:border-blue-500/35', hoverBorder: 'hover:border-blue-500/50 dark:hover:border-blue-400/50' },
};

// Animation Variants (using standard variants)
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export function CockroachConnection() {

    return (
        <Section
            id="cockroach-connection"
            className="py-20 md:py-28 lg:py-32 bg-muted/10 dark:bg-background/10"
        >
            <SectionHeader
                title="Bio-Inspired Engineering: The Roach Resilience Model"
                description="Nature's ultimate survivor meets cutting-edge tokenomics. The cockroach's proven antifragility isn't just a metaphor—it's the blueprint for $ROACH's adaptive economic design."
                subtitle={<><Dna className="inline h-4 w-4 mr-1.5" /> Nature Meets Tech</>}
                alignment="center"
                className="mb-16"
            />

            {/* Intro Row: Mascot + Text + Diagram Placeholder */}
            <motion.div
                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-6xl mx-auto mb-16 md:mb-20"
            >
                {/* Mascot & Text Column */}
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <motion.div whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.98 }}>
                        <CockroachMascot size="xl" className="mb-6 text-foreground/70 dark:text-foreground/60 transition-transform" />
                    </motion.div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground/95">
                        Modelled on 300 Million Years of Survival
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
                        Thriving through cataclysms, the cockroach embodies unparalleled antifragile engineering. $ROACH translates these principles of extreme adaptation and distributed strength into a dynamic tokenomic framework designed for the volatile crypto landscape.
                    </p>
                </motion.div>

                {/* Diagram Placeholder Column */}
                <motion.div variants={itemVariants}>
                    <div className="relative aspect-[4/3] bg-muted/20 dark:bg-white/5 border border-dashed border-border/30 rounded-lg p-4 flex items-center justify-center shadow-inner">
                        <p className="text-xs text-muted-foreground/70 italic max-w-md text-center">
                            AI Prompt: Create a clean, schematic diagram linking Cockroach traits to $ROACH mechanics. Left side: icons for cockroach traits (Radiation Tolerance [Zap/Atom], Exoskeleton [Shield], Adaptation [RotateCw], Decentralized Nervous System [Network]). Right side: simplified icons for corresponding $ROACH mechanics (Tier 5 badge, High Sell Tax symbol [%↑], 4hr Clock icon, Reflection Distribution [Users icon]). Connect with subtle, styled arrows. Use theme colors (primary for $ROACH side, neutral/trait-colors for biology side). Title: Bio-Mimetic Mapping.
                            <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                Research: Dual-Coding Theory (Visual Mapping), Cognitive Load Reduction (Clear Analogy)
                            </span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Trait Cards grid */}
            <motion.div
                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
            >
                {traits.map((trait) => {
                    const colors = colorMap[trait.color as keyof typeof colorMap];
                    return (
                        <motion.div key={trait.title} variants={itemVariants}>
                            <HoverCard openDelay={150} closeDelay={100}>
                                <HoverCardTrigger asChild>
                                    <Card className={cn(
                                        "h-full border shadow-md transition-all duration-300 flex flex-col group cursor-help overflow-hidden", // Group for hover effect
                                        "hover:shadow-lg hover:scale-[1.02] hover:border-primary/30", // Hover styling
                                        "focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 dark:focus-within:ring-offset-background",
                                        colors.border, "dark:bg-card/60" // Dark mode slight transparency
                                    )}>
                                        <CardContent className="p-5 flex-grow flex flex-col">
                                            {/* Card Header Area */}
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <div className="flex items-start gap-3">
                                                    <div className={cn("p-2 rounded-lg shrink-0 border", colors.bg, colors.border)}>
                                                        <trait.icon className={cn("h-6 w-6", colors.text)} />
                                                    </div>
                                                    <CardTitle className="text-base sm:text-lg font-semibold leading-snug pt-1">{trait.title}</CardTitle>
                                                </div>
                                                <Info className="h-4 w-4 text-muted-foreground/40 shrink-0 group-hover:text-primary transition-colors duration-200 opacity-70 group-hover:opacity-100" aria-hidden="true" />
                                            </div>
                                            {/* Cockroach Fact */}
                                            <div className="flex items-start gap-2.5 text-sm text-muted-foreground flex-grow mb-4">
                                                <Bug className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                                                <p><span className="font-semibold text-foreground/80">Biological Inspiration:</span> {trait.cockroachFact}</p>
                                            </div>
                                            {/* Footer Hover Hint */}
                                            <div className="mt-auto pt-3 border-t border-border/20 text-xs text-muted-foreground text-right group-hover:text-primary transition-colors duration-200">
                                                Hover to see $ROACH Parallel <Link2 className="inline h-3 w-3 ml-0.5" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </HoverCardTrigger>
                                {/* HoverCard Content Styling */}
                                <HoverCardContent side="top" align="center" className={cn(
                                    "w-80 max-w-[calc(100vw-2rem)] shadow-xl border rounded-lg p-4 backdrop-blur-md",
                                    colors.border, colors.bg, "dark:shadow-lg"
                                )}>
                                    <div className="space-y-1.5">
                                        <h4 className={cn("text-sm font-semibold flex items-center gap-1.5", colors.text)}>
                                            <Atom className="h-4 w-4" /> $ROACH Mechanic Link
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
// --- END OF FILE components/sections/CockroachConnection.tsx ---