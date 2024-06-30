import { z } from "zod";
import { listTemplate } from "./templates";

const listSchema = z.object({
  type: z.literal("list"),
  data: z.object({
    style: z.enum(["ordered", "unordered"]),
    items: z.array(z.string()),
  }),
});

type ListData = z.infer<typeof listSchema>;

/**
 * Validates the input data as a List block and then returns the HTML string.
 */
export function list(block: ListData) {
  listSchema.parse(block);

  return listTemplate(block.data);
}
