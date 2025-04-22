// --- START OF FILE components/internal/theme-toggle-button.tsx ---
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggleButton() {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => setIsMounted(true), []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    // Avoid rendering until mounted to prevent hydration issues
    if (!isMounted) {
        return <div className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-muted animate-pulse"></div>;
    }

    const isDarkMode = resolvedTheme === "dark";

    return (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                    <motion.div
                        className="fixed bottom-4 right-4 z-[50]" // Position fixed, moderate z-index
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }} // Animate in slightly delayed
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                            className={cn(
                                "rounded-full shadow-md", // Circular button with shadow
                                "bg-background/70 dark:bg-muted/50 backdrop-blur-sm", // Semi-transparent background
                                "border-border/50 hover:border-border hover:bg-accent/80 dark:hover:bg-muted/80",
                                "transition-all duration-200 ease-in-out",
                                "focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
                            )}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isDarkMode ? "moon" : "sun"}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center"
                                >
                                    {isDarkMode
                                        ? <Sun className="h-[1.2rem] w-[1.2rem] text-amber-400" /> // Sun shown in dark mode to switch TO light
                                        : <Moon className="h-[1.2rem] w-[1.2rem] text-primary/90" /> // Moon shown in light mode to switch TO dark
                                    }
                                </motion.div>
                            </AnimatePresence>
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent side="left" align="center">
                    <p className="text-xs">Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
// --- END OF FILE components/internal/theme-toggle-button.tsx ---