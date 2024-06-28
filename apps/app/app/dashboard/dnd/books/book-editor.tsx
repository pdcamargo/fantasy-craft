"use client";

import { Card, CardContent, CardHeader, Editorjs, Loader } from "@craft/ui";

import { BookPreview } from "./preview";
import { useEffect, useState } from "react";

import { WaterColorImage } from "@craft/ui/editorjs/water-color-image";
import { PageDelimiter } from "@craft/ui/editorjs/page-delimiter";
import { BreakColumn } from "@craft/ui/editorjs/break-column";
import { DndSpell } from "@craft/ui/editorjs/dnd-spell";
import { Note } from "@craft/ui/editorjs/note";
import { Lorem } from "@craft/ui/editorjs/inline/lorem";

import { fetcher } from "@craft/query";
import { BlocksType } from "@craft/editorjs";
import { useTranslation } from "@craft/translation";
import { cn } from "@craft/ui/utils";

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
  // inline tool
  lorem: {
    class: () => Lorem,
  },
} as const;

export type BookEditorProps = {
  defaultBlocks?: BlocksType;
  onBlocksChange?: (blocks: BlocksType) => void;
  pageTheme?: string;
};

const BookEditor: React.FC<BookEditorProps> = ({
  defaultBlocks,
  onBlocksChange,
  pageTheme,
}) => {
  const { t } = useTranslation();
  const [mountedTools, setMountedTools] = useState<Record<string, any> | null>(
    null,
  );

  const [blocks, setBlocks] = useState<BlocksType>(defaultBlocks ?? []);

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
    <div className="w-full h-[calc(100vh-65px)] overflow-hidden">
      <div className="w-screen h-[25px] bg-black flex items-start justify-between">
        <div></div>
        <div className="ml-auto text-xs uppercase font-semibold text-gray-400 h-[25px] flex items-center px-2">
          Not saved
        </div>
      </div>
      <Card variant="white">
        <CardContent className="flex flex-row gap-2 px-0 pb-0">
          <div
            className="flex-1 overflow-hidden min-w-[800px] max-w-[800px]"
            style={{
              height: "calc(100vh - 65px - 25px)",
            }}
          >
            <div
              className={cn(
                "w-full overflow-auto pt-5 pr-0 mx-auto flex justify-center",
                {
                  "flex items-center": !mountedTools,
                },
              )}
              style={{
                height: "calc(100vh - 65px)",
              }}
            >
              {!mountedTools && <Loader />}

              {mountedTools && (
                <Editorjs
                  tools={mountedTools}
                  defaultData={{
                    blocks,
                  }}
                  onChange={(data) => {
                    setBlocks(data.blocks);

                    onBlocksChange?.(data.blocks);
                  }}
                  i18n={{
                    messages: {
                      ui: {
                        blockTunes: {
                          toggler: {
                            "Click to tune": t(
                              "EditorJs.ui.blockTunes.toggler.ClickToTune",
                            ),
                            "or drag to move": t(
                              "EditorJs.ui.blockTunes.toggler.OrDragToMove",
                            ),
                          },
                        },
                        inlineToolbar: {
                          converter: {
                            "Convert to": t(
                              "EditorJs.ui.inlineToolbar.converter.ConvertTo",
                            ),
                          },
                        },
                        toolbar: {
                          toolbox: {
                            Add: t("EditorJs.ui.toolbar.toolbox.Add"),
                          },
                        },
                        popover: {
                          Filter: t("EditorJs.ui.popover.Filter"),
                          "Nothing found": t(
                            "EditorJs.ui.popover.NothingFound",
                          ),
                          "Convert to": t("EditorJs.ui.popover.ConvertTo"),
                        },
                      },
                      blockTunes: {
                        delete: {
                          Delete: t("EditorJs.blockTunes.Delete"),
                        },
                        moveUp: {
                          "Move up": t("EditorJs.blockTunes.MoveUp"),
                        },
                        moveDown: {
                          "Move down": t("EditorJs.blockTunes.MoveDown"),
                        },
                        filter: {
                          Filter: "Dsjkdjkasjshjdshj",
                        },
                      },
                      toolNames: {
                        Text: t("EditorJs.toolNames.Text"),
                        Italic: t("EditorJs.toolNames.Italic"),
                        Bold: t("EditorJs.toolNames.Bold"),
                        Link: t("EditorJs.toolNames.Link"),
                        Quote: t("EditorJs.toolNames.Quote"),
                        Heading: t("EditorJs.toolNames.Heading"),
                        Image: t("EditorJs.toolNames.Image"),
                        "Water Color Image": t(
                          "EditorJs.toolNames.WaterColorImage",
                        ),
                        "Page Delimiter": t("EditorJs.toolNames.PageDelimiter"),
                        "Break Column": t("EditorJs.toolNames.BreakColumn"),
                        "Dnd Spell": t("EditorJs.toolNames.DndSpell"),
                        Note: t("EditorJs.toolNames.Note"),
                        Lorem: t("EditorJs.toolNames.Lorem"),
                        List: t("EditorJs.toolNames.List"),
                      },
                      tools: {
                        link: {
                          "Add a link": t("EditorJs.tools.link.AddLink"),
                        },
                        stub: {
                          "The block can not be displayed correctly.": t(
                            "EditorJs.tools.stub.CannotBeDisplayedCorrectly",
                          ),
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          <div
            className="flex-1 bg-[#19274b] shadow-inner overflow-hidden"
            style={{
              height: "calc(100vh - 65px)",
            }}
          >
            <BookPreview blocks={blocks} pageTheme={pageTheme} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { BookEditor };
