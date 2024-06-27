import { marked } from "marked";

import * as divExtension from "./div.md";

const md = marked;

md.use({
  extensions: [divExtension.tokenizer, divExtension.renderer],
});

md.setOptions({
  async: false,
  gfm: true,
});

export const parseMarkdown = (markdown: string) => {
  return md(markdown) as string;
};
