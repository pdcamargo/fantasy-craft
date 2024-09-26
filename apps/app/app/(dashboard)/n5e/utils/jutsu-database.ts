import jutsus from "app/dashboard/n5e/data/jutsus.json";
import {
  ElementalAffinity,
  N5eCharacterWrapper,
} from "./n5e-character-wrapper";

export type Jutsu = (typeof jutsus)[number];

const ranks = [
  "E-Rank",
  "D-Rank",
  "C-Rank",
  "B-Rank",
  "A-Rank",
  "S-Rank",
] as const;

export type JutsuRank = (typeof ranks)[number];

export type JutsuRankGroup = Record<JutsuRank, Jutsu[]>;

export type JutsuGroupType = "Ninjutsu" | "Genjutsu" | "Taijutsu" | "Bukijutsu";

export class JutsuQuery {
  private data: Jutsu[];

  constructor(data: Jutsu[]) {
    this.data = data;
  }

  static withData(data: Jutsu[]) {
    return new JutsuQuery(data);
  }

  ninjutsu() {
    const types = [
      "Non-Elemental Ninjutsu",
      "Fire Release",
      "Water Release",
      "Earth Release",
      "Wind Release",
      "Lightning Release",
    ];

    const filteredData = this.data.filter(
      // keywords can include any of the types and the type can be exactly one of the types
      (jutsu) =>
        types.some((type) =>
          jutsu.keywords.toLowerCase().includes(type.toLowerCase()),
        ) || types.includes(jutsu.type),
    );

    return new JutsuQuery(filteredData);
  }

  taijutsu() {
    const types = ["Taijutsu"];

    const filteredData = this.data.filter(
      // keywords can include any of the types and the type can be exactly one of the types
      (jutsu) =>
        types.some((type) =>
          jutsu.keywords.toLowerCase().includes(type.toLowerCase()),
        ) || types.includes(jutsu.type),
    );

    return new JutsuQuery(filteredData);
  }

  genjutsu() {
    const types = ["Genjutsu"];

    const filteredData = this.data.filter(
      // keywords can include any of the types and the type can be exactly one of the types
      (jutsu) =>
        types.some((type) =>
          jutsu.keywords.toLowerCase().includes(type.toLowerCase()),
        ) || types.includes(jutsu.type),
    );

    return new JutsuQuery(filteredData);
  }

  bukijutsu() {
    const types = ["Bukijutsu"];

    const filteredData = this.data.filter(
      // keywords can include any of the types and the type can be exactly one of the types
      (jutsu) =>
        types.some((type) =>
          jutsu.keywords.toLowerCase().includes(type.toLowerCase()),
        ) || types.includes(jutsu.type),
    );

    return new JutsuQuery(filteredData);
  }

  withTypes(...types: string[]): JutsuQuery {
    const filteredData = this.data.filter((jutsu) =>
      types.some((type) => jutsu.type.toLowerCase() === type.toLowerCase()),
    );
    return new JutsuQuery(filteredData);
  }

  withKeywords(...keywords: string[]): JutsuQuery {
    const filteredData = this.data.filter((jutsu) =>
      keywords.some((keyword) =>
        jutsu.keywords.toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
    return new JutsuQuery(filteredData);
  }

  withName(partialName: string): JutsuQuery {
    const filteredData = this.data.filter((jutsu) =>
      jutsu.name.toLowerCase().includes(partialName.toLowerCase()),
    );
    return new JutsuQuery(filteredData);
  }

  withExactName(name: string): JutsuQuery {
    const filteredData = this.data.filter(
      (jutsu) => jutsu.name.toLowerCase() === name.toLowerCase(),
    );
    return new JutsuQuery(filteredData);
  }

  withRank(rank: Jutsu["rank"]): JutsuQuery {
    const filteredData = this.data.filter((jutsu) => jutsu.rank === rank);

    return new JutsuQuery(filteredData);
  }

  withoutNames(...names: string[]): JutsuQuery {
    const filteredData = this.data.filter(
      (jutsu) => !names.includes(jutsu.name),
    );

    return new JutsuQuery(filteredData);
  }

  getResults(): Jutsu[] {
    return this.data;
  }

  getResultsGroupedByRank() {
    // record with rank as key and jutsu as value
    const groupedResults = ranks.reduce(
      (acc, rank) => {
        acc[rank] = this.data.filter((jutsu) => jutsu.rank === rank);
        return acc;
      },
      {} as Record<(typeof ranks)[number], Jutsu[]>,
    );

    return groupedResults;
  }

  public get queryLength() {
    return this.data.length;
  }
}

export class JutsuDatabase {
  public static query = JutsuQuery.withData(jutsus);

  public static get all() {
    return this.query.getResults();
  }

  public static getJutsuAvailableForCharacter(character: N5eCharacterWrapper) {
    const { clan, elementalAffinities } = character;

    // Jutsu available no matter the clan or elemental affinity
    const allCharactersJutsuType = [
      "Non-Elemental Ninjutsu",
      "Taijutsu",
      "Genjutsu",
      "Bukijutsu",
    ];

    // Jutsu available for the character's clan
    return this.query.withTypes(
      ...allCharactersJutsuType,
      ...elementalAffinities.map((affinity) => `${affinity} Release`),
      clan,
    );
  }

  public static getJutsuDefinitions(jutsuNames: string[]) {
    return jutsuNames.map((jutsuName) => {
      const jutsu = this.query.withExactName(jutsuName).getResults()[0];

      if (!jutsu) {
        throw new Error(`Jutsu "${jutsuName}" not found`);
      }

      return jutsu;
    });
  }

  public static createQueryableJutsuList(jutsuNames: string[]) {
    return JutsuQuery.withData(this.getJutsuDefinitions(jutsuNames));
  }

  public static createQueryableJutsuListForDefinitions(
    jutsuDefinitions: Jutsu[],
  ) {
    return JutsuQuery.withData(jutsuDefinitions);
  }
}
