import React, { useRef } from "react";

type BaseProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  "onChange" | "min" | "max"
> & {
  as?: React.ElementType;
  editable?: boolean;
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
      ...props
    },
    ref,
  ) => {
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
        newValue = String(newValue.trim());
      }

      const ipt = innerRef.current!;
      const selection = window.getSelection();
      const range = selection!.getRangeAt(0);
      const preCursorRange = range.cloneRange();
      preCursorRange.selectNodeContents(ipt);
      preCursorRange.setEnd(range.startContainer, range.startOffset);
      const cursorPosition = preCursorRange.toString().length;

      ipt.innerHTML = "";
      ipt.textContent = newValue;

      // @ts-expect-error -- typescript gets crazy with having two type definitions for onChange
      onChange?.(newValue);

      const newRange = document.createRange();
      const newNode = ipt.firstChild || ipt;
      const newPosition = Math.min(cursorPosition, newNode.textContent!.length);

      newRange.setStart(newNode, newPosition);
      newRange.setEnd(newNode, newPosition);
      selection!.removeAllRanges();
      selection!.addRange(newRange);
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
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);
