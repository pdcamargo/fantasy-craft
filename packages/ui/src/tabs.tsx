"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("overflow-hidden", className)}
    {...props}
  />
));

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center rounded-md bg-muted p-1 text-muted-foreground justify-start overflow-x-auto overflow-y-hidden w-[-webkit-fill-available] invisible-scrollbar",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsScrollButton = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    direction: "left" | "right";
    shouldScroll?: boolean;
    scrollBy?: number;
  }
>(
  (
    {
      className,
      onPointerDown,
      direction,
      shouldScroll = true,
      scrollBy,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "sticky top-0 -my-1 min-w-10 size-10 flex items-center",
        {
          "right-0 fade-gradient-to-r justify-end": direction === "right",
          "left-0 fade-gradient-to-l justify-start": direction === "left",
        },
        className,
      )}
      onPointerDown={(event) => {
        onPointerDown?.(event);

        if (event.isDefaultPrevented()) return;

        // get parent and scroll to direction
        const parent = event.currentTarget.parentElement;

        if (parent instanceof HTMLElement) {
          if (direction === "right") {
            parent.scrollBy({
              left: scrollBy || 100,
              behavior: "smooth",
            });

            return;
          }

          parent.scrollBy({
            left: -(scrollBy || 100),
            behavior: "smooth",
          });
        }
      }}
      {...props}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  ),
);

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsScrollButton, TabsContent };
