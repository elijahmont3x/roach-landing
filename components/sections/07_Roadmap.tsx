// --- START OF FILE components/sections/Roadmap.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Construction, Cpu, ListChecks, Rocket, Zap } from "lucide-react"; // Added Cpu, Construction
import React from "react"; // Import React
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Refined Roadmap Data with more descriptive items and icons
const roadmapPhases = [
    {
        id: "phase1", title: "Phase 1: Foundation & Fortification", status: "Completed", icon: CheckCircle2, color: "green", items: [
            { text: "Core SPL Token & 5-Tier System Development", completed: true },
            { text: "Implementation of 4-Hour Rolling Window Market Tracking", completed: true },
            { text: "Comprehensive CertiK Security Audit Passed", completed: true, link: "#" }, // Add link to audit
            { text: "Website V1 Launch & Initial Community Setup (Telegram, Twitter)", completed: true },
            { text: "Successful Private Presale ($35k Raised)", completed: true },
        ]
    },
    {
        id: "phase2", title: "Phase 2: Launch & Market Entry", status: "In Progress", icon: Zap, color: "blue", items: [
            { text: "Public Presale Execution via Pinksale (Target $65k+)", completed: false, status: 'Active' },
            { text: "Establishment of Initial Raydium Liquidity Pool", completed: false, status: 'Pending Presale' },
            { text: "LP Token Locking/Burning via PinkLock (12 Months)", completed: false, status: 'Pending LP Creation', link: "#" }, // Link to PinkLock
            { text: "Token Distribution to Presale Participants", completed: false, status: 'Pending Presale End' },
            { text: "CoinGecko & CoinMarketCap Listing Applications", completed: false, status: 'Preparing' },
            { text: "Deployment of Launch Marketing & KOL Partnerships", completed: false, status: 'Ongoing' },
            { text: "Launch of Holder Dashboard V1 (Tier Status, Rewards Tracking)", completed: false, status: 'Development' },
        ]
    },
    {
        id: "phase3", title: "Phase 3: Ecosystem Growth & Adaptation", status: "Upcoming", icon: Rocket, color: "purple", items: [
            { text: "Research: Automated Buyback & Treasury Management Features", completed: false },
            { text: "Exploration of Strategic Solana Ecosystem Integrations", completed: false },
            { text: "Initiation of Tier 2 Centralized Exchange (CEX) Listing Outreach", completed: false },
            { text: "Integration with Additional DEX Aggregators & Platforms", completed: false },
            { text: "Development of $ROACH Staking Mechanisms (Token/NFT)", completed: false, speculative: true }, // Mark as speculative if uncertain
            { text: "Enhancement of Holder Dashboard V2 (Advanced Analytics, Tools)", completed: false },
            { text: "Community Governance Framework Proposal", completed: false },
        ]
    },
    {
        id: "phase4", title: "Phase 4: Long-Term Evolution", status: "Future", icon: Cpu, color: "gray", items: [ // Use gray for distant future
            { text: "Cross-Chain Exploration & Potential Bridging", completed: false, speculative: true },
            { text: "Development of Novel Antifragile Utility Cases", completed: false, speculative: true },
            { text: "Ongoing Protocol Optimization based on Market Data", completed: false },
            { text: "Sustained Community-Driven Development Initiatives", completed: false },
        ]
    },
];

