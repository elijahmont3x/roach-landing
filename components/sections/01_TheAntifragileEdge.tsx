// TheAntifragileEdge.tsx
"use client";

import React, { useState } from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, BookOpen, ChevronRight, FileText, Lightbulb, RefreshCw, ShieldCheck, ShieldX, TrendingDown, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

// Enhanced Concept Data with research-based framing
const concepts = [
  { 
    value: "fragile", 
    label: "Fragile", 
    icon: ShieldX, 
    colorTheme: "destructive", 
    summary: "Breaks Under Pressure", 
    definition: "Systems harmed or destroyed by volatility, errors, and randomness. They require predictability and stable conditions to function.", 
    characteristics: ["Degrades with Stress", "Fears Volatility", "Needs Stability", "Vulnerable to Shocks"], 
    cryptoExample: "pump.fun and similar hyper-volatile meme tokens without utility, over-leveraged yield farming positions, projects lacking security audits that implode under scrutiny.", 
    responseToStress: { label: "Weakens / Breaks", icon: TrendingDown }, 
    metaphor: "Glass Vase", 
    talebQuote: '"The fragile wants tranquility." - Nassim Taleb', 
    visualPrompt: "Subject: Financial stability visualization; Style: Data-driven, minimalist; Composition: Three-line graph showing rapid decline; Palette: Red, decreasing opacity; Keywords: collapse, breakdown, fragility; Message: Systems that crumble under stress." 
  },
  { 
    value: "resilient", 
    label: "Resilient", 
    icon: ShieldCheck, 
    colorTheme: "amber", 
    summary: "Withstands & Recovers", 
    definition: "Systems that resist shocks and return to their original state after disturbance. They endure stress but do not gain from it.", 
    characteristics: ["Tolerates Shocks", "Returns to Baseline", "Static Response", "Focuses on Stability"], 
    cryptoExample: "$IMG and other tokens with fixed tax rates (3-5%), stablecoins struggling to maintain their peg during volatility, protocols with LP locks but no adaptive mechanisms to incentivize recovery.", 
    responseToStress: { label: "Recovers to Original State", icon: Activity }, 
    metaphor: "Steel Beam", 
    talebQuote: '"The robust stays the same." - Nassim Taleb', 
    visualPrompt: "Subject: Economic resilience pattern; Style: Technical, precise; Composition: Line graph showing dip and return to baseline; Palette: Amber/gold with neutral accents; Keywords: endurance, persistence, maintenance; Message: Systems that absorb shock and return to equilibrium." 
  },
  { 
    value: "antifragile", 
    label: "$ROACH", 
    icon: Zap, 
    colorTheme: "green", 
    summary: "Strengthens from Stress", 
    definition: "$ROACH's Core Principle: Systems that **benefit** from shocks, volatility, randomness, and stressors. They use disorder to improve and become more robust.", 
    characteristics: ["Gains from Volatility", "Improves with Stressors", "Leverages Disorder", "$ROACH Dynamic 5-Tier System"], 
    cryptoExample: "$ROACH's adaptive tax/reflection system converts sell pressure into increased holder rewards and strengthened price floor support, building protocol reserves during volatility rather than depleting them.", 
    responseToStress: { label: "Improves & Strengthens", icon: TrendingUp }, 
    metaphor: "Immune System (Adapts)", 
    talebQuote: '"The antifragile gets better." - Nassim Taleb', 
    visualPrompt: "Subject: Antifragile growth mechanism; Style: Dynamic, energetic; Composition: Ascending graph with emphasis on upward trajectory after stress points; Palette: Vibrant green with emerald accents; Keywords: adaptation, evolution, growth; Message: Systems that convert volatility into strength." 
  },
];

// Key insights based on antifragility research
const keyInsights = [
  {
    id: 1,
    title: "Volatility Benefits",
    description: "Unlike traditional assets that fear volatility, $ROACH's antifragile mechanism converts market volatility into structural strength and holder benefits.",
    icon: RefreshCw
  },
  {
    id: 2,
    title: "Beyond Mere Stability",
    description: "While most tokens aim for price stability, $ROACH seeks to create positive feedback loops from stress, turning negative events into positive outcomes.",
    icon: Activity
  },
  {
    id: 3,
    title: "Nonlinear Responses",
    description: "The 5-tier system creates exponentially increasing deterrents to selling pressure while simultaneously providing increasing benefits to holders.",
    icon: TrendingUp
  }
];

