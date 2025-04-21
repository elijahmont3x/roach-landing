// --- START OF FILE components/sections/01_TheAntifragileEdge.tsx ---

// --- START OF FILE components/sections/01_TheAntifragileEdge.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"; // Use Card component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, BookOpen, ShieldCheck, ShieldX, TrendingDown, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

// Enhanced Concept Data (remains the same)
const concepts = [
    { value: "fragile", label: "Fragile", icon: ShieldX, colorTheme: "destructive", summary: "Breaks Under Pressure", definition: "Systems harmed or destroyed by volatility, errors, and randomness. They require predictability and stable conditions to function.", characteristics: ["Degrades with Stress", "Fears Volatility", "Needs Stability", "Vulnerable to Shocks"], cryptoExample: "Over-leveraged positions, meme coins with no utility or defense, protocols lacking security audits.", responseToStress: { label: "Weakens / Breaks", icon: TrendingDown }, metaphor: "Glass Vase", talebQuote: '"The fragile wants tranquility." - Nassim Taleb', visualPrompt: "AI Prompt: Simple line graph..." },
    { value: "resilient", label: "Resilient", icon: ShieldCheck, colorTheme: "amber", summary: "Withstands & Recovers", definition: "Systems that resist shocks and return to their original state after disturbance. They endure stress but do not gain from it.", characteristics: ["Tolerates Shocks", "Returns to Baseline", "Static Response", "Focuses on Stability"], cryptoExample: "Basic tokens with only locked LP, stablecoins maintaining peg (ideally), protocols with fixed buyback rates.", responseToStress: { label: "Recovers to Original State", icon: Activity }, metaphor: "Steel Beam", talebQuote: '"The robust stays the same." - Nassim Taleb', visualPrompt: "AI Prompt: Simple line graph..." },
    { value: "antifragile", label: "$ROACH", icon: Zap, colorTheme: "primary", summary: "Strengthens from Stress", definition: "$ROACH's Core Principle: Systems that **benefit** from shocks, volatility, randomness, and stressors. They use disorder to improve and become more robust.", characteristics: ["Gains from Volatility", "Improves with Stressors", "Leverages Disorder", "$ROACH Dynamic 5-Tier System"], cryptoExample: "$ROACH's adaptive tax/reflection system converts sell pressure into increased holder rewards and potential price floor support.", responseToStress: { label: "Improves & Strengthens", icon: TrendingUp }, metaphor: "Immune System (Adapts)", talebQuote: '"The antifragile gets better." - Nassim Taleb', visualPrompt: "AI Prompt: Simple line graph..." }
];


