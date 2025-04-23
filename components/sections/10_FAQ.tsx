// --- START OF FILE components/sections/10_FAQ.tsx ---
"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Coins, HelpCircle, Info, Search, Settings2, ShieldCheck, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react"; // Use React for types

interface FAQItemData { id: string; q: string; a: string; tags: string[]; category: 'general' | 'mechanics' | 'technical' | 'investment'; }

// Data with refined wording and more detail where applicable
const faqData: FAQItemData[] = [
    { id: "g1", category: 'general', q: "What exactly is $ROACH?", a: "$ROACH is a unique SPL token built on Solana, based on the 'antifragility' concept. Its core feature is a dynamic 5-tier tax system designed to turn market volatility (especially sell pressure) into a potential advantage for holders and the ecosystem.", tags: ["overview", "concept", "antifragility", "spl", "solana", "what is"] },
    { id: "g2", category: 'general', q: "Why the name '$ROACH'?", a: "It symbolizes extreme resilience and adaptability. Like its namesake, the token is engineered to not just survive market chaos, but potentially thrive in it, using stressors as fuel for its mechanics.", tags: ["theme", "mascot", "cockroach", "symbolism", "why", "name", "branding"] },
    { id: "g3", category: 'general', q: "Is this just another meme coin?", a: "While the theme provides strong symbolism, $ROACH's foundation is its novel antifragile tokenomics. The aim is long-term viability through mechanics like the dynamic tax, reflections, locked LP, and planned audits, distinguishing it from typical meme projects focused purely on hype.", tags: ["meme", "utility", "value", "tokenomics", "legitimacy", "long-term"] },
    { id: "g4", category: 'general', q: "What market problem does it solve?", a: "$ROACH addresses the inherent fragility of many crypto assets during downturns. Instead of passively suffering from sell-offs, its adaptive system aims to harness that pressure, increasing rewards for holders and creating potential stabilization forces.", tags: ["problem", "solution", "fragility", "market", "volatility", "sell pressure"] },

    { id: "m1", category: 'mechanics', q: "How does the 5-tier system activate?", a: "The contract monitors the Sell/Buy Volume Ratio over a 4-hour rolling window. When this ratio crosses specific thresholds (e.g., Ratio > 1.2 for Tier 3), the system automatically shifts to the corresponding tier, adjusting taxes and reflections.", tags: ["mechanics", "tiers", "activation", "dynamic tax", "ratio", "how it works", "4-hour"] },
    { id: "m2", category: 'mechanics', q: "Explain 'Reflections' in detail.", a: "Reflections are automatic rewards. A specific portion of the **Sell Tax** (ranging from 3% in Tier 1 up to 10% in Tier 5) is instantly redistributed to *all* existing $ROACH holders directly in their wallets, proportional to the amount they hold. Higher sell pressure = higher reflection rates.", tags: ["reflections", "rewards", "passive income", "holders", "distribution", "sell tax"] },
    { id: "m3", category: 'mechanics', q: "How does it counter 'whale dumps'?", a: "Significant sell-offs increase the Sell/Buy Ratio, quickly pushing the system into higher Tiers (4 & 5). The Sell Tax dramatically increases (up to 15%), making large dumps costly for the seller. Simultaneously, reflections for remaining holders hit maximum levels, rewarding resilience.", tags: ["whales", "dumps", "sell pressure", "high tax", "deterrent", "stability", "protection"] },
    { id: "m4", category: 'mechanics', q: "Why lower the Buy Tax during sell-offs?", a: "Reducing the Buy Tax in high-pressure Tiers 4 & 5 (down to 2-3%) acts as a strong counter-incentive. It makes acquiring $ROACH cheaper exactly when the market is fearful, encouraging accumulation and potentially stabilizing the price faster than static-tax systems.", tags: ["buy tax", "incentive", "dip buying", "entry point", "discount", "counterbalance"] },

    { id: "t1", category: 'technical', q: "Is the smart contract audited?", a: "Yes, a comprehensive security audit is planned with CertiK (or a comparable top-tier firm) *before* the official launch. The final report will be publicly available and linked on this site. No critical/major issues are expected based on internal reviews.", tags: ["audit", "security", "certik", "contract safety", "vulnerabilities", "verified", "planned"] },
    { id: "t2", category: 'technical', q: "How is initial liquidity secured?", a: "The liquidity pool (LP) tokens created on Raydium at launch will be verifiably locked for 12 months using PinkLock or a similar trusted service. This prevents the team from removing liquidity ('rug pull'). Proof will be shared publicly post-lock.", tags: ["liquidity", "lp lock", "locked", "rug pull", "secure", "pinklock", "raydium", "planned"] },
    { id: "t3", category: 'technical', q: "Is the supply capped? Can more tokens be minted?", a: "Yes, the total supply is absolutely fixed at 1 billion $ROACH. The mint authority on the contract will be *permanently revoked* after the initial setup and distribution are complete. This ensures no inflation and is verifiable on-chain.", tags: ["supply", "total supply", "fixed cap", "inflation", "no mint", "immutable", "planned"] },
    { id: "t4", category: 'technical', q: "Where can I view the contract?", a: "The $ROACH contract address ill be verified on explorers like Solscan post-deployment. You'll be able to inspect the code, transactions, and holder distribution there. The official address is prominently displayed on this site and community channels.", tags: ["contract", "address", "solscan", "explorer", "verify code", "on-chain data", "transparency"] },

    { id: "i1", category: 'investment', q: "What are the primary investment risks?", a: "All crypto investments are high-risk. $ROACH faces market volatility, potential smart contract risks (despite audit plans), regulatory uncertainties, and the risk of capital loss. The antifragile concept is experimental. **Do Your Own Research (DYOR).**", tags: ["risk", "investment safety", "speculation", "volatility", "loss potential", "dyor"] },
    { id: "i2", category: 'investment', q: "Does 'antifragile' guarantee profit?", a: "**No.** 'Antifragile' describes the system's *intended response* to stress, aiming to strengthen from it. It does **not** guarantee price appreciation. Token value depends on adoption, trading activity, market sentiment, and many other factors. Profit is never guaranteed.", tags: ["profit", "guarantee", "price movement", "value accrual", "speculative asset", "no financial advice"] },
    { id: "i3", category: 'investment', q: "How and where can I buy $ROACH?", a: "After launch, $ROACH will be available on Solana Decentralized Exchanges (DEXs), primarily via aggregators like Jupiter for best price execution, or directly on Raydium. Always use the *official contract address* found on this site. Follow our 'How to Buy' guide.", tags: ["buy", "purchase guide", "acquire token", "exchange", "dex", "jupiter", "raydium", "where to buy", "official contract"] },
];

