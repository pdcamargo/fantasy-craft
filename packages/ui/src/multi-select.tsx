"use client";

import { X } from "lucide-react";
import { cn } from "./utils";
import React from "react";
import { Badge } from "./badge";
import { cva, VariantProps } from "class-variance-authority";

const multiSelectVariants = cva(
  "flex items-start justify-start w-full font-thin text-[15px] text-white cursor-text border-b min-h-[30px]",
  {
    variants: {
      variant: {
        default: "border-red-600 px-0 py-1",
        transparent:
          "border border-input bg-transparent rounded-md min-h-9 px-3 py-1 shadow-sm",
      },
      size: { default: "", sm: "" },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
type MultiSelectProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "value" | "onChange"
> & {
  value: string[];
  onChange: (value: string[]) => void;
} & VariantProps<typeof multiSelectVariants>;

const MultiSelect = ({
  className,
  value,
  onChange,
  onKeyDown,
  variant,
  size,
  placeholder,
  ...inputProps
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (e.isDefaultPrevented()) {
      return;
    }

    // enter or comma we get the value, add it to the list and clear the input
    if (
      (e.code === "Enter" || e.code === "Comma") &&
      !value.includes(e.currentTarget.value.replace(",", "").trim())
    ) {
      const newItem = e.currentTarget.value.replace(",", "").trim();

      const newValue = [...value, newItem];
      onChange(newValue);
      e.currentTarget.value = "";
    }
  };

  const finalPlaceholder = placeholder || "Type...";

  const maxLength = 20;
  const typeInputLength = Math.min(
    Math.max(inputValue.length, finalPlaceholder.length),
    maxLength
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        multiSelectVariants({ className, variant }),
        "max-h-16 overflow-y-auto"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          inputRef.current?.focus();
        }
      }}
    >
      <div className="inline-flex w-auto flex-wrap gap-2 pointer-events-none">
        {value.map((proficiency) => (
          <Badge
            key={proficiency}
            size={size}
            className={cn(
              "flex items-center pointer-events-auto cursor-pointer",
              {
                "gap-2": size !== "sm",
                "gap-1": size === "sm",
              }
            )}
            onClick={() => {
              const newValue = value.filter((v) => v !== proficiency);

              onChange(newValue);
            }}
          >
            {proficiency.replace("Armor", "")}

            <X className="size-3" />
          </Badge>
        ))}

        <input
          ref={inputRef}
          placeholder={finalPlaceholder}
          className={cn(
            "inline-flex bg-transparent outline-none text-sm w-auto h-[22px] placeholder:text-gray-600",
            {
              "text-xs": size === "sm",
            }
          )}
          onKeyDown={handleInputChange}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
          {...inputProps}
          maxLength={maxLength}
          style={{
            ...inputProps?.style,
            width: `${typeInputLength}ch`,
          }}
        />
      </div>
    </div>
  );
};

export { MultiSelect };
