import { type BlocksType, blocksSchema } from "./schemas";

import { groupBlocks } from "./group-blocks";

import * as blockHTMLTransformer from "./transformers";

const blocksToHTML = (blocks: BlocksType) => {
  blocksSchema.parse(blocks);

  const groupedBlocks = groupBlocks(blocks);

  return groupedBlocks.map((blocks) => {
    return blocks
      .map((block) => {
        const transformer =
          blockHTMLTransformer[block.type as keyof typeof blockHTMLTransformer];

        if (!transformer) {
          return "";
        }

        return transformer(block as any);
      })
      .join("");
  });
};

const blocksHTMLToPageHTML = (
  blocksHTML: string[],
  marginBlock = "0",
  options: {
    className?: string;
  } = {},
) => {
  return `
    ${blocksHTML
      .map(
        (html) => `
          <div class="${`page mx-auto ${options?.className}`.trim()}" style="zoom: var(--scale); margin-block: ${marginBlock};">
            ${html}
          </div>
        `,
      )
      .join("")}
  `;
};

export {
  blockHTMLTransformer,
  blocksToHTML,
  blocksHTMLToPageHTML,
  type BlocksType,
};
