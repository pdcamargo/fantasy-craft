import { z } from "zod";

const quoteSchema = z.object({
  type: z.literal("quote"),
  data: z.object({
    text: z.string(),
    caption: z.string().optional(),
    alignment: z.enum(["left", "center", "right"]),
  }),
});

type QuoteData = z.infer<typeof quoteSchema>;

/**
 * Validates the input data as a Quote block and then returns the HTML string.
 */
export function quote(block: QuoteData) {
  quoteSchema.parse(block);

  return `
  <blockquote class="${block.data.alignment}">
    ${block.data.text}

    ${
      block.data.caption
        ? `<footer class="attribution">${block.data.caption}</footer>`
        : ""
    }
  </blockquote>`;
}
