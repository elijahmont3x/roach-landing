// --- START OF FILE components/sections/07_Roadmap.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Using Tabs for mobile
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CalendarClock, CheckCircle2, Construction, Cpu, ExternalLink, Info, ListChecks, Rocket, Sparkles, Milestone, Lightbulb, Network, RefreshCw, MinusCircle, ShieldCheck, Users } from "lucide-react"; // Updated Icons
import React, { useMemo, useState } from "react";
import Link from "next/link";

// Refined Roadmap Data
const roadmapPhases = [
    {
        id: "phase1", title: "Phase 1: Foundation & Genesis", status: "In Progress", icon: Sparkles, color: "blue", eta: "Q1-Q2 2025",
        description: "Laying the groundwork, developing core mechanics, and establishing initial presence.",
        items: [
            { text: "Core SPL Token & 5-Tier System Development", completed: true },
            { text: "4-Hour Rolling Window Market Tracking Implementation", completed: true },
            { text: "Website V1 & Community Channels (TG, X) Setup", completed: true },
            { text: "Whitepaper V1 & V2 Documentation Release", completed: true },
            { text: "Security Audit Planning & Initial Review", completed: false, status: 'In Progress' },
        ]
    },
    {
        id: "phase2", title: "Phase 2: Launch & Stabilization", status: "Upcoming", icon: Rocket, color: "green", eta: "Q2-Q3 2025",
        description: "Official token launch, liquidity provisioning, security finalization, and initial market listings.",
        items: [
            { text: "Public Presale Execution", completed: false, status: 'Scheduled', tentative: true },
            { text: "CertiK (or equivalent) Security Audit Completion", completed: false, status: 'Pending Audit', link: "#" }, // Placeholder link
            { text: "Raydium Initial Liquidity Pool Establishment", completed: false, status: 'Planned Launch' },
            { text: "12-Month LP Token Lock via PinkLock", completed: false, status: 'Planned Launch', link: "#" }, // Placeholder link
            { text: "Post-Presale Token Distribution", completed: false, status: 'Post-Presale' },
            { text: "Revoke Mint Authority", completed: false, status: 'Post-Distribution' },
            { text: "CoinGecko & CoinMarketCap Listings Application", completed: false, status: 'Post-Launch' },
            { text: "Holder Dashboard V1 Launch (Tier/Reward View)", completed: false, status: 'Planned Post-Launch', tentative: true },
        ]
    },
    {
        id: "phase3", title: "Phase 3: Ecosystem Expansion", status: "Future", icon: Network, color: "purple", eta: "Q4 2025 - Q1 2026",
        description: "Expanding utility, integrating with the broader ecosystem, and enhancing holder benefits.",
        items: [
            { text: "Automated Buyback Mechanism Research & Potential Implementation", completed: false, tentative: true },
            { text: "First Tier 2 Centralized Exchange (CEX) Listing", completed: false, tentative: true },
            { text: "Additional DEX Aggregator & Platform Integrations", completed: false, status: 'Future Planning' },
            { text: "$ROACH Staking Mechanism (Token and/or NFT utility)", completed: false, tentative: true },
            { text: "Holder Dashboard V2 (Advanced Analytics, Portfolio Tools)", completed: false, tentative: true },
            { text: "Initial Community Governance Framework Proposal", completed: false, tentative: true },
        ]
    },
    {
        id: "phase4", title: "Phase 4: Antifragile Evolution", status: "Future", icon: Cpu, color: "gray", eta: "2026+",
        description: "Long-term vision focused on sustainable growth, cross-chain potential, and continuous adaptation.",
        items: [
            { text: "Cross-Chain Interoperability Research & Exploration", completed: false, tentative: true },
            { text: "Development of Unique Antifragile Use Cases / dApps", completed: false, tentative: true },
            { text: "Continuous Protocol Refinement based on Data", completed: false, status: 'Ongoing' },
            { text: "Sustained Community-Led Initiatives & Treasury Management", completed: false, status: 'Ongoing' },
        ]
    },
];

