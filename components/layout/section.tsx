// --- START OF FILE components/layout/section.tsx ---
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React, { Suspense, createContext, useContext } from "react"; // Added createContext and useContext
import { LoadingSpinner } from "@/components/internal/spinner";

// Define alignment types for better type safety
type Alignment = 'left' | 'center' | 'right';

// Create a context for alignment information
interface SectionContextType {
  align: Alignment;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

// Custom hook to access section context
function useSectionContext() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    // Default to 'center' if used outside a Section
    return { align: 'center' as Alignment };
  }
  return context;
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    className?: string;
    containerClassName?: string;
    children: React.ReactNode;
    disableDefaultHeight?: boolean;
    gradientBackground?: boolean;
    patternBackground?: string;
    gradientOpacity?: number;
    patternOpacity?: number;
    useSuspense?: boolean;
    align?: Alignment;
    fullWidthGradient?: boolean;
}

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode;
    description?: React.ReactNode;
    subtitle?: React.ReactNode;
    align?: Alignment | 'inherit';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    glowEffect?: 'primary' | 'secondary' | 'none';
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
    align = 'center',
    fullWidthGradient = false,
    ...props
}: SectionProps) {
    // Suspense fallback UI
    const suspenseFallback = (
        <div className="flex items-center justify-center min-h-[70vh] w-full">
            <LoadingSpinner size="xl" text="Loading Section..." />
        </div>
    );
    
    // Content alignment classes
    const contentAlignClasses = {
        'left': 'items-start',
        'center': 'items-center',
        'right': 'items-end'
    }[align];
    
    // Provide section context to all children
    const sectionContextValue = {
        align
    };
    
    return (
        <SectionContext.Provider value={sectionContextValue}>
            <section
                id={id}
                className={cn(
                    "w-full relative scroll-snap-align-start", 
                    !disableDefaultHeight && "min-h-[100svh] flex flex-col justify-center py-16 md:py-20 lg:py-24",
                    className
                )}
                {...props}
            >
                {/* Background effects */}
                {(gradientBackground || patternBackground) && (
                    <div className={cn(
                        "absolute -z-10 overflow-hidden pointer-events-none",
                        fullWidthGradient ? "fixed inset-0" : "inset-0"
                    )}>
                        {gradientBackground && (
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background dark:from-background/10 dark:via-primary/10 dark:to-background/15"
                                style={{ opacity: Math.max(0, Math.min(1, gradientOpacity)) }}
                            />
                        )}
                        {patternBackground && (
                            <div
                                className="absolute inset-0 bg-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${patternBackground})`,
                                    opacity: Math.max(0, Math.min(1, patternOpacity)),
                                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
                                }}
                            />
                        )}
                    </div>
                )}
                
                {/* Container */}
                <div 
                    className={cn(
                        "container mx-auto px-4 md:px-6 w-full z-10 flex-grow flex flex-col",
                        containerClassName
                    )}
                >
                    {/* Inner wrapper for content alignment */}
                    <div className={cn("w-full flex-grow flex flex-col", contentAlignClasses)}>
                        {useSuspense ? (
                            <Suspense fallback={suspenseFallback}>
                                {children}
                            </Suspense>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </section>
        </SectionContext.Provider>
    );
}

export function SectionHeader({
    title,
    description,
    subtitle,
    align = 'inherit',
    textAlign = 'left',
    className,
    titleClassName,
    descriptionClassName,
    glowEffect = 'none',
    ...props
}: SectionHeaderProps) {
    // Get alignment from section context
    const { align: sectionAlign } = useSectionContext();
    
    // Determine effective alignment - use section alignment if inherit
    const effectiveAlign = align === 'inherit' ? sectionAlign : align;
    
    // Apply text alignment classes
    const effectiveTextAlign = textAlign === 'inherit' ? effectiveAlign : textAlign;
    const textAlignClass = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
    }[effectiveTextAlign];
    
    // Apply subtitle alignment
    const subtitleAlignClass = {
        'left': 'justify-start',
        'center': 'justify-center',
        'right': 'justify-end'
    }[effectiveAlign];
    
    // Apply glow effect
    const titleGlowClass = {
        primary: 'text-glow-primary',
        secondary: 'text-glow-secondary',
        none: ''
    }[glowEffect];
    
    return (
        <div
            className={cn(
                "mb-12 md:mb-16 max-w-4xl relative",
                // Apply position based on effective alignment
                effectiveAlign === 'center' && "mx-auto",
                effectiveAlign === 'right' && "ml-auto",
                effectiveAlign === 'left' && "mr-auto",
                className
            )}
            data-header-align={effectiveAlign} // For debugging
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
                    textAlignClass,
                    titleGlowClass,
                    titleClassName
                )}>
                {title}
            </h2>

            {description && (
                <p
                    className={cn(
                        "text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed sm:leading-relaxed",
                        textAlignClass,
                        "max-w-full",
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