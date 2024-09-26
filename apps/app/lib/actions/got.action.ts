import { z } from "zod";
import { v4 } from "uuid";
import { revalidatePath } from "next/cache";

import { authActionClient } from "./safe-action";
import database from "../prisma";

export const createGotCharacter = authActionClient
  .schema(
    z.object({
      name: z.string().optional(),
    }),
  )
  .metadata({ actionName: "createGotCharacter" })
  .action(async ({ ctx: { user }, parsedInput }) => {
    const world = await database.gotCharacter.create({
      data: {
        publicId: v4(),
        userId: user.id,
        name: parsedInput.name,
      },
    });

    revalidatePath("/got");

    return world;
  });
