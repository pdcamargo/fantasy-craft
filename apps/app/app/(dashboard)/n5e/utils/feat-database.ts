import feats from "app/dashboard/n5e/data/feats.json";

export type Feat = (typeof feats)[number];

class FeatQuery {
  private data: Feat[];

  constructor(data: Feat[]) {
    this.data = data;
  }

  static withData(data: Feat[]) {
    return new FeatQuery(data);
  }

  withTypes(...types: string[]): FeatQuery {
    const filteredData = this.data.filter((feat) =>
      types.some((type) => feat.type.toLowerCase() === type.toLowerCase()),
    );
    return new FeatQuery(filteredData);
  }

  withTexts(...keywords: string[]): FeatQuery {
    const filteredData = this.data.filter((feat) =>
      keywords.some(
        (keyword) =>
          feat.name.toLowerCase().includes(keyword.toLowerCase()) ||
          feat.description.toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
    return new FeatQuery(filteredData);
  }

  withName(partialName: string): FeatQuery {
    const filteredData = this.data.filter((feat) =>
      feat.name.toLowerCase().includes(partialName.toLowerCase()),
    );
    return new FeatQuery(filteredData);
  }

  withExactName(name: string): FeatQuery {
    const filteredData = this.data.filter(
      (feat) => feat.name.toLowerCase() === name.toLowerCase(),
    );
    return new FeatQuery(filteredData);
  }

  withoutNames(...names: string[]): FeatQuery {
    const filteredData = this.data.filter((feat) => !names.includes(feat.name));

    return new FeatQuery(filteredData);
  }

  withoutTypes(...types: string[]): FeatQuery {
    const filteredData = this.data.filter((feat) =>
      types.every((type) => feat.type.toLowerCase() !== type.toLowerCase()),
    );
    return new FeatQuery(filteredData);
  }

  withoutClanFeats(): FeatQuery {
    return this.withoutTypes("Clan Feat");
  }

  withClan(clan: string, onlyClanFeats = false): FeatQuery {
    const filteredData = this.data.filter((feat) => {
      if (onlyClanFeats) {
        return (
          feat.preRequisite.toLowerCase().includes(clan.toLowerCase()) &&
          feat.type === "Clan Feat"
        );
      }

      return (
        feat.preRequisite.toLowerCase().includes(clan.toLowerCase()) ||
        feat.type !== "Clan Feat"
      );
    });

    return new FeatQuery(filteredData);
  }

  getResults(): Feat[] {
    return this.data;
  }

  groupedBy(by: keyof Feat) {
    return Object.groupBy(this.data, (feat) => feat[by]);
  }

  public get queryLength() {
    return this.data.length;
  }
}

export class FeatDatabase {
  public static query = FeatQuery.withData(feats);

  public static get all() {
    return this.query.getResults();
  }

  public static getFeatDefinitions(featNames: string[]) {
    return featNames.map((featName) => {
      const feat = this.query.withExactName(featName).getResults()[0];

      if (!feat) {
        throw new Error(`Feat "${featName}" not found`);
      }

      return feat;
    });
  }

  public static createQueryableFeatList(featNames: string[]) {
    return FeatQuery.withData(this.getFeatDefinitions(featNames));
  }

  public static createQueryableFeatListForDefinitions(featDefinitions: Feat[]) {
    return FeatQuery.withData(featDefinitions);
  }
}
