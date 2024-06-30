import { WaterColorImage } from "@craft/ui/editorjs/water-color-image";
import { PageDelimiter } from "@craft/ui/editorjs/page-delimiter";
import { BreakColumn } from "@craft/ui/editorjs/break-column";
import { DndSpell } from "@craft/ui/editorjs/dnd-spell";
import { Note } from "@craft/ui/editorjs/note";
import { FrontCover } from "@craft/ui/editorjs/front-cover";
import { Lorem } from "@craft/ui/editorjs/inline/lorem";

import { fetcher } from "@craft/query";

export const asyncEditorTools = {
  paragraph: {
    class: () => import("@editorjs/paragraph").then((mod) => mod.default),
    inlineToolbar: true,
  },
  header: {
    class: () => import("@editorjs/header").then((mod) => mod.default),
    inlineToolbar: true,
  },
  list: {
    class: () => import("@editorjs/list").then((mod) => mod.default),
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
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
  breakColumn: {
    class: () => BreakColumn,
    shortcut: "CTRL+SHIFT+ENTER",
  },
  dndSpell: {
    class: () => DndSpell,
    inlineToolbar: true,
  },
  note: {
    class: () => Note,
  },
  frontCover: {
    class: () => FrontCover,
  },
  // inline tool
  lorem: {
    class: () => Lorem,
  },
} as const;