// Status Color Mapping & Icons
const statusMapping: { [key: string]: { badge: string; dot: string; text: string; icon: React.ElementType; line: string; bg: string; } } = {
    Completed: { badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-600/50", dot: "bg-green-500 border-white dark:border-background", text: "text-green-600 dark:text-green-400", icon: CheckCircle2, line: "border-green-400", bg: "bg-green-100/10 dark:bg-green-900/20" },
    "In Progress": { badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-600/50", dot: "bg-blue-500 border-white dark:border-background ring-4 ring-blue-500/30 animate-pulse", text: "text-blue-600 dark:text-blue-400", icon: Sparkles, line: "border-blue-400", bg: "bg-blue-100/10 dark:bg-blue-900/20" },
    "Upcoming": { badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-600/50", dot: "bg-purple-500 border-white dark:border-background", text: "text-purple-600 dark:text-purple-400", icon: CalendarClock, line: "border-purple-400", bg: "bg-purple-100/10 dark:bg-purple-900/20" },
    "Future": { badge: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400 border-gray-300 dark:border-gray-600/50", dot: "bg-gray-400 border-white dark:border-background", text: "text-gray-500 dark:text-gray-400", icon: Cpu, line: "border-gray-400", bg: "bg-gray-100/10 dark:bg-gray-800/20" },
};

const itemStatusIcons = {
    Completed: CheckCircle2,
    'In Progress': Construction, // Indicate work is ongoing
    'Scheduled': CalendarClock,
    'Pending Audit': ShieldCheck,
    'Planned Launch': Rocket,
    'Post-Presale': Users,
    'Post-Distribution': MinusCircle,
    'Post-Launch': Milestone,
    'Planned Post-Launch': Lightbulb,
    'Future Planning': Lightbulb, // Future plans
    'Ongoing': RefreshCw, // For continuous items
    'Pending': CalendarClock, // Generic pending
    'Future': Cpu, // Default for future items if no other status
};


// Animation Variants
const timelineVariants = { visible: { transition: { staggerChildren: 0.25 } } };
const phaseVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const listItemVariants = { hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } };


export function Roadmap() {
    const defaultTabIndex = useMemo(() => {
        const index = roadmapPhases.findIndex(p => p.status === "In Progress");
        return index >= 0 ? roadmapPhases[index].id : roadmapPhases[0].id;
    }, []);
    const [activeTab, setActiveTab] = useState(defaultTabIndex);

    return (
        <TooltipProvider>
             <Section id="roadmap" align="center" useSuspense className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 via-background to-muted/5 dark:from-background/10 dark:via-background dark:to-background/5">
                <SectionHeader
                    title="Roadmap: Charting the $ROACH Evolution"
                    description="Our phased strategy outlines the key milestones for $ROACH development, market entry, ecosystem growth, and long-term adaptation towards an antifragile future."
                    subtitle={<><Milestone className="inline h-4 w-4 mr-1.5" /> Development & Growth Plan</>}
                    align="inherit"
                />

                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                     className="mb-10 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4 shadow-sm"
                >
                    <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Roadmap is indicative. Timelines & features may evolve based on progress & market dynamics. Items marked (Tentative) are exploratory.</span>
                    </p>
                </motion.div>

                {/* --- Desktop Timeline --- */}
                <div className="hidden md:block max-w-4xl mx-auto relative">
                    {/* Centerline */}
                     <div className="absolute left-6 top-5 h-full w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 rounded-full -z-10" aria-hidden="true" />
                     <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={timelineVariants} className="space-y-8">
                        {roadmapPhases.map((phase) => {
                             const statusInfo = statusMapping[phase.status as keyof typeof statusMapping];
                            return (
                                 <motion.div key={phase.id} className="relative pl-20" variants={phaseVariants}>
                                     {/* Dot & Phase Icon */}
                                     <div className={cn("absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-lg z-10", statusInfo.dot)}>
                                         <phase.icon className={cn("h-6 w-6", phase.status === 'Completed' ? "text-white" : "text-white")} />
                                     </div>
                                      <Card className={cn(
                                        "border transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg dark:shadow-md dark:shadow-black/15",
                                          statusInfo.border, "dark:bg-card/80 backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary/50",
                                          "py-0"
                                      )}>
                                         <CardHeader className={cn("border-b border-border/15 pb-3 pt-4 px-4", statusInfo.bg)}>
                                             <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                                                 <div className='flex flex-col'>
                                                     <CardTitle className={cn("text-lg sm:text-xl font-semibold flex items-center gap-2", statusInfo.text)}>
                                                         <phase.icon className="h-5 w-5 inline sm:hidden opacity-80" /> {phase.title}
                                                     </CardTitle>
                                                     <span className='text-xs text-muted-foreground font-mono tracking-tight mt-0.5'>{phase.eta}</span>
                                                 </div>
                                                <Badge className={cn("w-fit self-start sm:self-center text-[10px] font-medium px-2 py-0.5 shadow-sm uppercase tracking-wider", statusInfo.badge)}>
                                                     {phase.status}
                                                </Badge>
                                            </div>
                                             <p className='text-xs text-muted-foreground mt-1.5'>{phase.description}</p>
                                        </CardHeader>
                                         <CardContent className="pt-4 pb-5 px-4 md:px-5">
                                             <motion.ul className="space-y-2.5 text-sm" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
                                                {phase.items.map((item, itemIndex) => {
                                                     const ItemIcon = itemStatusIcons[item.status as keyof typeof itemStatusIcons] || (item.completed ? CheckCircle2 : ListChecks);
                                                    const iconColor = item.completed ? "text-green-500" : item.status === 'In Progress' ? "text-blue-500" : "text-muted-foreground/60";
                                                    return (
                                                         <motion.li key={itemIndex} variants={listItemVariants} className="flex items-start gap-2.5">
                                                             <Tooltip delayDuration={100}>
                                                                 <TooltipTrigger className='mt-[3px]'>
                                                                     <ItemIcon className={cn("h-4 w-4 shrink-0", iconColor)} />
                                                                 </TooltipTrigger>
                                                                 {item.status && <TooltipContent side="left"><p className='text-xs'>{item.status}</p></TooltipContent>}
                                                            </Tooltip>

                                                             <div className="flex-1 text-muted-foreground hover:text-foreground transition-colors duration-150 text-balance">
                                                                <span className={cn(item.completed && "line-through opacity-70")}>{item.text}</span>
                                                                 {item.tentative && (
                                                                    <span className="text-[9px] font-medium text-amber-600 dark:text-amber-500 ml-1.5 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">(Tentative)</span>
                                                                )}
                                                             </div>
                                                             {item.link && item.link !== '#' && (
                                                                 <Tooltip delayDuration={100}>
                                                                     <TooltipTrigger asChild>
                                                                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 focus-visible:ring-1 focus-visible:ring-ring rounded-sm outline-none">
                                                                             <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-primary transition-colors" />
                                                                         </Link>
                                                                     </TooltipTrigger>
                                                                     <TooltipContent><p className="text-xs">More Info</p></TooltipContent>
                                                                 </Tooltip>
                                                             )}
                                                        </motion.li>
                                                     );
                                                 })}
                                            </motion.ul>
                                            {/* Optional Visual Placeholder per Phase */}
                                            <div className="mt-4 pt-3 border-t border-border/10">
                                                 <div className="relative aspect-[16/2.5] bg-gradient-to-r from-muted/5 via-transparent to-muted/5 border border-dashed border-border/20 rounded flex items-center justify-center p-2">
                                                     <p className="text-[10px] text-muted-foreground/60 italic text-center">
                                                          AI Prompt: Visualize Key Deliverables for Phase {phase.id.replace('phase', '')}... Style: Minimal icons representing core achievements (e.g., contract icon, liquidity pool icon, CEX logo placeholders).
                                                          <span className="block mt-1 text-[9px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                                              Research: Roadmap Visualization Patterns
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

                 {/* --- Mobile Tabs View --- */}
                 <div className="md:hidden px-2">
                     <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-6 gap-1 p-1 bg-muted dark:bg-background/30 rounded-lg h-auto shadow-inner">
                            {roadmapPhases.map((phase) => {
                                 const statusInfo = statusMapping[phase.status as keyof typeof statusMapping];
                                const isActive = activeTab === phase.id;
                                 return (
                                     <TabsTrigger
                                        key={phase.id} value={phase.id}
                                        className={cn(
                                            "flex-col items-center h-auto py-2 px-1 text-[10px] leading-tight rounded-md transition-all duration-200 ease-in-out relative focus-visible:z-10 data-[state=active]:shadow-md",
                                             isActive ? cn("font-semibold bg-card dark:bg-card border border-border/50", statusInfo.text) : "text-muted-foreground hover:bg-accent/50",
                                             "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                         )}
                                         style={isActive ? { borderColor: `var(--tw-${phase.color}-500)` } : {}} // Direct border color set is difficult with current CSS structure, consider inline style hack or rethink variant structure if necessary
                                     >
                                        <phase.icon className="h-4 w-4 mb-0.5" /> Phase {phase.id.replace('phase', '')}
                                         <span className={cn("text-[8px] block mt-0.5 opacity-80", isActive ? "" : "text-muted-foreground/80")}>({phase.status})</span>
                                    </TabsTrigger>
                                );
                            })}
                         </TabsList>
                         <AnimatePresence mode="wait">
                            {roadmapPhases.map((phase) => (
                                activeTab === phase.id && // Render only active tab content
                                <TabsContent key={phase.id} value={phase.id} className="mt-0 outline-none focus-visible:ring-0" forceMount>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                     >
                                         <Card className={cn("border shadow-sm", statusMapping[phase.status as keyof typeof statusMapping].border, "dark:bg-card/80")}>
                                            <CardHeader className="pb-3 pt-4 px-4 border-b">
                                                 <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2">
                                                    <CardTitle className={cn("text-base font-semibold flex items-center gap-2", statusMapping[phase.status as keyof typeof statusMapping].text)}>
                                                         <phase.icon className="h-5 w-5" /> {phase.title}
                                                     </CardTitle>
                                                     <Badge className={cn("w-fit self-start xs:self-center text-[10px] font-medium px-2 py-0.5 uppercase tracking-wide", statusMapping[phase.status as keyof typeof statusMapping].badge)}>{phase.status}</Badge>
                                                 </div>
                                                <span className='text-xs text-muted-foreground font-mono tracking-tight mt-0.5'>{phase.eta}</span>
                                                <p className='text-xs text-muted-foreground mt-1'>{phase.description}</p>
                                            </CardHeader>
                                             <CardContent className="pt-4 px-4 pb-4">
                                                 <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {phase.items.map((item, itemIndex) => {
                                                        const ItemIcon = itemStatusIcons[item.status as keyof typeof itemStatusIcons] || (item.completed ? CheckCircle2 : ListChecks);
                                                         const iconColor = item.completed ? "text-green-500" : item.status === 'In Progress' ? "text-blue-500" : "text-muted-foreground/60";
                                                         return (
                                                             <li key={itemIndex} className="flex items-start gap-2">
                                                                <span className="mt-[3px] flex-shrink-0"><ItemIcon className={cn("h-4 w-4", iconColor)} /></span>
                                                                <div className="flex-1 text-balance">
                                                                     <span className={cn(item.completed && "line-through opacity-70")}>{item.text}</span>
                                                                     {item.tentative && <span className="text-[9px] font-medium text-amber-600 dark:text-amber-500 ml-1 italic">(Tentative)</span>}
                                                                     {item.link && item.link !== '#' && (
                                                                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="ml-1 inline-block align-middle focus-visible:ring-1 rounded-sm outline-none focus-visible:ring-ring">
                                                                             <ExternalLink className="h-3 w-3 text-primary/70 hover:text-primary transition-colors" />
                                                                         </Link>
                                                                    )}
                                                                 </div>
                                                             </li>
                                                         );
                                                     })}
                                                </ul>
                                            </CardContent>
                                         </Card>
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </AnimatePresence>
                    </Tabs>
                 </div>

                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                    className="mt-12 text-center text-xs text-muted-foreground max-w-5xl mx-auto italic px-4 text-balance"
                >
                    Roadmap provides strategic direction. Specific timelines and feature implementation are subject to change based on development progress, market dynamics, and community input. Items marked (Tentative) require further research or validation.
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}
// --- END OF FILE components/sections/07_Roadmap.tsx ---