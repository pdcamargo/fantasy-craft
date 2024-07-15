import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../../fetcher";
import { GET_CHARACTER_QUERY_KEY } from "./useGetCharacter";
import { ALL_CHARACTERS_QUERY_KEY } from "./useAllCharacters";

const classSchema = z.object({
  name: z.string(),
  hitDie: z.number(),
  chakraDie: z.number(),
  level: z.number(),
  subclass: z.string().optional().nullable(),
});

const abilitiesSchema = z.record(
  z.object({
    value: z.number(),
    customBonus: z.number().optional(),
  }),
);

const savingThrowSchema = z.record(
  z.object({
    customBonus: z.number().optional(),
    isProficient: z.boolean(),
  }),
);

const skillSchema = z.object({
  name: z.string(),
  isProficient: z.boolean(),
  customBonus: z.number().optional(),
  customAbility: z.string().optional().nullable(),
});

const classModSchema = z.object({
  name: z.string(),
  level: z.number(),
});

export const updateCharacterSchema = z.object({
  name: z.string().optional().nullable(),
  clan: z.string().optional().nullable(),
  background: z.string().optional().nullable(),
  level: z.number().optional().nullable(),
  classes: z.array(classSchema).optional(),
  classMod: classModSchema.optional().nullable(),
  abilities: abilitiesSchema.optional(),
  savingThrows: savingThrowSchema.optional(),
  skills: z.array(skillSchema).optional(),
  elementalAffinities: z.array(z.string()).optional(),
  jutsus: z.array(z.string()).optional(),
  feats: z.array(z.string()).optional(),
});

export type UpdateCharacterData = z.infer<typeof updateCharacterSchema>;

export type UpdateCharacterMutationResponse = {
  message: string;
};

export const updateCharacterFunction = async (
  characterId: string,
  data: UpdateCharacterData,
  options: { queryClient: ReturnType<typeof useQueryClient> },
) => {
  const finalData = updateCharacterSchema.parse(data);

  const [response, result] = await fetcher.put<UpdateCharacterMutationResponse>(
    `/api/n5e/characters/${characterId}`,
    finalData,
  );

  if (response.ok) {
    options.queryClient.invalidateQueries({
      queryKey: [characterId],
    });

    options.queryClient.invalidateQueries({
      queryKey: [ALL_CHARACTERS_QUERY_KEY],
    });
  }

  return result;
};
export const useUpdateCharacter = (characterId: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCharacterData) => {
      return updateCharacterFunction(characterId, data, {
        queryClient: client,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [GET_CHARACTER_QUERY_KEY, characterId],
      });

      client.invalidateQueries({
        queryKey: [ALL_CHARACTERS_QUERY_KEY],
      });
    },
  });
};
