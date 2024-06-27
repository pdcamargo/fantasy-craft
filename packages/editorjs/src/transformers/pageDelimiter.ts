import { z } from "zod";

const pageDelimiterSchema = z.object({
  type: z.literal("pageDelimiter"),
  data: z.object({}),
});

type PageDelimiterData = z.infer<typeof pageDelimiterSchema>;

/**
 * Validates the input data as a PageDelimiter block and then returns the HTML string.
 */
export function pageDelimiter(data: PageDelimiterData) {
  pageDelimiterSchema.parse(data);

  // For this specific block type, we don't need to render anything.
  return "";
}