const categories = [
    { value: 'all', label: 'All', icon: HelpCircle },
    { value: 'general', label: 'General', icon: Info },
    { value: 'mechanics', label: 'Mechanics', icon: Settings2 },
    { value: 'technical', label: 'Technical', icon: ShieldCheck },
    { value: 'investment', label: 'Investment', icon: Coins },
];

export function FAQ() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const filteredFaqs = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        return faqData.filter(item => {
            const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
            if (!categoryMatch) return false;
            if (lowerSearchTerm === "") return true;

            return item.q.toLowerCase().includes(lowerSearchTerm) ||
                   item.a.toLowerCase().includes(lowerSearchTerm) ||
                   item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
        });
    }, [searchTerm, activeCategory]);

    const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    const accordionMotionProps = { layout: true, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: "easeInOut" } };

    // Safe rendering of links in answers
    const renderAnswer = (answer: string) => {
        // Basic regex to find markdown-style links and convert to HTML anchors
        // Assumes format [Text](URL)
         const htmlAnswer = answer.replace(
             /\[([^\]]+)\]\(([^)]+)\)/g,
             (match, text, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm">${text}<span class="inline-block ml-0.5 align-middle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link opacity-70"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg></span></a>`
         );
        return { __html: htmlAnswer };
     };

    return (
         <Section id="faq" align="left" useSuspense className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background/70 to-muted/5 dark:from-background/70 dark:to-background/10">
             <SectionHeader
                 title="Frequently Asked Questions"
                 description="Your questions answered. Explore topics on $ROACH's concept, mechanics, technicals, and investment points. Use the filters or search for specific info."
                 subtitle={<><HelpCircle className="inline h-4 w-4 mr-1.5" /> $ROACH Knowledge Base</>}
                 align="inherit"
            />

             <motion.div
                variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="w-full mx-auto"
            >
                 <Card paddingless className="overflow-hidden border border-border/20 dark:border-border/25 shadow-lg shadow-primary/5">
                    <CardHeader className="p-4 md:p-5 border-b border-border/20 dark:border-border/25 bg-muted/30 dark:bg-card/60 backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row gap-3">
                             {/* Search Input */}
                             <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    type="text"
                                    placeholder="Search FAQs (e.g., 'reflections', 'audit', 'risk')..."
                                     value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                     className="pl-10 pr-9 h-10 text-sm sm:text-base border-border/50 focus:border-primary dark:bg-background/30" // Enhanced input style
                                />
                                {searchTerm && (
                                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setSearchTerm('')} aria-label="Clear search">
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                             {/* Category Filters */}
                             <div className="flex flex-wrap gap-1.5 items-center justify-center sm:justify-start flex-shrink-0">
                                {categories.map(cat => (
                                    <Button
                                        key={cat.value}
                                         variant={activeCategory === cat.value ? "default" : "outline"}
                                        size="sm"
                                         onClick={() => setActiveCategory(cat.value)}
                                        className={cn(
                                            "text-xs h-9 px-3 transition-all duration-200 ease-out",
                                             activeCategory === cat.value && "shadow-md shadow-primary/20", // Highlight active button
                                             activeCategory !== cat.value && "border-border/50 text-muted-foreground hover:bg-accent/50 dark:bg-muted/20 dark:hover:bg-accent/20"
                                         )}
                                         aria-pressed={activeCategory === cat.value}
                                     >
                                         <cat.icon className="h-3.5 w-3.5 mr-0 shrink-0" />
                                         {cat.label}
                                     </Button>
                                 ))}
                            </div>
                        </div>
                     </CardHeader>

                    <CardContent className="p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-border dark:scrollbar-thumb-muted/50 scrollbar-track-transparent">
                         {filteredFaqs.length > 0 ? (
                             <Accordion type="single" collapsible className="w-full">
                                 <AnimatePresence initial={false}>
                                    {filteredFaqs.map((item, index) => (
                                         <motion.div key={item.id} {...accordionMotionProps} 
                                            className={cn(
                                                "border-b border-border/30 dark:border-border/15",
                                                index === filteredFaqs.length - 1 ? "border-b-0" : ""
                                            )}
                                         >
                                            <AccordionItem
                                                value={`item-${item.id}`}
                                                className="border-none py-1"
                                            >
                                                <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline px-4 py-3 text-foreground/90 data-[state=open]:text-primary data-[state=open]:font-semibold group">
                                                    <span className="flex items-center gap-2 text-balance">
                                                        <HelpCircle className="h-4 w-4 text-muted-foreground group-data-[state=open]:text-primary transition-colors shrink-0 mt-0.5" />
                                                        {item.q}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground text-sm px-4 pt-0 space-y-3">
                                                    <div className="border-l-2 border-border/30 pl-3"
                                                         dangerouslySetInnerHTML={renderAnswer(item.a)} />
                                                    <div className="flex flex-wrap gap-1 pt-1">
                                                        {item.tags.slice(0, 5).map(tag => (
                                                            <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0.5 cursor-pointer hover:bg-accent/80 hover:text-accent-foreground border border-transparent hover:border-border/50 transition-all duration-150" onClick={() => setSearchTerm(tag)}>
                                                                #{tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                 </AnimatePresence>
                            </Accordion>
                        ) : (
                             <motion.div
                                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12 text-muted-foreground px-4"
                            >
                                 <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                                 <p className="font-medium text-foreground/80 mb-1">No matching questions found.</p>
                                 <p className="text-sm">Try adjusting your search term <strong className="text-foreground/80">&ldquo;{searchTerm}&rdquo;</strong> or selecting a different category.</p>
                             </motion.div>
                        )}
                     </CardContent>
                 </Card>
            </motion.div>

             <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-12 text-center text-sm text-muted-foreground max-w-3xl mx-auto text-balance"
            >
                 Can&apos;t find your answer? Dive into our community channels for direct support and discussions.
             </motion.p>
         </Section>
     );
}
// --- END OF FILE components/sections/10_FAQ.tsx ---