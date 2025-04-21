// Hero.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BarChartHorizontal, BookOpen, FileText, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

// Token metrics for animated counters
const TOKEN_METRICS = [
  { label: "Holders", value: "2,500+", icon: BarChartHorizontal, color: "text-blue-500" },
  { label: "Liquidity", value: "$250k", icon: TrendingUp, color: "text-green-500" },
  { label: "Locked", value: "12 months", icon: ShieldCheck, color: "text-amber-500" },
];

// Reusable interface for Hero props
interface HeroProps {
  onScrollDown?: () => void;
}

// USE YOUR ACTUAL LINKS
const SWAP_LINK = "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const EXPLORER_LINK = `https://solscan.io/token/ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f`;
const DOCS_LINK = "/PARADOX_Whitepaper_v2.txt";

export function Hero({ onScrollDown }: HeroProps) {
  // Parallax effect for the background and mascot
  const { scrollYProgress } = useScroll();
  const mascotY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);
  
  // State for animated typing effect
  const [typedText, setTypedText] = useState("");
  const fullText = "Profit From It.";
  
  useEffect(() => {
    // Typing animation effect
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <Section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden !pt-24 !pb-16 md:!pt-28 md:!pb-20 lg:!pt-32 lg:!pb-24 snap-start"
    >
      {/* Gradient Background with Parallax */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background/80 opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(120,119,198,0.05),transparent_20%)] bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.05),transparent_30%)]"></div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </motion.div>

      <div className="z-10 flex flex-col items-center px-4 sm:px-6">
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Antifragile SPL Token on Solana
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl !leading-[1.1] mb-6 max-w-4xl text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          Don't Just Survive Market Stress. <br className="hidden md:block" /> 
          <span className="text-primary relative">
            <span className="absolute -left-2 top-0 h-full w-1 bg-primary/20 animate-pulse"></span>
            {typedText}<span className="animate-pulse">|</span>
          </span>
        </motion.h1>

        {/* Sub-headline / Value Proposition */}
        <motion.p
          className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Introducing <strong className="font-semibold text-foreground">$ROACH</strong>: The revolutionary token on Solana engineered with dynamic, antifragile tokenomics. It automatically converts sell pressure into <span className="text-primary font-medium">higher holder rewards</span> and <span className="text-primary font-medium">ecosystem fortification</span>.
        </motion.p>

        {/* Core Benefit Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <BenefitCard 
            icon={TrendingUp} 
            title="Adaptive Rewards" 
            description="Reflection rates scale up during high sell volume." 
            tooltip="Up to 10% of sell tax redistributed to holders in Tier 5."
          />
          <BenefitCard 
            icon={ShieldCheck} 
            title="Dynamic Defense" 
            description="Rising sell tax deters panic and stabilizes price." 
            tooltip="Sell tax increases up to 15% under extreme pressure."
          />
          <BenefitCard 
            icon={BarChartHorizontal} 
            title="Volatility Advantage" 
            description="Engineered to strengthen from market chaos." 
            tooltip="Leverages disorder based on Antifragility principles."
          />
        </motion.div>

        {/* Token Metrics */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10 w-full max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {TOKEN_METRICS.map((metric, index) => (
            <div key={metric.label} className="flex items-center gap-2">
              <metric.icon className={cn("h-5 w-5", metric.color)} />
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tabular-nums">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              {index < TOKEN_METRICS.length - 1 && (
                <span className="hidden sm:block text-muted-foreground/30 px-2">|</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 justify-center w-full max-w-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
        >
          <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-semibold animate-pulse-slow">
              <Zap className="h-5 w-5 mr-2" />
              Get $ROACH
            </Button>
          </Link>

          {/* Secondary actions */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer" title="Read the Whitepaper">
              <Button variant="outline" size="icon">
                <BookOpen className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={EXPLORER_LINK} target="_blank" rel="noopener noreferrer" title="View Contract on Solscan">
              <Button variant="outline" size="icon">
                <FileText className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        {onScrollDown && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-muted-foreground animate-bounce"
              onClick={onScrollDown}
              aria-label="Scroll down to learn more"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Animated Mascot with Parallax */}
      <motion.div
        className="absolute bottom-[-20px] right-[-30px] md:bottom-[-40px] md:right-[-50px] lg:bottom-[-60px] lg:right-[-60px] opacity-10 dark:opacity-[0.08] pointer-events-none"
        style={{ y: mascotY }}
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.5, type: 'spring', stiffness: 50 }}
      >
        <CockroachMascot size="xl" className="text-primary w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80" />
      </motion.div>
    </Section>
  );
}

// BenefitCard Component
function BenefitCard({ 
  icon: Icon, 
  title, 
  description, 
  tooltip 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  tooltip?: string 
}) {
  const cardContent = (
    <Card className="h-full text-center transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/50 group hover:shadow-md">
      <CardContent className="flex flex-col items-center gap-3 p-5">
        <div className="p-2 bg-primary/10 rounded-full border border-primary/20 transition-transform group-hover:scale-110">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base md:text-lg mb-1 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-normal">{description}</p>
        </div>
        {tooltip && <span className="sr-only">{tooltip}</span>}
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs max-w-[200px]">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
}

export default Hero;