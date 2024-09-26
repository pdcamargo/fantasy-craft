"use server";

import { z } from "zod";
import { actionClient, authActionClient } from "./safe-action";
import database from "../prisma";
import { v4 } from "uuid";
import { revalidatePath } from "next/cache";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function createSlugOrIncrement(name: string, userId: number) {
  const slug = createSlug(name);
  const existingBook = await database.world.findFirst({
    where: {
      slug,
      userId,
    },
  });

  if (!existingBook) {
    return slug;
  }

  const slugParts = slug.split("-");
  const lastPart = slugParts[slugParts.length - 1];
  const lastPartMatch = lastPart.match(/(\d+)$/);

  if (lastPartMatch) {
    const number = Number.parseInt(lastPartMatch[1]);
    slugParts[slugParts.length - 1] = `${number + 1}`;
  } else {
    slugParts.push("1");
  }

  const newSlug = slugParts.join("-");

  return createSlugOrIncrement(newSlug, userId);
}

export const createWorld = authActionClient
  .schema(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      isPublic: z.boolean().optional(),
    }),
  )
  .metadata({ actionName: "createWorld" })
  .action(async ({ ctx: { user }, parsedInput }) => {
    const world = await database.world.create({
      data: {
        publicId: v4(),
        userId: user.id,
        name: parsedInput.name,
        description: parsedInput.description,
        slug: await createSlugOrIncrement(parsedInput.name, user.id),
        isPublic:
          typeof parsedInput.isPublic === "boolean"
            ? parsedInput.isPublic
            : true,
      },
    });

    revalidatePath("/worlds");

    return world;
  });

export const findWorld = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .metadata({ actionName: "findWorld" })
  .action(async ({ parsedInput }) => {
    const world = await database.world.findFirst({
      where: {
        OR: [
          {
            slug: parsedInput.id,
          },
          {
            publicId: parsedInput.id,
          },
        ],
      },
    });

    return world;
  });

export const findPublicWorld = actionClient
  .schema(
    z.object({
      slug: z.string(),
    }),
  )
  .metadata({ actionName: "findPublicWorld" })
  .action(async ({ parsedInput }) => {
    const world = await database.world.findFirst({
      where: {
        slug: parsedInput.slug,
        isPublic: true,
      },
    });

    return world;
  });

export const updateWorld = authActionClient
  .schema(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
    }),
  )
  .metadata({ actionName: "updateWorld" })
  .action(async ({ ctx: { user }, parsedInput }) => {
    const world = await database.world.update({
      where: {
        publicId: parsedInput.id,
        userId: user.id,
      },
      data: {
        name: parsedInput.name,
        description: parsedInput.description,
      },
    });

    return world;
  });

export const deleteWorld = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .metadata({ actionName: "deleteWorld" })
  .action(async ({ ctx: { user }, parsedInput }) => {
    const world = await database.world.delete({
      where: {
        publicId: parsedInput.id,
        userId: user.id,
      },
    });

    return world;
  });
