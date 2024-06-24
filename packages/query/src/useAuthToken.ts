"use client";

import { z } from "zod";

export const TOKEN_KEY = "oat";
export const TOKEN_EXPIRES_AT_KEY = "oat_expires_at";
export const TOKEN_NAME_KEY = "oat_name";
export const TOKEN_ABILITIES_KEY = "oat_abilities";

const tokenSchema = z.object({
  token: z.string(),
  expiresAt: z.string().refine((value) => {
    const date = new Date(value);

    return date.toISOString() === value;
  }),
  name: z.string().nullable(),
  abilities: z.array(z.string()).min(1),
});

export type TokenType = z.infer<typeof tokenSchema>;

export const setAuthToken = (
  token: {
    token: string;
    expiresAt: string;
    name: string;
    abilities: string[];
  } | null,
) => {
  if (token === null) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
    window.localStorage.removeItem(TOKEN_NAME_KEY);
    window.localStorage.removeItem(TOKEN_ABILITIES_KEY);

    return;
  }

  tokenSchema.parse(token);

  window.localStorage.setItem(TOKEN_KEY, token.token);
  window.localStorage.setItem(TOKEN_EXPIRES_AT_KEY, token.expiresAt);
  window.localStorage.setItem(TOKEN_NAME_KEY, token.name);
  window.localStorage.setItem(
    TOKEN_ABILITIES_KEY,
    JSON.stringify(token.abilities),
  );
};

export const getCurrentToken = () => {
  if (typeof window === "undefined") {
    return {
      token: "",
      expiresAt: "",
      name: "",
      abilities: [],
    };
  }

  const token = window.localStorage.getItem(TOKEN_KEY);
  const expiresAt = window.localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
  const name = window.localStorage.getItem(TOKEN_NAME_KEY);
  const abilities = JSON.parse(
    window.localStorage.getItem(TOKEN_ABILITIES_KEY) ?? "[]",
  );

  try {
    const res = tokenSchema.parse({
      token,
      expiresAt,
      name,
      abilities,
    });

    const isExpired = new Date(res.expiresAt) < new Date();

    if (isExpired) {
      setAuthToken(null);

      return null;
    }

    return res;
  } catch {
    return null;
  }
};

export const useAuthToken = () => {
  const token = getCurrentToken();

  return [token, setAuthToken] as const;
};
