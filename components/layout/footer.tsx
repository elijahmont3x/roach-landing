"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip
import { cn } from "@/lib/utils";
import { BookOpen, Coins, ExternalLink, FileText, FlaskConical, GitBranch, HelpCircle, ShieldCheck } from "lucide-react"; // Added relevant icons
import Link from "next/link";
import React from "react"; // Import React
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6"; // Added more icons


// --- Define Footer Links (REPLACE '#' and addresses with actual URLs) ---
const SOCIAL_LINKS = {
    twitter: "#",
    telegram: "#",
    discord: "#",
    github: "#", // Add link to code repo if public
    reddit: "#", // Add link to subreddit if exists
};
const RESOURCE_LINKS = {
    whitepaper: "/PARADOX_Whitepaper_v2.txt",
    audit: "#", // Link to CertiK report page or PDF
    // Example direct link, replace ROACHaB... part
    contract: "https://solscan.io/token/ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f",
    lockedLiquidity: "#", // Link to PinkLock or similar proof
    // Direct Swap Links (Ensure address is correct)
    buyJupiter: "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f",
    buyRaydium: "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f",
};
// Navigation mirrored from header (use consistent IDs)
const NAV_LINKS = [
    { name: "Concept", href: "#the-antifragile-edge", icon: FlaskConical },
    { name: "Mechanics", href: "#mechanics", icon: GitBranch }, // Consider a better icon maybe?
    { name: "Tokenomics", href: "#tokenomics", icon: Coins },
    { name: "Security", href: "#security", icon: ShieldCheck }, // Use filled icon for security
    { name: "Roadmap", href: "#roadmap", icon: GitBranch },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
];
const contractAddressShort = "ROACHaB...Xv4V1f"; // For display

// ------------------------------------------------------------

