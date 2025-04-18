// --- START OF FILE components/sections/HowToBuy.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRightLeft, Check, Coins, Copy, DownloadCloud, ExternalLink, HelpCircle, ShoppingCart, Sparkles } from 'lucide-react';
import Link from "next/link";
import { useCallback, useState } from 'react'; // Added useCallback
import { toast } from "sonner";

// --- Constants - Ensure Accuracy ---
const CONTRACT_ADDRESS = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const CONTRACT_ADDRESS_SHORT = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-6)}`;
const EXPLORER_LINK = `https://solscan.io/token/${CONTRACT_ADDRESS}`;
// Main swap link (Jupiter recommended for aggregation)
const PRIMARY_SWAP_LINK = `https://jup.ag/swap/SOL-${CONTRACT_ADDRESS}`;
const PRIMARY_SWAP_NAME = "Jupiter Aggregator";
// Secondary swap link (Direct Raydium)
const SECONDARY_SWAP_LINK = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${CONTRACT_ADDRESS}`;
const SECONDARY_SWAP_NAME = "Raydium";


// --- Component Definition ---
export function HowToBuy() {
    const [copied, setCopied] = useState(false);

    // Optimized Copy Handler using useCallback
    const copyAddress = useCallback(() => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
            setCopied(true);
            toast.success("$ROACH contract address copied!");
            setTimeout(() => setCopied(false), 2000); // Reset state after 2s
        }).catch(err => {
            console.error("Failed to copy address:", err);
            toast.error("Copy failed. Please copy manually.");
        });
    }, []); // No dependencies

    // --- Steps Data (Enhanced Clarity & Structure) ---
    const steps = [
        {
            icon: DownloadCloud, // Changed Icon
            title: "1. Get a Solana Wallet",
            description: "Secure a Solana-compatible wallet like Phantom or Solflare. Available as browser extensions and mobile apps. Keep your seed phrase safe!",
            links: [
                { name: "Phantom Wallet", href: "https://phantom.app/", icon: Sparkles },
                { name: "Solflare Wallet", href: "https://solflare.com/", icon: Sparkles },
            ],
            visualPrompt: "AI Prompt: Clean logos for Phantom and Solflare wallets, side-by-side. Modern, recognizable. Background slightly blurred. Research: Choice Architecture (Suggesting top options reduces cognitive load)."
        },
        {
            icon: Coins,
            title: "2. Fund Wallet with SOL",
            description: "Purchase SOL (Solana's native token) from a reputable exchange (e.g., Coinbase, Binance, Kraken). Transfer the SOL to your new Solana wallet address.",
            links: [ // Added Kraken
                { name: "Coinbase", href: "https://www.coinbase.com/" },
                { name: "Binance", href: "https://www.binance.com/" },
                { name: "Kraken", href: "https://www.kraken.com/" },
            ],
            visualPrompt: "AI Prompt: Logos for Coinbase, Binance, and Kraken exchanges arranged neatly. Clean, vector style. Research: Authority Principle (Using recognizable exchanges)."
        },
        {
            icon: ArrowRightLeft,
            title: "3. Swap SOL for $ROACH",
            description: `Connect your wallet to a trusted Solana DEX aggregator like Jupiter or Raydium. Always use the official contract address below to avoid scams.`,
            action: (
                <div className="space-y-3 mt-2">
                    <label htmlFor="contract-address-input-guide" className="text-xs font-medium text-muted-foreground block text-left">Official Contract Address (Verify!):</label>
                    <div className="flex items-center gap-2 rounded-md border bg-background/50 dark:bg-muted/20 p-2 shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-1">
                        <Input
                            id="contract-address-input-guide"
                            readOnly
                            value={CONTRACT_ADDRESS}
                            className="flex-1 h-auto font-mono text-xs bg-transparent border-0 shadow-none px-1 selection:bg-primary/20 focus-visible:ring-0 focus-visible:ring-offset-0 py-1 leading-tight" // Adjust py
                            aria-label="Official ROACH Contract Address"
                        />
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-1"
                                    onClick={copyAddress}
                                    aria-label="Copy Contract Address"
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top"><p>Copy Address</p></TooltipContent>
                        </Tooltip>
                    </div>
                    {/* Primary Swap Button (Jupiter recommended) */}
                    <Button className="w-full shadow-md bg-primary hover:bg-primary-hover text-primary-foreground" asChild>
                        <a href={PRIMARY_SWAP_LINK} target="_blank" rel="noopener noreferrer">
                            Swap on {PRIMARY_SWAP_NAME} <ExternalLink className="ml-1.5 h-4 w-4" />
                        </a>
                    </Button>
                    {/* Secondary Swap Button (Raydium) */}
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
                                <a href={SECONDARY_SWAP_LINK} target="_blank" rel="noopener noreferrer">
                                    Swap on {SECONDARY_SWAP_NAME} <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom"><p className="text-xs">Alternative DEX option</p></TooltipContent>
                    </Tooltip>
                </div>
            ),
            visualPrompt: "AI Prompt: Logos for Jupiter Aggregator (JUP Cat) and Raydium DEX. Place Jupiter slightly more prominent. Clean vector style. Research: Anchoring (Suggesting Jupiter first)."
        },
        {
            icon: Check,
            title: "4. Confirm & Hold",
            description: "Review and approve the swap transaction in your wallet. Once confirmed on the Solana network, $ROACH will appear in your balance. Welcome aboard!",
            action: (
                <div className="flex flex-col gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="w-full" asChild>
                        <a href={EXPLORER_LINK} target="_blank" rel="noopener noreferrer" title="Verify on Solscan">
                            View on Solscan <ExternalLink className="ml-1.5 h-3 w-3 opacity-70" />
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-muted-foreground hover:text-foreground" asChild>
                        <Link href="#faq">
                            <HelpCircle className="h-3.5 w-3.5 mr-1.5 opacity-80" /> Need Help? Read FAQ
                        </Link>
                    </Button>
                </div>
            ),
            visualPrompt: "AI Prompt: A checkmark inside a wallet icon graphic, symbolizing successful acquisition. Simple, clean. Green accent color. Research: Confirmation Bias (Visual success reinforcement)."
        },
    ];

    // --- Animation Variants ---
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } // Smoother ease-out-expo like
    };

    return (
        <TooltipProvider>
            <Section id="how-to-buy" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-muted/10 dark:from-background/5 dark:to-background/15">
                <SectionHeader
                    title="Acquiring Your $ROACH Stake"
                    description="Follow this secure, step-by-step guide to purchase $ROACH tokens and join the antifragile ecosystem on Solana."
                    subtitle={<><ShoppingCart className="inline h-4 w-4 mr-1.5" /> Simple Purchase Process</>}
                    alignment="center"
                    className="mb-16"
                />

                {/* Security Reminder First */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-10 text-center max-w-3xl mx-auto"
                >
                    <Card className="inline-block border-amber-500/40 dark:border-amber-600/50 bg-amber-500/10 dark:bg-amber-900/20 p-4 shadow-md">
                        <CardContent className="p-0 flex items-start sm:items-center gap-3">
                            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                            <div className="text-left">
                                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Security First: Always Verify Contract Address</p>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    <strong className="text-foreground">Double-check you are using the official $ROACH address:</strong> <code className="text-xs font-mono bg-muted/50 dark:bg-muted/30 px-1 py-0.5 rounded">{CONTRACT_ADDRESS_SHORT}</code>. Beware of fake tokens and impersonators. Use only trusted DEXs linked here. Never share your private keys.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>


                <motion.div
                    variants={containerVariants}
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch" // Wider container, items-stretch for equal height feel
                >
                    {steps.map((step, index) => (
                        <motion.div key={`step-${index}`} variants={itemVariants}>
                            <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/15 dark:border-border/20 overflow-hidden bg-card/80 dark:bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4 flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg mt-0.5 border border-primary/20">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        {/* Use CardTitle for semantic structure */}
                                        <CardTitle className="text-lg font-semibold leading-tight">{step.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-5 pb-5 flex-1 flex flex-col gap-4 justify-between"> {/* Ensure content justifies between */}
                                    <div> {/* Wrapper for description and links */}
                                        <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                                        {/* Suggested links */}
                                        {step.links && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {step.links.map((link, linkIndex) => (
                                                    <Button
                                                        key={`link-${index}-${linkIndex}`}
                                                        variant="outline" size="xs" // Consistent small size
                                                        className="text-xs font-medium gap-1 h-6 border-border/50 hover:border-primary/40 dark:bg-muted/20" asChild
                                                    >
                                                        <a href={link.href} target="_blank" rel="noopener noreferrer" title={`Visit ${link.name}`}>
                                                            {link.icon && <link.icon className="h-3 w-3 opacity-80" />}
                                                            {link.name} <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                                                        </a>
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                        {/* Visual Placeholder */}
                                        {step.visualPrompt && (
                                            <div className="my-3 bg-muted/30 dark:bg-white/5 border border-dashed border-border/30 rounded h-12 flex items-center justify-center p-1 shadow-inner">
                                                <p className="text-[0.65rem] text-muted-foreground/60 italic text-center leading-tight">{step.visualPrompt}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action area pushed to bottom */}
                                    {step.action && <div className="mt-auto">{step.action}</div>}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}


// --- END OF FILE components/sections/HowToBuy.tsx ---