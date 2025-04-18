// --- START OF FILE components/sections/FAQ.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Use CardHeader for title area
import { Input } from "@/components/ui/input"; // For search
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Coins, HelpCircle, Info, Search, Settings2, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react"; // Import React, useState, useMemo
// --- Enhanced & Categorized FAQ Data ---
interface FAQItemData {
    id: string;
    q: string; // Question
    a: string; // Answer (can include simple markdown like links)
    tags: string[]; // Keywords for searching/filtering
    category: 'general' | 'mechanics' | 'technical' | 'investment'; // Category type
}

const faqData: FAQItemData[] = [
    // General
    { id: "g1", category: 'general', q: "What is $ROACH and its core concept?", a: "$ROACH is an SPL token on Solana built on the principle of 'antifragility'. Its unique 5-tier dynamic tax system is designed to leverage market volatility, rewarding holders and strengthening the ecosystem during sell pressure.", tags: ["concept", "antifragility", "overview", "spl", "solana", "core", "what is"] },
    { id: "g2", category: 'general', q: "Why the 'cockroach' theme?", a: "The cockroach symbolizes extreme resilience and adaptation through chaos. This mirrors $ROACH's design: gaining strength from market stressors that typically harm other tokens.", tags: ["theme", "mascot", "cockroach", "symbolism", "why", "name"] },
    { id: "g3", category: 'general', q: "Is $ROACH just a 'meme coin'?", a: "While leveraging strong symbolism, $ROACH is driven by innovative, antifragile tokenomics engineered for potential long-term viability. Its value lies in its unique mechanics, audit, and locked liquidity, not just memes.", tags: ["meme", "utility", "value", "tokenomics", "joke"] },
    { id: "g4", category: 'general', q: "What problem does $ROACH address?", a: "$ROACH tackles the fragility of many crypto assets that suffer disproportionately during market downturns. Its adaptive system aims to convert sell pressure from a weakness into a strength.", tags: ["problem", "solution", "fragility", "market", "volatility", "downturn"] },
    // Mechanics
    { id: "m1", category: 'mechanics', q: "How does the 5-tier dynamic system work?", a: "The smart contract monitors the Sell/Buy Volume Ratio over 4-hour periods. Based on this ratio crossing predefined thresholds, it automatically adjusts buy/sell taxes and reflection percentages across 5 tiers to respond to market conditions.", tags: ["mechanics", "tiers", "dynamic", "tax", "reflection", "ratio", "how it works", "system"] },
    { id: "m2", category: 'mechanics', q: "What are 'reflections'?", a: "Reflections are rewards distributed to holders. A percentage of the tax from every $ROACH *sell* transaction (ranging from 3% in Tier 1 up to 10% in Tier 5) is automatically sent to all existing holders, proportional to their holdings.", tags: ["reflections", "rewards", "passive income", "holders", "distribution", "tax"] },
    { id: "m3", category: 'mechanics', q: "How does the system deter 'whale dumps'?", a: "Large sell volumes rapidly push the system into higher Tiers (4 & 5). This significantly increases the Sell Tax (up to 15%), making large, abrupt sell-offs costly for the seller while maximizing reflection rewards for those who hold.", tags: ["whales", "dumps", "sell pressure", "tax", "deterrent", "stability"] },
    { id: "m4", category: 'mechanics', q: "Why does the Buy Tax decrease in high-pressure tiers?", a: "Lowering the Buy Tax during intense selling (Tiers 4 & 5, down to 2-3%) creates a strong incentive for buyers to enter or accumulate $ROACH, helping to counterbalance sell pressure and establish potential price support.", tags: ["buy tax", "incentive", "dip buying", "entry", "discount", "mechanics"] },
    // Technical
    { id: "t1", category: 'technical', q: "Is the smart contract audited?", a: "Yes. $ROACH underwent a comprehensive security audit by CertiK, a leading blockchain security firm. The audit confirmed contract integrity with no critical or major vulnerabilities. Link to report in footer/security section.", tags: ["audit", "security", "certik", "contract", "safe", "vulnerabilities"] },
    { id: "t2", category: 'technical', q: "How is liquidity secured?", a: "The initial liquidity pool tokens provided on Raydium are verifiably locked for 12 months using PinkLock. This prevents liquidity removal by the team ('rug pull') and ensures foundational stability. Verification link available.", tags: ["liquidity", "lp", "locked", "rug pull", "secure", "pinklock", "raydium"] },
    { id: "t3", category: 'technical', q: "Is the token supply fixed?", a: "Yes, absolutely. The total supply is fixed at 1 billion $ROACH. The contract's minting function has been permanently disabled, meaning no more tokens can ever be created. This is verifiable on-chain.", tags: ["supply", "total supply", "fixed", "inflation", "mint", "immutable"] },
    { id: "t4", category: 'technical', q: "Where can I view the contract code?", a: "The $ROACH contract is verified on Solana explorers like Solscan. You can examine the code, holders, and transactions directly. The official contract address and link are in the footer and purchase guide.", tags: ["contract", "address", "solscan", "explorer", "verify", "code", "on-chain"] },
    // Investment/Trading
    { id: "i1", category: 'investment', q: "What are the risks of investing in $ROACH?", a: "Like all cryptocurrencies, $ROACH is highly speculative and volatile. Risks include market fluctuations, smart contract vulnerabilities (despite audit), regulatory changes, and potential loss of investment. DYOR.", tags: ["risk", "investment", "speculative", "volatile", "loss", "dyor"] },
    { id: "i2", category: 'investment', q: "Is $ROACH guaranteed to go up?", a: "No. No cryptocurrency guarantees profit. $ROACH's value depends on market adoption, trading volume, overall market conditions, and execution of its roadmap. Its mechanics *aim* to provide advantages during volatility, but price action is never guaranteed.", tags: ["profit", "guarantee", "price", "value", "speculation", "moon"] },
    { id: "i3", category: 'investment', q: "Where can I buy $ROACH?", a: "You can acquire $ROACH on Solana Decentralized Exchanges (DEXs) like Raydium or DEX aggregators like Jupiter. Follow the secure 'How to Buy' guide on this website.", tags: ["buy", "purchase", "acquire", "exchange", "dex", "jupiter", "raydium", "where"] },
];

