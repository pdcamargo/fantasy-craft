"use client";

import { getCurrentToken } from "./useAuthToken";

export const useIsUserLoggedIn = () => {
  return getCurrentToken() !== null;
};
