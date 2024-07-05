import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetcherResponse, fetcher } from "../../fetcher";

export const ALL_CHARACTERS_QUERY_KEY = "AllCharacters";

export type AbilityName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type SkillName =
  | "Acrobatics"
  | "Animal Handling"
  | "Athletics"
  | "Chakra Control"
  | "Crafting"
  | "Deception"
  | "History"
  | "Illusions"
  | "Insight"
  | "Intimidation"
  | "Investigation"
  | "Martial Arts"
  | "Medicine"
  | "Nature"
  | "Ninshou"
  | "Perception"
  | "Performance"
  | "Persuasion"
  | "Sleight of Hand"
  | "Stealth"
  | "Survival";

export type SkillSaveConfig<T> = {
  name: T;
  isProficient: boolean;
  customBonus?: number;
  customAbility?: AbilityName;
};

export type CharacterClass = {
  name: string;
  hitDie: number;
  chakraDie: number;
  level: number;
  subclass?: string;
};

export type N5eCharacter = {
  name: string;
  classes: CharacterClass[];
  classMod: {
    name: string;
    level: number;
  };
  clan: string;
  background: string;
  alignment: string;
  level: number;
  experience: number;
  chakraDie: number;
  hitDie: number;
  ryo: number;
  currentHp: number;
  maxHp: number;
  temporaryHp: number;
  currentCp: number;
  maxCp: number;
  temporaryCp: number;
  feats: string[];
  jutsus: string[];
  abilities: Record<AbilityName, { value: number; customBonus?: number }>;
  skills: Array<SkillSaveConfig<SkillName>>;
  savingThrows: Record<AbilityName, Omit<SkillSaveConfig<AbilityName>, "name">>;
  elementalAffinities: ("fire" | "water" | "earth" | "wind" | "lightning")[];
  info: {
    age: number;
    height: string;
    weight: string;
    size: string;
    gender: string;
    eyes: string;
    hair: string;
    skin: string;
    background: string;
    avatar: string;
    village: string;
    rank: "Genin" | "Chunin" | "Jonin" | "Kage";
    isAnbu: boolean;
    isNukenin: boolean;
    titles: string[];
  };
  resistances: string[];
  immunities: string[];
  // JSON object with custom data from the user
  customData: Record<string, any>;
};

export type AllCharactersQueryResponse = {
  data: N5eCharacter[];
};

type AllCharactersQueryOptions = Omit<
  UseQueryOptions<FetcherResponse<AllCharactersQueryResponse>>,
  "queryFn" | "queryKey"
>;

export const useAllCharacters = (options?: AllCharactersQueryOptions) => {
  return useQuery({
    queryKey: [ALL_CHARACTERS_QUERY_KEY],
    queryFn: async () => {
      const data =
        await fetcher.get<AllCharactersQueryResponse>(`/api/n5e/characters`);

      return data;
    },
    ...options,
  });
};
