import { z } from "zod";

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  data: z.object({
    text: z.string().optional(),
  }),
});

type ParagraphData = z.infer<typeof paragraphSchema>;

/**
 * Validates the input data as a Paragraph block and then returns the HTML string.
 */
export function paragraph(block: ParagraphData) {
  paragraphSchema.parse(block);

  return `<p>${block.data.text ?? ""}</p>`;
}
