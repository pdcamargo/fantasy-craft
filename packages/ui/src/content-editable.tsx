import React, { useRef } from "react";

export type ContentEditableProps = React.HTMLProps<HTMLDivElement> & {
  onChange?: (value: string) => void;
  as?: React.ElementType;
  editable?: boolean;
  type?: "string" | "number";
};

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
      if (type === "number") {
        const input = e.nativeEvent as InputEvent;
        if (!/^\d$/.test(input.data!)) {
          e.preventDefault();
        }
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
        {...props}
      />
    );
  },
);
