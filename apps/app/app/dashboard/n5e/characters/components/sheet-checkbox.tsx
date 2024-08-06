import { cn } from "@craft/ui/utils";
import React from "react";

export type SheetCheckboxProps = {
  checked: boolean;
  editable?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export const SheetCheckbox = React.forwardRef<
  HTMLInputElement,
  SheetCheckboxProps
>(({ className, checked, editable, onCheckedChange }, ref) => {
  return (
    <label
      data-component="SheetCheckbox"
      className={cn("inline-flex items-center justify-center relative", {
        "cursor-pointer": editable,
        // invisible clickable area for easier clicking
        "before:content-[''] before:absolute before:z-10 before:cursor-pointer before:w-5 before:h-5":
          editable,
      })}
    >
      <input
        type="checkbox"
        ref={ref}
        className="hidden"
        checked={checked}
        disabled={!editable}
        onChange={() => {
          if (editable && onCheckedChange) {
            onCheckedChange(!checked);
          }
        }}
      />

      <div
        className={cn(
          "bg-[#333] border border-dotted border-[#838383] h-[10px] w-[10px] inline-flex rounded-full",
          {
            "bg-[#C53131]": checked,
          },
          className,
        )}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={!editable}
      />
    </label>
  );
});
