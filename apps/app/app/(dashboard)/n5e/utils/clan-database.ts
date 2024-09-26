import clanFeatures from "app/dashboard/n5e/data/clan-features.json";

export type ClanNames = keyof typeof clanFeatures;
export type Clan = typeof clanFeatures;

export type ClanFeature = {
  items: {
    title: string;
    details: string;
  }[];
  title: string;
  details: string;
  requireLevel?: number;
  groupTo?: undefined;
};

export class ClanDatabase {
  public static getClan(clanName: ClanNames): Clan[ClanNames] {
    return clanFeatures[clanName];
  }

  public static getClanFeatures(
    clanName: ClanNames,
    charLevel = 20,
  ): ClanFeature[] {
    if (!clanFeatures[clanName]) {
      return [];
    }

    const features = clanFeatures[clanName].features as ClanFeature[];

    const featuresForLevel = features.filter(
      (feature) => feature.requireLevel && feature.requireLevel <= charLevel,
    );

    return featuresForLevel.map((feature) => ({
      ...feature,
      items: features.filter((f) => f.groupTo === feature.title),
    }));
  }
}
