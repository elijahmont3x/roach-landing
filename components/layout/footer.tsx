// --- START OF FILE components/layout/footer.tsx ---

"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookOpen, Coins, ExternalLink, FileText, GitBranch, HelpCircle, ListChecks, Lock, ShieldCheck, Sparkles, Construction } from "lucide-react"; // Updated icons
import Link from "next/link";
import React, { useCallback } from "react"; // useCallback imported
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from "react-icons/fa6";


// --- Footer Links ---
const SOCIAL_LINKS = {
    twitter: "https://twitter.com/paradoxonsol",
    telegram: "https://t.me/paradoxportal",
    discord: "https://discord.com/invite/your-discord-invite-code", // Placeholder: Add actual code
    github: "#", // Assuming repo is private/not yet public
    reddit: "#", // Placeholder
};
const RESOURCE_LINKS = {
    whitepaper: "/ROACH_Whitepaper_v2.txt", // Matches provided file name
    audit: "#", // Placeholder: Link will be updated post-audit
    contract: "https://solscan.io/token/ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f", // Correct
    lockedLiquidity: "#", // Placeholder: Link to PinkLock verification page post-lock
    buyJupiter: "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f", // Correct
    buyRaydium: "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f", // Correct
};
const NAV_LINKS = [
    { name: "Concept", href: "#the-antifragile-edge", icon: Sparkles },
    { name: "Mechanics", href: "#mechanics", icon: GitBranch },
    { name: "Tokenomics", href: "#tokenomics", icon: Coins },
    { name: "Security", href: "#security", icon: ShieldCheck },
    { name: "Roadmap", href: "#roadmap", icon: ListChecks },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
];
const contractAddressShort = `${RESOURCE_LINKS.contract.split('/').pop()?.slice(0, 6)}...${RESOURCE_LINKS.contract.split('/').pop()?.slice(-6)}`;