// Status Color Mapping
const statusColors: { [key: string]: { badge: string; dot: string; text: string; icon: React.ElementType; line: string } } = {
    Completed: { badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-600/50", dot: "bg-green-500 border-background", text: "text-green-600 dark:text-green-400", icon: CheckCircle2, line: "border-green-400" },
    "In Progress": { badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-600/50", dot: "bg-blue-500 border-background ring-4 ring-blue-500/30 animate-pulse", text: "text-blue-600 dark:text-blue-400", icon: Zap, line: "border-blue-400" },
    "Upcoming": { badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-600/50", dot: "bg-purple-500 border-background", text: "text-purple-600 dark:text-purple-400", icon: CalendarClock, line: "border-purple-400" },
    "Future": { badge: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400 border-gray-300 dark:border-gray-600/50", dot: "bg-gray-400 border-background", text: "text-gray-500 dark:text-gray-400", icon: Cpu, line: "border-gray-400" },
};

// Animation Variants
const timelineVariants = { visible: { transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const listItemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "linear" } } };


export function Roadmap() {
    const defaultTabIndex = roadmapPhases.findIndex(p => p.status === "In Progress"); // Default to 'In Progress' tab

    return (
        <TooltipProvider>
            <Section id="roadmap" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-muted/10 dark:to-background/10">
                <SectionHeader
                    title="Project Roadmap: Charting the Antifragile Future"
                    description="Our phased strategy details key milestones for $ROACH's development, market entry, ecosystem expansion, and long-term adaptation."
                    subtitle={<><Rocket className="inline h-4 w-4 mr-1.5" /> Development Trajectory </>}
                    alignment="center" className="mb-16"
                />

                {/* Desktop Vertical Timeline View */}
                <div className="hidden md:block max-w-3xl mx-auto relative">
                    {/* Central timeline line */}
                    <div className="absolute left-5 top-2 h-full w-1 bg-border/20 rounded-full -z-10" aria-hidden="true" />

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={timelineVariants}>
                        {roadmapPhases.map((phase) => {
                            const colors = statusColors[phase.status as keyof typeof statusColors];
                            return (
                                <motion.div key={phase.id} className="relative pl-16 pb-12 last:pb-0" variants={itemVariants}>
                                    {/* Timeline Dot & Icon */}
                                    <div className={cn("absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 shadow-md z-10", colors.dot)}>
                                        <phase.icon className={cn("h-5 w-5", phase.status === 'Completed' ? "text-white" : phase.status === 'Future' ? 'text-gray-700 dark:text-gray-800' : "text-white")} />
                                    </div>
                                    {/* Card Content */}
                                    <Card className={cn("border shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/60 transition-all duration-300 overflow-hidden", colors.border, "dark:bg-card/80 backdrop-blur-sm")}>
                                        <CardHeader className="pb-3 pt-4 px-5 border-b border-border/20">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                <CardTitle className={cn("text-lg sm:text-xl font-semibold flex items-center gap-2", colors.text)}>
                                                    <phase.icon className="h-5 w-5 inline sm:hidden" /> {/* Show icon inline on mobile-like card header */}
                                                    {phase.title}
                                                </CardTitle>
                                                <Badge className={cn("w-fit self-start sm:self-center text-xs font-medium px-2.5 py-1 shadow-sm", colors.badge)}>
                                                    {phase.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4 px-5 pb-5">
                                            <motion.ul className="space-y-2.5 text-sm" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                                                {phase.items.map((item, itemIndex) => (
                                                    <motion.li key={itemIndex} variants={listItemVariants} className="flex items-start gap-2.5 text-muted-foreground">
                                                        <span className={cn("mt-1 flex-shrink-0 h-4 w-4 flex items-center justify-center")}>
                                                            {item.completed ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            ) : item.status === 'Active' || item.status === 'Ongoing' ? (
                                                                <Zap className="h-4 w-4 text-blue-500 animate-pulse" />
                                                            ) : item.status === 'Development' || item.status === 'Preparing' || item.status === 'Pending Presale' || item.status === 'Pending LP Creation' || item.status === 'Pending Presale End' ? (
                                                                <Construction className="h-4 w-4 text-amber-500" />
                                                            ) : (
                                                                <ListChecks className={cn("h-4 w-4", phase.status === 'Upcoming' ? 'text-purple-500/70' : 'text-gray-400/60')} />
                                                            )}
                                                        </span>
                                                        <div className="flex-1">
                                                            <span>{item.text}</span>
                                                            {item.status && !item.completed && <span className="text-[10px] font-medium text-muted-foreground/80 ml-1.5">({item.status})</span>}
                                                            {item.speculative && <span className="text-[10px] font-medium text-orange-500/80 ml-1.5">(Speculative)</span>}
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

                                            {/* Visual Placeholder for timeline segment */}
                                            <div className="mt-5 border-t border-border/15 pt-4">
                                                <div className="relative aspect-[16/3] bg-muted/20 dark:bg-white/5 border border-dashed border-border/30 rounded flex items-center justify-center p-2">
                                                    <p className="text-xs text-muted-foreground/70 italic text-center">
                                                        AI Prompt: Visualize Phase {phase.id.replace('phase', '')} ('{phase.title}') as a segment on a timeline. Use key icons from items above. If Phase 2, show a simple Gantt chart for 'In Progress' items. Color-code segment based on phase status ({phase.color}). Minimalist infographic style.
                                                        <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                            Research: Information Visualization (Timeline Representation), Cognitive Load (Gantt for clarity)
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
                                            "flex-col items-center h-auto py-2.5 px-1 text-[0.65rem] leading-tight rounded-md transition-colors duration-200 relative focus-visible:z-10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
                                            "data-[state=active]:shadow-md data-[state=active]:font-semibold data-[state=active]:bg-card",
                                            "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-accent/70",
                                            `data-[state=active]:${colors.text}` // Apply active text color based on status
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
                                                    <Badge className={cn("w-fit self-start xs:self-center text-xs font-medium px-2 py-0.5", colors.badge)}>{phase.status}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-4 px-4 pb-4">
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {phase.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start gap-2">
                                                            <span className="mt-0.5 flex-shrink-0">
                                                                {/* Simplified icons for mobile list */}
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
                {/* </div> */}

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


// --- END OF FILE components/sections/Roadmap.tsx ---