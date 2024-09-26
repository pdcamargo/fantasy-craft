import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import database from "../prisma";

export const actionClient = createSafeActionClient({
  handleReturnedServerError(error) {
    if (error instanceof Error) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  if (process.env.NODE_ENV === "development") {
    console.log("LOGGING MIDDLEWARE");
  }

  // Here we await the action execution.
  const result = await next({ ctx: undefined });

  if (process.env.NODE_ENV === "development") {
    console.log("Result ->", result);
    console.log("Client input ->", clientInput);
    console.log("Metadata ->", metadata);
  }

  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Session not found!");
    }

    if (!session.user || !session.user.email) {
      throw new Error("User not found in session!");
    }

    const user = await database.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found in database!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { user } });
  });
