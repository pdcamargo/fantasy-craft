import { z } from "zod";

export const blockSchema = z.object({
  type: z.string(),
  // data is generic, so we can't validate it here
  data: z.object({}),
});

export type BlockType = z.infer<typeof blockSchema>;

export const blocksSchema = z.array(blockSchema);

export type BlocksType = z.infer<typeof blocksSchema>;

export type ArgumentType<T> = T extends (arg: infer U) => string ? U : never;
