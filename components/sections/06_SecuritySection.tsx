// --- START OF FILE components/sections/06_SecuritySection.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Construction, ExternalLink, FileCode, Info, Lock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button"; // Import Button and variants

const contractAddress = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const explorerLink = `https://solscan.io/token/${contractAddress}`;
const pinkLockLink = "#"; // Placeholder
const auditLink = "#"; // Placeholder
const vestingInfoLink = "#roadmap"; // Link to roadmap section discussing vesting

const securityFeatures = [
    {
        icon: ShieldCheck, title: "Smart Contract Audit",
        description: "Planned comprehensive audit by CertiK (or equivalent) to validate code integrity and identify vulnerabilities before full launch.",
        status: "Scheduled", link: auditLink, linkText: "View Report (Post-Audit)", color: "green",
        tooltip: "Security audit scheduled pre-launch. Report will be public.",
        pending: true,
    },
    {
        icon: Lock, title: "Initial Liquidity Lock",
        description: "Raydium Liquidity Pool (LP) tokens created at launch will be verifiably locked for 12 months via PinkLock, ensuring stability.",
        status: "Planned (Launch)", link: pinkLockLink, linkText: "Verify Lock (Post-Launch)", color: "blue",
        tooltip: "LP locking occurs immediately upon token launch. Verification link provided then.",
        pending: true,
    },
    {
        icon: FileCode, title: "Verified & Immutable Contract",
        description: "The core $ROACH SPL contract will be verified on Solscan. Designed as non-upgradeable with fixed supply and revoked mint authority post-launch.",
        status: "Deployed & Verified (Post-Launch)", link: explorerLink, linkText: "View Verified Contract", color: "purple",
        tooltip: "View the verified source code and on-chain data on Solscan.",
        pending: true, // Marked pending until verified post-launch
    },
    {
        icon: Users, title: "Transparent Team Vesting",
        description: "Team tokens (10% total) are subject to a strict 6-month linear vesting schedule via smart contract, starting after launch.",
        status: "Configured (Activates Post-Launch)", link: vestingInfoLink, linkText: "Learn About Vesting", color: "amber",
        tooltip: "Vesting schedule ensures long-term team commitment. View details on roadmap/docs.",
        pending: true,
    },
];

