"use client";

import React, { useState } from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, CalendarClock, CheckCircle2, Construction, Cpu, ExternalLink, 
  Info, ListChecks, Rocket, Zap } from "lucide-react";
import Link from "next/link";

// Roadmap phases data with research-driven prioritization
const roadmapPhases = [
    {
        id: "phase1", 
        title: "Phase 1: Foundation & Fortification", 
        status: "In Progress", 
        icon: CheckCircle2, 
        color: "blue", 
        items: [
            { text: "Core SPL Token & 5-Tier System Development", completed: true },
            { text: "Implementation of 4-Hour Rolling Window Market Tracking", completed: true },
            { text: "Security Audit Planning and Vendor Selection", completed: false, status: 'In Progress' },
            { text: "Website V1 Launch & Initial Community Setup (Telegram, Twitter)", completed: true },
            { text: "Initial Whitepaper and Documentation", completed: true },
        ]
    },
    {
        id: "phase2", 
        title: "Phase 2: Launch & Market Entry", 
        status: "Upcoming", 
        icon: Zap, 
        color: "green", 
        items: [
            { text: "Public Presale Execution (Target $65k+)", completed: false, status: 'Scheduled', speculative: true },
            { text: "Security Audit Completion by CertiK or equivalent", completed: false, status: 'Pending', link: "#" },
            { text: "Establishment of Initial Raydium Liquidity Pool", completed: false, status: 'Planned' },
            { text: "LP Token Locking via PinkLock (12 Months)", completed: false, status: 'Planned', link: "#" },
            { text: "Token Distribution to Presale Participants", completed: false, status: 'Pending Presale' },
            { text: "CoinGecko & CoinMarketCap Listing Applications", completed: false, status: 'Post-Launch' },
            { text: "Holder Dashboard V1 Development (Tier Status, Rewards Tracking)", completed: false, status: 'Planned', speculative: true },
        ]
    },
    {
        id: "phase3", 
        title: "Phase 3: Ecosystem Growth & Adaptation", 
        status: "Future", 
        icon: Rocket, 
        color: "purple", 
        items: [
            { text: "Research: Automated Buyback & Treasury Management Features", completed: false, speculative: true },
            { text: "Strategic Solana Ecosystem Integrations", completed: false, speculative: true },
            { text: "Tier 2 Centralized Exchange (CEX) Listing Outreach", completed: false, speculative: true },
            { text: "Integration with Additional DEX Aggregators & Platforms", completed: false, status: 'Future' },
            { text: "Development of $ROACH Staking Mechanisms (Token/NFT)", completed: false, speculative: true },
            { text: "Enhancement of Holder Dashboard V2 (Advanced Analytics, Tools)", completed: false, speculative: true },
            { text: "Community Governance Framework Proposal", completed: false, speculative: true },
        ]
    },
    {
        id: "phase4", 
        title: "Phase 4: Long-Term Evolution", 
        status: "Future", 
        icon: Cpu, 
        color: "gray", 
        items: [
            { text: "Cross-Chain Exploration & Potential Bridging", completed: false, speculative: true },
            { text: "Development of Novel Antifragile Utility Cases", completed: false, speculative: true },
            { text: "Ongoing Protocol Optimization based on Market Data", completed: false, speculative: true },
            { text: "Sustained Community-Driven Development Initiatives", completed: false, speculative: true },
        ]
    },
];

// Status color mapping for consistent visual indicators
const statusColors = {
    Completed: { 
        badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-600/50", 
        dot: "bg-green-500 border-background", 
        text: "text-green-600 dark:text-green-400", 
        icon: CheckCircle2, 
        line: "border-green-400" 
    },
    "In Progress": { 
        badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-600/50", 
        dot: "bg-blue-500 border-background ring-4 ring-blue-500/30 animate-pulse", 
        text: "text-blue-600 dark:text-blue-400", 
        icon: Zap, 
        line: "border-blue-400" 
    },
    "Upcoming": { 
        badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-600/50", 
        dot: "bg-purple-500 border-background", 
        text: "text-purple-600 dark:text-purple-400", 
        icon: CalendarClock, 
        line: "border-purple-400" 
    },
    "Future": { 
        badge: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400 border-gray-300 dark:border-gray-600/50", 
        dot: "bg-gray-400 border-background", 
        text: "text-gray-500 dark:text-gray-400", 
        icon: Cpu, 
        line: "border-gray-400" 
    },
};

