import { z } from "zod";

const headerSchema = z.object({
  type: z.literal("header"),
  data: z.object({
    text: z.string(),
    level: z.number().int().min(1).max(6),
  }),
});

type HeaderData = z.infer<typeof headerSchema>;

const headerTextToAnchorId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Validates the input data as a Header block and then returns the HTML string.
 */
export function header(block: HeaderData) {
  headerSchema.parse(block);

  const anchorId = headerTextToAnchorId(block.data.text);

  return `<h${block.data.level} id="${anchorId}">${block.data.text}</h${block.data.level}>`;
}
