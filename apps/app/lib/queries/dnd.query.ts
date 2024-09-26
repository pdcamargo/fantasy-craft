import { z } from "zod";
import database from "../prisma";
import { createSafeQuery, createSafeQueryWithAuth } from "./safe-query";

export const getDndbooks = createSafeQueryWithAuth().query(async ({ user }) => {
  const books = await database.book.findMany({
    where: {
      userId: user.id,
    },
  });

  return books;
});

export const getDndBook = createSafeQueryWithAuth()
  .schema(z.string())
  .query(async ({ parsedInput, user }) => {
    const book = await database.book.findFirst({
      where: {
        id: +parsedInput,
        userId: user.id,
      },
    });

    return book;
  });