export function TheAntifragileEdge() {

  return (
    <Section
      id="the-antifragile-edge"
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background via-muted/5 to-background"
    >
      <SectionHeader
        title="Beyond Survival: The Antifragile Advantage"
        description="Typical crypto assets break (Fragile) or merely withstand (Resilient) market shocks. $ROACH is fundamentally different – engineered to *gain strength* from volatility."
        subtitle={<><BookOpen className="inline h-4 w-4 mr-1.5" /> Core Concept Explained</>}
        alignment="center"
        className="mb-16"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        {/* Use Card component with paddingless prop */}
        <Card paddingless className="overflow-hidden">
          <Tabs defaultValue="antifragile" className="w-full">
            {/* Use TabsList variant="segmented" */}
            <TabsList variant="segmented" className="grid-cols-3">
              {concepts.map((concept) => (
                <TabsTrigger
                  key={concept.value}
                  value={concept.value}
                  variant="panel" // Use the new panel variant
                  // Apply contextual overrides for state colors (necessary as variant doesn't handle this)
                  className={cn(
                    // Specific hover/active/inactive colors needed for this specific theme
                    concept.colorTheme === 'destructive' && "data-[state=active]:text-destructive hover:bg-destructive/5 hover:text-destructive",
                    concept.colorTheme === 'amber' && "data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 hover:bg-amber-500/5 hover:text-amber-600",
                    concept.colorTheme === 'primary' && "data-[state=active]:text-primary hover:bg-primary/5 hover:text-primary",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-accent/50 data-[state=inactive]:hover:text-foreground/80" // Inactive state
                  )}
                >
                  <concept.icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> {concept.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* TabsContent for each concept */}
            {concepts.map((concept) => (
              <TabsContent 
                key={concept.value}
                value={concept.value} 
                className="w-full mt-0 p-6 md:p-8 lg:p-10 flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  {/* Background Icon */}
                  <concept.icon className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 opacity-[0.03] pointer-events-none",
                    concept.colorTheme === 'destructive' && 'text-destructive',
                    concept.colorTheme === 'amber' && 'text-yellow-500',
                    concept.colorTheme === 'primary' && 'text-primary'
                  )} />
                  <ConceptContent {...concept} />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
        className="mt-10 text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-muted-foreground italic">
          Concept derived from <Link href="https://en.wikipedia.org/wiki/Antifragility" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline focus-visible:ring-1 focus-visible:ring-ring rounded-sm focus-visible:outline-none">Nassim Nicholas Taleb's influential work</Link>. $ROACH translates this principle into practical, adaptive tokenomics on the Solana blockchain.
        </p>
      </motion.div>
    </Section>
  );
}


// --- ConceptContent Sub-Component (Badge variant/size update) ---
// ... (ConceptContent implementation remains the same as previous refactor, using Badge variant="secondary" size="sm" and contextual overrides)
interface ConceptContentProps {
  icon: React.ElementType;
  label: string;
  summary: string;
  definition: string;
  characteristics: string[];
  cryptoExample: string;
  responseToStress: { label: string; icon: React.ElementType };
  colorTheme: 'destructive' | 'amber' | 'primary';
  visualPrompt: string;
  metaphor: string;
  talebQuote: string;
}

function ConceptContent({
  icon: Icon, label, summary, definition, characteristics, cryptoExample, responseToStress, colorTheme, visualPrompt, metaphor, talebQuote
}: ConceptContentProps) {

  const themes = {
    destructive: { text: "text-destructive", border: "border-destructive/40", bg: "bg-destructive/5", icon: AlertTriangle, iconColor: "text-destructive", responseBadge: "bg-destructive/10 text-destructive border-destructive/20", characteristicIconColor: "text-destructive/70" },
    amber: { text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/40", bg: "bg-amber-500/5", icon: ShieldCheck, iconColor: "text-amber-500", responseBadge: "bg-amber-500/10 text-amber-600 border-amber-500/20", characteristicIconColor: "text-amber-600/70" },
    primary: { text: "text-primary", border: "border-primary/40", bg: "bg-primary/5", icon: Zap, iconColor: "text-primary", responseBadge: "bg-primary/10 text-primary border-primary/20", characteristicIconColor: "text-primary/70" },
  };
  const theme = themes[colorTheme];
  const CharacteristicIcon = theme.icon;
  const ResponseIcon = responseToStress.icon;

  return (
    <div className="text-center flex flex-col items-center w-full max-w-4xl mx-auto relative z-10">
      <div className={cn("p-2.5 rounded-full mb-4 inline-block", theme.bg)}>
        <Icon className={cn("h-10 w-10 sm:h-12 sm:w-12", theme.iconColor)} />
      </div>
      <h3 className={cn("text-2xl sm:text-3xl font-bold mb-2", theme.text)}>{label}</h3>
      {/* Using Badge without size prop, apply styles via className */}
      <Badge variant="secondary" className={cn("mb-6 px-2 py-0.5 text-xs font-medium", theme.responseBadge)}>
        {summary}
      </Badge>

      <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">{definition}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full mb-8 text-left">
        {/* Characteristics */}
        <div className={cn("p-4 rounded-lg border h-full flex flex-col", theme.border, theme.bg)}>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Key Traits:</h4>
          <ul className="space-y-2 flex-1">
            {characteristics.map((char, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                <CharacteristicIcon className={cn("h-4 w-4 shrink-0", theme.characteristicIconColor)} />
                <span>{char}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs italic text-muted-foreground mt-4 pt-2 border-t border-border/20">Analogy: {metaphor}</p>
        </div>

        {/* Response & Example */}
        <div className={cn("p-4 rounded-lg border h-full flex flex-col", theme.border, theme.bg)}>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Response to Stress:</h4>
          {/* Using Badge without size prop, apply styles via className */}
          <Badge variant="outline" className={cn("inline-flex items-center gap-1.5 mb-4 px-2 py-0.5 text-xs font-medium", theme.responseBadge, theme.border.replace('border-', 'border-'))}>
            <ResponseIcon className="h-3.5 w-3.5" /> {responseToStress.label}
          </Badge>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2 mt-auto pt-3 border-t border-border/20">Crypto Parallel:</h4>
          <p className="text-sm text-foreground/90 flex-1">{cryptoExample}</p>
          <blockquote className="text-xs italic text-muted-foreground mt-4 pt-2 border-t border-border/20">{talebQuote}</blockquote>
        </div>

        {/* Visual Placeholder Area */}
        <div className={cn("relative aspect-square bg-gradient-to-br border border-dashed rounded-lg p-3 flex items-center justify-center", theme.border, theme.bg)}>
          <p className="text-xs text-muted-foreground/70 italic text-center">
            {visualPrompt}
          </p>
        </div>
      </div>
    </div>
  );
}
// --- END OF FILE components/sections/01_TheAntifragileEdge.tsx ---