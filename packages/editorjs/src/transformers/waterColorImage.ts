import { z } from "zod";
import { waterColorImageTemplate } from "./templates";

const waterColorImageSchema = z.object({
  type: z.literal("waterColorImage"),
  data: z.object({
    file: z.object({
      url: z.string(),
      caption: z.string().nullable().optional(),
    }),
    waterColor: z.object({
      url: z.string(),
      position: z.enum([
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ]),
      type: z.enum(["edge", "corner", "center"]),
    }),
  }),
});

type WaterColorImageData = z.infer<typeof waterColorImageSchema>;

/**
 * Validates the input data as a WaterColorImage block and then returns the HTML string.
 */
export function waterColorImage(block: WaterColorImageData) {
  waterColorImageSchema.parse(block);

  return waterColorImageTemplate(block.data);
}
