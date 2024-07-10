import jutsus from "app/dashboard/n5e/data/jutsus.json";
import {
  ElementalAffinity,
  N5eCharacterWrapper,
} from "./n5e-character-wrapper";

export type Jutsu = (typeof jutsus)[number];

class JutsuQuery {
  private data: Jutsu[];

  constructor(data: Jutsu[]) {
    this.data = data;
  }

  static withData(data: Jutsu[]) {
    return new JutsuQuery(data);
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
    const ranks = [
      "E-Rank",
      "D-Rank",
      "C-Rank",
      "B-Rank",
      "A-Rank",
      "S-Rank",
    ] as const;

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
