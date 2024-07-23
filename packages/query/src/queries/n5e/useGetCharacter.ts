import {
  UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FetcherResponse, fetcher } from "../../fetcher";
import { N5eCharacter } from "./useAllCharacters";

export const GET_CHARACTER_QUERY_KEY = "getCharacterById";

export type GetCharacterQueryResponse = {
  data: N5eCharacter;
};

type UseGetCharacterQueryOptions = Omit<
  UseQueryOptions<N5eCharacter>,
  "queryFn" | "queryKey"
> & {
  suspense?: boolean;
};

export const useGetCharacter = (
  characterId: string,
  options?: UseGetCharacterQueryOptions,
) => {
  const { suspense, ...rest } = options ?? {};

  const useQueryHook = !!suspense ? useSuspenseQuery : useQuery;

  return useQueryHook({
    queryKey: [GET_CHARACTER_QUERY_KEY, characterId],
    queryFn: async () => {
      const [, { data }] = await fetcher.get<GetCharacterQueryResponse>(
        `/api/n5e/characters/${characterId}`,
      );

      return data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    ...rest,
  });
};
