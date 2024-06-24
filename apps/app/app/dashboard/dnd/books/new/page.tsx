"use client";

import { Card, CardContent, Editorjs } from "@craft/ui";

import { BookPreview } from "./preview";
import { useEffect, useState } from "react";

import { WaterColorImage } from "@craft/ui/editorjs/water-color-image";
import { PageDelimiter } from "@craft/ui/editorjs/page-delimiter";
import { DndSpell } from "@craft/ui/editorjs/dnd-spell";

import { fetcher } from "@craft/query";

const asyncTools = {
  list: {
    class: () => import("@editorjs/list").then((mod) => mod.default),
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  paragraph: {
    class: () => import("@editorjs/paragraph").then((mod) => mod.default),
    inlineToolbar: true,
  },
  header: {
    class: () => import("@editorjs/header").then((mod) => mod.default),
    inlineToolbar: true,
  },
  quote: {
    class: () => import("@editorjs/quote").then((mod) => mod.default),
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  image: {
    class: () => import("@editorjs/image").then((mod) => mod.default),
    config: {
      uploader: {
        async uploadByFile(file: File) {
          const formData = new FormData();
          formData.append("image", file);

          const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          console.log(data);

          return {
            success: true,
            file: {
              url: data.link,
            },
          };
        },
        async uploadByUrl(url: string) {
          const formData = new FormData();
          formData.append("image", url);

          const [_, result] = await fetcher.post<{ link: string }>(
            "/api/upload",
            formData,
          );

          return {
            success: true,
            file: {
              url: result.link,
            },
          };
        },
      },
    },
  },
  waterColorImage: {
    class: () => WaterColorImage,
  },
  pageDelimiter: {
    class: () => PageDelimiter,
    shortcut: "CTRL+ENTER",
  },
  dndSpell: {
    class: () => DndSpell,
    inlineToolbar: true,
  },
} as const;

export default function DndBooksNewPage() {
  const [mountedTools, setMountedTools] = useState<Record<string, any> | null>(
    null,
  );

  const [blocks, setBlocks] = useState<any[]>([
    {
      id: "POFmKpunuD",
      type: "waterColorImage",
      data: {
        file: { url: "https://i.imgur.com/GZfjDWV.png", caption: "" },
        waterColor: {
          url: "/api/images/water-color/top/0001.webp",
          type: "edge",
          position: "top",
        },
      },
    },
    {
      id: "POFmKpunuD2",
      type: "header",
      data: {
        text: "Chapter 1",
        level: 1,
      },
    },
    {
      id: "POFmKpunuD3",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD4",
      type: "pageDelimiter",
      data: {},
    },
    {
      id: "POFmKpunuD5",
      type: "header",
      data: {
        text: "Chapter 2",
        level: 1,
      },
    },
    {
      id: "POFmKpunuD6",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD4@6",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD7",
      type: "header",
      data: {
        text: "Lorem 1",
        level: 2,
      },
    },
    {
      id: "POFmKpunuD2226",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD8",
      type: "header",
      data: {
        text: "Lorem 2",
        level: 3,
      },
    },
    {
      id: "POFmKpunuD33236",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD98",
      type: "header",
      data: {
        text: "Lorem 3",
        level: 4,
      },
    },
    {
      id: "POFmKpunuDfsdfsd6",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD99",
      type: "header",
      data: {
        text: "Lorem 4",
        level: 5,
      },
    },
    {
      id: "POFmK2342341212punuD6",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
    {
      id: "POFmKpunuD101",
      type: "header",
      data: {
        text: "Lorem 5",
        level: 6,
      },
    },
    {
      id: "POFmKp22342342323234234unuD6",
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et elit luctus gravida. Integer id odio in quam mollis consectetur",
      },
    },
  ]);

  useEffect(() => {
    async function mount() {
      const result: Record<string, any> = {};

      const tools = Object.entries(asyncTools);

      for (const [toolName, config] of tools) {
        result[toolName] = {
          ...config,
          class: await config.class(),
        };
      }

      setMountedTools(result);
    }

    mount();
  }, []);

  return (
    <Card variant="white">
      <CardContent className="flex flex-row gap-2 px-0 pb-0">
        <div
          className="flex-1 overflow-hidden min-w-[800px] max-w-[850px]"
          style={{
            height: "calc(100vh - 65px)",
          }}
        >
          <div
            className="w-full overflow-auto pt-5"
            style={{
              height: "calc(100vh - 65px)",
            }}
          >
            {mountedTools && (
              <Editorjs
                tools={mountedTools}
                defaultData={{
                  blocks,
                }}
                onChange={(data) => {
                  setBlocks(data.blocks);
                }}
              />
            )}
          </div>
        </div>

        <div
          className="flex-1 bg-[#17191e] shadow-inner overflow-hidden"
          style={{
            height: "calc(100vh - 65px)",
          }}
        >
          <BookPreview blocks={blocks} />
        </div>
      </CardContent>
    </Card>
  );
}
