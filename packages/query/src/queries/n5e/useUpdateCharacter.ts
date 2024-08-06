import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../fetcher";

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
  mastery: z.number().optional().default(0),
  customBonus: z.number().optional(),
  customAbility: z.string().optional().nullable(),
});

const classModSchema = z.object({
  name: z.string(),
  level: z.number(),
});

const jutsuCastingSchema = z.object({
  ability: z.string(),
  customDCBonus: z.number(),
  customAttackBonus: z.number(),
});

enum JutsuTypes {
  Ninjutsu = "ninjutsu",
  Genjutsu = "genjutsu",
  Taijutsu = "taijutsu",
  Bukijutsu = "bukijutsu",
}

const jutsuCastingRecordSchema = z.record(
  z.nativeEnum(JutsuTypes),
  jutsuCastingSchema,
);

const armorClassSchema = z.object({
  ability: z.string(),
  armorBonus: z.number(),
  shieldBonus: z.number(),
  customBonus: z.number(),
});

const proficienciesSchema = z.object({
  armor: z.array(z.string()),
  weapons: z.array(z.string()),
  tools: z.array(z.string()),
  kits: z.array(z.string()),
});

const bulkSchema = z.object({
  customBonus: z.number(),
  customMultiplier: z.number().default(1),
});

const infoSchema = z
  .object({
    background: z.string().nullable(),
    height: z.string().nullable(),
    weight: z.string().nullable(),
    size: z.string().nullable(),
    gender: z.string().nullable(),
    eyes: z.string().nullable(),
    hair: z.string().nullable(),
    skin: z.string().nullable(),
    village: z.string().nullable(),
    rank: z.string().nullable(),
    isAnbu: z.boolean().nullable(),
    isNukenin: z.boolean().nullable(),
    titles: z.array(z.string()).nullable(),
    age: z.union([z.string(), z.number()]).nullable(),
  })
  .default({
    background: "",
    height: "",
    weight: "",
    size: "",
    age: "",
    eyes: "",
    gender: "",
    hair: "",
    isAnbu: false,
    isNukenin: false,
    rank: "",
    skin: "",
    titles: [],
    village: "",
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
  currentHp: z.number().optional(),
  currentCp: z.number().optional(),
  temporaryHp: z.number().optional(),
  temporaryCp: z.number().optional(),
  jutsuCasting: jutsuCastingRecordSchema.optional(),
  armorClass: armorClassSchema.optional(),
  proficiencies: proficienciesSchema.optional(),
  bulk: bulkSchema.optional(),
  info: infoSchema.optional(),
});

export type UpdateCharacterData = z.infer<typeof updateCharacterSchema>;

export type UpdateCharacterMutationResponse = {
  message: string;
};

export const updateCharacterFunction = async (
  characterId: string,
  data: UpdateCharacterData,
) => {
  try {
    const finalData = updateCharacterSchema.parse(data);

    const [response, result] =
      await fetcher.put<UpdateCharacterMutationResponse>(
        `/api/n5e/characters/${characterId}`,
        finalData,
      );

    return result;
  } catch (e) {
    // @ts-expect-error -- TS has bad types for exception
    console.error(e.message);
  }
};
export const useUpdateCharacter = (characterId: string) => {
  return useMutation({
    mutationFn: async (data: UpdateCharacterData) => {
      return updateCharacterFunction(characterId, data);
    },
  });
};
