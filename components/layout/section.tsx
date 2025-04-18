// --- START OF FILE components/ui/Section.tsx ---
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
  // New prop to disable default min-height and centering for connectors etc.
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
  subtitleClassName?: string;
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
  disableDefaultHeight = false, // Default to applying height/centering
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full relative scroll-snap-align-start",
        // Conditionally apply height and centering
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

export function SectionHeader({
  title,
  description,
  subtitle,
  alignment = 'center',
  className,
  titleClassName,
  descriptionClassName,
  subtitleClassName,
  ...props
}: SectionHeaderProps) {

  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-4xl", // Wider max-width
        {
          'mx-auto text-center': alignment === 'center',
          'text-right ml-auto': alignment === 'right',
          'text-left mr-auto': alignment === 'left',
        },
        className
      )}
      {...props}
    >
      {/* Subtitle */}
      {subtitle && (
        <Badge
          variant="outline"
          className={cn(
            "mb-3 inline-flex items-center gap-1.5 border-primary/40 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 shadow-sm", // Enhanced subtitle badge
            subtitleClassName
          )}
        >
          {subtitle}
        </Badge>
      )}

      {/* Main Title */}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.8rem] !leading-tight mb-4 text-balance", // Adjusted size, text-balance
          titleClassName
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-lg text-muted-foreground md:text-xl lg:text-[1.18rem] leading-relaxed", // Slightly larger description
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

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
    // Use the updated Section, disable its default height/padding behavior
    <Section
      disableDefaultHeight={true} // Important: Allows this section to be less tall
      className={cn(
        "bg-transparent", // Transparent background to see page gradient
        "!py-12 md:!py-16", // Custom padding for connector density
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-lg mx-auto" // Narrower card for transition
      >
        {/* Card with backdrop blur and subtle border */}
        <Card className={cn(
          "bg-card/50 dark:bg-card/30 border border-border/20 shadow-sm text-center backdrop-blur-sm rounded-xl",
          "dark:border-border/30"
        )}>
          <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
            {/* Summary Section */}
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

            {/* Separator */}
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

            {/* Next Concept Section */}
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