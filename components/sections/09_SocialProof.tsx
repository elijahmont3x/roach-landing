// --- START OF FILE components/sections/SocialProof.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, LineChart, MessageSquareText, Quote, Users } from "lucide-react";
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6";


// --- Refined Data (Ensure data is realistic or clearly placeholder) ---
const metrics = [
    { icon: Users, value: "18k+", label: "Community Members", trend: "+8% This Week", description: "Engaged holders across Telegram, Discord, and Twitter.", color: "blue" },
    { icon: MessageSquareText, value: "9.2/10", label: "Sentiment Score", trend: "Consistently Positive", description: "Community sentiment analyzed from social channels.", color: "green" }, // Example sentiment score
    { icon: LineChart, value: "25k+", label: "Unique Holders", trend: "+ Growing Steadily", description: "Increasing number of wallets holding $ROACH on Solana.", color: "orange" },
];

const testimonials = [
    { name: "Solana Sensei", handle: "@SolSensei", avatarFallback: "SS", image: "/placeholder-avatars/solana-sensei.png", text: "Impressed by $ROACH's antifragile mechanics. The dynamic tax/reflection during the recent volatility was tangible. Watching this closely.", role: "Verified Holder", verified: true },
    { name: "DeFi Degen", handle: "@DegenExplorer", avatarFallback: "DE", image: "/placeholder-avatars/defi-degen.png", text: "The cockroach concept is genius for crypto. Finally, a token designed to benefit from the chaos instead of just surviving it. Team transparency with the audit/LP lock is key.", role: "Trader", verified: false },
    { name: "Crypto Cassie", handle: "@CassieCrypto", avatarFallback: "CC", image: "/placeholder-avatars/crypto-cassie.png", text: "Joined the $ROACH Telegram – very active & helpful community. It's more than a meme; the tech seems solid. Excited to see the roadmap unfold.", role: "Community Member", verified: true },
];

// UPDATE THESE LINKS
const socialLinks = [
    { name: "X (Twitter)", href: "#", icon: FaXTwitter, ariaLabel: "Follow $ROACH on X (Twitter)" },
    { name: "Telegram", href: "#", icon: FaTelegram, ariaLabel: "Join the Official $ROACH Telegram" },
    { name: "Discord", href: "#", icon: FaDiscord, ariaLabel: "Join the Official $ROACH Discord" },
    { name: "Reddit", href: "#", icon: FaRedditAlien, ariaLabel: "Visit the $ROACH Subreddit" },
    { name: "GitHub", href: "#", icon: FaGithub, ariaLabel: "View $ROACH Source Code on GitHub (if applicable)" },
];

