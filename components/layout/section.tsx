// --- START OF FILE components/layout/section.tsx ---
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React, { Suspense } from "react"; // Import Suspense
import { LoadingSpinner } from "@/components/internal/spinner"; // Import LoadingSpinner

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
    // New prop for suspense handling
    useSuspense?: boolean;
    // Renamed from alignment to align
    align?: 'left' | 'center' | 'right';
    // New prop to make gradient full-width
    fullWidthGradient?: boolean;
}

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode;
    description?: React.ReactNode;
    subtitle?: React.ReactNode;
    // Also rename here for consistency
    align?: 'left' | 'center' | 'right' | 'inherit';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    // New prop for text glow effect
    glowEffect?: 'primary' | 'secondary' | 'none';
    // Add a new prop for text alignment independent from block alignment
    textAlign?: 'left' | 'center' | 'right' | 'inherit';
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
    useSuspense = false,
    align = 'center', // Renamed from alignment to align
    fullWidthGradient = false, // New prop
    ...props
}: SectionProps) {
    // Suspense fallback UI
    const suspenseFallback = (
        <div className="flex items-center justify-center min-h-[70vh] w-full">
            <LoadingSpinner size="xl" text="Loading Section..." />
        </div>
    );
    
    // Simplify alignment to only handle *horizontal* alignment
    const contentAlignClasses = {
        'left': 'items-start', // Only control horizontal alignment
        'center': 'items-center', // Only control horizontal alignment
        'right': 'items-end' // Only control horizontal alignment
    }[align];
    
    // The container itself is always centered with mx-auto
    // We'll apply custom width constraints based on the alignment
    const containerWidthClasses = {
        'left': 'mr-auto', // Left-aligned content gets right margin auto
        'center': 'mx-auto', // Centered content gets margin auto on both sides
        'right': 'ml-auto'   // Right-aligned content gets left margin auto
    }[align];
    
    return (
        <section
            id={id}
            className={cn(
                "w-full relative scroll-snap-align-start", 
                !disableDefaultHeight && "min-h-[100svh] flex flex-col justify-center py-16 md:py-20 lg:py-24",
                // For sections that should fill the height completely, add h-screen or specific height classes
                className
            )}
            // Properly set data attribute as a prop
            data-section-align={align}
            {...props}
        >
            {/* Optional Background Effects - Adjusted for full-width capability */}
            {(gradientBackground || patternBackground) && (
                <div className={cn(
                    "absolute -z-10 overflow-hidden pointer-events-none",
                    fullWidthGradient ? "fixed inset-0" : "inset-0" // Use fixed positioning for full-width
                )}>
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
            {/* Container is always full width */}
            <div 
                className={cn(
                    "container mx-auto px-4 md:px-6 w-full z-10 flex-grow flex flex-col", // Added flex-grow and flex flex-col
                    containerClassName
                )}
            >
                {/* Inner wrapper now has flex-grow to fill available height */}
                <div className={cn("w-full flex-grow flex flex-col", contentAlignClasses)}>
                    {useSuspense ? (
                        <Suspense fallback={suspenseFallback}>
                            {children}
                        </Suspense>
                    ) : (
                        children  // FIX: Removed the incorrect curly braces around children
                    )}
                </div>
            </div>
        </section>
    );
}


export function SectionHeader({
    title,
    description,
    subtitle,
    align = 'inherit', // Default is now 'inherit' instead of a specific value
    textAlign = 'left', 
    className,
    titleClassName,
    descriptionClassName,
    glowEffect = 'none',
    ...props
}: SectionHeaderProps) {
    // Get reference to the component
    const headerRef = React.useRef<HTMLDivElement>(null);
    
    // State to store inherited alignment from parent section
    const [inheritedAlign, setInheritedAlign] = React.useState<'left' | 'center' | 'right'>('center');
    
    // Effect to find and read parent section's alignment
    React.useEffect(() => {
        // Run this only once after component mounts
        if (align === 'inherit' && headerRef.current) {
            try {
                // Find the closest section element
                const parentSection = headerRef.current.closest('section');
                
                if (parentSection) {
                    // Log parent section for debugging
                    console.log("Found parent section:", parentSection);
                    
                    // Direct DOM attribute access with fallback
                    const alignAttr = parentSection.getAttribute('data-section-align');
                    console.log("Raw alignment attribute:", alignAttr);
                    
                    // Set alignment based on the attribute value, with fallback to center
                    if (alignAttr === 'left' || alignAttr === 'center' || alignAttr === 'right') {
                        console.log(`Setting alignment to: ${alignAttr}`);
                        setInheritedAlign(alignAttr as 'left' | 'center' | 'right');
                    } else {
                        console.log("No valid alignment found, defaulting to center");
                        setInheritedAlign('center');
                    }
                } else {
                    console.log("No parent section found");
                }
            } catch (error) {
                console.error("Error finding parent section:", error);
            }
        }
    }, [align]); // Only depend on align prop
    
    // Determine effective alignment - use inheritedAlign only when align is 'inherit'
    const effectiveAlign = align === 'inherit' ? inheritedAlign : align;
    
    // For debugging - log the effective alignment being used
    console.log("Using effectiveAlign:", effectiveAlign);

    const titleGlowClass = {
        primary: 'text-glow-primary',
        secondary: 'text-glow-secondary',
        none: ''
    }[glowEffect];

    // Use effectiveAlign instead of align for text alignment
    const effectiveTextAlign = textAlign === 'inherit' ? effectiveAlign : textAlign;
    const textAlignClass = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
    }[effectiveTextAlign];

    // Use effectiveAlign for subtitle alignment
    const subtitleAlignClass = {
        'left': 'justify-start',
        'center': 'justify-center',
        'right': 'justify-end'
    }[effectiveAlign];

    return (
        <div
            ref={headerRef}
            className={cn(
                "mb-12 md:mb-16 max-w-4xl relative", // Added relative positioning
                {
                    'mx-auto': effectiveAlign === 'center',
                    'ml-auto': effectiveAlign === 'right',
                    'mr-auto': effectiveAlign === 'left',
                },
                className
            )}
            // Add debug attribute to check alignment in DOM
            data-effective-align={effectiveAlign}
            {...props}
        >
            {subtitle && (
                <div className={cn("flex mb-3", subtitleAlignClass)}>
                    <Badge 
                        variant="outline" 
                        className="text-xs px-2.5 py-1 shadow-sm border-primary/20 bg-primary/5 text-primary font-medium tracking-wide"
                    >
                        {subtitle}
                    </Badge>
                </div>
            )}

            <h2
                className={cn(
                    "text-2xl sm:text-3xl md:text-3xl lg:text-[2.8rem] font-bold tracking-tight !leading-snug mb-3 sm:mb-4 text-balance",
                    "text-foreground dark:text-foreground/95",
                    textAlignClass, // Apply text alignment
                    titleGlowClass,
                    titleClassName
                )}>
                {title}
            </h2>

            {description && (
                <p
                    className={cn(
                        "text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed sm:leading-relaxed",
                        textAlignClass, // Apply same text alignment as title
                        "max-w-full", // Always max width
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