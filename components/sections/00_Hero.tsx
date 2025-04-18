// --- START OF FILE components/sections/Hero.tsx ---
"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BarChartHorizontalIcon, BookOpen, FileText, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeroProps {
  onScrollDown?: () => void;
}

// USE YOUR ACTUAL LINKS
const SWAP_LINK = "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const EXPLORER_LINK = `https://solscan.io/token/ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f`;
const DOCS_LINK = "/PARADOX_Whitepaper_v2.txt"; // Example link to docs/whitepaper

export function Hero({ onScrollDown }: HeroProps) {
  // Simple parallax effect for the background or mascot (optional) 
  const { scrollYProgress } = useScroll();
  const mascotY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]); // Adjust range as needed

  return (
    <Section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden !pt-24 !pb-16 md:!pt-28 md:!pb-20 lg:!pt-32 lg:!pb-24 snap-start" // Ensure snapping starts correctly
    >
      {/* Enhanced Background Visual using pseudo-elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background opacity-60 dark:opacity-40"></div>
        {/* Subtle repeating pattern or abstract shape */}
        <div
          className="absolute inset-0 bg-[url('/path-to-subtle-pattern.svg')] bg-repeat bg-center opacity-[0.02]"
        // style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }} // Optional fade effect
        >
          {/* Visual Placeholder Comment for Background */}
          {/*
                  AI Prompt for Background SVG ('/path-to-subtle-pattern.svg'):
                  Generate a subtle, seamless tiling background pattern. Geometric, low-contrast lines forming abstract, resilient network structures or hexagonal grids. Use a color like oklch(var(--color-foreground) / 0.05) so it's barely visible. Ensure it tiles perfectly. SVG format. Optimize for minimal file size.
                  Research: Gestalt Principles (Proximity, Similarity), Minimalist Design.
                */}
        </div>
      </div>


      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.1 }}
      >
        {/* Title Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Badge variant="outline" className="mb-4 py-1 px-3 border-primary/30 bg-primary/10 text-primary font-medium text-sm">
            <Zap className="h-3.5 w-3.5 mr-1.5" /> Antifragile SPL Token
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className={cn(
            "text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl !leading-[1.1] mb-6 max-w-4xl text-balance" // Use text-balance
          )}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          Don't Just Survive Market Stress. <br className="hidden md:block" /> <span className="text-primary text-glow-primary">Profit From It.</span>
        </motion.h1>

        {/* Sub-headline / Value Proposition */}
        <motion.p
          className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Introducing <strong className="font-semibold text-foreground">$ROACH</strong>: The revolutionary token on Solana engineered with dynamic, antifragile tokenomics. It automatically converts sell pressure into <strong className="font-semibold text-foreground">higher holder rewards</strong> and <strong className="font-semibold text-foreground">ecosystem fortification</strong>.
        </motion.p>

        {/* Core Benefit Highlights with Tooltips */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <BenefitCard icon={TrendingUp} title="Adaptive Rewards" description="Reflection rates scale up during high sell volume." tooltip="Up to 10% of sell tax redistributed to holders in Tier 5." />
          <BenefitCard icon={ShieldCheck} title="Dynamic Defense" description="Rising sell tax deters panic and stabilizes." tooltip="Sell tax increases up to 15% under extreme pressure." />
          <BenefitCard icon={BarChartHorizontalIcon} title="Volatility Advantage" description="Engineered to strengthen from market chaos." tooltip="Leverages disorder based on Antifragility principles." />
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 justify-center w-full max-w-md"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <Button size="lg" asChild className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow font-semibold bg-primary hover:bg-primary-hover text-primary-foreground animate-pulse-slow">
            <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer">
              <Zap className="h-5 w-5 mr-2" />
              Acquire $ROACH
            </Link>
          </Button>
          {/* Secondary actions: Learn More (Whitepaper/Docs) & View Contract */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer" title="Read the Whitepaper">
                <BookOpen className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href={EXPLORER_LINK} target="_blank" rel="noopener noreferrer" title="View Contract on Solscan">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
          </div>

        </motion.div>

        {/* Scroll Down Indicator */}
        {onScrollDown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/20 mt-8 sm:mt-10 animate-bounce"
              onClick={onScrollDown}
              aria-label="Scroll down to learn more"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Optional: Animated Mascot (If desired) */}
      <motion.div
        className="absolute bottom-[-20px] right-[-30px] md:bottom-[-40px] md:right-[-50px] lg:bottom-[-60px] lg:right-[-60px] opacity-10 dark:opacity-[0.08] pointer-events-none"
        style={{ y: mascotY }} // Apply parallax
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.5, type: 'spring', stiffness: 50 }}
      >
        <CockroachMascot size="xl" className="text-primary w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80" />
        <div className="relative aspect-[1/1] w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 flex items-center justify-center">
          <p className="text-xs text-muted-foreground/70 italic text-center absolute inset-0 flex items-center justify-center">
            AI Prompt: Stylized, tech-inspired cockroach mascot with subtle circuit patterns or glowing green highlights. Resilient, slightly forward-leaning pose. Clean vector art, suitable for large display. Theme: Cyberpunk Resilience.
            <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
              Research: Dual-Coding Theory (Memorable Visual Anchor)
            </span>
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

// --- BenefitCard Component ---
function BenefitCard({ icon: Icon, title, description, tooltip }: { icon: React.ElementType, title: string, description: string, tooltip?: string }) {
  const content = (
    <div className="flex flex-col items-center gap-3 p-4 md:p-5 rounded-lg bg-background/50 dark:bg-white/5 border border-border/40 shadow-sm text-center h-full backdrop-blur-[3px] transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:bg-background/70 dark:hover:bg-white/10">
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base md:text-lg mb-1 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-normal">{description}</p>
      </div>
      {/* Hidden Visually, used by tooltip */}
      {tooltip && <span className="sr-only">{tooltip}</span>}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild><div className="h-full">{content}</div></TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs max-w-[200px]">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div className="h-full">{content}</div>;
}
// --- END OF FILE components/sections/Hero.tsx ---