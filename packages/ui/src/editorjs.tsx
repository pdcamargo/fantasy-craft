"use client";

import {
  I18nConfig,
  OutputData,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";

export type EditorjsProps = {
  tools?: Record<string, ToolConstructable | ToolSettings>;
  placeholder?: string;
  onChange?: (data: OutputData) => void;
  defaultData?: OutputData;
  i18n?: I18nConfig;
};

export const Editorjs: React.FC<EditorjsProps> = ({
  tools = {},
  onChange,
  placeholder = "Type something...",
  defaultData,
  i18n,
}: EditorjsProps) => {
  return (
    <div
      className="prose"
      ref={(holder) => {
        if (holder && !holder.hasChildNodes() && window) {
          import("@editorjs/editorjs")
            .then((mod) => mod.default)
            .then((EditorJS) => {
              const editor = new EditorJS({
                holder,
                tools,
                placeholder,
                data: defaultData,
                onChange: () => {
                  editor.save().then(onChange);
                },
                i18n,
              });
            });
        }
      }}
    />
  );
};
