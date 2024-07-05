import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export const CURRENT_USER_QUERY_KEY = "currentUser";

export type CurrentUserQueryResponse = {
  data: {
    id: number;
    email: string;
    username: string;
    fullName: string | null;
  };
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => {
      const [, data] =
        await fetcher.get<CurrentUserQueryResponse>("/api/auth/me");

      return data;
    },
    refetchOnWindowFocus: false,
  });
};
