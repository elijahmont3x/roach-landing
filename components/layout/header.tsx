// --- START OF FILE components/layout/header.tsx ---
"use client";

import { CockroachMascot } from "@/components/internal/cockroach-mascot";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Activity, Coins, GitBranch, HelpCircle, ListChecks, Menu, ShieldCheck, Sparkles, X, BookOpen } from "lucide-react"; // Use different icons
import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";

// Constants for links - USE YOUR ACTUAL LINKS
const SWAP_LINK = "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const WHITEPAPER_LINK = "/ROACH_Whitepaper_v2.txt"; // Updated path based on provided file name

// --- Menu Items (Ensure IDs match section IDs in page.tsx) ---
const menuItems = [
    { name: "Concept", href: "#the-antifragile-edge", icon: Sparkles }, // Changed Icon
    { name: "Mechanics", href: "#mechanics", icon: Activity },
    { name: "Tokenomics", href: "#tokenomics", icon: Coins },
    { name: "Security", href: "#security", icon: ShieldCheck },
    { name: "Roadmap", href: "#roadmap", icon: ListChecks }, // Changed Icon
    { name: "FAQ", href: "#faq", icon: HelpCircle }, // Changed Icon
];

interface HeaderProps {
    onScrollTo: (id: string) => void; // Function to handle smooth scroll
}

// Memoize Header to prevent re-renders if props don't change
export const Header = memo(({ onScrollTo }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- Efficient Scroll Effect Logic ---
    useEffect(() => {
        let lastKnownScrollPosition = 0;
        let ticking = false;

        const handleScroll = () => {
            lastKnownScrollPosition = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollThreshold = 5; // Trigger slightly earlier
                    const scrolled = lastKnownScrollPosition > scrollThreshold;
                    if (scrolled !== isScrolled) { // Update state only if changed
                        setIsScrolled(scrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled]);

    // Callback for handling navigation clicks
    const handleNavClick = useCallback((href: string, closeMobileMenu = false) => (e: React.MouseEvent) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.substring(1);
            onScrollTo(id);
        } else {
            // Allow normal navigation for external or root links
        }
        if (closeMobileMenu) {
            setIsMobileMenuOpen(false);
        }
    }, [onScrollTo]);

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 ease-out", // Use fixed positioning
                isScrolled
                    ? "shadow-lg bg-background/85 backdrop-blur-lg border-b border-border/30"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 mr-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm group" onClick={handleNavClick('/', true)}>
                    <CockroachMascot size="sm" className="text-primary transition-transform group-hover:rotate-[-10deg] group-hover:scale-110 duration-200" />
                    <span className="text-xl font-bold hidden sm:inline tracking-tighter bg-gradient-to-r from-primary to-foreground/80 bg-clip-text text-transparent">
                        $ROACH
                    </span>
                </Link>

                <NavigationMenu className="hidden lg:flex flex-1 justify-center">
                    <NavigationMenuList>
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                {/* Updated button approach for nav links */}
                                <button
                                    className={cn(navigationMenuTriggerStyle(), "bg-transparent h-9 px-3 text-sm font-medium focus:bg-accent/70 hover:bg-accent/70 data-[active]:bg-accent/50 focus:text-accent-foreground hover:text-accent-foreground gap-1.5")}
                                    onClick={handleNavClick(item.href)}
                                    aria-label={`Scroll to ${item.name}`}
                                >
                                    <item.icon className="h-4 w-4 opacity-80" />
                                    {item.name}
                                </button>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <Link href={WHITEPAPER_LINK} target="_blank" rel="noopener noreferrer" legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent h-9 px-3 text-sm font-medium hover:bg-accent/70 gap-1.5 focus:bg-accent/70")}>
                                   <BookOpen className="h-4 w-4 opacity-80"/> Whitepaper
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden lg:flex items-center gap-2 ml-auto">
                    <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 font-semibold text-primary-foreground">
                           Get $ROACH
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-2 lg:hidden ml-auto">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-foreground/80 hover:text-foreground"
                                aria-label="Toggle navigation menu"
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[calc(100vw*0.8)] max-w-[320px] pt-10 px-0 bg-background border-l border-border/50 flex flex-col">
                            <div className="px-4 mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CockroachMascot size="sm" className="text-primary" />
                                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-foreground/80 bg-clip-text text-transparent">$ROACH</span>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </SheetClose>
                            </div>

                            <nav className="flex flex-col space-y-1 flex-grow px-4 overflow-y-auto mb-4">
                                {menuItems.map((item) => (
                                    <SheetClose key={item.href} asChild>
                                         {/* Updated button for mobile nav items */}
                                        <button
                                            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full justify-start text-base font-medium h-11")}
                                            onClick={handleNavClick(item.href, true)}
                                        >
                                            <item.icon className="mr-2 h-4 w-4 opacity-80" />
                                            {item.name}
                                        </button>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    <Link href={WHITEPAPER_LINK} target="_blank" rel="noopener noreferrer" legacyBehavior passHref>
                                        <a className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full justify-start text-base font-medium h-11")}>
                                           <BookOpen className="mr-2 h-4 w-4 opacity-80" /> Whitepaper
                                        </a>
                                    </Link>
                                </SheetClose>
                            </nav>

                            <div className="mt-auto border-t border-border/30 p-4">
                                <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer" onClick={handleNavClick(SWAP_LINK, true)}>
                                    <Button className="w-full shadow-md bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 font-semibold text-primary-foreground" size="lg">
                                        Get $ROACH Now
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
});
Header.displayName = 'Header';
// --- END OF FILE components/layout/header.tsx ---