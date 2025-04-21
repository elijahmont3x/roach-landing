// --- START OF FILE components/layout/Header.tsx ---
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
import { Activity, Coins, Info, ListChecks, Menu, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";

// Constants for links - USE YOUR ACTUAL LINKS
const SWAP_LINK = "https://jup.ag/swap/SOL-ROACHaBXfk3N57vr1gDmQCkSp22d9Xv4V1f";
const WHITEPAPER_LINK = "/PARADOX_Whitepaper_v2.txt"; // Link to static asset

// --- Menu Items (Ensure IDs match section IDs in page.tsx) ---
const menuItems = [
    { name: "Concept", href: "#the-antifragile-edge", icon: ShieldCheck },
    { name: "Mechanics", href: "#mechanics", icon: Activity },
    { name: "Tokenomics", href: "#tokenomics", icon: Coins },
    { name: "Security", href: "#security", icon: ShieldCheck },
    { name: "Roadmap", href: "#roadmap", icon: ListChecks },
    { name: "FAQ", href: "#faq", icon: Info },
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
                    const scrolled = lastKnownScrollPosition > 10;
                    if (scrolled !== isScrolled) { // Update state only if changed
                        setIsScrolled(scrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Run once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled]); // Depend only on isScrolled

    // Callback for handling navigation clicks
    const handleNavClick = useCallback((href: string, closeMobileMenu = false) => (e: React.MouseEvent) => {
        if (href.startsWith('#')) {
            e.preventDefault(); // Prevent default jump
            const id = href.substring(1);
            onScrollTo(id);
            if (closeMobileMenu) {
                setIsMobileMenuOpen(false);
            }
        }
        // Let external links or root link behave normally
        // If it's the root link, just navigate (no scroll prevention needed)
        else if (href === '/') {
             if (closeMobileMenu) {
                setIsMobileMenuOpen(false);
            }
            // No preventDefault needed for root link
        }

    }, [onScrollTo]);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 ease-out", // OK: Layout/State
                // Apply subtle blur and border effect when scrolled
                isScrolled
                    ? "shadow-md bg-background/90 backdrop-blur-sm border-b border-border/30" // OK: State-based visual tweaks
                    : "bg-transparent border-b border-transparent" // OK: State-based visual tweaks
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6"> {/* OK: Layout */}
                {/* Logo Area */}
                 {/* Use onClick for root link to potentially close mobile menu */}
                <Link href="/" className="flex items-center gap-2 mr-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" onClick={handleNavClick('/', true)}>
                    <CockroachMascot size="sm" className="text-primary transition-transform hover:scale-110" /> {/* OK: Minor tweak (transform), primary color */}
                    <span className="text-xl font-bold hidden sm:inline tracking-tight"> {/* OK: Text style for brand */}
                        $ROACH
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex flex-1 justify-center"> {/* OK: Layout */}
                    <NavigationMenuList>
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                {/* Use Button for navigation action */}
                                <Button
                                    variant="ghost"
                                    // Use nav trigger style for base, apply overrides that don't conflict
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-transparent h-9 px-3 text-sm font-medium", // OK: Specific sizing/padding for this nav context
                                        "hover:bg-accent/70 hover:text-accent-foreground", // OK: Specific hover for this context
                                        "focus:bg-accent/70 focus:text-accent-foreground data-[active]:bg-accent/50" // OK: Specific focus/active for this context
                                    )}
                                    onClick={handleNavClick(item.href)} // Use callback for click
                                >
                                    <item.icon className="mr-1.5 h-4 w-4 opacity-80" /> {/* OK: Icon style */}
                                    {item.name}
                                </Button>
                            </NavigationMenuItem>
                        ))}
                        {/* Whitepaper link added */}
                        <NavigationMenuItem>
                            <Link href={WHITEPAPER_LINK} target="_blank" rel="noopener noreferrer" legacyBehavior passHref>
                                <NavigationMenuLink className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent h-9 px-3 text-sm font-medium hover:bg-accent/70" // OK: Specific sizing/hover for this context
                                    )}>
                                    Whitepaper
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Side Actions (Desktop) */}
                <div className="hidden lg:flex items-center gap-2 ml-auto"> {/* OK: Layout */}
                    {/* Main CTA - Use Link > Button pattern */}
                    <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="shadow-sm hover:shadow-md transition-shadow bg-primary hover:bg-primary/90"> {/* OK: Minor shadow transition, rely on Button base for colors/padding */}
                            Get $ROACH
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Trigger & Sheet */}
                <div className="flex items-center gap-2 lg:hidden ml-auto"> {/* OK: Layout */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                // OK: size is defined, text color is minor tweak
                                className="h-8 w-8 text-foreground/80 hover:text-foreground"
                                aria-label="Toggle navigation menu"
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] pt-10 px-0 bg-background flex flex-col border-l border-border/50"> {/* OK: Specific Sheet styling for layout */}
                            {/* Mobile Menu Header */}
                            <div className="px-4 mb-6 flex items-center justify-between"> {/* OK: Layout */}
                                <div className="flex items-center gap-2"> {/* OK: Layout */}
                                    <CockroachMascot size="sm" className="text-primary" /> {/* OK: Primary color */}
                                    <span className="text-lg font-bold">$ROACH</span> {/* OK: Brand text style */}
                                </div>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"> {/* OK: Specific size/color for close button */}
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </SheetClose>
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className="flex flex-col space-y-1 flex-grow px-4 overflow-y-auto"> {/* OK: Layout */}
                                {menuItems.map((item) => (
                                    <SheetClose key={item.href} asChild>
                                        {/* Use Button for interaction, rely on base styles */}
                                        <Button
                                            variant="ghost"
                                            // Adjust Button styling for mobile nav links
                                            className="w-full justify-start text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent px-3 py-2 h-auto" // OK: Specific layout/style for mobile nav item
                                            onClick={handleNavClick(item.href, true)} // Pass true to close menu
                                        >
                                            <item.icon className="mr-2 h-4 w-4 opacity-80" /> {/* OK: Icon style */}
                                            {item.name}
                                        </Button>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    {/* Use Link > a pattern (legacyBehavior requires <a>) */}
                                    <Link href={WHITEPAPER_LINK} target="_blank" rel="noopener noreferrer" legacyBehavior passHref>
                                        <a className={cn(
                                            buttonVariants({ variant: "ghost" }), // Use Button styles via variants
                                            "w-full justify-start text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent px-3 py-2 h-auto" // OK: Specific layout/style for mobile nav item
                                        )}>
                                            Whitepaper
                                        </a>
                                    </Link>
                                </SheetClose>
                            </nav>

                            {/* Mobile Action Button at bottom */}
                            <div className="mt-auto border-t border-border/30 p-4"> {/* OK: Layout */}
                                {/* Use Link > Button pattern */}
                                <Link href={SWAP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full shadow-md bg-primary hover:bg-primary/90" size="lg"> {/* OK: Rely on Button base, minor shadow OK */}
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
Header.displayName = 'Header'; // Add display name for memoized component
// --- END OF FILE components/layout/Header.tsx ---