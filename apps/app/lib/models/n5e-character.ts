export type AbilityName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type ElementalAffinity =
  | "fire"
  | "earth"
  | "wind"
  | "lightning"
  | "water";

import { plainToClass, Type } from "class-transformer";

export class ClassDetails {
  name: string;
  level: number;
  subclass?: string;
  chakraDie: number;
  hitDie: number;
}

export class ClassMod {
  name: string;
  level: number;
}

export class Abilities {
  value: number;
  customBonus?: number;
}

export class Skill {
  name: string;
  isProficient: boolean;
  mastery?: number;
  customBonus?: number;
  customAbility?: AbilityName;
}

export class SavingThrow {
  isProficient: boolean;
  customBonus?: number;
  customAbility?: AbilityName;
}

export class Info {
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
  rank: string;
  isAnbu: boolean;
  isNukenin: boolean;
  titles: string[];
}

export class Bulk {
  customBonus: number;
  customMultiplier: number;
}

export class JutsuCasting {
  ninjutsu: {
    ability: AbilityName;
    customBonus: number;
    customAttackBonus: number;
    customDCBonus: number;
  };
  genjutsu: {
    ability: AbilityName;
    customBonus: number;
    customAttackBonus: number;
    customDCBonus: number;
  };
  taijutsu: {
    ability: AbilityName;
    customBonus: number;
    customAttackBonus: number;
    customDCBonus: number;
  };
  bukijutsu: {
    ability: AbilityName;
    customBonus: number;
    customAttackBonus: number;
    customDCBonus: number;
  };
}

export class ArmorClass {
  ability: AbilityName;
  armorBonus: number;
  shieldBonus: number;
  customBonus: number;
}

export class Proficiencies {
  weapons: string[];
  armor: string[];
  tools: string[];
  kits: string[];
}

export class HPCPConfig {
  flatBonus: number;
  perLevelBonus: number;
}

export class N5eCharacter {
  id: number;

  publicId: string;

  isPublic: boolean;

  userId: number;

  name: string;

  @Type(() => ClassDetails)
  classes: ClassDetails[];

  @Type(() => ClassMod)
  classMod: ClassMod | null;

  clan: string;

  background: string;

  alignment: string;

  level: number;

  experience: number;

  ryo: number;

  feats: string[];

  jutsus: string[];

  @Type(() => Abilities)
  abilities: Record<string, Abilities>;

  @Type(() => Skill)
  skills: Skill[];

  @Type(() => SavingThrow)
  savingThrows: Record<string, SavingThrow>;

  elementalAffinities: ElementalAffinity[];

  @Type(() => Info)
  info: Info;

  resistances: string[];

  immunities: string[];

  currentHp: number;

  temporaryHp: number;

  currentCp: number;

  temporaryCp: number;

  movementSpeed: number;

  initiativeBonus: number;

  @Type(() => HPCPConfig)
  hp?: HPCPConfig;

  @Type(() => HPCPConfig)
  cp?: HPCPConfig;

  @Type(() => Bulk)
  bulk: Bulk;

  customData: Record<string, any>;

  customTabs: Record<string, string>;

  @Type(() => JutsuCasting)
  jutsuCasting: JutsuCasting;

  @Type(() => ArmorClass)
  armorClass: ArmorClass;

  @Type(() => Proficiencies)
  proficiencies: Proficiencies;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  public static fromPlainObject(plainObject: any): N5eCharacter {
    return plainToClass(N5eCharacter, plainObject);
  }
}
