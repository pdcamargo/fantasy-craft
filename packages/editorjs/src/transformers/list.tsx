import { z } from "zod";

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

  const items = block.data.items
    .map((item: string) => `<li>${item}</li>`)
    .join("");

  return `<ul style="list-style:${block.data.style === "ordered" ? "decimal" : "disc"}">${items}</ul>`;
}
