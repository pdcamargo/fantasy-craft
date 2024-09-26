import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import database from "../prisma";
import { z, ZodSchema } from "zod";
import { User } from "@prisma/client";

export const getSession = async () => {
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

  return { session, user };
};

abstract class QueryWithSchema<T> {
  _schema!: ZodSchema<T>;

  public schema<R>(schema: ZodSchema<R>) {
    this._schema = schema as any;

    return this as unknown as QueryWithSchema<R>;
  }

  public abstract query<R>(
    query: (opt: { parsedInput: z.infer<ZodSchema<T>> }) => Promise<R>,
  ): (input: z.infer<ZodSchema<T>>) => Promise<R>;
}

class SafeQueryWithAuth<T> extends QueryWithSchema<T> {
  // middleware uses next to approve or reject the request
  _middlewares: Array<
    (opt: {
      user: User;
      parsedInput: z.infer<ZodSchema<T>>;
      next: () => void;
    }) => Promise<void>
  > = [];

  public use(
    middleware: (opt: {
      user: User;
      parsedInput: z.infer<ZodSchema<T>>;
      next: () => void;
    }) => Promise<void>,
  ) {
    this._middlewares.push(middleware);
    return this;
  }

  private async _runMiddlewares(
    user: User,
    parsedInput: z.infer<ZodSchema<T>>,
  ) {
    let nextIndex = 0;

    const next = async () => {
      const currentMiddleware = this._middlewares[nextIndex];

      nextIndex++;

      if (currentMiddleware) {
        await currentMiddleware({ user, parsedInput, next });
      }
    };

    await next();
  }

  public query<R>(
    query: (opt: {
      user: User;
      parsedInput: z.infer<ZodSchema<T>>;
    }) => Promise<R>,
  ) {
    return async (input?: z.infer<ZodSchema<T>>) => {
      const { user } = await getSession();

      const parsedInput = this._schema.parse(input);

      await this._runMiddlewares(user, parsedInput);

      return query({ user, parsedInput });
    };
  }
}

class SafeQuery<T> extends QueryWithSchema<T> {
  public query<R>(
    query: (opt: { parsedInput: z.infer<ZodSchema<T>> }) => Promise<R>,
  ) {
    return async (input?: z.infer<ZodSchema<T>>) => {
      const parsedInput = this._schema.parse(input);

      return query({
        parsedInput,
      });
    };
  }
}

export const createSafeQuery = <T>() => new SafeQuery<T>();
export const createSafeQueryWithAuth = <T>() => new SafeQueryWithAuth<T>();
