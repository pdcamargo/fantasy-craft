"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "./utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverArrow = PopoverPrimitive.Arrow;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        [
          "z-50",
          "w-72",
          "rounded-md",
          "border",
          "border-gray-200",
          "text-[#17191e]",
          "bg-[#fff]",
          "p-4",
          "shadow-lg",
          "outline-none",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
        ],
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const AdaptivePopover: React.FC<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    contentProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
    triggerProps?: React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
    trigger: React.ReactNode;
  }
> = ({ children, contentProps, triggerProps, trigger, ...props }) => {
  const [triggerRef, setTriggerRef] = React.useState<HTMLElement | null>(null);

  const contentWidth = React.useMemo(() => {
    if (!triggerRef) return "300px";

    return triggerRef.offsetWidth;
  }, [triggerRef]);

  return (
    <Popover {...props}>
      <PopoverTrigger
        {...triggerProps}
        ref={(el) => {
          setTriggerRef(el);
        }}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        {...contentProps}
        style={{
          width: contentWidth,
        }}
      >
        <PopoverArrow />

        {children}
      </PopoverContent>
    </Popover>
  );
};

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPortal,
  PopoverArrow,
  AdaptivePopover,
};
