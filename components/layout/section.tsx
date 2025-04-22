// --- START OF FILE components/layout/section.tsx ---
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    className?: string;
    containerClassName?: string;
    children: React.ReactNode;
    disableDefaultHeight?: boolean;
    // New props for background effects
    gradientBackground?: boolean;
    patternBackground?: string; // Path to pattern SVG
    gradientOpacity?: number; // 0 to 1
    patternOpacity?: number; // 0 to 1
}

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode;
    description?: React.ReactNode;
    subtitle?: React.ReactNode;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    // New prop for text glow effect
    glowEffect?: 'primary' | 'secondary' | 'none';
}

interface SectionConnectorProps {
    prevSection?: string;
    summary?: React.ReactNode;
    nextConcept?: React.ReactNode;
    className?: string;
}


export function Section({
    id,
    className,
    containerClassName,
    children,
    disableDefaultHeight = false,
    gradientBackground = false,
    patternBackground,
    gradientOpacity = 0.5,
    patternOpacity = 0.02,
    ...props
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "w-full relative scroll-snap-align-start", // scroll-snap-align-start kept
                !disableDefaultHeight && "min-h-[100svh] flex flex-col justify-center py-16 md:py-20 lg:py-24", // Using svh for viewport height
                className
            )}
            {...props}
        >
            {/* Optional Background Effects */}
            {(gradientBackground || patternBackground) && (
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {gradientBackground && (
                         // Adjusted gradient for subtlety
                         <div
                            className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background dark:from-background/10 dark:via-primary/10 dark:to-background/15"
                            style={{ opacity: Math.max(0, Math.min(1, gradientOpacity)) }} // Ensure opacity is between 0 and 1
                         />
                    )}
                    {patternBackground && (
                         <div
                             className="absolute inset-0 bg-repeat bg-center"
                             style={{
                                 backgroundImage: `url(${patternBackground})`,
                                 opacity: Math.max(0, Math.min(1, patternOpacity)),
                                 maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)' // Optional soft fade
                             }}
                         />
                    )}
                </div>
            )}
            {/* Main Content Container */}
            <div className={cn(
                "container mx-auto px-4 md:px-6 w-full z-10", // Ensure content is above background
                containerClassName
            )}>
                {children}
            </div>
        </section>
    );
}


export function SectionHeader({
    title,
    description,
    subtitle,
    alignment = 'center',
    className,
    titleClassName,
    descriptionClassName,
    glowEffect = 'none', // Default to no glow
    ...props
}: SectionHeaderProps) {

    const titleGlowClass = {
        primary: 'text-glow-primary', // Assumes this class exists in globals.css or Tailwind config
        secondary: 'text-glow-secondary',
        none: ''
    }[glowEffect];

    return (
        <div
            className={cn(
                "mb-12 md:mb-16 max-w-4xl",
                {
                    'mx-auto text-center': alignment === 'center',
                    'text-right ml-auto': alignment === 'right',
                    'text-left mr-auto': alignment === 'left',
                },
                className
            )}
            {...props}
        >
            {subtitle && (
                 // Added subtle shadow and refined style
                 <Badge variant="outline" className="mb-3 text-xs px-2.5 py-1 shadow-sm border-primary/20 bg-primary/5 text-primary font-medium tracking-wide">
                    {subtitle}
                 </Badge>
            )}

            <h2
                className={cn(
                    "text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight !leading-snug mb-3 sm:mb-4 text-balance", // Adjusted line-height and margin
                     "text-foreground dark:text-foreground/95", // Explicit foreground colors
                     titleGlowClass, // Apply conditional glow class
                     titleClassName
                )}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={cn(
                        "text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed sm:leading-relaxed",
                        alignment === 'center' ? "max-w-[90%] sm:max-w-3xl mx-auto" : "max-w-full", // Adjust max-width for center
                        descriptionClassName
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

// SectionConnector (mostly unchanged, enhanced visuals)
export function SectionConnector({
    prevSection,
    summary,
    nextConcept,
    className,
}: SectionConnectorProps) {

    const cardVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)', scale: 0.98 },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
    };

    if (!prevSection && !summary && !nextConcept) {
        return null;
    }

    return (
        <Section
            className={cn(
                "min-h-[50vh] md:min-h-[40vh] flex flex-col justify-center items-center", // Reduced height
                "bg-gradient-to-b from-muted/5 to-muted/15 dark:from-background/10 dark:to-muted/5",
                "!py-10 md:!py-14", // Adjusted padding
                className
            )}
            disableDefaultHeight // Disable the default full height
            aria-hidden="true"
        >
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="max-w-xl mx-auto"
            >
                <Card className={cn(
                    "bg-card/70 dark:bg-card/50 border-border/20 dark:border-border/30 text-center backdrop-blur-md rounded-xl shadow-md dark:shadow-primary/5 overflow-hidden",
                    "hover:border-primary/30 transition-colors duration-300" // Subtle hover effect
                )}>
                    <CardContent className="space-y-3 md:space-y-4 p-6 md:p-8"> {/* Standardized padding */}
                        {summary && (
                            <div className="text-center">
                                {prevSection && (
                                    <p className="text-[11px] font-medium text-muted-foreground/80 mb-1 uppercase tracking-wider">
                                        From: <span className="font-semibold text-foreground/90">{prevSection}</span>
                                    </p>
                                )}
                                <p className="text-base md:text-lg text-foreground font-medium leading-tight text-balance">{summary}</p>
                            </div>
                        )}
                        {summary && nextConcept && (
                            <div className="relative flex justify-center items-center py-1">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-dashed border-border/50 dark:border-border/30"></div>
                                </div>
                                {/* Animated arrow indication */}
                                <motion.div
                                    className="relative bg-primary/10 dark:bg-primary/20 p-1.5 rounded-full border border-primary/30 shadow-sm"
                                    initial={{ scale: 1 }}
                                    whileInView={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5}}
                                    viewport={{ once: true }}
                                >
                                    <ArrowDown className="h-4 w-4 text-primary" />
                                </motion.div>
                            </div>
                        )}
                        {nextConcept && (
                            <div className="flex flex-col items-center gap-0.5 text-sm pt-1">
                                <span className="font-semibold tracking-wide text-primary/90 uppercase text-[11px]">Next Concept:</span>
                                <span className="text-foreground/95 text-base font-medium text-balance">{nextConcept}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </Section>
    );
}
// --- END OF FILE components/layout/section.tsx ---