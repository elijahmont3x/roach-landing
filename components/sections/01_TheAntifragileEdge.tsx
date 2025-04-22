// --- START OF FILE components/sections/01_TheAntifragileEdge.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
// Updated icon imports with more conceptually rich options
import { 
  Activity, ExternalLink, TrendingDown, TrendingUp, Sparkles, 
  Binary, Network, Orbit, Dna, Waves, LineChart, SigmaSquare,
  GlassWater,
  BrickWallFire,
  Rocket
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaDumpsterFire, FaSuitcaseRolling } from "react-icons/fa6";

// Enhanced concept data with improved analogies and examples
const concepts = [
  { 
    value: "fragile", 
    label: "Fragile", 
    icon: TrendingDown, // Represents rigid binary systems with no flexibility
    colorTheme: "destructive", 
    summary: "Weakens Under Stress", 
    definition: "Systems actively harmed or degraded by shocks, volatility, errors, and randomness. They thrive only in predictable, stable environments.", 
    characteristics: ["Degrades Quickly", "Fears Uncertainty", "Requires Predictability", "Sensitive to Small Shocks"], 
    cryptoExample: "Most 'Pump & Fun' tokens, over-leveraged positions lacking risk management, un-audited DeFi protocols vulnerable to single exploits.", 
    responseToStress: { label: "Degrades / Breaks", icon: TrendingDown }, 
    // More crypto-relevant analogy that investors will recognize
    metaphor: "Liquidation Cascade", 
    talebQuote: '"Fragility is aversion to volatility." - Nassim Taleb', 
    visualPrompt: "Subject: Systemic Breakdown Visualization; Style: Glitchy, chaotic digital art; Composition: Line graph sharply declining into fragmentation, resembling broken data streams; Palette: Sharp reds, error blues, dark grays; Keywords: failure, error, vulnerability, system collapse; Message: Emphasis on catastrophic failure from stress." 
  },
  { 
    value: "resilient", 
    label: "Resilient", 
    icon: Activity, // Represents interconnected systems that distribute shock
    colorTheme: "amber", 
    summary: "Withstands & Recovers", 
    definition: "Systems capable of absorbing shocks and returning to their original state or functionality after disturbances. They endure stress but do not gain from it.", 
    characteristics: ["Recovers to Baseline", "Absorbs Shocks", "Static Structure", "Maintains Equilibrium"], 
    cryptoExample: "Stablecoins successfully maintaining their peg during moderate volatility, well-established blockchains weathering network congestion, simple locked LP tokens with no dynamic features.", 
    responseToStress: { label: "Recovers to Original State", icon: Activity }, 
    // More crypto-relevant analogy
    metaphor: "Bitcoin Difficulty Adjustment", 
    talebQuote: '"The resilient resists shocks and stays the same." - Nassim Taleb', 
    visualPrompt: "Subject: System Resilience Cycle; Style: Clean, technical flowchart; Composition: Line graph showing a temporary dip followed by a complete return to the previous level, loop indication; Palette: Stable amber/yellow, neutral grays, clear indication of recovery path; Keywords: stability, recovery, bounce-back, endurance; Message: Illustration of returning to the status quo post-disturbance." 
  },
  { 
    value: "antifragile", 
    label: "$ROACH", 
    icon: TrendingUp, // Represents evolutionary systems that adapt and grow
    colorTheme: "green", 
    summary: "Gains Strength from Chaos", 
    definition: "$ROACH's Goal: To embody systems that *actively benefit* from shocks, volatility, randomness, and stressors. Uses disorder as fuel for improvement.", 
    characteristics: ["Benefits from Volatility", "Improves Under Pressure", "Leverages Chaos", "Adapts Dynamically ($ROACH 5-Tier System)"], 
    cryptoExample: "$ROACH aims to achieve this via its adaptive tax/reflection model converting sell-offs into holder rewards and potential price floor strengthening, actively using volatility for ecosystem fortification.", 
    responseToStress: { label: "Strengthens / Improves", icon: TrendingUp }, 
    // Crypto-focused analogy that shows sophistication
    metaphor: "Positive Convexity", 
    talebQuote: '"The antifragile gets better from shocks." - Nassim Taleb', 
    visualPrompt: "Subject: Antifragile System Growth Spiral; Style: Energetic, abstract, biological-tech fusion; Composition: Ascending spiral graph where each 'stress point' (node) leads to a higher baseline level, demonstrating cumulative strengthening; Palette: Vibrant greens, blues, subtle metallic tech accents; Keywords: growth, adaptation, evolution, benefit from chaos; Message: Visualizing the concept of getting stronger through challenges." 
  },
];

