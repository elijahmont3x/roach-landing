// --- START OF FILE components/layout/section.tsx ---

// --- START OF FILE components/layout/section.tsx ---
import { Badge } from "@/components/ui/badge"; // Correct path
import { Card, CardContent } from "@/components/ui/card"; // Correct path
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";

// ... (interfaces remain the same) ...
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  disableDefaultHeight?: boolean;
}

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  subtitle?: React.ReactNode;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

interface SectionConnectorProps {
  prevSection?: string;
  summary?: React.ReactNode;
  nextConcept?: React.ReactNode;
  className?: string;
}


// Section component remains the same as previous refactor
export function Section({
  id,
  className,
  containerClassName,
  children,
  disableDefaultHeight = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full relative scroll-snap-align-start",
        !disableDefaultHeight && "min-h-screen flex flex-col justify-center py-16 md:py-20 lg:py-24",
        className
      )}
      {...props}
    >
      <div className={cn(
        "container mx-auto px-4 md:px-6 w-full",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  );
}

// SectionHeader: Updated to re-apply subtitle styles via className since Badge variant was removed
export function SectionHeader({
  title,
  description,
  subtitle,
  alignment = 'center',
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: SectionHeaderProps) {

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
        <Badge variant="outline" className="mb-3">
          {subtitle}
        </Badge>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight !leading-tight mb-2 sm:mb-4 text-balance",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg md:text-xl lg:text-[1.18rem] text-muted-foreground leading-relaxed sm:leading-relaxed max-w-[90%] sm:max-w-full mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// SectionConnector remains the same as previous refactor
export function SectionConnector({
  prevSection,
  summary,
  nextConcept,
  className,
}: SectionConnectorProps) {

  const cardVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };

  if (!prevSection && !summary && !nextConcept) {
    return null;
  }

  return (
    <Section
      className={cn(
        "min-h-screen flex flex-col justify-center items-center", // Ensures full height like other sections
        "bg-gradient-to-b from-background/5 to-muted/10 dark:from-background/10 dark:to-muted/5", // Added subtle gradient
        "!py-12 md:!py-16",
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <Card className={cn(
          "bg-card/50 dark:bg-card/30 border-border/20 text-center backdrop-blur-sm rounded-xl",
          "dark:border-border/30"
        )}>
          <CardContent className="space-y-3 md:space-y-4">
            {summary && (
              <div className="text-center">
                {prevSection && (
                  <p className="text-[11px] font-medium text-muted-foreground mb-0.5 uppercase tracking-wider">
                    Previously: <span className="font-semibold text-foreground/80">{prevSection}</span>
                  </p>
                )}
                <p className="text-base md:text-lg text-foreground/95 font-medium">{summary}</p>
              </div>
            )}
            {summary && nextConcept && (
              <div className="relative flex justify-center items-center my-1">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-dashed border-border/40"></div>
                </div>
                <div className="relative bg-background/30 dark:bg-background/50 p-1.5 rounded-full border border-border/30">
                  <ArrowDown className="h-4 w-4 text-primary/80" />
                </div>
              </div>
            )}
            {nextConcept && (
              <div className="flex flex-col items-center gap-0.5 text-sm">
                <span className="font-semibold tracking-wide text-primary">Coming Up:</span>
                <span className="text-foreground/95 text-base font-medium">{nextConcept}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}
// --- END OF FILE components/layout/section.tsx ---