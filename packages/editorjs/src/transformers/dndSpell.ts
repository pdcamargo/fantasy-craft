import { z } from "zod";
import { dndSpellTemplate } from "./templates";

const dndSpellSchema = z.object({
  type: z.literal("dndSpell"),
  data: z.object({
    name: z.string(),
    type: z.string(),
    attributes: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    ),
    description: z.string(),
  }),
});

type DndSpellData = z.infer<typeof dndSpellSchema>;

/**
 * Validates the input data as a DndSpell block and then returns the HTML string.
 */
export function dndSpell(block: DndSpellData) {
  dndSpellSchema.parse(block);

  return dndSpellTemplate(block.data);
}
