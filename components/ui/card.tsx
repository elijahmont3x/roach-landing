// --- START OF FILE components/ui/card.tsx ---

import * as React from "react"

import { cn } from "@/lib/utils"

// Define props including the new paddingless prop
interface CardProps extends React.ComponentProps<"div"> {
  paddingless?: boolean;
}

function Card({ className, paddingless = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      // Base Card: Conditionally apply gap-6 and py-6 unless paddingless is true.
      // Default shadow-sm remains.
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm",
        !paddingless && "gap-6 py-6", // Apply default gap and vertical padding only if not paddingless
        className
      )}
      {...props}
    />
  )
}

// --- CardHeader, CardTitle, CardDescription, CardAction remain unchanged from the previous refactor ---
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      // Horizontal padding remains. Vertical padding handled by parent Card's gap or lack thereof.
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}


function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      // Horizontal padding remains. Vertical padding handled by parent Card's gap or lack thereof.
      // Allows explicit pt-0 if section needs content flush with header.
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      // Horizontal padding remains. Vertical padding handled by parent Card's gap or lack thereof.
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
// --- END OF FILE components/ui/card.tsx ---