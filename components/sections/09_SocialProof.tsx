// --- START OF FILE components/sections/09_SocialProof.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, CheckCircle, ExternalLink, LineChart, MessageCircleHeart, Quote, Users, ThumbsUp } from "lucide-react"; // Changed Icons
import { FaBoltLightning, FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6";


// Data with pre-launch placeholders and targets
const metrics = [
    { icon: Users, value: "10k+ Target", label: "Community Members", trend: "Growing Fast", description: "Targeting 10,000+ members across Telegram, Discord, X at launch. Join the early colony!", color: "blue", prelaunch: true },
    { icon: ThumbsUp, value: "Tracking", label: "Early Sentiment", trend: "Highly Positive", description: "Initial concept feedback is very encouraging. Formal sentiment analysis post-launch.", color: "green", prelaunch: true }, // Changed icon
    { icon: LineChart, value: "5k+ Target", label: "Launch Week Holders", trend: "High Anticipation", description: "Aiming for a diverse and strong initial holder base post-launch to establish robust distribution.", color: "orange", prelaunch: true },
];

const testimonials = [
    { name: "Crypto Strategist", handle: "@AntifragileAlpha", avatarFallback: "AS", image: "/placeholder-avatars/crypto-strategist.png", text: "The core 'antifragile' mechanic is fascinating. If $ROACH can truly turn sell pressure into reward loops effectively, it addresses a major pain point in DeFi.", role: "Conceptual Feedback", verified: false, prelaunch: true },
    { name: "Solana Influencer", handle: "@SolanaSensei", avatarFallback: "SS", image: "/placeholder-avatars/solana-sensei.png", text: "Definitely keeping $ROACH on my radar. The clear link between the theme and tokenomics is strong branding. Looking forward to the audit results.", role: "Market Watcher", verified: false, prelaunch: true },
    { name: "Degen Trader", handle: "@DeFiDegenX", avatarFallback: "DD", image: "/placeholder-avatars/defi-degen.png", text: "Cockroach theme is hilarious but the adaptive tax sounds like it could actually print during dips. Gotta see if it works, but interesting bet.", role: "Speculative Interest", verified: false, prelaunch: true },
];

// Use actual links if available, otherwise keep '#' as placeholder for now
const socialLinks = [
    { name: "X (Twitter)", href: "https://twitter.com/paradoxonsol", icon: FaXTwitter, ariaLabel: "Follow $ROACH on X" },
    { name: "Telegram", href: "https://t.me/paradoxportal", icon: FaTelegram, ariaLabel: "Join the $ROACH Telegram" },
    { name: "Discord", href: "#", icon: FaDiscord, ariaLabel: "Join the $ROACH Discord" }, // Example: keep # if no link
    { name: "Reddit", href: "#", icon: FaRedditAlien, ariaLabel: "Visit the $ROACH Subreddit" },
    // { name: "GitHub", href: "#", icon: FaGithub, ariaLabel: "View Code on GitHub" }, // Optional
];

// Color map helper
const colorMap = {
    blue: { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-900/30', border: 'border-blue-500/25 dark:border-blue-600/40' },
    green: { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/10 dark:bg-green-900/30', border: 'border-green-500/25 dark:border-green-600/40' },
    orange: { text: 'text-orange-700 dark:text-orange-500', bg: 'bg-orange-500/10 dark:bg-orange-900/30', border: 'border-orange-500/25 dark:border-orange-600/40' },
};


export function SocialProof() {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } } };

    return (
        <>
            <TooltipProvider>
                <Section id="social-proof" align="center" useSuspense className="!h-auto !min-h-auto bg-gradient-to-b from-muted/10 via-background to-muted/5 dark:from-background/10 dark:via-background dark:to-background/5">

                    {/* Connect Section Refined */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Card className="inline-block border border-border/20 dark:border-border/30 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background/5 dark:to-primary/10 rounded-xl shadow-lg shadow-primary/5 overflow-hidden backdrop-blur-sm">
                            <CardContent className="p-6 space-y-3">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <FaBoltLightning className="h-6 w-6 text-primary" />
                                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Join the Antifragile Movement</h3>
                                </div>
                                <p className="text-muted-foreground text-base max-w-xl mx-auto text-balance">Engage with the team, learn about the movement and stay ahead of developments:</p>
                                <div className="flex justify-center flex-wrap gap-2 pt-2">
                                    {socialLinks.filter(link => link.href !== '#').map(link => ( // Only show configured links
                                        <Tooltip key={link.name} delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}
                                                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-9 w-9 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5")}>
                                                    <link.icon className="h-4 w-4 text-primary/90" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom"><p className="text-xs">Join on {link.name}</p></TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Section>
            </TooltipProvider>
        </>
    );
}
// --- END OF FILE components/sections/09_SocialProof.tsx ---