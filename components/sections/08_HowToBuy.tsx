// --- START OF FILE components/sections/08_HowToBuy.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRightLeft, Check, Coins, Copy, DownloadCloud, ExternalLink, HelpCircle, ShoppingCart, Sparkles, Verified } from 'lucide-react';
import Link from "next/link";
import { useCallback, useState } from 'react';
import { toast } from "sonner";

// Constants
const CONTRACT_ADDRESS = "ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const CONTRACT_ADDRESS_SHORT = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-6)}`;
const EXPLORER_LINK = `https://solscan.io/token/${CONTRACT_ADDRESS}`;
const PRIMARY_SWAP_LINK = `https://jup.ag/swap/SOL-${CONTRACT_ADDRESS}`;
const PRIMARY_SWAP_NAME = "Jupiter Aggregator";
const SECONDARY_SWAP_LINK = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${CONTRACT_ADDRESS}`;
const SECONDARY_SWAP_NAME = "Raydium DEX";

// Helper function for smooth scroll
const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
};

// Component Definition
export function HowToBuy() {
    const [copied, setCopied] = useState(false);

    const copyAddress = useCallback(() => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
            setCopied(true);
            toast.success("Contract address copied!", { duration: 2000 });
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error("Failed to copy address:", err);
            toast.error("Copy failed. Please copy manually.");
        });
    }, []);

    // Steps Data
    const steps = [
        {
            icon: DownloadCloud, title: "1. Get a Solana Wallet",
            description: "Secure Phantom, Solflare, or similar wallet. Guard your seed phrase!",
            links: [
                { name: "Phantom", href: "https://phantom.app/" }, { name: "Solflare", href: "https://solflare.com/" }
            ],
            visualPrompt: "AI Prompt: Clean, modern logos for Phantom and Solflare wallets. Style: Minimalist app icons."
        },
        {
            icon: Coins, title: "2. Acquire SOL",
            description: "Purchase SOL on exchanges like Coinbase, Binance, Kraken, then send to your wallet.",
            links: [
                { name: "Coinbase", href: "https://www.coinbase.com/" }, { name: "Binance", href: "https://www.binance.com/" }, { name: "Kraken", href: "https://www.kraken.com/" }
            ],
            visualPrompt: "AI Prompt: Minimalist logos for Coinbase, Binance, Kraken. Style: Flat, recognizable."
        },
        {
            icon: ArrowRightLeft, title: "3. Swap for $ROACH",
            description: "Connect wallet to Jupiter (recommended) or Raydium. Use the official contract address only.",
            action: (
                <div className="space-y-3 mt-2">
                    <label htmlFor="contract-address-guide" className="text-xs font-medium text-muted-foreground block text-left flex items-center gap-1"><Verified className="h-3 w-3 text-primary/80"/>Official Address (Verify!):</label>
                     <div className="flex items-center gap-1.5 rounded-md border bg-background/70 dark:bg-muted/30 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background/80">
                        <Input id="contract-address-guide" readOnly value={CONTRACT_ADDRESS} className="flex-1 h-auto font-mono text-[10px] sm:text-xs bg-transparent border-0 shadow-none px-1 selection:bg-primary/20 focus-visible:ring-0 py-0.5 leading-tight"/>
                        <Tooltip delayDuration={100}>
                             <TooltipTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary" onClick={copyAddress} aria-label="Copy Contract Address">
                                     {copied ? <Check className="h-4 w-4 text-green-500 animate-in fade-in duration-300" /> : <Copy className="h-3.5 w-3.5" />}
                                 </Button>
                             </TooltipTrigger>
                             <TooltipContent side="top"><p>Copy Address</p></TooltipContent>
                         </Tooltip>
                     </div>
                    <Link href={PRIMARY_SWAP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group">
                            Swap on {PRIMARY_SWAP_NAME} <ExternalLink className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </Link>
                    <Tooltip delayDuration={100}>
                         <TooltipTrigger asChild>
                             <Link href={SECONDARY_SWAP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5 text-red-600 dark:text-red-400 dark:hover:bg-red-900/20">
                                     Use {SECONDARY_SWAP_NAME} Instead <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                                 </Button>
                             </Link>
                         </TooltipTrigger>
                         <TooltipContent side="bottom"><p className="text-xs">Direct DEX Swap (Raydium)</p></TooltipContent>
                     </Tooltip>
                 </div>
            ),
            visualPrompt: "AI Prompt: Minimalist logos for Jupiter Aggregator (planet/swirl) and Raydium (stylized 'R'). Style: Modern crypto tech."
        },
        {
            icon: Check, title: "4. Confirm & Secure",
            description: "Approve transaction in wallet. $ROACH tokens will arrive shortly. Welcome to the Colony!",
            action: (
                 <div className="flex flex-col gap-2 mt-2">
                     <Link href={EXPLORER_LINK} target="_blank" rel="noopener noreferrer" title="Verify Transaction on Solscan">
                        <Button variant="secondary" size="sm" className="w-full">
                             Verify on Solscan <ExternalLink className="ml-1.5 h-3 w-3 opacity-70" />
                         </Button>
                    </Link>
                     <Button variant="outline" size="sm" className="w-full text-muted-foreground hover:text-foreground" onClick={() => scrollToSection('faq')}>
                         <HelpCircle className="h-3.5 w-3.5 mr-1.5 opacity-80" /> Questions? Read FAQ
                     </Button>
                 </div>
            ),
             visualPrompt: "AI Prompt: A checkmark merging with a wallet icon or blockchain block. Style: Clean, tech-focused verification symbol."
        },
    ];

    // Animation Variants
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 25, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } } };

    return (
        <TooltipProvider>
            <Section id="how-to-buy" align="center" useSuspense className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background/80 to-muted/10 dark:from-background/80 dark:to-background/15">
                 <SectionHeader
                    title="How to Get Your $ROACH"
                    description="Ready to join the Antifragile Colony? Follow these simple steps to securely purchase $ROACH on the Solana network."
                    subtitle={<><ShoppingCart className="inline h-4 w-4 mr-1.5" /> Secure Purchase Steps</>}
                    align="inherit"
                />

                 {/* Enhanced Security Reminder */}
                <motion.div
                     initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                    className="mb-12 text-center max-w-3xl mx-auto"
                >
                    <Card className="inline-block border-amber-500/50 dark:border-amber-600/60 bg-amber-500/10 dark:bg-amber-900/30 shadow-md">
                        <CardContent className="p-4 flex items-start sm:items-center gap-3 py-0">
                            <AlertTriangle className="h-8 w-8 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                             <div className="text-left">
                                 <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Critical Security Reminder:</p>
                                <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mt-1 leading-relaxed text-balance">
                                    <strong className="font-bold">Verify the OFFICIAL contract address below.</strong> Ignore DMs, random links, and unsolicited offers. Trust ONLY verified links on this site. Protect your keys.
                                </p>
                             </div>
                         </CardContent>
                     </Card>
                </motion.div>


                <motion.div
                     variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
                    className="max-w-7xl mx-auto grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch"
                 >
                    {steps.map((step, index) => (
                         <motion.div key={`step-${index}`} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                            <Card className="flex flex-col h-full transition-all duration-300 overflow-hidden border border-border/20 dark:border-border/30 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/30">
                                <CardHeader className="pb-3 pt-5 px-4 flex flex-row items-start gap-3">
                                     <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 shadow-inner">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>
                                     <div className="flex-1">
                                         <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{step.title}</CardTitle>
                                     </div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col gap-3 justify-between px-4 pb-5">
                                     <div> {/* Content Group */}
                                        <p className="text-sm text-muted-foreground mb-3 text-balance leading-relaxed">{step.description}</p>
                                         {step.links && (
                                             <div className="flex flex-wrap gap-1.5 mb-3">
                                                 {step.links.map((link, linkIndex) => (
                                                     <Link key={`link-${index}-${linkIndex}`} href={link.href} target="_blank" rel="noopener noreferrer" title={`Visit ${link.name}`}>
                                                         <Button variant="outline" size="xs" className="text-xs font-medium gap-1 h-6 px-1.5 border-border/40 hover:border-primary/40 dark:bg-muted/30">
                                                             {link.icon && <link.icon className="h-3 w-3 opacity-80" />} {link.name} <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                                                         </Button>
                                                     </Link>
                                                 ))}
                                             </div>
                                         )}
                                         {/* Visual Placeholder Refined */}
                                         {step.visualPrompt && (
                                             <div className="my-3 bg-muted/20 dark:bg-white/5 border border-dashed border-border/25 rounded-md min-h-[40px] flex items-center justify-center p-1.5 shadow-inner overflow-hidden">
                                                <p className="text-[9px] text-muted-foreground/60 italic text-center leading-tight">{step.visualPrompt}</p>
                                            </div>
                                        )}
                                     </div>
                                     {/* Action area */}
                                     {step.action && <div className="mt-auto pt-2">{step.action}</div>}
                                </CardContent>
                             </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>
        </TooltipProvider>
    );
}
// --- END OF FILE components/sections/08_HowToBuy.tsx ---