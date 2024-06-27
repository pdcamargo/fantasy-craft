import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { produce } from "immer";

export type NoteComponentData = {
  md: string;
};

export type NoteComponentProps = {
  initialData?: NoteComponentData;
};

export type NoteComponentRef = {
  save: () => NoteComponentData;
};

export const NoteComponent = forwardRef<NoteComponentRef, NoteComponentProps>(
  ({ initialData }, ref) => {
    const [data, setData] = useState<NoteComponentData>(
      initialData ?? { md: "" },
    );

    const save = useCallback(() => {
      return data;
    }, [data]);

    useImperativeHandle(ref, () => ({ save }));

    const handleEditorMount = (editor: any, monaco: Monaco) => {
      monaco.languages.registerCompletionItemProvider("markdown", {
        provideCompletionItems: function (model, position, context, token) {
          const textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          const classMatch = textUntilPosition.match(
            /(?:^|\s)(\.\w+(?:\.\w+)*)$/,
          );
          if (classMatch) {
            return {
              suggestions: [
                {
                  label: "Simple insertion",
                  kind: monaco.languages.CompletionItemKind.Text,
                  insertText: "Simple test",
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column - classMatch[0].length,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
            };
          }

          const matches = textUntilPosition.match(/\bh[1-6]\b$/);
          if (matches) {
            const headerLevel = parseInt(matches[0][1]); // Extracts the number from h1, h2, etc.
            const hashTags = Array(headerLevel + 1).join("#"); // Creates a string of # corresponding to the header level

            return {
              suggestions: [
                {
                  label: matches[0],
                  kind: monaco.languages.CompletionItemKind.Snippet,
                  insertText: `${hashTags} $0`,
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
                  documentation: `Insert Markdown heading level ${headerLevel}`,
                  detail: `Markdown heading level ${headerLevel} template`,
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column - matches[0].length,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
            };
          }

          const divMatch = textUntilPosition.match(/\bdiv\b$/);
          if (divMatch) {
            return {
              suggestions: [
                {
                  label: "div",
                  kind: monaco.languages.CompletionItemKind.Snippet,
                  insertText: `:::\n$0\n:::`,
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet,
                  documentation: "Insert div-like block",
                  detail: "div-like block template",
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column - divMatch[0].length,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
            };
          }

          return {
            suggestions: [],
          };
        },
      });
    };

    return (
      <div className="note-component">
        <Editor
          height="200px"
          language="markdown"
          value={data.md}
          onMount={handleEditorMount}
          options={{
            minimap: {
              enabled: false,
            },
            autoIndent: "full",
            formatOnPaste: true,
            tabSize: 2,
            lineNumbers: "off",
            acceptSuggestionOnEnter: "on",
            inlineSuggest: { enabled: true },
          }}
          theme="vs-dark"
          onChange={(value) =>
            setData(
              produce((draft) => {
                draft.md = value ?? "";
              }),
            )
          }
        />
      </div>
    );
  },
);
