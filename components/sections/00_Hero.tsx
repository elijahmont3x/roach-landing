// --- START OF FILE components/sections/00_Hero.tsx ---
"use client";

import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BookOpen, FileText, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import Image from 'next/image';

// Constants and interfaces remain the same
const SWAP_LINK = "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const EXPLORER_LINK = `https://solscan.io/token/ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f`;
const DOCS_LINK = "/ROACH_Whitepaper_v2.txt";

interface HeroProps {
  onScrollDown?: () => void;
  align?: 'left' | 'center' | 'right';
}

export function Hero({ onScrollDown, align = 'left' }: HeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Get scroll progress for this section
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"]
    });
    
    // Simple parallax effect - image moves slower than scroll
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "30%"]);
    
    return (
      <Section
        id="hero"
        // @ts-ignore-next-line
        ref={sectionRef}
        disableDefaultHeight
        className="h-screen flex flex-col justify-center relative overflow-hidden !pt-28 !pb-20 md:!pt-32 md:!pb-24 lg:!pt-36 lg:!pb-28 snap-start"
        containerClassName="flex flex-col flex-grow"
        gradientBackground
        fullWidthGradient={true}
        patternBackground="/patterns/circuit-board.svg"
        patternOpacity={0.03}
        gradientOpacity={0.4}
        align={align}
        useSuspense
      >
        {/* Main content wrapper with flex-col and justify-between */}
        <div className="z-10 w-full flex flex-col justify-around flex-grow gap-20">
          {/* Top section with grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left column with text content */}
            <motion.div
              className="flex flex-col min-w-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              {/* Top Badge */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-primary text-xs md:text-sm shadow-sm font-semibold">
                  <Zap className="mr-1.5 h-3.5 w-3.5" /> The Antifragile SPL Token on Solana
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter !leading-[1.15] mb-5 text-balance text-foreground dark:text-foreground/95"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                Don't Just Survive Market Chaos. <br className="hidden md:block" /> <span className="text-primary text-glow-primary">Capitalize On It.</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                className={cn(
                  "text-base md:text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed text-balance",
                  align === 'center' ? 'mx-auto' : ''
                )}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              >
                Introducing <strong className="font-semibold text-foreground">$ROACH</strong>: the evolutionary SPL token leveraging <strong className="font-semibold text-foreground">dynamic, antifragile economics</strong> to actively convert market stress into enhanced rewards and fortified stability.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                className={cn(
                  "flex flex-col sm:flex-row gap-3 sm:gap-4",
                  align === 'center' ? 'justify-center max-w-md mx-auto' : 'max-w-md'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
                <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group animate-pulse-slow">
                    <Zap className="h-5 w-5 mr-2 group-hover:animate-spin-fast" />
                    Acquire $ROACH Now
                  </Button>
                </Link>
                {/* Group secondary actions */}
                <div className="flex items-center gap-2">
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-border/60 hover:border-primary/50">
                          <BookOpen className="h-5 w-5" />
                          <span className="sr-only">Read Whitepaper</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent><p className="text-xs">Read Whitepaper</p></TooltipContent>
                  </Tooltip>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Link href={EXPLORER_LINK} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-border/60 hover:border-primary/50">
                          <FileText className="h-5 w-5" />
                          <span className="sr-only">View Contract</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent><p className="text-xs">View Contract on Solscan</p></TooltipContent>
                  </Tooltip>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column with simple parallax image */}
            <motion.div 
              className="hidden lg:flex justify-end items-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              style={{ y: parallaxY }} // Apply parallax effect directly
            >
              <Image 
                src="/hero-roach.png"
                alt="Roach Hero Image"
                height={380}
                width={380}
                className="object-contain drop-shadow-xl transition-all duration-200 ease-in-out scale-90 hover:scale-100 hover:drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>

          {/* Benefits Cards */}
          <motion.div
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5",
              "max-w-4xl", 
              "mx-auto"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <BenefitCard icon={TrendingUp} title="Adaptive Yield" description="Reflection rate climbs with selling volume." tooltip="Max 10% of sell tax redistributed (Tier 5)." />
            <BenefitCard icon={ShieldCheck} title="Dynamic Stability" description="Rising sell tax stabilizes during downturns." tooltip="Sell tax reaches 15% under high pressure." />
            <BenefitCard icon={Sparkles} title="Volatility Advantage" description="Engineered to benefit from market disorder." tooltip="Core design based on Nassim Taleb's Antifragility." />
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        {onScrollDown && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 text-muted-foreground hover:text-primary animate-bounce hover:animate-none"
                onClick={onScrollDown}
                aria-label="Scroll down to learn more"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        )}
      </Section>
    );
}

// BenefitCard Component (unchanged)
function BenefitCard({ icon: Icon, title, description, tooltip }: { icon: React.ElementType, title: string, description: string, tooltip?: string }) {
    const cardContent = (
        <Card className="h-full text-center transition-all duration-300 group border border-border/20 dark:border-border/25 hover:border-primary/40 dark:hover:border-primary/50 bg-card/60 dark:bg-card/40 hover:bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md">
             <CardContent className="flex flex-col items-center gap-3 pt-6 group-hover:pt-5 pb-5 transition-all"> {/* Adjusted padding */}
                {/* Enhanced icon wrapper */}
                 <div className="p-2.5 bg-primary/10 dark:bg-primary/15 rounded-full border border-primary/20 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300 mb-1">
                    <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-[-5deg]" />
                 </div>
                <div className="flex-1">
                     <h3 className="font-semibold text-base md:text-lg mb-1.5 text-foreground group-hover:text-primary transition-colors">{title}</h3>
                     <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
                {tooltip && <span className="sr-only">{tooltip}</span>}
            </CardContent>
        </Card>
    );

    if (tooltip) {
        return (
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div className="h-full">{cardContent}</div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                        <p className="text-xs max-w-[200px]">{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return cardContent;
}
// --- END OF FILE components/sections/00_Hero.tsx ---