const categories = [
    { value: 'all', label: 'All Topics', icon: HelpCircle },
    { value: 'general', label: 'General', icon: Info },
    { value: 'mechanics', label: 'Mechanics', icon: Settings2 },
    { value: 'technical', label: 'Technical', icon: ShieldCheck },
    { value: 'investment', label: 'Investment', icon: Coins },
];


export function FAQ() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // --- Filter Logic using useMemo for optimization ---
    const filteredFaqs = useMemo(() => {
        return faqData.filter(item => {
            const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
            const searchMatch = searchTerm === "" ||
                item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return categoryMatch && searchMatch;
        });
    }, [searchTerm, activeCategory]); // Re-filter only when search or category changes


    // Animation Variants
    const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    const accordionItemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }; // Subtle slide-in


    return (
        <Section id="faq" className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted/10 to-background dark:from-background/10 dark:to-background">
            <SectionHeader
                title="Frequently Asked Questions (FAQ)"
                description="Find answers to common inquiries about $ROACH, its antifragile system, technical details, and investment considerations. Use the filters or search below."
                subtitle={<><HelpCircle className="inline h-4 w-4 mr-1.5" /> Clarity & Information </>}
                alignment="center"
                className="mb-10" // Reduced bottom margin before card
            />

            <motion.div
                variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="max-w-4xl mx-auto" // Increased max-width for better layout
            >
                <Card className="shadow-xl overflow-hidden border border-border/15 dark:border-border/20">
                    <CardHeader className="p-4 md:p-6 border-b border-border/15 dark:border-border/20 bg-muted/20 dark:bg-card/50">
                        {/* Search and Filter Controls */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search Input */}
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search questions or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-8 h-10 text-base sm:text-sm" // Adjust padding and height
                                />
                                {searchTerm && (
                                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setSearchTerm('')} aria-label="Clear search">
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            {/* Category Filters (Buttons) */}
                            <div className="flex flex-wrap gap-1.5 items-center justify-center sm:justify-start">
                                {categories.map(cat => (
                                    <Button
                                        key={cat.value}
                                        variant={activeCategory === cat.value ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setActiveCategory(cat.value)}
                                        className={cn(
                                            "text-xs h-9 transition-all",
                                            activeCategory === cat.value && "bg-primary hover:bg-primary/90 text-primary-foreground",
                                            activeCategory !== cat.value && "border-border/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                        aria-pressed={activeCategory === cat.value}
                                    >
                                        <cat.icon className="h-3.5 w-3.5 mr-1.5" />
                                        {cat.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 md:p-6 max-h-[60vh] overflow-y-auto scrollbar-hide"> {/* Constrained height + scroll */}
                        {filteredFaqs.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full space-y-3">
                                {/* Stagger animation for items */}
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.07 }}>
                                    {filteredFaqs.map((item, index) => (
                                        <motion.div key={item.id} layout variants={accordionItemVariants} initial="hidden" animate="visible">
                                            <AccordionItem
                                                value={`item-${item.id}`}
                                                className="border border-border/20 dark:border-border/25 rounded-lg shadow-sm bg-background/30 dark:bg-muted/10 transition-colors hover:border-border/40 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5"
                                            >
                                                <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline px-4 py-3.5 text-foreground/95 data-[state=open]:text-primary data-[state=open]:font-semibold group">
                                                    <span className="flex items-center gap-2">
                                                        <HelpCircle className="h-4 w-4 text-muted-foreground group-data-[state=open]:text-primary transition-colors shrink-0" />
                                                        {item.q}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground text-sm px-4 pb-4 pt-1 leading-relaxed space-y-2">
                                                    {/* Render answer with basic link handling (improve if complex markdown needed) */}
                                                    <p dangerouslySetInnerHTML={{ __html: item.a.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">$1</a>') }} />
                                                    <div className="flex flex-wrap gap-1 pt-2">
                                                        {item.tags.slice(0, 5).map(tag => ( // Show limited tags
                                                            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0.5 cursor-pointer hover:bg-accent" onClick={() => setSearchTerm(tag)}>#{tag}</Badge>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </Accordion>
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <Search className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                No questions found matching "{searchTerm}" {activeCategory !== 'all' && `in the "${categories.find(c => c.value === activeCategory)?.label}" category`}. Try broadening your search.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-10 text-center text-sm text-muted-foreground max-w-lg mx-auto"
            >
                Can't find your answer? Join our active <Link href="#" className="text-primary hover:underline font-medium focus-visible:ring-1 rounded-sm focus-visible:ring-ring outline-none">Telegram</Link> or <Link href="#" className="text-primary hover:underline font-medium focus-visible:ring-1 rounded-sm focus-visible:ring-ring outline-none">Discord</Link> community (links in footer) for further assistance.
            </motion.p>
        </Section>
    );
}


// --- END OF FILE components/sections/FAQ.tsx ---