// Color map helper
const colorMap = {
    blue: { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-900/30', border: 'border-blue-500/30 dark:border-blue-500/40' },
    green: { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/10 dark:bg-green-900/30', border: 'border-green-500/30 dark:border-green-500/40' },
    orange: { text: 'text-orange-700 dark:text-orange-500', bg: 'bg-orange-500/10 dark:bg-orange-900/30', border: 'border-orange-500/30 dark:border-orange-500/40' },
};
// ----------------------------------

export function SocialProof() {
    // Animation Variants
    const containerVariants = { hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

    return (
        <TooltipProvider>
            <Section id="social-proof" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 to-background dark:from-background/5 dark:to-background/10">
                <SectionHeader
                    title="Strength in Numbers: The $ROACH Colony"
                    description="Connect with a thriving, rapidly expanding community built around the principles of resilience and antifragility. Explore our metrics and hear from fellow members."
                    subtitle={<><Users className="inline h-4 w-4 mr-1.5" /> Community & Trust Signals </>}
                    alignment="center" className="mb-16"
                />

                {/* Metrics Grid */}
                <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 max-w-4xl mx-auto"
                >
                    {metrics.map((metric, index) => {
                        const colors = colorMap[metric.color as keyof typeof colorMap];
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className={cn("shadow-lg hover:shadow-xl transition-all duration-300 border overflow-hidden h-full flex flex-col", colors.border, "dark:bg-card/60 backdrop-blur-sm")}>
                                    <CardHeader className={cn("pb-4 pt-5 px-5 flex flex-row items-center gap-4", colors.bg)}>
                                        <div className={cn("p-2 rounded-lg border", colors.border, colors.bg.replace('/10', '/20').replace('/30', '/40'))}>
                                            <metric.icon className={cn("h-7 w-7", colors.text)} />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className={cn("text-2xl sm:text-3xl font-bold tracking-tight", colors.text)}>{metric.value}</CardTitle>
                                            <p className="text-xs font-semibold text-foreground/80 -mt-1">{metric.label}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5 text-center flex flex-col flex-grow justify-between">
                                        <p className="text-sm text-muted-foreground mb-3 leading-normal">{metric.description}</p>
                                        <Badge variant="secondary" size="sm" className={cn("text-xs font-medium mt-auto w-fit mx-auto", colors.bg, colors.text, colors.border)}>
                                            {metric.trend}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                    {/* Metrics Chart Placeholder */}
                    <motion.div
                        className="md:col-span-3 mt-6"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
                    >
                        <div className="relative aspect-[16/5] bg-muted/20 dark:bg-white/5 border border-dashed border-border/30 rounded-lg p-3 flex items-center justify-center">
                            <p className="text-xs text-muted-foreground/70 italic max-w-md text-center">
                                AI Prompt: Visualize community growth metrics. Could be multi-line chart (members, holders over time) or stacked bars showing engagement sources. Use theme colors corresponding to metrics (blue, green, orange). Title: Ecosystem Growth Trends. Clean, modern data visualization style.
                                <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                    Research: Social Proof (Visualizing Growth), Data Visualization Best Practices
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.1 }}
                    className="mb-16 max-w-6xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-12">Hear from the Colony</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"> {/* Added items-stretch */}
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.08 }}>
                                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300 border border-border/15 dark:border-border/20 bg-card overflow-hidden hover:border-primary/30">
                                    <CardHeader className="flex flex-row items-center gap-3 pb-3 pt-4 px-4 border-b border-border/15 dark:border-border/20 bg-muted/20 dark:bg-muted/5">
                                        <Avatar className="h-10 w-10 border-2 border-border/50">
                                            <AvatarImage src={testimonial.image} alt={`${testimonial.name}'s avatar`} />
                                            <AvatarFallback className="text-sm font-semibold bg-muted">{testimonial.avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-center gap-1">
                                                <p className="font-semibold text-sm leading-tight truncate">{testimonial.name}</p>
                                                {testimonial.verified && <Tooltip delayDuration={100}>
                                                    <TooltipTrigger>
                                                        <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top"><p className="text-xs">Verified Holder/Contributor</p></TooltipContent>
                                                </Tooltip>}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{testimonial.handle}</p>
                                        </div>
                                        {/* Optional: Add Link to original tweet/post if available */}
                                        {/* <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><ExternalLink className="h-4 w-4" /></Button> */}
                                    </CardHeader>
                                    <CardContent className="p-4 pt-4 flex-grow flex flex-col justify-between">
                                        <blockquote className="relative text-sm text-foreground/95 italic border-l-3 border-primary/50 pl-3 mb-4 flex-1">
                                            <Quote className="absolute top-0 -left-1 h-8 w-8 text-primary/10 transform -translate-x-1/2" />
                                            <span className="relative z-10">{testimonial.text}</span>
                                        </blockquote>
                                        <p className="text-xs font-medium text-muted-foreground text-right mt-2">
                                            – {testimonial.role}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Connect Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <Card className="inline-block p-6 md:p-8 border border-border/20 dark:border-border/25 bg-gradient-to-br from-card via-muted/10 to-card shadow-lg rounded-xl">
                        <CardContent className="p-0 space-y-4">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Users className="h-6 w-6 text-primary" />
                                <h3 className="text-xl md:text-2xl font-semibold">Become Part of the Colony</h3>
                            </div>
                            <p className="text-muted-foreground text-base">Join the conversation, get support, and stay updated on the latest developments:</p>
                            {/* Platform Icons Visual */}
                            <div className="flex justify-center gap-3 py-3">
                                {socialLinks.filter(link => link.href !== '#').map(link => (
                                    <Tooltip key={link.name} delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="text-muted-foreground hover:text-primary transition-colors p-1">
                                                <link.icon className="h-6 w-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom"><p className="text-xs">Join on {link.name}</p></TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                            {/* Buttons to Join */}
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
                                {socialLinks.filter(link => link.href !== '#').slice(0, 3).map(link => ( // Show first 3 prominent buttons
                                    <Button key={link.name} variant="default" size="lg" className="shadow-md hover:shadow-lg transition-shadow font-medium bg-primary/90 hover:bg-primary text-primary-foreground flex-grow sm:flex-grow-0" asChild>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" aria-label={link.ariaLabel}>
                                            <link.icon className="h-5 w-5" /> Join on {link.name}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}


// --- END OF FILE components/sections/SocialProof.tsx ---