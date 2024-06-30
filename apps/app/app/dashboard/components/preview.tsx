"use client";

import { ScrollArea } from "@craft/ui";
import { useEffect, useRef } from "react";

import { cn } from "@craft/ui/utils";
import {
  BlocksType,
  blocksHTMLToPageHTML,
  blocksToHTML,
} from "@craft/editorjs";

type BookPreviewProps = {
  blocks: BlocksType;
  pageTheme?: string;
};

const BookPreview: React.FC<BookPreviewProps> = ({ blocks, pageTheme }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const groups = blocksToHTML(blocks);
  const pagesHTML = blocksHTMLToPageHTML(groups, "40px", {
    className: "shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]",
  });

  useEffect(() => {
    const resizePreview = () => {
      const container = containerRef.current!;
      const a4Pages = container.querySelectorAll(".page");

      if (!a4Pages.length) return;

      const containerWidth = container.clientWidth * 0.9;
      const a4Width = a4Pages[0].clientWidth;

      let scale = containerWidth / a4Width;
      scale = Math.min(scale, 1.25); // Ensure scale does not exceed 1

      container.style.setProperty("--scale", scale.toString());
    };

    resizePreview();

    window.addEventListener("resize", resizePreview);

    return () => {
      window.removeEventListener("resize", resizePreview);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[inherit] overflow-hidden overflow-y-auto flex flex-col"
    >
      <ScrollArea className={cn(pageTheme)}>
        <div
          dangerouslySetInnerHTML={{
            __html: pagesHTML,
          }}
        />
      </ScrollArea>
    </div>
  );
};

export { BookPreview };
