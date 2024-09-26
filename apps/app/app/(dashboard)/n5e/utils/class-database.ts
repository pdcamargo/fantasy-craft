import classes from "app/dashboard/n5e/data/classes.json";

export type ClassNames = (typeof classes)[number]["name"];
export type Class = (typeof classes)[number];

export type ClassFeature = {
  items: {
    title: string;
    details: string;
  }[];
  title: string;
  details: string;
  requireLevel?: number;
  groupTo?: undefined;
};

export class ClassDatabase {
  public static getClass(className: ClassNames) {
    return classes.find((c) => c.name === className);
  }

  public static getClassFeatures(
    className: ClassNames,
    charLevel = 20,
  ): ClassFeature[] {
    const clazz = classes.find((c) => c.name === className);

    if (!clazz) {
      return [];
    }

    const features = (clazz?.features || []) as ClassFeature[];

    const featuresForLevel = features.filter(
      (feature) => feature.requireLevel && feature.requireLevel <= charLevel,
    );

    return featuresForLevel.map((feature) => ({
      ...feature,
      items: features.filter((f) => f.groupTo === feature.title),
    }));
  }
}