const cardMotionProps = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, viewport: { once: true, amount: 0.2 } };

export function TheAntifragileEdge() {

  return (
    <Section
      id="the-antifragile-edge"
      gradientBackground
      patternBackground="/patterns/subtle-dots.svg" // Example pattern
      gradientOpacity={0.15}
      patternOpacity={0.015}
      align="center"
      useSuspense
    >
      <SectionHeader
          title="Beyond Resilience: The Antifragile Edge"
          description="Standard assets crumble (Fragile) or merely endure (Resilient) market shocks. $ROACH is architected differently—it's designed to harness volatility and grow stronger."
        subtitle={<><Sparkles className="inline h-4 w-4 mr-1.5" /> Core Concept: Antifragility</>}
        align="inherit"
      />

      <motion.div {...cardMotionProps} className="w-full max-w-5xl mx-auto">
        <Card paddingless className="overflow-hidden border border-border/15 shadow-lg shadow-primary/5">
            <Tabs defaultValue="antifragile" className="w-full">
                <TabsList variant="segmented" className="grid-cols-3 bg-muted/40 dark:bg-background/40">
                 {concepts.map((concept) => (
                    <TabsTrigger
                      key={concept.value}
                      value={concept.value}
                      variant="panel" // Use the defined 'panel' variant
                      className={cn(
                        "py-3 sm:py-3.5 text-xs sm:text-sm transition-all duration-200 ease-in-out", // Base trigger style using variant defaults
                         concept.colorTheme === 'destructive' && "data-[state=active]:text-destructive hover:bg-destructive/5 hover:text-destructive data-[state=active]:shadow-destructive/20",
                         concept.colorTheme === 'amber' && "data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 hover:bg-amber-500/5 hover:text-amber-600 data-[state=active]:shadow-amber-500/20",
                         concept.colorTheme === 'green' && "data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 hover:bg-green-500/5 hover:text-green-600 data-[state=active]:shadow-green-500/20",
                         // Default inactive styling from Tabs component is sufficient here
                         "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground/90"
                      )}
                    >
                      <concept.icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> {concept.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                 {/* Tab Content Wrappers */}
                {concepts.map((concept) => (
                  <TabsContent
                    key={concept.value}
                    value={concept.value}
                    className="w-full mt-0 p-6 md:p-8 lg:p-10 outline-none focus-visible:ring-0" // Adjusted padding
                    // Add key to force re-render on tab change for motion animations
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                         key={concept.value} // Key ensures animation runs on tab change
                         initial={{ opacity: 0.8, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0.8, scale: 0.98 }}
                         transition={{ duration: 0.35, ease: "easeInOut" }}
                         className="relative w-full flex items-center justify-center overflow-hidden min-h-[500px] md:min-h-[450px]" // Min height for content
                      >
                         {/* Background icon for theme */}
                         <concept.icon className={cn(
                           "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 sm:h-80 sm:w-80 opacity-[0.02] pointer-events-none transition-colors duration-300",
                             concept.colorTheme === 'destructive' && 'text-destructive',
                             concept.colorTheme === 'amber' && 'text-amber-500',
                             concept.colorTheme === 'green' && 'text-green-500' // Roach uses Green here
                         )} />
                         <ConceptContent {...concept} />
                       </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                ))}
              </Tabs>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
        className="mt-12 text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-muted-foreground italic">
            Core concept inspired by <Link href="https://fs.blog/antifragile/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline underline-offset-4 focus-visible:ring-1 focus-visible:ring-ring rounded-sm focus-visible:outline-none inline-flex items-center gap-1">Nassim Taleb's seminal work, "Antifragile" <ExternalLink className="h-3 w-3 opacity-70"/></Link>. $ROACH implements this philosophy in adaptive tokenomics.
        </p>
      </motion.div>
    </Section>
  );
}


// --- ConceptContent Sub-Component ---
interface ConceptContentProps {
    icon: React.ElementType; label: string; summary: string; definition: string; characteristics: string[]; cryptoExample: string;
    responseToStress: { label: string; icon: React.ElementType }; colorTheme: 'destructive' | 'amber' | 'green';
    visualPrompt: string; metaphor: string; talebQuote: string;
}

function ConceptContent({ icon: Icon, label, summary, definition, characteristics, cryptoExample, responseToStress, colorTheme, visualPrompt, metaphor, talebQuote }: ConceptContentProps) {

    const themes = {
        destructive: { text: "text-destructive", border: "border-destructive/30 dark:border-destructive/40", bg: "bg-destructive/5 dark:bg-destructive/10", iconColor: "text-destructive", responseBadge: "bg-destructive/10 text-destructive border-destructive/20", characteristicIconColor: "text-destructive/70", baseIcon: Binary }, // Updated icon
        amber: { text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30 dark:border-amber-500/40", bg: "bg-amber-500/5 dark:bg-amber-500/10", iconColor: "text-amber-500 dark:text-amber-400", responseBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", characteristicIconColor: "text-amber-600/70 dark:text-amber-500/70", baseIcon: Network }, // Updated icon
        green: { text: "text-green-600 dark:text-green-400", border: "border-green-500/30 dark:border-green-500/40", bg: "bg-green-500/5 dark:bg-green-500/10", iconColor: "text-green-500 dark:text-green-400", responseBadge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20", characteristicIconColor: "text-green-600/70 dark:text-green-500/70", baseIcon: Orbit }, // Updated icon
    };
    const theme = themes[colorTheme];
    const ResponseIcon = responseToStress.icon;

    return (
         <div className="text-center flex flex-col items-center w-full max-w-4xl mx-auto relative z-10">
             {/* Icon & Title */}
            <div className={cn("p-3 rounded-full mb-4 inline-block border-2 shadow-sm", theme.bg, theme.border)}>
                 <Icon className={cn("h-10 w-10 sm:h-12 sm:w-12", theme.iconColor)} />
            </div>
            <h3 className={cn("text-2xl sm:text-3xl font-bold mb-1.5", theme.text)}>{label}</h3>
            <Badge variant="secondary" className={cn("mb-6 text-xs font-medium shadow", theme.responseBadge, theme.border.replace('border-','border-'))}>
                {summary}
             </Badge>

             {/* Definition */}
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl text-balance">{definition}</p>

            {/* Grid: Characteristics, Response/Example, Visual */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full mb-8 text-left items-stretch">

                 {/* Column 1: Characteristics */}
                 <div className={cn("p-4 rounded-lg border h-full flex flex-col shadow-inner", theme.border, theme.bg)}>
                    <h4 className={cn("font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3 pb-2 border-b", theme.border)}>Key Traits</h4>
                    <ul className="space-y-2 flex-1 mb-3">
                       {characteristics.map((char, i) => (
                           <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                               <theme.baseIcon className={cn("h-3.5 w-3.5 shrink-0 opacity-80", theme.characteristicIconColor)} />
                               <span>{char}</span>
                           </li>
                       ))}
                     </ul>
                     <p className={cn("text-[11px] italic text-muted-foreground/80 mt-auto pt-2 border-t", theme.border)}>Analogy: {metaphor}</p>
                 </div>

                {/* Column 2: Response & Example */}
                 <div className={cn("p-4 rounded-lg border h-full flex flex-col shadow-inner", theme.border, theme.bg)}>
                    <h4 className={cn("font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2 pb-2 border-b", theme.border)}>Response to Stress</h4>
                    <Badge variant="outline" size="sm" className={cn("inline-flex items-center gap-1 mb-3 w-fit text-xs", theme.responseBadge, theme.border.replace('border-','border-'))}>
                        <ResponseIcon className="h-3.5 w-3.5" /> {responseToStress.label}
                     </Badge>
                    <h4 className={cn("font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2 mt-2 pt-2 border-t", theme.border)}>Crypto Parallel</h4>
                    <p className="text-sm text-foreground/90 flex-1 mb-3 text-balance">{cryptoExample}</p>
                    <blockquote className={cn("text-[11px] italic text-muted-foreground/80 mt-auto pt-2 border-t", theme.border)}>{talebQuote}</blockquote>
                 </div>

                 {/* Column 3: Visual Placeholder */}
                <div className={cn("relative aspect-square border border-dashed rounded-lg p-3 flex items-center justify-center shadow-inner overflow-hidden", theme.border, theme.bg)}>
                   {/* Placeholder content */}
                   <p className="relative z-10 text-[11px] leading-snug text-muted-foreground/70 italic text-center px-2">
                      {visualPrompt}
                      <span className={cn("block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50")}>
                          Research: Information Visualization Principles
                       </span>
                   </p>
                    {/* Optional subtle background graphic */}
                    <ResponseIcon className={cn("absolute -bottom-4 -right-4 h-20 w-20 opacity-[0.05] pointer-events-none transform rotate-[15deg]", theme.iconColor)} />
                </div>
             </div>
         </div>
     );
}
// --- END OF FILE components/sections/01_TheAntifragileEdge.tsx ---