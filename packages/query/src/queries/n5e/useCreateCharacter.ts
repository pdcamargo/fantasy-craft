import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetcher } from "../../fetcher";
import { ALL_CHARACTERS_QUERY_KEY } from "./useAllCharacters";

export const createCharacterSchema = z.object({
  name: z.string().optional().nullable(),
});

export type CreateCharacterData = z.infer<typeof createCharacterSchema>;

export type CreateCharacterMutationResponse = {
  message: string;
  data: {
    id: string;
  };
};

export const createCharacterFunction = async (
  data: CreateCharacterData,
  options: { queryClient: ReturnType<typeof useQueryClient> },
) => {
  const finalData = createCharacterSchema.parse(data);

  const [response, result] =
    await fetcher.post<CreateCharacterMutationResponse>(
      `/api/n5e/characters`,
      finalData,
    );

  if (response.ok) {
    options.queryClient.invalidateQueries({
      queryKey: [ALL_CHARACTERS_QUERY_KEY],
    });
  }

  return result;
};
export const useCreateCharacter = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data?: CreateCharacterData) => {
      return createCharacterFunction(data || {}, {
        queryClient: client,
      });
    },
  });
};