export function Footer() {
    // Removed meme mode hook and related logic

    return (
        <footer className="bg-muted/40 dark:bg-background/30 border-t border-border/50 mt-24">
            <TooltipProvider delayDuration={150}>
                <div className="container mx-auto pt-16 pb-8 px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-6 lg:grid-cols-12 items-start">

                        {/* Brand & Socials (Span 4 cols) */}
                        <div className="md:col-span-3 lg:col-span-4 space-y-4">
                            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm w-fit group">
                                <CockroachMascot size="sm" className="transition-transform group-hover:scale-110" />
                                <span className="text-xl font-bold">$ROACH</span>
                            </Link>
                            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                                The antifragile SPL token on Solana, engineered to gain strength from market volatility and reward holders during pressure.
                            </p>
                            <div className="flex items-center gap-1.5 pt-2"> {/* Reduced gap */}
                                <SocialLink href={SOCIAL_LINKS.twitter} icon={FaXTwitter} label="Follow $ROACH on X (Twitter)" />
                                <SocialLink href={SOCIAL_LINKS.telegram} icon={FaTelegram} label="Join $ROACH Telegram Community" />
                                <SocialLink href={SOCIAL_LINKS.discord} icon={FaDiscord} label="Join $ROACH Discord Server" />
                                {SOCIAL_LINKS.github !== "#" && <SocialLink href={SOCIAL_LINKS.github} icon={FaGithub} label="View $ROACH Code on GitHub" />}
                                {SOCIAL_LINKS.reddit !== "#" && <SocialLink href={SOCIAL_LINKS.reddit} icon={FaRedditAlien} label="Visit $ROACH Subreddit" />}
                            </div>
                        </div>

                        {/* Navigate Links (Span 2 cols) */}
                        <div className="md:col-span-3 lg:col-span-2 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Navigate</h4>
                            <ul className="space-y-2 text-sm">
                                {NAV_LINKS.map(link => (
                                    <li key={link.href} className="flex items-center">
                                        <link.icon className="h-3.5 w-3.5 mr-2 text-muted-foreground/70" />
                                        <FooterLink href={link.href}>{link.name}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resource Links (Span 3 cols) */}
                        <div className="md:col-span-3 lg:col-span-3 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><ResourceLink href={RESOURCE_LINKS.whitepaper} icon={BookOpen}>Whitepaper</ResourceLink></li>
                                {RESOURCE_LINKS.audit !== "#" && <li><ResourceLink href={RESOURCE_LINKS.audit} icon={ShieldCheck}>Security Audit</ResourceLink></li>}
                                <li><ResourceLink href={RESOURCE_LINKS.contract} icon={FileText}>Verified Contract ({contractAddressShort})</ResourceLink></li>
                                {RESOURCE_LINKS.lockedLiquidity !== "#" && <li><ResourceLink href={RESOURCE_LINKS.lockedLiquidity} icon={Lock}>Liquidity Lock Proof</ResourceLink></li>}
                            </ul>
                            {/* Visual Placeholder: Maybe small logos or trust symbols */}
                            <div className="mt-4 flex items-center justify-start gap-2 opacity-60">
                                <div className="relative w-6 h-6 bg-muted dark:bg-muted/20 border border-dashed rounded-sm flex items-center justify-center" title="CertiK Logo Placeholder">
                                    <p className="text-[0.5rem] italic text-muted-foreground/70">Aud</p>
                                </div>
                                <div className="relative w-6 h-6 bg-muted dark:bg-muted/20 border border-dashed rounded-sm flex items-center justify-center" title="Lock Proof Placeholder">
                                    <p className="text-[0.5rem] italic text-muted-foreground/70">Lock</p>
                                </div>
                            </div>

                        </div>

                        {/* Quick Buy Links (Span 3 cols) */}
                        <div className="md:col-span-3 lg:col-span-3 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Get $ROACH</h4>
                            <ul className="space-y-2 text-sm flex flex-col items-start">
                                <li> <SwapLinkButton href={RESOURCE_LINKS.buyJupiter}>Jupiter Aggregator</SwapLinkButton> </li>
                                <li> <SwapLinkButton href={RESOURCE_LINKS.buyRaydium}>Raydium DEX</SwapLinkButton> </li>
                                <li className="mt-2">
                                    <Button variant="link" size="sm" className="text-xs h-auto p-0 text-primary hover:underline" asChild>
                                        <Link href="#how-to-buy">View Full Buying Guide</Link>
                                    </Button>
                                </li>
                            </ul>
                            {/* Visual Placeholder: Logos for Jupiter/Raydium */}
                            <div className="mt-4 flex items-center justify-start gap-2 opacity-60">
                                <div className="relative w-10 h-6 bg-muted dark:bg-muted/20 border border-dashed rounded-sm flex items-center justify-center" title="Jupiter Logo Placeholder">
                                    <p className="text-[0.5rem] italic text-muted-foreground/70">JUP</p>
                                </div>
                                <div className="relative w-10 h-6 bg-muted dark:bg-muted/20 border border-dashed rounded-sm flex items-center justify-center" title="Raydium Logo Placeholder">
                                    <p className="text-[0.5rem] italic text-muted-foreground/70">RAY</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Separator className="my-10 bg-border/30 dark:bg-border/20" /> {/* More subtle separator */}

                    {/* Bottom Bar: Copyright & Minimal Links */}
                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
                        <p>&copy; {new Date().getFullYear()} $ROACH. All rights reserved.</p>
                        {/* Add simple optional links */}
                        {/* <div className="flex gap-4">
                          <FooterLink href="/terms">Terms</FooterLink>
                          <FooterLink href="/privacy">Privacy</FooterLink>
                        </div> */}
                    </div>

                    {/* Enhanced Disclaimer */}
                    <div className="mt-8 pt-8 border-t border-border/30 dark:border-border/20">
                        <p className="text-[0.75rem] leading-relaxed text-muted-foreground/80 text-center max-w-4xl mx-auto">
                            <span className="font-semibold text-foreground/90">Important Disclaimer:</span> Investing in cryptocurrency involves significant risk and is highly speculative. $ROACH leverages novel, experimental tokenomics based on the 'antifragility' principle and should be considered a high-risk asset. The value of digital assets can fluctuate dramatically; you could lose your entire investment. <strong className="text-foreground/90">This website does not provide financial, investment, or legal advice.</strong> All information is for general informational purposes only. Conduct thorough Due Diligence (DYOR) and consult with qualified financial and legal advisors before making investment decisions. Understand the technology, the market dynamics, and the specific risks associated with $ROACH. <strong className="text-foreground/90">Past performance is not indicative of future results.</strong> Never invest more than you can afford to lose. $ROACH makes no guarantees regarding price appreciation or returns. By interacting with this website or the $ROACH token, you acknowledge and accept these risks.
                        </p>
                    </div>
                </div>
            </TooltipProvider>
        </footer>
    );
}

// --- Helper Components ---

// FooterLink (Focus styles enhanced)
function FooterLink({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
    const isExternal = target === "_blank";
    return (
        <Link
            href={href}
            target={target}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn(
                "text-muted-foreground hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm focus-visible:text-foreground transition-colors duration-200",
                "inline-flex items-center gap-1" // Ensure gap for potential icon
            )}
            aria-label={typeof children === 'string' ? children : undefined}
        >
            {children}
            {isExternal && <ExternalLink className="h-3 w-3 opacity-60" />}
        </Link>
    );
}

// ResourceLink (With Icon)
function ResourceLink({ href, icon: Icon, children }: { href: string; icon: React.ElementType, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "text-muted-foreground hover:text-foreground focus-visible:text-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
                "inline-flex items-center gap-1.5 group transition-colors duration-200"
            )}
            aria-label={`View ${children}`}
        >
            <Icon className="h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-foreground transition-colors" />
            <span className="group-hover:underline underline-offset-4">{children}</span>
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
        </Link>
    );
}


// SocialLink (Includes Tooltip)
function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/20 rounded-full",
                        "focus-visible:ring-offset-muted" // Adjust ring offset for footer bg
                    )}
                    asChild
                >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon className="h-4 w-4" />
                    </a>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                <p className="text-xs">{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}

// SwapLinkButton (Specialized Button)
function SwapLinkButton({ href, children }: { href: string; children: React.ReactNode; }) {
    return (
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto justify-start sm:justify-center shadow-sm hover:border-primary/50 dark:bg-card dark:hover:bg-muted/50">
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                <span className="flex items-center gap-2"> <Coins className="h-3.5 w-3.5 text-primary" /> </span> {/* Example icon */}
                {children}
                <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
        </Button>
    );
}
