"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";

const TabsContext = React.createContext<{
  variant: "default" | "underline";
}>({
  variant: "default",
});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: "default" | "underline";
  }
>(({ className, variant, ...props }, ref) => (
  <TabsContext.Provider value={{ variant: variant || "default" }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  </TabsContext.Provider>
));

const tabsListVariants = cva(
  "inline-flex h-10 items-center rounded-md bg-muted p-1 text-muted-foreground justify-start overflow-x-auto overflow-y-hidden w-[-webkit-fill-available] invisible-scrollbar",
  {
    variants: {
      variant: {
        default: "",
        underline: "bg-transparent inline-flex w-auto gap-2",
        pill: "bg-transparent inline-flex w-auto gap-2",
      },
      size: {},
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        underline:
          "uppercase border-b-4 data-inactive:text-gray-500 data-inactive:border-transparent data-active:border-red-500 rounded-none px-0 data-active:bg-transparent",
        pill: "uppercase text-sm font-semibold data-active:font-bold data-inactive:text-gray-500 data-active:bg-red-600 py-1",
      },
      size: {},
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
});
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
          "right-0 fade-gradient-to-r justify-end ml-auto ":
            direction === "right",
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
