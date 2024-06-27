import { z } from "zod";
import { parseMarkdown } from "../markdown";

const noteSchema = z.object({
  type: z.literal("note"),
  data: z.object({
    md: z.string(),
  }),
});

type NoteData = z.infer<typeof noteSchema>;

/**
 * Validates the input data as a Note block and then returns the HTML string.
 */
export function note(block: NoteData) {
  noteSchema.parse(block);

  return `
    <div class="note">
      ${parseMarkdown(block.data.md)}
    </div>
  `;
}
