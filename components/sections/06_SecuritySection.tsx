// --- START OF FILE components/sections/SecuritySection.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Import Card components
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Import Tooltip components
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, FileCode, Lock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

// Ensure Links are updated
const contractAddress = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const explorerLink = `https://solscan.io/token/${contractAddress}`;
const pinkLockLink = "#"; // REPLACE
const auditLink = "#"; // REPLACE
const vestingInfoLink = "#roadmap"; // Link to roadmap section discussing vesting


// Security Features Data
const securityFeatures = [
    {
        icon: ShieldCheck, title: "Comprehensive Security Audit",
        description: "Rigorous independent audit conducted by CertiK. Confirmed smart contract integrity with zero critical or major vulnerabilities identified.",
        status: "CertiK Audited & Passed", link: auditLink, linkText: "View Audit Report", color: "green",
        tooltip: "Click to view the full security audit report from CertiK.",
    },
    {
        icon: Lock, title: "Locked Initial Liquidity",
        description: "Initial liquidity pool (LP) tokens deployed on Raydium are verifiably locked for 12 months using PinkLock, preventing rug-pulls.",
        status: "12-Month LP Lock", link: pinkLockLink, linkText: "Verify Lock on PinkLock", color: "blue",
        tooltip: "Click to verify the liquidity lock details on the PinkLock platform.",
    },
    {
        icon: FileCode, title: "Immutable Contract & Supply",
        description: "The core $ROACH SPL token contract is non-upgradeable, and the total supply is fixed at 1 billion tokens. Minting authority is permanently revoked.",
        status: "Fixed Supply / Non-Upgradeable", link: explorerLink, linkText: "View Verified Contract", color: "purple",
        tooltip: "View the immutable contract source code and token details on Solscan.",
    },
    {
        icon: Users, title: "Transparent Team Vesting",
        description: "Team token allocation follows a strict 6-month linear vesting schedule, managed on-chain, demonstrating long-term commitment.",
        status: "6-Month Linear Vesting", link: vestingInfoLink, linkText: "See Vesting Schedule", color: "amber", // Use internal link type
        tooltip: "Team tokens unlock gradually over 6 months, view details on the roadmap.",
    },
];

// Color map helper
const colorMap = {
    green: { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/10 dark:bg-green-900/40', border: 'border-green-500/30 dark:border-green-500/35', iconBg: 'bg-green-100 dark:bg-green-900/40' },
    blue: { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-900/40', border: 'border-blue-500/30 dark:border-blue-500/35', iconBg: 'bg-blue-100 dark:bg-blue-900/40' },
    purple: { text: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-900/40', border: 'border-purple-500/30 dark:border-purple-500/35', iconBg: 'bg-purple-100 dark:bg-purple-900/40' },
    amber: { text: 'text-amber-700 dark:text-amber-500', bg: 'bg-amber-500/10 dark:bg-amber-900/40', border: 'border-amber-500/30 dark:border-amber-500/35', iconBg: 'bg-amber-100 dark:bg-amber-900/40' },
};

// Animation variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } } }; // Smoother ease

export function SecuritySection() {

    return (
        <TooltipProvider>
            <Section id="security" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 to-background/20 dark:from-background/5 dark:to-background/20"> {/* OK: Layout BG */}
                <SectionHeader
                    title="Fortified Security & Transparent Trust"
                    description="Security and transparency are paramount. $ROACH is built on verifiable measures designed to protect holders and foster long-term confidence in the ecosystem."
                    subtitle={<><ShieldCheck className="inline h-4 w-4 mr-1.5" /> Foundation of Trust</>}
                    alignment="center" className="mb-16" // OK: Layout margin
                />

                <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                     // OK: Layout grid
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
                >
                    {securityFeatures.map((feature) => {
                        const colors = colorMap[feature.color as keyof typeof colorMap];
                        const isInternalLink = feature.link === vestingInfoLink;
                        // Use Link for external, Button for internal scroll
                        const LinkComponent = isInternalLink ? 'button' : Link;

                        return (
                            <motion.div key={feature.title} variants={itemVariants}>
                                {/* Card: Removed shadow-md hover:shadow-lg hover:border-primary, rely on base. */}
                                {/* Added contextual border, bg, backdrop. OK: layout/visual tweaks. */}
                                <Card className={cn(
                                    "h-full transition-all duration-300 flex flex-col group overflow-hidden",
                                    "hover:border-primary/30 dark:hover:border-primary/50 dark:bg-card/70 backdrop-blur-sm", // OK: Specific hover/dark states
                                    colors.border // OK: Contextual border color
                                )}>
                                    {/* CardContent relies on Card base padding/gap. */}
                                    <CardContent className="flex-grow flex flex-col gap-4">
                                        {/* Icon & Title Row */}
                                        <div className="flex items-start gap-4"> {/* OK: Layout */}
                                             {/* OK: Contextual icon wrapper style */}
                                            <div className={cn("p-2.5 rounded-lg shrink-0 border", colors.iconBg, colors.border)}>
                                                 {/* OK: Contextual icon color */}
                                                <feature.icon className={cn("h-6 w-6", colors.text)} />
                                            </div>
                                            <div className="flex-1"> {/* OK: Layout */}
                                                <CardTitle className="text-lg font-semibold leading-tight">{feature.title}</CardTitle> {/* OK: Text style */}
                                                {/* Badge: Use base component. className for contextual colors/border/text */}
                                                <Badge variant="outline" size="sm" className={cn("mt-1.5 w-fit text-xs font-medium", colors.bg, colors.text, colors.border)}>
                                                    {feature.status}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground flex-grow leading-relaxed">{feature.description}</p> {/* OK: Text style */}

                                        {/* Link / Action */}
                                         {/* OK: Layout */}
                                        <div className="mt-auto pt-3 border-t border-border/20 text-right">
                                            {/* Button: Using variant="link" and size="sm". ClassName for color/interaction */}
                                            <LinkComponent
                                                href={isInternalLink ? undefined : feature.link} // Href only if external Link
                                                target={isInternalLink ? '_self' : '_blank'}
                                                rel={isInternalLink ? undefined : 'noopener noreferrer'}
                                                title={feature.tooltip}
                                                // Handle smooth scroll for internal button clicks
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
                                                    buttonVariants({ variant: "link", size: "sm" }), // Use button variant styles
                                                    "h-auto p-0 text-sm font-medium group/link", // Specific sizing reset for link style
                                                    colors.text // Apply contextual color
                                                )}
                                            >
                                                {feature.linkText}
                                                {/* OK: Group interaction styling */}
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
                    className="mt-12 text-center" // OK: Layout
                >
                     {/* OK: Text style */}
                    <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                        We champion transparency. Verify these security cornerstones independently using the provided links.
                    </p>
                </motion.div>

                {/* Composite Visual Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, amount: 0.2 }}
                     // OK: Layout and placeholder styling
                    className="mt-12 max-w-2xl mx-auto p-4 rounded-lg border border-dashed border-primary/30 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 aspect-[16/5] flex items-center justify-center shadow-inner"
                >
                    <p className="text-xs text-muted-foreground/70 italic text-center">
                        AI Prompt: Illustrate the layers of $ROACH security...
                        <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                            Research: Cialdini's Principles...
                        </span>
                    </p>
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}

// --- END OF FILE components/sections/SecuritySection.tsx ---