export function Footer() {

    // Consistent Scroll Handling (matching header behavior)
    const handleScrollTo = useCallback((id: string) => {
        const element = document.getElementById(id);
        const headerOffset = 80; // Consistent with header
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }, []);

    return (
        <footer className="bg-muted/40 dark:bg-background/40 border-t border-border/30 mt-24">
            <TooltipProvider delayDuration={150}>
                <div className="container mx-auto pt-16 pb-8 px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-6 lg:grid-cols-12 items-start">

                        {/* Brand & Socials (Span 4 cols) */}
                        <div className="md:col-span-3 lg:col-span-4 space-y-4">
                            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm w-fit group" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});}}>
                                <CockroachMascot size="sm" className="transition-transform group-hover:rotate-[-10deg] group-hover:scale-110 duration-200" />
                                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground/80 bg-clip-text text-transparent">$ROACH</span>
                            </Link>
                            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                                The antifragile SPL token on Solana, engineered to gain strength from market volatility. Built to endure.
                            </p>
                            <div className="flex items-center gap-1.5 pt-2">
                                {SOCIAL_LINKS.twitter !== "#" && <SocialLink href={SOCIAL_LINKS.twitter} icon={FaXTwitter} label="Follow on X (Twitter)" />}
                                {SOCIAL_LINKS.telegram !== "#" && <SocialLink href={SOCIAL_LINKS.telegram} icon={FaTelegram} label="Join Telegram" />}
                                {SOCIAL_LINKS.discord !== "#" && <SocialLink href={SOCIAL_LINKS.discord} icon={FaDiscord} label="Join Discord" />}
                                {SOCIAL_LINKS.github !== "#" && <SocialLink href={SOCIAL_LINKS.github} icon={FaGithub} label="View on GitHub" />}
                                {SOCIAL_LINKS.reddit !== "#" && <SocialLink href={SOCIAL_LINKS.reddit} icon={FaRedditAlien} label="Visit Subreddit" />}
                            </div>
                        </div>

                        {/* Navigate Links (Span 2 cols) */}
                        <div className="md:col-span-3 lg:col-span-2 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Navigate</h4>
                            <ul className="space-y-2 text-sm">
                                {NAV_LINKS.map(link => (
                                    <li key={link.href} className="flex items-center">
                                        <link.icon className="h-3.5 w-3.5 mr-2 text-muted-foreground/70" />
                                        <FooterLink href={link.href} onScrollTo={handleScrollTo}>{link.name}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resource Links (Span 3 cols) */}
                        <div className="md:col-span-3 lg:col-span-3 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><ResourceLink href={RESOURCE_LINKS.whitepaper} icon={BookOpen}>Whitepaper V2</ResourceLink></li>
                                <li>
                                    {RESOURCE_LINKS.audit === "#"
                                     ? <ResourceLink href="#security" icon={ShieldCheck} isPending={true}>Security Audit (Pending)</ResourceLink>
                                     : <ResourceLink href={RESOURCE_LINKS.audit} icon={ShieldCheck}>Security Audit Report</ResourceLink>
                                    }
                                </li>
                                <li><ResourceLink href={RESOURCE_LINKS.contract} icon={FileText}>Verified Contract ({contractAddressShort})</ResourceLink></li>
                                <li>
                                     {RESOURCE_LINKS.lockedLiquidity === "#"
                                     ? <ResourceLink href="#security" icon={Lock} isPending={true}>Liquidity Lock (Pending)</ResourceLink>
                                     : <ResourceLink href={RESOURCE_LINKS.lockedLiquidity} icon={Lock}>Liquidity Lock Proof</ResourceLink>
                                    }
                                </li>
                            </ul>
                             <div className="mt-4 flex items-center justify-start gap-2 opacity-70">
                                 <div className="relative w-7 h-7 bg-muted/60 dark:bg-muted/20 border border-dashed rounded-md flex items-center justify-center" title="CertiK Audit Pending">
                                     <Construction className="h-4 w-4 text-amber-500" />
                                 </div>
                                 <div className="relative w-7 h-7 bg-muted/60 dark:bg-muted/20 border border-dashed rounded-md flex items-center justify-center" title="Liquidity Lock Pending">
                                     <Construction className="h-4 w-4 text-blue-500" />
                                 </div>
                             </div>
                        </div>

                        {/* Quick Buy Links (Span 3 cols) */}
                        <div className="md:col-span-3 lg:col-span-3 space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 mb-3">Get $ROACH</h4>
                            <ul className="space-y-2 text-sm flex flex-col items-start">
                                <li> <SwapLinkButton href={RESOURCE_LINKS.buyJupiter}>Swap on Jupiter</SwapLinkButton> </li>
                                <li> <SwapLinkButton href={RESOURCE_LINKS.buyRaydium}>Swap on Raydium</SwapLinkButton> </li>
                                <li className="mt-2">
                                     {/* Replaced Button with styled link-like component */}
                                     <FooterLink href="#how-to-buy" onScrollTo={handleScrollTo} className="text-xs !text-primary !hover:underline">
                                         View Full Buying Guide
                                     </FooterLink>
                                </li>
                            </ul>
                              <div className="mt-4 flex items-center justify-start gap-2 opacity-80">
                                <div className="relative w-12 h-7 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-blue-500/10 border border-dashed rounded-md flex items-center justify-center" title="Jupiter Logo Placeholder">
                                    <p className="text-xs font-bold text-purple-400/80">JUP</p>
                                </div>
                                <div className="relative w-12 h-7 bg-gradient-to-br from-red-500/20 via-pink-500/10 to-purple-500/10 border border-dashed rounded-md flex items-center justify-center" title="Raydium Logo Placeholder">
                                    <p className="text-xs font-bold text-red-400/80">RAY</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Separator className="my-10 bg-border/30 dark:bg-border/20" />

                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
                        <p>&copy; {new Date().getFullYear()} $ROACH Project. All rights reserved.</p>
                        {/* Optional simple links - Example below commented out
                         <div className="flex gap-4">
                           <FooterLink href="/terms" onScrollTo={()=>{}}>Terms</FooterLink>
                           <FooterLink href="/privacy" onScrollTo={()=>{}}>Privacy</FooterLink>
                         </div> */}
                    </div>

                    <div className="mt-8 pt-8 border-t border-border/30 dark:border-border/20">
                        <p className="text-[0.78rem] leading-relaxed text-muted-foreground/80 text-center max-w-7xl mx-auto">
                            <strong className="font-semibold text-foreground/90">Important Disclaimer:</strong> Cryptocurrency investment carries substantial risk and is highly speculative. $ROACH employs experimental 'antifragile' tokenomics and should be treated as a high-risk asset. Asset values can plummet; you may lose your entire investment. <strong className="text-foreground/90">This website does not constitute financial, investment, or legal advice.</strong> Information is provided for general informational purposes only. Always conduct thorough Due Diligence (DYOR) and consult qualified advisors before investing. Understand the risks associated with $ROACH, the technology, and market volatility. <strong className="text-foreground/90">Past performance does not guarantee future results.</strong> Do not invest funds you cannot afford to lose. $ROACH offers no guarantees of returns or price appreciation. By engaging with this site or the token, you acknowledge these risks.
                        </p>
                    </div>
                </div>
            </TooltipProvider>
        </footer>
    );
}

// --- Helper Components ---

// Updated FooterLink to use handleScrollTo prop
function FooterLink({ href, children, target, onScrollTo, className }: { href: string; children: React.ReactNode; target?: string; onScrollTo?: (id: string) => void; className?: string; }) {
    const isExternal = target === "_blank" || href.startsWith('http');
    const isInternalSection = href.startsWith('#');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isInternalSection && onScrollTo) {
            e.preventDefault();
            onScrollTo(href.substring(1));
        }
        // Allow default behavior for external links (handled by Link component)
    };

    const Component = isInternalSection ? 'button' : Link;
    const componentProps = isInternalSection
        ? { onClick: handleClick, 'aria-label': `Scroll to ${children}` }
        : { href: href, target: target, rel: isExternal ? "noopener noreferrer" : undefined, 'aria-label': `Navigate to ${children}` };


    return (
         // @ts-ignore - Component type compatibility is handled dynamically
        <Component
            {...componentProps}
            className={cn(
                "text-muted-foreground hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm focus-visible:text-foreground transition-colors duration-200",
                "inline-flex items-center gap-1", // Keep consistent gap
                className // Allow external class overrides
            )}
        >
            {children}
            {isExternal && <ExternalLink className="h-3 w-3 opacity-60" />}
        </Component>
    );
}


