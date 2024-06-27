import { z } from "zod";

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

  return `
    <div class="dnd-spell">
      <h4 class="dnd-spell-name">${block.data.name}</h4>
      <p class="dnd-spell-type">${block.data.type}</p>
      <div class="dnd-spell-attributes">
        ${block.data.attributes
          .map((attr: { name: string; value: string }) =>
            attr.name && attr.value
              ? `
              <div class="dnd-spell-attributes-attr">
                <strong>${attr.name}</strong>: ${attr.value}
              </div>
            `
              : "",
          )
          .join("")}
      </div>
      <pre class="dnd-spell-description">${block.data.description}</pre>
    </div>
  `;
}
