"use client";

import React from 'react';
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, FileCode, Lock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

// Security links - Replace with actual links in production
const contractAddress = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const explorerLink = `https://solscan.io/token/${contractAddress}`;
const pinkLockLink = "#"; // Replace with actual PinkLock URL
const auditLink = "#"; // Replace with actual CertiK URL
const vestingInfoLink = "#roadmap"; // Link to roadmap section discussing vesting

// Security Features Data
const securityFeatures = [
    {
        icon: ShieldCheck, 
        title: "Comprehensive Security Audit",
        description: "Smart contract security audit to be conducted by CertiK or equivalent industry-standard auditor. Will validate contract integrity and absence of vulnerabilities.",
        status: "Planned (Pre-Launch)", 
        link: auditLink, 
        linkText: "Audit In Progress", 
        color: "green",
        tooltip: "Security audit will be completed before official launch",
        pending: true,
    },
    {
        icon: Lock, 
        title: "Locked Initial Liquidity",
        description: "Initial liquidity pool (LP) tokens on Raydium will be verifiably locked for 12 months using PinkLock or equivalent service, preventing rug-pulls.",
        status: "Scheduled (Launch Day)", 
        link: pinkLockLink, 
        linkText: "Lock Schedule", 
        color: "blue",
        tooltip: "Will be implemented at token launch and verifiable on-chain",
        pending: true,
    },
    {
        icon: FileCode, 
        title: "Immutable Contract & Supply",
        description: "The core $ROACH SPL token contract is designed to be non-upgradeable with fixed 1 billion supply. Minting authority will be permanently revoked after launch.",
        status: "Ready for Deployment", 
        link: explorerLink, 
        linkText: "View Contract Code", 
        color: "purple",
        tooltip: "Contract code ready for deployment, will be verified on Solscan upon launch",
        pending: false,
    },
    {
        icon: Users, 
        title: "Transparent Team Vesting",
        description: "Team token allocation (10%) will follow strict 6-month linear vesting schedule, managed on-chain via transparent vesting contract.",
        status: "Configured (Activates Post-Launch)", 
        link: vestingInfoLink, 
        linkText: "View Vesting Schedule", 
        color: "amber",
        tooltip: "Vesting contract parameters defined, will activate after token launch",
        pending: true,
    },
];

// Color mapping for consistent theming
const colorMap = {
    green: { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/10 dark:bg-green-900/40', border: 'border-green-500/30 dark:border-green-500/35', iconBg: 'bg-green-100 dark:bg-green-900/40' },
    blue: { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-900/40', border: 'border-blue-500/30 dark:border-blue-500/35', iconBg: 'bg-blue-100 dark:bg-blue-900/40' },
    purple: { text: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-900/40', border: 'border-purple-500/30 dark:border-purple-500/35', iconBg: 'bg-purple-100 dark:bg-purple-900/40' },
    amber: { text: 'text-amber-700 dark:text-amber-500', bg: 'bg-amber-500/10 dark:bg-amber-900/40', border: 'border-amber-500/30 dark:border-amber-500/35', iconBg: 'bg-amber-100 dark:bg-amber-900/40' },
};

// Animation variants for staggered entries
const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } 
};
const itemVariants = { 
    hidden: { opacity: 0, scale: 0.95 }, 
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export function SecuritySection() {
    return (
        <TooltipProvider>
            <Section id="security" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 to-background/20 dark:from-background/5 dark:to-background/20">
                <SectionHeader
                    title="Fortified Security & Transparent Trust"
                    description="Security and transparency are paramount. $ROACH is built on verifiable measures designed to protect holders and foster long-term confidence in the ecosystem."
                    subtitle={<><ShieldCheck className="inline h-4 w-4 mr-1.5" /> Foundation of Trust</>}
                    alignment="center" className="mb-16"
                />
                
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-10 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4"
                >
                    <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>$ROACH is in pre-launch development. Security features shown below will be implemented according to the roadmap schedule.</span>
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
                >
                    {securityFeatures.map((feature) => {
                        const colors = colorMap[feature.color as keyof typeof colorMap];
                        const isInternalLink = feature.link === vestingInfoLink;
                        // Use Link for external, Button for internal scroll
                        const LinkComponent = isInternalLink ? 'button' : Link;

                        return (
                            <motion.div key={feature.title} variants={itemVariants}>
                                <Card className={cn(
                                    "h-full transition-all duration-300 flex flex-col group overflow-hidden",
                                    "hover:border-primary/30 dark:hover:border-primary/50 dark:bg-card/70 backdrop-blur-sm",
                                    colors.border,
                                    feature.pending && "opacity-75 dark:opacity-60" // Dim pending items
                                )}>
                                    <CardContent className="flex-grow flex flex-col gap-4">
                                        {/* Icon & Title Row */}
                                        <div className="flex items-start gap-4">
                                            <div className={cn("p-2.5 rounded-lg shrink-0 border", colors.iconBg, colors.border)}>
                                                <feature.icon className={cn("h-6 w-6", colors.text)} />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg font-semibold leading-tight">{feature.title}</CardTitle>
                                                <Badge variant="outline" size="sm" className={cn("mt-1.5 w-fit text-xs font-medium", colors.bg, colors.text, colors.border)}>
                                                {feature.status}
                                                </Badge>
                                                {feature.pending && (
                                                <span className="ml-2 text-[10px] italic text-muted-foreground">(Pre-Launch)</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground flex-grow leading-relaxed">{feature.description}</p>

                                        {/* Link / Action */}
                                        <div className="mt-auto pt-3 border-t border-border/20 text-right">
                                            <LinkComponent
                                                href={isInternalLink ? undefined : feature.link}
                                                target={isInternalLink ? '_self' : '_blank'}
                                                rel={isInternalLink ? undefined : 'noopener noreferrer'}
                                                title={feature.tooltip}
                                                // Handle smooth scroll for internal links
                                                onClick={isInternalLink ? (e: React.MouseEvent) => {
                                                        e.preventDefault();
                                                        const element = document.getElementById(feature.link.substring(1));
                                                        const headerOffset = 80;
                                                        if (element) {
                                                            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                                                            const offsetPosition = elementPosition - headerOffset;
                                                            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                                        }
                                                    } : undefined}
                                                className={cn(
                                                    buttonVariants({ variant: "link", size: "sm" }),
                                                    "h-auto p-0 text-sm font-medium group/link",
                                                    colors.text
                                                )}
                                            >
                                                {feature.linkText}
                                                {!isInternalLink && <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70 group-hover/link:opacity-100 transition-opacity" />}
                                            </LinkComponent>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                        We champion transparency. Verify these security cornerstones independently using the provided links.
                    </p>
                </motion.div>

                {/* Composite Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, amount: 0.2 }}
                    className="mt-12 max-w-2xl mx-auto p-4 rounded-lg border border-dashed border-primary/30 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 aspect-[16/5] flex items-center justify-center shadow-inner"
                >
                    <p className="text-xs text-muted-foreground/70 italic text-center">
                        AI Prompt: Illustrate the layers of $ROACH security architecture - show locked liquidity, vested team tokens, and contract audit as security pillars forming a shield around the token.
                        <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                            Research: Cialdini's Principles - Authority, Social Proof, Commitment
                        </span>
                    </p>
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}

export default SecuritySection;