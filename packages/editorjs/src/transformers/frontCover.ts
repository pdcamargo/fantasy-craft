import { z } from "zod";
import { frontCoverTemplate } from "./templates";

const frontCoverSchema = z.object({
  type: z.literal("frontCover"),
  data: z.object({
    title: z.string(),
    subtitle: z.string(),
    bannerText: z.string(),
    footNote: z.string(),
    background: z.object({
      url: z.string(),
      caption: z.string().nullable(),
    }),
    logo: z.object({
      url: z.string().nullable(),
      caption: z.string().nullable(),
    }),
    md: z.string().nullable().optional(),
  }),
});

type FrontCoverData = z.infer<typeof frontCoverSchema>;

/**
 * Validates the input data as a FrontCover block and then returns the HTML string.
 */
export function frontCover(block: FrontCoverData) {
  frontCoverSchema.parse(block);

  return frontCoverTemplate(block.data);
}
