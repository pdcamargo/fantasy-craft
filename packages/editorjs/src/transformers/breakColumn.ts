import { z } from "zod";

const breakColumnSchema = z.object({
  type: z.literal("breakColumn"),
  data: z.object({}),
});

type BreakColumnData = z.infer<typeof breakColumnSchema>;

/**
 * Validates the input data as a BreakColumn block and then returns the HTML string.
 */
export function breakColumn(data: BreakColumnData) {
  breakColumnSchema.parse(data);

  return `<div class="break-column"></div>`;
}
