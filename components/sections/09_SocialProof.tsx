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
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6";


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
                <Section id="social-proof" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-muted/5 dark:from-background/10 dark:via-background dark:to-background/5">
                    <SectionHeader
                        title="Join the Resilient $ROACH Colony"
                        description="Connect with a rapidly growing community united by the vision of antifragility. Explore our pre-launch momentum and anticipated community feedback."
                        subtitle={<><Users className="inline h-4 w-4 mr-1.5" /> Community Momentum</>}
                        alignment="center" className="mb-10"
                    />

                    {/* Pre-Launch Status Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                        className="mb-10 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4 shadow-sm"
                    >
                        <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span><strong>Pre-Launch Insights:</strong> Metrics represent targets & projections. Testimonials are indicative based on early feedback.</span>
                        </p>
                    </motion.div>

                    {/* Metrics Grid */}
                    <motion.div
                        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20 max-w-4xl mx-auto"
                    >
                        {metrics.map((metric, index) => {
                            const colors = colorMap[metric.color as keyof typeof colorMap];
                            return (
                                <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                                    <Card className={cn(
                                        "transition-all duration-300 border overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg",
                                        colors.border, "dark:bg-card/70 backdrop-blur-sm",
                                        metric.prelaunch && "bg-muted/30 dark:bg-muted/15 border-dashed hover:shadow-md" // Clear visual for pre-launch data
                                    )}>
                                        <CardHeader className={cn("flex flex-row items-center gap-3 pb-2 pt-4 px-4", metric.prelaunch ? colors.bg.replace('/10','/20').replace('/30','/40') : colors.bg)}>
                                            <div className={cn("p-2 rounded-lg border shadow-inner", colors.border, metric.prelaunch ? colors.bg.replace('/20','/30') : colors.bg.replace('/10', '/20'))}>
                                                <metric.icon className={cn("h-6 w-6", colors.text)} />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className={cn("text-xl sm:text-2xl font-bold tracking-tight", colors.text)}>
                                                    {metric.value}
                                                </CardTitle>
                                                <p className="text-xs font-semibold text-muted-foreground -mt-1">{metric.label}</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pt-2 pb-4 text-center flex flex-col flex-grow justify-between">
                                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-normal text-balance">{metric.description}</p>
                                            <Badge variant="secondary" size="sm" className={cn("text-[10px] font-medium mt-auto w-fit mx-auto uppercase tracking-wider", colors.bg, colors.text, colors.border)}>
                                                {metric.trend}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                        {/* Placeholder: Graph visualizing metrics targets */}
                        <motion.div
                            className="md:col-span-3 mt-4"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                        >
                            <div className="relative aspect-[16/4] bg-gradient-to-r from-muted/5 via-transparent to-muted/5 border border-dashed border-border/20 rounded-lg p-3 flex items-center justify-center">
                                <p className="text-xs text-muted-foreground/70 italic text-center">
                                    AI Prompt: Create bar chart visualizing target metrics (Community, Sentiment Score - Target High, Holders). Style: Clean, using theme colors (blue, green, orange). Show aspirational targets.
                                    <span className="block mt-1 text-[9px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                        Research: Goal Visualization, Social Proof Heuristics
                                    </span>
                                </p>
                                <LineChart className="absolute h-12 w-12 text-border opacity-10 bottom-1 right-2 transform rotate-12" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.1 }}
                        className="mb-16 md:mb-20 max-w-6xl mx-auto"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-foreground">Voices from the Community (Indicative)</h3>
                        <p className="text-sm text-muted-foreground text-center mb-8 italic max-w-3xl mx-auto text-balance">Insights below represent the type of feedback anticipated based on $ROACH's novel concept. Authentic testimonials will follow post-launch.</p>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
                            {testimonials.map((testimonial, index) => (
                                <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.08 }}>
                                    <Card className="h-full flex flex-col transition-all duration-300 border border-border/15 dark:border-border/20 bg-card/90 dark:bg-card/60 overflow-hidden hover:border-primary/30 shadow-sm hover:shadow-lg backdrop-blur-sm">
                                        <CardHeader className="flex flex-row items-center gap-3 pb-2 pt-4 px-4 border-b border-border/15 dark:border-border/20 bg-muted/20 dark:bg-muted/10">
                                            <Avatar className="h-10 w-10 border-2 border-border/40">
                                                <AvatarImage src={testimonial.image} alt={`${testimonial.name}'s avatar`} />
                                                <AvatarFallback className="text-sm font-semibold bg-muted/50 text-muted-foreground">{testimonial.avatarFallback}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex items-center gap-1">
                                                    <p className="font-semibold text-sm leading-tight truncate text-foreground">{testimonial.name}</p>
                                                    {testimonial.verified && (
                                                        <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{testimonial.handle}</p>
                                            </div>
                                            {/* Optional: Link to source - Not applicable pre-launch */}
                                        </CardHeader>
                                        <CardContent className="px-4 pt-4 pb-4 flex-grow flex flex-col justify-between">
                                            <blockquote className="relative text-sm text-foreground/90 italic border-l-2 border-primary/40 pl-3 mb-4 flex-1 text-balance leading-relaxed">
                                                <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/15 transform -translate-x-1/2 opacity-80" />
                                                <span className="relative z-10">{testimonial.text}</span>
                                            </blockquote>
                                            <p className="text-xs font-medium text-muted-foreground text-right mt-2">
                                                – {testimonial.role}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Connect Section Refined */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Card className="inline-block border border-border/20 dark:border-border/30 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background/5 dark:to-primary/10 rounded-xl shadow-lg shadow-primary/5 overflow-hidden backdrop-blur-sm">
                            <CardContent className="p-6 space-y-3">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Users className="h-6 w-6 text-primary" />
                                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Be Part of the Antifragile Future</h3>
                                </div>
                                <p className="text-muted-foreground text-base max-w-xl mx-auto text-balance">Engage with the team, get support, and stay ahead of developments:</p>
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