import { z } from "zod";

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

  return `
    <div 
      class="water-color-wrapper ${block.data.waterColor.position} ${block.data.waterColor.type}"
      style="--water-color-image: url(${block.data.waterColor.url})"
    >
      <div class="water-color-container">
        <div class="water-color-mask">
          <img src="${block.data.file.url}" alt="${block.data.file.caption ?? ""}" />
        </div>
      </div>
    </div>
  `;
}