export function TheAntifragileEdge() {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);

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
        <Card className="overflow-hidden">
          <Tabs defaultValue="antifragile" className="w-full">
            <TabsList variant="segmented" className="grid-cols-3">
              {concepts.map((concept) => (
                <TabsTrigger
                  key={concept.value}
                  value={concept.value}
                  variant="panel"
                  className={cn(
                    concept.colorTheme === 'destructive' && "data-[state=active]:text-destructive hover:bg-destructive/5 hover:text-destructive",
                    concept.colorTheme === 'amber' && "data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 hover:bg-amber-500/5 hover:text-amber-600",
                    concept.colorTheme === 'green' && "data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 hover:bg-green-500/5 hover:text-green-600",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-accent/50 data-[state=inactive]:hover:text-foreground/80"
                  )}
                >
                  <concept.icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> {concept.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
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
                      concept.colorTheme === 'green' && 'text-green-500'
                    )} />
                    <ConceptContent {...concept} />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </Card>
      </motion.div>

      {/* Key Insights Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-8">Key Antifragility Insights Applied to $ROACH</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyInsights.map((insight, index) => (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                className={cn(
                  "h-full cursor-pointer transition-all duration-300 hover:shadow-md",
                  expandedInsight === insight.id ? "border-primary/50" : ""
                )}
                onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <insight.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg">{insight.title}</h4>
                  </div>
                  
                  <motion.div
                    initial={{ height: 80 }}
                    animate={{ height: expandedInsight === insight.id ? 'auto' : 80 }}
                    className="overflow-hidden relative"
                  >
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    
                    {expandedInsight !== insight.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
                    )}
                  </motion.div>
                  
                  <div className="mt-3 text-right">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "cursor-pointer",
                        expandedInsight === insight.id ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      {expandedInsight === insight.id ? "Read Less" : "Read More"}
                      <ChevronRight className={cn(
                        "h-3.5 w-3.5 ml-1 transition-transform", 
                        expandedInsight === insight.id ? "rotate-90" : ""
                      )} />
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.3 }} 
        viewport={{ once: true }}
        className="mt-10 text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-muted-foreground italic">
          Concept derived from <Link href="https://en.wikipedia.org/wiki/Antifragility" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline focus-visible:ring-1 focus-visible:ring-ring rounded-sm focus-visible:outline-none">Nassim Nicholas Taleb's influential work</Link>. $ROACH translates this principle into practical, adaptive tokenomics on the Solana blockchain.
        </p>
      </motion.div>
    </Section>
  );
}

interface ConceptContentProps {
  icon: React.ElementType;
  label: string;
  summary: string;
  definition: string;
  characteristics: string[];
  cryptoExample: string;
  responseToStress: { label: string; icon: React.ElementType };
  colorTheme: 'destructive' | 'amber' | 'green';
  visualPrompt: string;
  metaphor: string;
  talebQuote: string;
}

function ConceptContent({
  icon: Icon, label, summary, definition, characteristics, cryptoExample, responseToStress, colorTheme, visualPrompt, metaphor, talebQuote
}: ConceptContentProps) {
  const themes = {
    destructive: { 
      text: "text-destructive", 
      border: "border-destructive/40", 
      bg: "bg-destructive/5", 
      icon: AlertTriangle, 
      iconColor: "text-destructive", 
      responseBadge: "bg-destructive/10 text-destructive border-destructive/20", 
      characteristicIconColor: "text-destructive/70" 
    },
    amber: { 
      text: "text-amber-600 dark:text-amber-400", 
      border: "border-amber-500/40", 
      bg: "bg-amber-500/5", 
      icon: ShieldCheck, 
      iconColor: "text-amber-500", 
      responseBadge: "bg-amber-500/10 text-amber-600 border-amber-500/20", 
      characteristicIconColor: "text-amber-600/70" 
    },
    green: { 
      text: "text-green-600 dark:text-green-400", 
      border: "border-green-500/40", 
      bg: "bg-green-500/5", 
      icon: Zap, 
      iconColor: "text-green-500", 
      responseBadge: "bg-green-500/10 text-green-600 border-green-500/20", 
      characteristicIconColor: "text-green-600/70" 
    },
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
          <Badge variant="outline" className={cn("inline-flex items-center gap-1.5 mb-4 px-2 py-0.5 text-xs font-medium", theme.responseBadge, theme.border.replace('border-', 'border-'))}>
            <ResponseIcon className="h-3.5 w-3.5" /> {responseToStress.label}
          </Badge>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2 mt-auto pt-3 border-t border-border/20">Crypto Parallel:</h4>
          <p className="text-sm text-foreground/90 flex-1">{cryptoExample}</p>
          <blockquote className="text-xs italic text-muted-foreground mt-4 pt-2 border-t border-border/20">{talebQuote}</blockquote>
        </div>

        {/* Visual Placeholder Area */}
        <div className={cn("relative aspect-square bg-gradient-to-br border border-dashed rounded-lg p-3 flex items-center justify-center", theme.border, theme.bg)}>
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {colorTheme === 'destructive' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-full h-32 relative">
                  <div className="absolute left-0 bottom-4 w-full h-0.5 bg-gray-200/30"></div>
                  <div className="absolute left-0 top-0 w-full h-20 overflow-hidden">
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-destructive/30"></div>
                    <div className="absolute left-[10%] bottom-0 w-[80%] h-10 bg-gradient-to-t from-destructive/20 to-transparent rounded-md"></div>
                    <div className="absolute left-0 top-4 w-full h-16 flex items-end">
                      <div className="w-[20%] h-4 bg-destructive/80 rounded-sm"></div>
                      <div className="w-[20%] h-8 bg-destructive/60 rounded-sm"></div>
                      <div className="w-[20%] h-12 bg-destructive/40 rounded-sm"></div>
                      <div className="w-[20%] h-4 bg-destructive/20 rounded-sm"></div>
                      <div className="w-[20%] h-2 bg-destructive/10 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-2">FRAGILE SYSTEMS: DECLINING FUNCTION</p>
              </div>
            )}
            
            {colorTheme === 'amber' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-full h-32 relative">
                  <div className="absolute left-0 bottom-4 w-full h-0.5 bg-gray-200/30"></div>
                  <div className="absolute left-0 top-0 w-full h-20 overflow-hidden">
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500/30"></div>
                    <div className="absolute left-[10%] top-10 w-[80%] h-10">
                      <svg viewBox="0 0 100 30" className="w-full h-full">
                        <path d="M0,15 Q25,5 50,15 T100,15" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-2">RESILIENT SYSTEMS: RETURN TO BASELINE</p>
              </div>
            )}
            
            {colorTheme === 'green' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-full h-32 relative">
                  <div className="absolute left-0 bottom-4 w-full h-0.5 bg-gray-200/30"></div>
                  <div className="absolute left-0 top-0 w-full h-20 overflow-hidden">
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500/30"></div>
                    <div className="absolute left-[10%] bottom-2 w-[80%] h-16">
                      <svg viewBox="0 0 100 40" className="w-full h-full">
                        <path d="M0,35 C10,32 20,28 30,22 C40,15 50,5 70,8 C90,11 95,2 100,0" fill="none" stroke="rgba(34,197,94,0.6)" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-2">ANTIFRAGILE SYSTEMS: GAIN FROM DISORDER</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Notes */}
      {colorTheme === 'green' && (
        <div className="mt-4 border border-green-500/20 bg-green-500/5 rounded-lg p-4 max-w-2xl">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-1">How $ROACH Implements Antifragility:</h4>
              <p className="text-sm text-muted-foreground">
                The dynamic 5-tier system adjusts taxation and reward rates in real-time based on market conditions. During high sell pressure, the system automatically increases sell taxes while boosting rewards to holders who maintain their positions, converting market stress into a structural advantage.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheAntifragileEdge;