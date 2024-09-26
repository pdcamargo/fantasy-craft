import React, { useRef } from "react";
import { cn } from "./utils";

type BaseProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  "onChange" | "min" | "max"
> & {
  as?: React.ElementType;
  editable?: boolean;
  placeholder?: string;
};

type NumberProps = BaseProps & {
  onChange?: (value: number) => void;
  type?: "number";
  min?: number;
  max?: number;
};

type StringProps = BaseProps & {
  onChange?: (value: string) => void;
  type?: "string";
};

export type ContentEditableProps = NumberProps | StringProps;

export const ContentEditable = React.forwardRef<
  HTMLDivElement,
  ContentEditableProps
>(
  (
    {
      onChange,
      editable = true,
      as: Component = "div",
      type = "string",
      className,
      placeholder,
      children,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const innerRef = useRef<HTMLElement>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      let newValue = e.currentTarget.textContent ?? "";

      if (type === "number") {
        newValue = newValue.replace(/[^\d]/g, "");
        newValue = parseInt(newValue, 10).toString();

        if ("min" in props && props.min !== undefined) {
          newValue = Math.max(props.min, parseInt(newValue, 10)).toString();
        }

        if ("max" in props && props.max !== undefined) {
          newValue = Math.min(props.max, parseInt(newValue, 10)).toString();
        }
      } else {
        newValue = String(newValue);
      }

      const ipt = innerRef.current!;
      ipt.innerHTML = "";
      ipt.textContent = newValue;

      // @ts-expect-error -- typescript gets crazy with having two type definitions for onChange
      onChange?.(newValue);

      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(ipt, 1);
      range.collapse(true);

      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
      const isArrowUpOrDown = ["ArrowUp", "ArrowDown"].includes(
        (e.nativeEvent as InputEvent).inputType,
      );

      if (isArrowUpOrDown && type === "number" && editable) {
        return;
      }

      if (type === "number") {
        const input = e.nativeEvent as InputEvent;
        if (!/^\d$/.test(input.data!)) {
          e.preventDefault();
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (type === "number" && editable) {
        const isArrow = ["ArrowUp", "ArrowDown"].includes(e.key);

        if (!isArrow) return;

        e.preventDefault();

        const input = innerRef.current!;

        const currentValue = parseInt(input.textContent ?? "0", 10);

        if (e.key === "ArrowUp") {
          input.textContent = (currentValue + 1).toString();
        } else {
          input.textContent = (currentValue - 1).toString();
        }

        const newValue = parseInt(input.textContent ?? "0", 10);

        if ("min" in props && props.min !== undefined) {
          input.textContent = Math.max(props.min, newValue).toString();
        }

        if ("max" in props && props.max !== undefined) {
          input.textContent = Math.min(props.max, newValue).toString();
        }

        // @ts-expect-error -- typescript gets crazy with having two type definitions for onChange
        onChange?.(parseInt(input.textContent ?? "0", 10));
      }
    };

    return (
      <Component
        ref={(node: HTMLDivElement) => {
          (innerRef as React.MutableRefObject<HTMLDivElement>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement>).current = node;
          }
        }}
        contentEditable={editable}
        suppressContentEditableWarning
        spellCheck={false}
        className={cn(
          "relative border-b border-dashed border-b-white/75 focus:outline-none focus:border-b-red-500",
          {
            // "text-gray-500 font-normal": !isFocused && !children,
          },
          className,
        )}
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        {...props}
      >
        {children}
        {/* {!children && !isFocused && placeholder && placeholder} */}
      </Component>
    );
  },
);
