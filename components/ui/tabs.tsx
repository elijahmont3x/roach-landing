// --- START OF FILE components/ui/tabs.tsx ---

"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority" // Import cva

import { cn } from "@/lib/utils"

// Define variants for TabsList
const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg p-[3px]", // Base styles remain
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        // New variant for the full-width segmented control look
        segmented: "grid w-full h-auto bg-muted dark:bg-background/40 gap-1.5 rounded-t-lg rounded-b-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Define variants for TabsTrigger
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", // Base styles simplified slightly, relying on variants more
  {
    variants: {
      variant: {
        // Default variant for standard tabs
        default: "rounded-md px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-muted",
        // New variant for the panel-like triggers used in AntifragileEdge
        panel: "py-2.5 sm:py-3 text-xs sm:text-sm flex-col sm:flex-row items-center justify-center h-auto gap-1.5 rounded-md border border-transparent data-[state=active]:shadow-md data-[state=active]:bg-card data-[state=active]:border-border/50 dark:data-[state=active]:border-border/30 data-[state=active]:font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


// Update TabsListProps and TabsTriggerProps interfaces
interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List>,
  VariantProps<typeof tabsListVariants> {}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
  VariantProps<typeof tabsTriggerVariants> {}


function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)} // Maintained original gap
      {...props}
    />
  )
}

// Updated TabsList to accept variant prop
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Updated TabsTrigger to accept variant prop
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;


function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // Removed flex-1 from base, can be added via className if needed
      // Added default focus-visible outline for accessibility
      className={cn("outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
// --- END OF FILE components/ui/tabs.tsx ---