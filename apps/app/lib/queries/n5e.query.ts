import { z } from "zod";

import database from "../prisma";
import { createSafeQuery, createSafeQueryWithAuth } from "./safe-query";

export const getN5eCharacters = createSafeQueryWithAuth().query(
  async ({ user }) => {
    const characters = await database.n5eCharacters.findMany({
      where: {
        userId: user.id,
      },
    });

    return characters;
  },
);

export const getN5eCharacter = createSafeQueryWithAuth()
  .schema(z.string())
  .query(async ({ parsedInput, user }) => {
    const character = await database.n5eCharacters.findFirst({
      where: {
        id: +parsedInput,
        userId: user.id,
      },
    });

    return character;
  });