const colorMap = {
    green: { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/5 dark:bg-green-900/30', border: 'border-green-500/25 dark:border-green-600/40', iconBg: 'bg-green-100 dark:bg-green-900/50' },
    blue: { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/5 dark:bg-blue-900/30', border: 'border-blue-500/25 dark:border-blue-600/40', iconBg: 'bg-blue-100 dark:bg-blue-900/50' },
    purple: { text: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-500/5 dark:bg-purple-900/30', border: 'border-purple-500/25 dark:border-purple-600/40', iconBg: 'bg-purple-100 dark:bg-purple-900/50' },
    amber: { text: 'text-amber-700 dark:text-amber-500', bg: 'bg-amber-500/5 dark:bg-amber-800/30', border: 'border-amber-500/25 dark:border-amber-600/40', iconBg: 'bg-amber-100 dark:bg-amber-900/50' },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, scale: 0.95, y: 15 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } };

export function SecuritySection() {

    // Helper for scroll or link based on destination
     const handleLinkClick = (href: string, isInternal: boolean) => (e: React.MouseEvent) => {
        if (isInternal && href.startsWith('#')) {
             e.preventDefault();
             const element = document.getElementById(href.substring(1));
             if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                 const offsetPosition = elementPosition - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: "smooth" });
             }
         }
         // Let external Links handle themselves via the <Link> component
     };


    return (
        <TooltipProvider>
             <Section id="security" align="center" useSuspense className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background/50 to-muted/5 dark:from-background/50 dark:to-background/10">
                <SectionHeader
                    title="Fortified for Trust: Security & Transparency"
                    description="Built on verifiable safeguards: Our commitment includes comprehensive audits, locked liquidity, immutable contracts, and transparent team vesting."
                    subtitle={<><ShieldCheck className="inline h-4 w-4 mr-1.5" /> Verifiable Trust Pillars</>}
                    align="inherit"
                />

                {/* Pre-Launch Notice */}
                 <motion.div
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-10 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4 shadow-sm"
                 >
                    <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span><strong>Pre-Launch Status:</strong> Features below are scheduled for implementation per roadmap. Links become active post-completion.</span>
                    </p>
                 </motion.div>

                {/* Security Features Grid */}
                <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
                >
                    {securityFeatures.map((feature, index) => {
                        const colors = colorMap[feature.color as keyof typeof colorMap];
                        const isInternalLink = feature.link === vestingInfoLink;
                        const isPlaceholderLink = feature.link === '#';
                        const LinkComponent = !isInternalLink && !isPlaceholderLink ? Link : 'button'; // Determine component type

                        return (
                            <motion.div key={feature.title} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                                 <Card className={cn(
                                     "h-full transition-all duration-300 flex flex-col group overflow-hidden border dark:bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md dark:shadow-md dark:shadow-black/10",
                                     colors.border, "hover:border-primary/40 dark:hover:border-primary/50",
                                     feature.pending && "opacity-80 dark:opacity-75",
                                     "py-0"
                                 )}>
                                     <CardContent className="flex-grow flex flex-col gap-3 p-5"> {/* Standardized Padding */}
                                        {/* Icon & Title Row */}
                                         <div className="flex items-start gap-4">
                                            <div className={cn("p-2 rounded-lg shrink-0 border shadow-inner", colors.iconBg, colors.border)}>
                                                {feature.pending ? <Construction className={cn("h-6 w-6", colors.text)} /> : <feature.icon className={cn("h-6 w-6", colors.text)} /> }
                                            </div>
                                            <div className="flex-1">
                                                 <CardTitle className="text-lg font-semibold leading-tight mb-0.5">{feature.title}</CardTitle>
                                                <Badge variant="outline" size="sm" className={cn("w-fit text-[10px] font-medium px-2 py-0.5 tracking-wide", colors.bg, colors.text, colors.border)}>
                                                    {feature.status}
                                                </Badge>
                                            </div>
                                         </div>

                                         {/* Description */}
                                        <p className="text-sm text-muted-foreground flex-grow leading-relaxed text-balance">{feature.description}</p>

                                         {/* Link / Action Area */}
                                        <div className="mt-auto pt-3 border-t border-border/15 text-right">
                                            <Tooltip delayDuration={150}>
                                                <TooltipTrigger asChild>
                                                      {/* Dynamically render Link or button */}
                                                       {/* @ts-ignore Issues with polymorphic components or dynamic tag names, using ignore for pragmatic solution here */}
                                                       <LinkComponent
                                                           href={!isInternalLink && !isPlaceholderLink ? feature.link : undefined}
                                                           target={!isInternalLink && !isPlaceholderLink ? '_blank' : undefined}
                                                           rel={!isInternalLink && !isPlaceholderLink ? 'noopener noreferrer' : undefined}
                                                           onClick={handleLinkClick(feature.link, isInternalLink)}
                                                           disabled={isPlaceholderLink} // Disable button if link is placeholder
                                                           className={cn(
                                                                buttonVariants({ variant: "link", size: "sm" }),
                                                                "h-auto p-0 text-sm font-medium group/link disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
                                                                isPlaceholderLink ? "text-muted-foreground/60" : colors.text // Dim disabled link
                                                           )}
                                                           title={isPlaceholderLink ? "Link available post-completion" : feature.tooltip}
                                                        >
                                                             {feature.linkText}
                                                             {!isInternalLink && !isPlaceholderLink && <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70 group-hover/link:opacity-100 transition-opacity" />}
                                                       </LinkComponent>
                                                </TooltipTrigger>
                                                {!isPlaceholderLink && (
                                                    <TooltipContent side="top" align="end"><p className="text-xs">{feature.tooltip}</p></TooltipContent>
                                                 )}
                                             </Tooltip>
                                         </div>
                                     </CardContent>
                                 </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                 <motion.div
                     initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                     <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-balance">
                        Transparency is key. We encourage verifying these safeguards independently via the provided links as they become active.
                     </p>
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}
// --- END OF FILE components/sections/06_SecuritySection.tsx ---