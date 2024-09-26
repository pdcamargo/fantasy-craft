import { z } from "zod";
import database from "../prisma";
import { createSafeQuery, createSafeQueryWithAuth } from "./safe-query";

export const getWorlds = createSafeQueryWithAuth().query(async ({ user }) => {
  const worlds = await database.world.findMany({
    where: {
      userId: user.id,
    },
  });

  return worlds;
});

export const getWorld = createSafeQuery()
  .schema(z.string())
  .query(async ({ parsedInput }) => {
    const world = await database.world.findFirst({
      where: {
        slug: parsedInput,
        // TODO: add back
        // is_public: true,
      },
      include: {
        characters: true,
        organizations: true,
        user: true,
      },
    });

    return world;
  });
