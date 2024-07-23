import { X } from "lucide-react";
import { cn } from "./utils";
import React from "react";
import { Badge } from "./badge";

type MultiSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: string[];
  onChange: (value: string[]) => void;
};

const MultiSelect = ({
  className,
  value,
  onChange,
  onKeyDown,
  ...inputProps
}: MultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  return (
    <div
      className={cn(
        "flex items-start justify-start w-full border-b border-red-600 px-0 py-1 min-h-[30px] font-thin text-[15px] text-white cursor-text",
        className,
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
            className="flex items-center gap-2 pointer-events-auto cursor-pointer"
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
          placeholder="Type..."
          className="inline-flex bg-transparent outline-none text-sm w-auto h-[22px] placeholder:text-gray-600"
          onKeyDown={handleInputChange}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export { MultiSelect };
