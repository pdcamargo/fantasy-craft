"use client";

import { ScrollArea } from "@craft/ui";
import { useEffect, useRef } from "react";

import { cn } from "@craft/ui/utils";

const blocksToHtml = (blocks: any[]) => {
  return blocks
    .map((block) => {
      if (block.type === "header") {
        return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
      }

      if (block.type === "paragraph") {
        return `<p>${block.data.text}</p>`;
      }

      if (block.type === "list") {
        const items = block.data.items.map(
          (item: string) => `<li>${item}</li>`,
        );

        return `<ul style="list-style:${block.data.style === "ordered" ? "decimal" : "disc"}">${items.join("")}</ul>`;
      }

      if (block.type === "image") {
        return `<img src="${block.data.file.url}" alt="${block.data.caption}" />`;
      }

      if (block.type === "quote") {
        console.log(block.data);
        const style = cn({
          "text-align:center": block.data.alignment === "center",
          "text-align:right": block.data.alignment === "right",
          "text-align:left": block.data.alignment === "left",
        })
          .split(" ")
          .join(";");

        return `
        <blockquote style="${style}">
          ${block.data.text}

          ${
            block.data.caption
              ? `<footer class="attribution">${block.data.caption}</footer>`
              : ""
          }
        </blockquote>`;
      }

      if (block.type === "waterColorImage") {
        return `
        <div class="water-color-wrapper  ${block.data.waterColor.position} ${block.data.waterColor.type}" style="--water-color-image: url(${block.data.waterColor.url});">
          <div class="water-color-container">
            <div class="water-color-mask">
              <img src="${block.data.file.url}" alt="${block.data.file.caption}" />
            </div>
          </div>
        </div>
        `;
      }

      if (block.type === "dndSpell") {
        return `
          <div class="dnd-spell">
            <h4 class="dnd-spell-name">${block.data.name}</h4>
            <p class="dnd-spell-type">${block.data.type}</p>
            <div class="dnd-spell-attributes">
              ${block.data.attributes
                .map((attr: { name: string; value: string }) =>
                  attr.name && attr.value
                    ? `
                    <div class="dnd-spell-attributes-attr">
                      <strong>${attr.name}</strong>: ${attr.value}
                    </div>
                  `
                    : "",
                )
                .join("")}
            </div>
            <pre class="dnd-spell-description">${block.data.description}</pre>
          </div>
        `;
      }

      return "";
    })
    .join("");
};

type BookPreviewProps = {
  blocks: Block[];
};

type Block = {
  type: string;
  data: any;
};

function groupBlocksByDelimiter(blocks: Block[]): Block[][] {
  const pages: Block[][] = [];
  let currentPage: Block[] = [];

  for (const block of blocks) {
    if (block.type === "pageDelimiter") {
      if (currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
      }
    } else {
      currentPage.push(block);
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  if (pages.length === 0) {
    pages.push([]);
  }

  return pages;
}

const BookPreview: React.FC<BookPreviewProps> = ({ blocks }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const pages = groupBlocksByDelimiter(blocks);

  console.log(blocks);

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
      <ScrollArea className="xanathar">
        {pages.map((blocks, idx) => (
          <div
            key={idx}
            className="page mx-auto"
            style={{
              zoom: "var(--scale)",
              marginBlock: "40px",
            }}
            dangerouslySetInnerHTML={{
              __html: blocksToHtml(blocks),
            }}
          ></div>
        ))}
      </ScrollArea>
    </div>
  );
};

export { BookPreview };
