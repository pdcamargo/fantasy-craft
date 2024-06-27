import { type BlockType, type BlocksType } from "./schemas";

export const groupBlocks = (blocks: BlocksType) => {
  const groupedBlocks: BlockType[][] = [];
  let currentGroup: BlockType[] = [];

  for (const block of blocks) {
    if (block.type === "pageDelimiter") {
      if (currentGroup.length > 0) {
        groupedBlocks.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(block);
    }
  }

  if (currentGroup.length > 0) {
    groupedBlocks.push(currentGroup);
  }

  if (groupedBlocks.length === 0) {
    groupedBlocks.push([]);
  }

  return groupedBlocks;
};