function ResourceLink({ href, icon: Icon, children, isPending = false }: { href: string; icon: React.ElementType; children: React.ReactNode; isPending?: boolean; }) {
     const Component = isPending ? 'button' : Link;
     const handleClick = isPending ? (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
             if (href.startsWith('#') && typeof window !== 'undefined') { // Simple check if it's a section link
                const element = document.getElementById(href.substring(1));
                if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
             } else {
                console.log(`Resource for "${children}" is pending.`); // Add a console log or small user feedback if needed
             }
        } : undefined;

      const commonProps = {
        className: cn(
            "text-muted-foreground hover:text-foreground focus-visible:text-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
            "inline-flex items-center gap-1.5 group transition-colors duration-200",
            isPending && "opacity-60 cursor-default hover:text-muted-foreground hover:no-underline" // Visual cue for pending
        ),
        'aria-label': `${children}${isPending ? ' (Pending)' : ''}`
      };
     const linkProps = !isPending ? { href: href, target: "_blank", rel: "noopener noreferrer" } : {};


    return (
        <Component {...commonProps} {...linkProps} onClick={handleClick}>
            <Icon className={cn("h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-foreground transition-colors", isPending && "group-hover:text-muted-foreground/70")} />
            <span className={cn("group-hover:underline underline-offset-4", isPending && "group-hover:no-underline")}>{children}</span>
            {!isPending && <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />}
        </Component>
    );
}


function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 text-muted-foreground rounded-full focus-visible:ring-offset-muted hover:bg-accent/80 dark:hover:bg-muted/60")} // Improved hover states
                >
                    <Icon className="h-4 w-4" />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="top">
                <p className="text-xs">{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}

function SwapLinkButton({ href, children }: { href: string; children: React.ReactNode; }) {
    return (
         <Link href={href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className={cn(
                "w-full sm:w-auto justify-center gap-1.5", // Center content
                "dark:bg-muted/40 dark:hover:bg-muted/60 dark:border-border hover:border-primary/50", // Dark mode & hover tweaks
                 "text-foreground/90 hover:text-primary font-medium"
            )}>
                 <Coins className="h-3.5 w-3.5 text-primary/80" /> {/* Adjusted Icon color */}
                {children}
                <ExternalLink className="h-3 w-3 opacity-70" />
            </Button>
        </Link>
    );
}
// --- END OF FILE components/layout/footer.tsx ---