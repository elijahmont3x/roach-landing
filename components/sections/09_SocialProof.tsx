// --- START OF FILE components/sections/SocialProof.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Correct import CardTitle
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link
import { AlertTriangle, CheckCircle, ExternalLink, LineChart, MessageSquareText, Quote, Users } from "lucide-react"; // Import ExternalLink
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6";


// --- Refined Data (Ensure data is realistic or clearly placeholder) ---
const metrics = [
    { icon: Users, value: "Target: 10k+", label: "Community Members", trend: "Starting Soon", description: "Join our growing Telegram, Discord, and Twitter communities. Be among the first to participate!", color: "blue", prelaunch: true },
    { icon: MessageSquareText, value: "Tracking...", label: "Community Sentiment", trend: "Initial Feedback Positive", description: "We'll measure and report community sentiment post-launch. Early adopter feedback guides our path.", color: "green", prelaunch: true },
    { icon: LineChart, value: "Goal: 5k+", label: "First Month Holders", trend: "Launch Pending", description: "We're targeting a strong initial holder base to build network effects and distribution.", color: "orange", prelaunch: true },
];

const testimonials = [
    { name: "Crypto Enthusiast", handle: "@example_user1", avatarFallback: "CE", image: "/placeholder-avatars/solana-sensei.png", text: "Impressed by $ROACH's antifragile concept. Dynamic tax adaptation during market volatility could be game-changing if implemented properly.", role: "Example Feedback", verified: false, prelaunch: true },
    { name: "DeFi Investor", handle: "@example_user2", avatarFallback: "DI", image: "/placeholder-avatars/defi-degen.png", text: "The cockroach concept is brilliant for crypto. A token designed to benefit from chaos instead of just surviving it. Will be watching the audit and LP lock closely.", role: "Potential Investor", verified: false, prelaunch: true },
    { name: "Solana Developer", handle: "@example_user3", avatarFallback: "SD", image: "/placeholder-avatars/crypto-cassie.png", text: "The technical approach looks solid on paper. Eager to see how the tier system functions in practice and whether it can truly deliver on the antifragile promise.", role: "Technical Perspective", verified: false, prelaunch: true },
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
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

    return (
        <TooltipProvider>
            <Section id="social-proof" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/5 to-background dark:from-background/5 dark:to-background/10"> {/* OK: Layout BG */}
                <SectionHeader
                    title="Strength in Numbers: The $ROACH Colony"
                    description="Connect with a thriving, rapidly expanding community built around the principles of resilience and antifragility. Explore our metrics and hear from fellow members."
                    subtitle={<><Users className="inline h-4 w-4 mr-1.5" /> Community & Trust Signals </>}
                    alignment="center" 
                    className="mb-8 sm:mb-10" // Reduced from mb-16
                />
                
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-8 max-w-3xl mx-auto text-center bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/30 dark:border-amber-600/40 rounded-lg p-4"
                >
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>$ROACH is in pre-launch phase. The metrics below represent targets and projections rather than current data.</span>
                </p>
                </motion.div>

                {/* Metrics Grid */}
                <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 max-w-4xl mx-auto" // OK: Layout grid
                >
                    {metrics.map((metric, index) => {
                        const colors = colorMap[metric.color as keyof typeof colorMap];
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                {/* Card: Removed shadow-lg hover:shadow-xl, rely on base. Added contextual border/bg */}
                                <Card className={cn(
                                    "transition-all duration-300 border overflow-hidden h-full flex flex-col",
                                    colors.border, "dark:bg-card/60 backdrop-blur-sm",
                                    metric.prelaunch && "bg-muted/20 dark:bg-muted/10 border-dashed" // Visual indicator for pre-launch
                                    )}>
                                    <CardHeader className={cn("flex flex-row items-center gap-4", colors.bg)}>
                                        <div className={cn("p-2 rounded-lg border", colors.border, colors.bg.replace('/10', '/20').replace('/30', '/40'))}>
                                        <metric.icon className={cn("h-7 w-7", colors.text)} />
                                        </div>
                                        <div className="flex-1">
                                        <CardTitle className={cn("text-2xl sm:text-3xl font-bold tracking-tight", colors.text)}>
                                            {metric.value}
                                            {metric.prelaunch && <span className="text-xs ml-2 opacity-75 italic">(Projection)</span>}
                                        </CardTitle>
                                        <p className="text-xs font-semibold text-foreground/80 -mt-1">{metric.label}</p>
                                        </div>
                                    </CardHeader>
                                    {/* CardContent: Relies on Card gap. Removed p-5 */}
                                    <CardContent className="text-center flex flex-col flex-grow justify-between">
                                        <p className="text-sm text-muted-foreground mb-3 leading-normal">{metric.description}</p> {/* OK: Text style */}
                                        {/* Badge: Use base component. className for layout and contextual color */}
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
                        className="md:col-span-3 mt-6" // OK: Layout
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
                    >
                        {/* OK: Placeholder styling */}
                        <div className="relative aspect-[16/5] bg-muted/20 dark:bg-white/5 border border-dashed border-border/30 rounded-lg p-3 flex items-center justify-center">
                            <p className="text-xs text-muted-foreground/70 italic max-w-md text-center">
                                AI Prompt: Visualize community growth metrics...
                                <span className="block mt-1 text-[10px] tracking-wider font-medium uppercase text-muted-foreground/50">
                                    Research: Social Proof...
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.1 }}
                className="mb-8 max-w-6xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Anticipated Community Perspectives</h3>
                    <p className="text-sm text-muted-foreground text-center mb-6 italic">The following represents the types of feedback we expect based on early concept presentations. Actual user testimonials will be featured post-launch.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"> {/* OK: Layout grid */}
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.08 }}>
                                 {/* Card: Removed shadow-md hover:shadow-lg, rely on base. Removed border overrides. */}
                                 {/* OK: hover border, layout styles */}
                                <Card className="h-full flex flex-col transition-all duration-300 border border-border/15 dark:border-border/20 bg-card overflow-hidden hover:border-primary/30">
                                    {/* CardHeader relies on Card gap. Removed pb-3 pt-4 px-4. Contextual border/bg OK */}
                                    <CardHeader className="flex flex-row items-center gap-3 border-b border-border/15 dark:border-border/20 bg-muted/20 dark:bg-muted/5">
                                        {/* Avatar uses base component */}
                                        <Avatar className="h-10 w-10 border-2 border-border/50">
                                            <AvatarImage src={testimonial.image} alt={`${testimonial.name}'s avatar`} />
                                            <AvatarFallback className="text-sm font-semibold bg-muted">{testimonial.avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden"> {/* OK: Layout */}
                                            <div className="flex items-center gap-1"> {/* OK: Layout */}
                                                <p className="font-semibold text-sm leading-tight truncate">{testimonial.name}</p> {/* OK: Text style */}
                                                {testimonial.verified && <Tooltip delayDuration={100}>
                                                    <TooltipTrigger>
                                                        <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" /> {/* OK: Contextual icon color */}
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top"><p className="text-xs">Verified Holder/Contributor</p></TooltipContent>
                                                </Tooltip>}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{testimonial.handle}</p> {/* OK: Text style */}
                                        </div>
                                        {/* Optional: Add Link to original tweet/post if available */}
                                        {/* <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><ExternalLink className="h-4 w-4" /></Button> */}
                                    </CardHeader>
                                    {/* CardContent relies on Card gap. Removed p-4, pt-4 */}
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        {/* OK: Quote styling */}
                                        <blockquote className="relative text-sm text-foreground/95 italic border-l-3 border-primary/50 pl-3 mb-4 flex-1">
                                            <Quote className="absolute top-0 -left-1 h-8 w-8 text-primary/10 transform -translate-x-1/2" />
                                            <span className="relative z-10">{testimonial.text}</span>
                                        </blockquote>
                                         {/* OK: Text style */}
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
                    className="text-center max-w-3xl mx-auto" // OK: Layout
                >
                    {/* Card: Removed shadow-lg, rely on base. Contextual border/bg OK. */}
                    <Card className="inline-block border border-border/20 dark:border-border/25 bg-gradient-to-br from-card via-muted/10 to-card rounded-xl">
                         {/* CardContent relies on Card base gap. Removed p-0 */}
                        <CardContent className="space-y-4">
                             {/* OK: Layout */}
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Users className="h-6 w-6 text-primary" /> {/* OK: Contextual color */}
                                <h3 className="text-xl md:text-2xl font-semibold">Become Part of the Colony</h3> {/* OK: Text style */}
                            </div>
                            <p className="text-muted-foreground text-base">Join the conversation, get support, and stay updated on the latest developments:</p> {/* OK: Text style */}
                            {/* Platform Icons Visual */}
                             {/* OK: Layout */}
                            <div className="flex justify-center gap-3 py-3">
                                {socialLinks.filter(link => link.href !== '#').map(link => (
                                    <Tooltip key={link.name} delayDuration={100}>
                                        <TooltipTrigger asChild>
                                             {/* Link styling OK */}
                                            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="text-muted-foreground hover:text-primary transition-colors p-1">
                                                <link.icon className="h-6 w-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom"><p className="text-xs">Join on {link.name}</p></TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                            {/* Buttons to Join */}
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2"> {/* OK: Layout */}
                                {socialLinks.filter(link => link.href !== '#').slice(0, 3).map(link => ( // Show first 3 prominent buttons
                                    // Use Link > Button
                                    <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="flex-grow sm:flex-grow-0">
                                        {/* Button: Use base. Removed shadow, hover shadow, hover bg overrides. font-medium is part of base */}
                                        <Button variant="default" size="lg" className="font-medium bg-primary/90 hover:bg-primary flex-grow sm:flex-grow-0 w-full">
                                            <link.icon className="h-5 w-5" /> Join on {link.name}
                                        </Button>
                                    </Link>
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