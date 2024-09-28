import weapons from "app/(dashboard)/n5e/data/weapons.json";

export type Weapon = (typeof weapons)[number];

export class WeaponQuery {
  private data: Weapon[];

  constructor(data: Weapon[]) {
    this.data = data;
  }

  static withData(data: Weapon[]) {
    return new WeaponQuery(data);
  }

  withDamageType(damageType: string): WeaponQuery {
    const filteredData = this.data.filter(
      (weapon) => weapon.damageType.toLowerCase() === damageType.toLowerCase()
    );
    return new WeaponQuery(filteredData);
  }

  withTraits(...keywords: string[]): WeaponQuery {
    const filteredData = this.data.filter((weapon) =>
      keywords.some((keyword) =>
        weapon.traits
          .split(", ")
          .some((trait) => trait.toLowerCase() === keyword.toLowerCase())
      )
    );
    return new WeaponQuery(filteredData);
  }

  withName(partialName: string): WeaponQuery {
    const filteredData = this.data.filter((weapon) =>
      weapon.name.toLowerCase().includes(partialName.toLowerCase())
    );
    return new WeaponQuery(filteredData);
  }

  withExactName(name: string): WeaponQuery {
    const filteredData = this.data.filter(
      (weapon) => weapon.name.toLowerCase() === name.toLowerCase()
    );
    return new WeaponQuery(filteredData);
  }

  withoutNames(...names: string[]): WeaponQuery {
    const filteredData = this.data.filter(
      (weapon) => !names.includes(weapon.name)
    );

    return new WeaponQuery(filteredData);
  }

  getResults(): Weapon[] {
    return this.data;
  }

  public get queryLength() {
    return this.data.length;
  }
}

export class WeaponDatabase {
  public static query = WeaponQuery.withData(weapons);

  public static get all() {
    return this.query.getResults();
  }
}
