import { z } from "zod";
import { textToAnchorId } from "../utils";
import { headingTemplate } from "./templates";

const headerSchema = z.object({
  type: z.literal("header"),
  data: z.object({
    text: z.string(),
    level: z.number().int().min(1).max(6),
  }),
});

type HeaderData = z.infer<typeof headerSchema>;

/**
 * Validates the input data as a Header block and then returns the HTML string.
 */
export function header(block: HeaderData) {
  headerSchema.parse(block);

  return headingTemplate(block.data);
}
