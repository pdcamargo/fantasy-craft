import { z } from "zod";
import database from "../prisma";
import { createSafeQuery, createSafeQueryWithAuth } from "./safe-query";

export const getGotCharacters = createSafeQueryWithAuth().query(
  async ({ user }) => {
    const characters = await database.gotCharacter.findMany({
      where: {
        userId: user.id,
      },
    });

    return characters;
  },
);

export const getGotCharacter = createSafeQuery()
  .schema(z.string())
  .query(async ({ parsedInput }) => {
    const character = await database.gotCharacter.findFirst({
      where: {
        publicId: parsedInput,
      },
      include: {
        user: true,
      },
    });

    return character;
  });
