import * as React from "react";

import { cn } from "./utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        simple: "bg-transparent shadow-none hover:bg-white/10",
        transparent: "border border-input bg-transparent",
      },
      size: {
        default: "h-9 px-3 py-1",
        sm: "h-7 px-2 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ className, variant }), {
          "border-destructive text-destructive placeholder-destructive-foreground focus-visible:ring-destructive":
            !!props?.["aria-invalid"],
        })}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
