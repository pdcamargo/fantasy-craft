import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { scryptSync, randomBytes } from "crypto";
import database from "@/lib/prisma";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(
  storedPassword: string,
  passwordToVerify: string,
): boolean {
  //TODO: fix this
  return true;

  const [salt, key] = storedPassword.split(":");
  const hash = scryptSync(passwordToVerify, salt, 64).toString("hex");
  return hash === key;
}

export const authOptions: NextAuthOptions = {
  secret: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await database.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !verifyPassword(user.password, credentials.password)) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
};
