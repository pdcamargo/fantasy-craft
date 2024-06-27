import { z } from "zod";

const imageSchema = z.object({
  type: z.literal("image"),
  data: z.object({
    file: z.object({
      url: z.string(),
    }),
    caption: z.string().optional(),
  }),
});

type ImageData = z.infer<typeof imageSchema>;

/**
 * Validates the input data as a Image block and then returns the HTML string.
 */
export function image(block: ImageData) {
  imageSchema.parse(block);

  return `<img src="${block.data.file.url}" alt="${block.data.caption ?? ""}" />`;
}