// Animation variants
const timelineVariants = { 
    visible: { transition: { staggerChildren: 0.2 } } 
};
const itemVariants = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const listItemVariants = { 
    hidden: { opacity: 0, x: -10 }, 
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "linear" } } 
};

export function Roadmap() {
    // Find default tab index (typically the "In Progress" phase)
    const defaultTabIndex = roadmapPhases.findIndex(p => p.status === "In Progress");

    return (
        <TooltipProvider>
            <Section id="roadmap" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-muted/10 dark:to-background/10">
                <SectionHeader
                    title="Project Roadmap: Charting the Antifragile Future"
                    description="Our phased strategy details key milestones for $ROACH's development, market entry, ecosystem expansion, and long-term adaptation."
                    subtitle={<><Rocket className="inline h-4 w-4 mr-1.5" /> Development Trajectory </>}
                    alignment="center" className="mb-16"
                />

                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-10 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4"
                >
                    <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>This roadmap represents our current development timeline. Items marked as "Tentative" are subject to change based on market conditions and community feedback.</span>
                    </p>
                </motion.div>
                
                {/* Desktop Vertical Timeline View */}
                <div className="hidden md:block max-w-3xl mx-auto relative">
                    {/* Timeline Rail */}
                    <div className="absolute left-5 top-2 h-full w-1 bg-border/20 rounded-full -z-10" aria-hidden="true" />

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={timelineVariants}>
                        {roadmapPhases.map((phase) => {
                            const colors = statusColors[phase.status as keyof typeof statusColors];
                            return (
                                <motion.div key={phase.id} className="relative pl-16 pb-12 last:pb-0" variants={itemVariants}>
                                    {/* Phase Indicator Dot */}
                                    <div className={cn("absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 shadow-md z-10", colors.dot)}>
                                        <phase.icon className={cn("h-5 w-5", phase.status === 'Completed' ? "text-white" : phase.status === 'Future' ? 'text-gray-700 dark:text-gray-800' : "text-white")} />
                                    </div>
                                    
                                    <Card className={cn(
                                        "border transition-all duration-300 overflow-hidden",
                                        colors.border, "dark:bg-card/80 backdrop-blur-sm"
                                    )}>
                                        <CardHeader className="border-b border-border/20">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                <CardTitle className={cn("text-lg sm:text-xl font-semibold flex items-center gap-2", colors.text)}>
                                                    <phase.icon className="h-5 w-5 inline sm:hidden" />
                                                    {phase.title}
                                                </CardTitle>
                                                <Badge className={cn("w-fit self-start sm:self-center text-xs font-medium px-2.5 py-1 shadow-sm", colors.badge)}>
                                                    {phase.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        
                                        <CardContent>
                                            <motion.ul className="space-y-2.5 text-sm" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                                                {phase.items.map((item, itemIndex) => (
                                                    <motion.li key={itemIndex} variants={listItemVariants} className={cn(
                                                        "flex items-start gap-2.5 text-muted-foreground",
                                                        item.speculative && "italic opacity-80" // Visually distinguish speculative items
                                                    )}>
                                                        <span className={cn("mt-1 flex-shrink-0 h-4 w-4 flex items-center justify-center")}>
                                                            {item.completed ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            ) : item.status === 'In Progress' ? (
                                                                <Zap className="h-4 w-4 text-blue-500 animate-pulse" />
                                                            ) : item.status === 'Scheduled' || item.status === 'Planned' ? (
                                                                <Construction className="h-4 w-4 text-amber-500" />
                                                            ) : (
                                                                <ListChecks className={cn("h-4 w-4", 
                                                                    phase.status === 'Upcoming' ? 'text-green-500/70' : 
                                                                    phase.status === 'In Progress' ? 'text-blue-500/70' : 'text-gray-400/60')} />
                                                            )}
                                                        </span>
                                                        <div className="flex-1">
                                                            <span className={cn(
                                                                item.speculative && "text-muted-foreground/90 italic" // Style for speculative items
                                                            )}>{item.text}</span>
                                                            {item.status && !item.completed && (
                                                                <span className="text-[10px] font-medium text-muted-foreground/80 ml-1.5 bg-muted/50 dark:bg-muted/30 px-1.5 py-0.5 rounded">
                                                                    {item.status}
                                                                </span>
                                                            )}
                                                            {item.speculative && (
                                                                <span className="text-[10px] font-medium text-amber-500/80 ml-1.5">
                                                                    (Tentative)
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        {item.link && item.link !== '#' && (
                                                            <Tooltip delayDuration={100}>
                                                                <TooltipTrigger asChild>
                                                                    <Link href={item.link} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0">
                                                                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-primary transition-colors" />
                                                                    </Link>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p className="text-xs">View Details/Proof</p></TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                            {/* Visual Placeholder */}
                                            <div className="mt-5 border-t border-border/15 pt-4">
                                                <div className="relative aspect-[16/3] bg-muted/20 dark:bg-white/5 border border-dashed border-border/30 rounded flex items-center justify-center p-2">
                                                    <p className="text-xs text-muted-foreground/70 italic text-center">
                                                        AI Prompt: Visualize Phase {phase.id.replace('phase', '')} milestones as stepping stones on a path, with completed items showing successful implementation and pending items showing planned trajectories.
                                                        <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                            Research: Information Visualization - Progress Tracking - Gestalt Principles
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Mobile Tabs View */}
                <div className="md:hidden">
                    <Tabs defaultValue={roadmapPhases[defaultTabIndex]?.id || roadmapPhases[0].id} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-6 gap-1 p-1 bg-muted dark:bg-background/30 rounded-lg h-auto">
                            {roadmapPhases.map((phase) => {
                                const colors = statusColors[phase.status as keyof typeof statusColors];
                                return (
                                    <TabsTrigger
                                        key={phase.id} value={phase.id}
                                        className={cn(
                                            "flex-col items-center h-auto py-2.5 px-1 text-[0.65rem] leading-tight rounded-md transition-colors duration-200 relative focus-visible:z-10",
                                            "data-[state=active]:font-semibold",
                                            "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-accent/70",
                                            `data-[state=active]:${colors.text}`
                                        )}
                                    >
                                        <phase.icon className="h-4 w-4 mb-0.5" /> Phase {phase.id.replace('phase', '')} <span className="text-[9px] block">({phase.status})</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        {roadmapPhases.map((phase) => {
                            const colors = statusColors[phase.status as keyof typeof statusColors];
                            return (
                                <TabsContent key={phase.id} value={phase.id} className="mt-0">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                                        <Card className={cn("border shadow-sm", colors.border, "dark:bg-card/80")}>
                                            <CardHeader className="pb-3 pt-4 px-4 border-b border-border/20">
                                                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2">
                                                    <CardTitle className={cn("text-base font-semibold flex items-center gap-2", colors.text)}>
                                                        <phase.icon className="h-5 w-5" /> {phase.title}
                                                    </CardTitle>
                                                    <Badge className={cn("w-fit self-start xs:self-center text-xs font-medium px-2 py-0.5", colors.badge)}>
                                                        {phase.status}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            
                                            <CardContent className="pt-4 px-4 pb-4">
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {phase.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start gap-2">
                                                            <span className="mt-0.5 flex-shrink-0">
                                                                {item.completed ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <ListChecks className={cn("h-4 w-4", colors.text, "opacity-70")} />}
                                                            </span>
                                                            <div className="flex-1">
                                                                {item.text}
                                                                {item.status && !item.completed && <span className="text-[10px] font-medium text-muted-foreground/80 ml-1">({item.status})</span>}
                                                                {item.speculative && <span className="text-[10px] font-medium text-orange-500/80 ml-1">(Speculative)</span>}
                                                                {item.link && item.link !== '#' && <Link href={item.link} target="_blank" rel="noopener noreferrer" className="ml-1 inline-block align-middle"><ExternalLink className="h-3 w-3 text-primary/70" /> </Link>}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </div>

                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                    className="mt-12 text-center text-xs text-muted-foreground max-w-xl mx-auto italic px-4"
                >
                    Disclaimer: This roadmap outlines our strategic direction. Timelines, features, and priorities may adapt based on development progress, technological advancements, market conditions, and community feedback. Items marked (Speculative) are under consideration and not guaranteed.
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}

export default Roadmap;

// TooltipProvider function for TypeScript compatibility
function TooltipProvider({ children }: { children: React.ReactNode }) {
    return children;
}

// Tooltip, TooltipTrigger, and TooltipContent components for TypeScript compatibility
function Tooltip({ children }: { children: React.ReactNode }) {
    return children;
}

function TooltipTrigger({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
    return children;
}

function TooltipContent({ children }: { children: React.ReactNode }) {
    return children;
}