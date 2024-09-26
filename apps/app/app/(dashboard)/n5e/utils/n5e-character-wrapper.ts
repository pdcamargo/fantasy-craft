// make typescript ignore all errors here

import skills from "app/(dashboard)/n5e/data/skills.json";

import { evaluate } from "mathjs";
import { makeAutoObservable } from "mobx";
import { JutsuDatabase, JutsuGroupType } from "./jutsu-database";
import { FeatDatabase } from "./feat-database";
import { ClanDatabase, ClanFeature, ClanNames } from "./clan-database";
import { ClassDatabase, ClassNames } from "./class-database";
import { N5eCharacter } from "@lib/models/n5e-character";

export type AbilityName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type ElementalAffinity =
  | "fire"
  | "water"
  | "earth"
  | "wind"
  | "lightning";

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

const modifierFormula = (ability: number): number => {
  const formula = "floor((ability - 10) / 2)";

  return evaluate(formula, { ability });
};

const savingThrowFormula = ({
  ability,
  isProficient,
  proficiencyBonus,
  otherBonus,
}: {
  ability: number;
  isProficient: boolean;
  proficiencyBonus: number;
  otherBonus: number;
}): number => {
  const formula = `ability + floor(proficiencyBonus * 
    ${isProficient ? 1 : 0.5}
  ) + otherBonus`;

  return evaluate(formula, { ability, proficiencyBonus, otherBonus });
};

export type SkillsRecord = Record<
  SkillName,
  {
    isProficient: boolean;
    mastery?: number;
    customBonus?: number;
    customAbility?: AbilityName;
    bonus: number;
  }
>;

type SaveFunction = (value: {
  data: Partial<N5eCharacter>;
  onSuccess?: () => void;
}) => void;

export class N5eCharacterWrapper {
  constructor(
    private character: N5eCharacter,
    private saveFunction: SaveFunction,
  ) {
    makeAutoObservable(this, undefined, { autoBind: true });
  }
  // setters
  saveName = (name: string) => {
    this.character.name = name;

    this.saveFunction({
      data: this.character,
    });
  };

  saveLevel = (level: number) => {
    this.character.level = level;

    this.saveFunction({
      data: this.character,
    });
  };

  saveClan = (clan: string) => {
    this.character.clan = clan;

    this.saveFunction({
      data: this.character,
    });
  };

  saveBackground = (background: string) => {
    this.character.background = background;

    this.saveFunction({
      data: this.character,
    });
  };

  saveClass = (classes: N5eCharacter["classes"]) => {
    this.character.classes = classes;

    this.saveFunction({
      data: this.character,
    });
  };

  saveClassMod = (classMod: N5eCharacter["classMod"]) => {
    this.character.classMod = classMod;

    this.saveFunction({
      data: this.character,
    });
  };

  saveElementalAffinities = (
    elementalAffinities: N5eCharacter["elementalAffinities"],
  ) => {
    this.character.elementalAffinities = elementalAffinities;

    this.saveFunction({
      data: this.character,
    });
  };

  saveAbility = (ability: AbilityName, value: number, customBonus?: number) => {
    this.character.abilities[ability].value = value;

    if (typeof customBonus === "number") {
      this.character.abilities[ability].customBonus = customBonus;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveAbilityCustomBonus = (ability: AbilityName, customBonus: number) => {
    this.character.abilities[ability].customBonus = customBonus;

    this.saveFunction({
      data: this.character,
    });
  };

  saveSavingThrow = (
    ability: AbilityName,
    isProficient: boolean,
    customBonus?: number,
  ) => {
    this.character.savingThrows[ability].isProficient = isProficient;

    if (typeof customBonus === "number") {
      this.character.savingThrows[ability].customBonus = customBonus;
    }

    if (typeof this.character.savingThrows[ability].customBonus !== "number") {
      this.character.savingThrows[ability].customBonus = 0;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveSavingThrowCustomBonus = (ability: AbilityName, customBonus: number) => {
    this.character.savingThrows[ability].customBonus = customBonus;

    this.saveFunction({
      data: this.character,
    });
  };

  saveSavingThrowCustomAbility = (
    ability: AbilityName,
    customAbility: AbilityName,
  ) => {
    this.character.savingThrows[ability].customAbility = customAbility;

    this.saveFunction({
      data: this.character,
    });
  };

  saveSkill = (
    skill: SkillName,
    isProficient: boolean,
    mastery?: number,
    customBonus?: number,
    customAbility?: AbilityName,
  ) => {
    const skillObj = this.character.skills.find((s) => s.name === skill);

    if (skillObj) {
      skillObj.isProficient = isProficient;
      skillObj.mastery = mastery;

      if (typeof customBonus === "number") {
        skillObj.customBonus = customBonus;
      }

      if (typeof skillObj.customBonus !== "number") {
        skillObj.customBonus = 0;
      }

      skillObj.customAbility = customAbility;
    } else {
      this.character.skills.push({
        name: skill,
        isProficient,
        mastery: 0,
        customBonus: typeof customBonus !== "number" ? 0 : customBonus,
        customAbility,
      });
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveSkillCustomBonus = (skill: SkillName, customBonus: number) => {
    const skillObj = this.character.skills.find((s) => s.name === skill);

    if (skillObj) {
      skillObj.customBonus = customBonus;
    } else {
      this.character.skills.push({
        name: skill,
        isProficient: false,
        mastery: 0,
        customBonus,
      });
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveSkillCustomAbility = (skill: SkillName, customAbility: AbilityName) => {
    const skillObj = this.character.skills.find((s) => s.name === skill);

    if (skillObj) {
      skillObj.customAbility = customAbility;
    } else {
      this.character.skills.push({
        name: skill,
        isProficient: false,
        mastery: 0,
        customAbility,
      });
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveSkillProficiency = (skill: SkillName, isProficient: boolean) => {
    const skillObj = this.character.skills.find((s) => s.name === skill);

    if (skillObj) {
      skillObj.isProficient = isProficient;
    } else {
      this.character.skills.push({
        name: skill,
        isProficient,
        mastery: 0,
        customBonus: 0,
      });
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveSkillMastery = (skill: SkillName, mastery: number) => {
    const skillObj = this.character.skills.find((s) => s.name === skill);

    if (skillObj) {
      skillObj.mastery = mastery;
    } else {
      this.character.skills.push({
        name: skill,
        isProficient: false,
        mastery,
        customBonus: 0,
      });
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveJutsu = (jutsuName: string) => {
    this.character.jutsus.push(jutsuName);

    this.character.jutsus = Array.from(new Set(this.character.jutsus));

    this.saveFunction({
      data: this.character,
    });
  };

  saveFeat = (featName: string) => {
    this.character.feats.push(featName);

    this.character.feats = Array.from(new Set(this.character.feats));

    this.saveFunction({
      data: this.character,
    });

    console.log(this.character);
  };

  removeFeat = (featName: string) => {
    this.character.feats = this.character.feats.filter(
      (feat) => feat !== featName,
    );

    this.saveFunction({
      data: this.character,
    });
  };

  saveCurrentHp = (currentHp: number) => {
    this.character.currentHp = currentHp;

    this.saveFunction({
      data: this.character,
    });
  };

  saveTemporaryHp = (temporaryHp: number) => {
    this.character.temporaryHp = temporaryHp;

    this.saveFunction({
      data: this.character,
    });
  };

  saveCurrentCp = (currentCp: number) => {
    this.character.currentCp = currentCp;

    this.saveFunction({
      data: this.character,
    });
  };

  saveTemporaryCp = (temporaryCp: number) => {
    this.character.temporaryCp = temporaryCp;

    this.saveFunction({
      data: this.character,
    });
  };

  saveHpFlatBonus = (flatBonus: number) => {
    if (!this.character.hp) {
      this.character.hp = {
        flatBonus,
        perLevelBonus: 0,
      };
    } else {
      this.character.hp.flatBonus = flatBonus;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveHpPerLevelBonus = (perLevelBonus: number) => {
    if (!this.character.hp) {
      this.character.hp = {
        flatBonus: 0,
        perLevelBonus,
      };
    } else {
      this.character.hp.perLevelBonus = perLevelBonus;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveCpFlatBonus = (flatBonus: number) => {
    if (!this.character.cp) {
      this.character.cp = {
        flatBonus,
        perLevelBonus: 0,
      };
    } else {
      this.character.cp.flatBonus = flatBonus;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveCpPerLevelBonus = (perLevelBonus: number) => {
    if (!this.character.cp) {
      this.character.cp = {
        flatBonus: 0,
        perLevelBonus,
      };
    } else {
      this.character.cp.perLevelBonus = perLevelBonus;
    }

    this.saveFunction({
      data: this.character,
    });
  };

  saveArmorProficiencies = (armorProficiencies: string[]) => {
    this.character.proficiencies.armor = armorProficiencies;

    this.saveFunction({
      data: this.character,
    });
  };

  saveWeaponProficiencies = (weaponProficiencies: string[]) => {
    this.character.proficiencies.weapons = weaponProficiencies;

    this.saveFunction({
      data: this.character,
    });
  };

  saveToolProficiencies = (toolProficiencies: string[]) => {
    this.character.proficiencies.tools = toolProficiencies;

    this.saveFunction({
      data: this.character,
    });
  };

  saveKitProficiencies = (kitProficiencies: string[]) => {
    this.character.proficiencies.kits = kitProficiencies;

    this.saveFunction({
      data: this.character,
    });
  };

  saveBackstory = (backstory: string) => {
    this.character.info.background = backstory;

    this.saveFunction({
      data: this.character,
    });
  };

  saveJutsuCustomAbility(jutsuType: JutsuGroupType, ability: AbilityName) {
    this.character.jutsuCasting[
      jutsuType.toLowerCase() as keyof typeof this.character.jutsuCasting
    ].ability = ability;

    this.saveFunction({
      data: this.character,
    });
  }

  saveJutsuCustomAttackBonus(jutsuType: JutsuGroupType, bonus: number) {
    this.character.jutsuCasting[
      jutsuType.toLowerCase() as keyof typeof this.character.jutsuCasting
    ].customAttackBonus = bonus;

    this.saveFunction({
      data: this.character,
    });
  }

  saveJutsuCustomDCBonus(jutsuType: JutsuGroupType, bonus: number) {
    this.character.jutsuCasting[
      jutsuType.toLowerCase() as keyof typeof this.character.jutsuCasting
    ].customDCBonus = bonus;

    this.saveFunction({
      data: this.character,
    });
  }

  // getters

  public get name() {
    return this.character.name;
  }

  public get available() {
    return JutsuDatabase.getJutsuAvailableForCharacter(this);
  }

  public get current() {
    return JutsuDatabase.createQueryableJutsuList(this.jutsus);
  }

  public get currentFeats() {
    return FeatDatabase.createQueryableFeatList(this.feats);
  }

  public get availableFeats() {
    if (!this.clan) {
      return FeatDatabase.query.withoutNames(...this.feats).withoutClanFeats();
    }

    return FeatDatabase.query.withoutNames(...this.feats).withClan(this.clan);
  }

  public get ninjutsuQuery() {
    return this.current.ninjutsu();
  }

  public get taijutsuQuery() {
    return this.current.taijutsu();
  }

  public get genjutsuQuery() {
    return this.current.genjutsu();
  }

  public get bukijutsuQuery() {
    return this.current.bukijutsu();
  }

  public get jutsus() {
    return this.character.jutsus;
  }

  public get feats() {
    return this.character.feats;
  }

  public get level() {
    return this.character.level;
  }

  public get classes() {
    return this.character.classes;
  }

  public get classMod() {
    return this.character.classMod;
  }

  public get background() {
    return this.character.background;
  }

  public get proficiencyBonus() {
    const { level } = this.character;

    if (level < 1 || level > 20) {
      return 6;
    }

    const formula = `floor((level - 1) / 3) + 3`;

    return evaluate(formula, { level });
  }

  public get clan() {
    return this.character.clan;
  }

  public get clanFeatures(): ClanFeature[] {
    if (!this.clan) {
      return [];
    }

    return ClanDatabase.getClanFeatures(this.clan as ClanNames, this.level);
  }

  public get classFeatures() {
    if (!this.classes.length) {
      return [];
    }

    const [firstClass] = this.classes;

    return ClassDatabase.getClassFeatures(firstClass.name, this.level);
  }

  public get elementalAffinities() {
    return this.character.elementalAffinities;
  }

  public get armorClass() {
    const formula = `10 + abilityMod + floor(proficiency / 2) + armorBonus + shieldBonus + otherBonus`;

    return evaluate(formula, {
      abilityMod: this.abilityMods[this.character.armorClass.ability],
      proficiency: this.proficiencyBonus,
      armorBonus: this.character.armorClass.armorBonus,
      shieldBonus: this.character.armorClass.shieldBonus,
      otherBonus: this.character.armorClass.customBonus,
    });
  }

  public get chakraDie() {
    const chakraDie = this.character.classes.reduce(
      (acc, klass) => acc + klass.chakraDie,
      0,
    );

    return chakraDie;
  }

  public get hitDie() {
    const hitDie = this.character.classes.reduce(
      (acc, klass) => acc + klass.hitDie,
      0,
    );

    return hitDie;
  }

  public get hpConfig() {
    return this.character.hp;
  }

  public get cpConfig() {
    return this.character.cp;
  }

  public get currentHp() {
    return this.character.currentHp;
  }

  public get temporaryHp() {
    return this.character.temporaryHp;
  }

  public get maxHp() {
    /**
     * Hp

      DURABLE: Feat, 2 por lvl
      SENJU: Clan, 2 per lvl
      TAILESS TAILED BEAST: Hoshikage Clan Feat, 1 per lvl
      Hashirama's Legacy: Senju Clan Fea, 1 per lvl
     */

    const formula =
      "((hitDie + conMod + otherBonusPerLevel) * level) + otherBonus";

    let perLevel = 0;
    let flatBonus = 0;

    if (this.feats.includes("Tailless Tailed Beasts")) {
      perLevel += 1;
    }

    if (this.feats.includes("Durable")) {
      perLevel += 2;
    }

    if (this.feats.includes("Hashirama's Legacy")) {
      perLevel += 1;
    }

    if (this.clan.toLowerCase().includes("senju")) {
      perLevel += 2;
    }

    if (this.character.hp?.perLevelBonus) {
      perLevel += this.character.hp.perLevelBonus;
    }

    if (this.character.hp?.flatBonus) {
      flatBonus += this.character.hp.flatBonus;
    }

    return evaluate(formula, {
      hitDie: this.hitDie,
      conMod: this.conMod,
      level: this.character.level,
      otherBonusPerLevel: perLevel,
      otherBonus: flatBonus,
    });
  }

  public get currentCp() {
    return this.character.currentCp;
  }

  public get temporaryCp() {
    return this.character.temporaryCp;
  }

  public get maxCp() {
    /**
     * ENDURANCE, LATENT: Feat, 1 por lvl
      ENDURANCE, REALIZED: Feat, 1 por lvl
      UZUMAKI: Clan: 2 per lvl
      TAILESS TAILED BEAST: Hoshikage Clan Feat, 1 per lvl
      MONSTRUOS RESERVES: Uzumaki Clan Feat, 2 per lvl
     */

    const formula =
      "(((chakraDie / 2) + conMod + otherBonusPerLevel) * level) + otherBonus";

    let perLevel = 0;
    let flatBonus = 0;

    if (this.feats.includes("Endurance, Latent")) {
      perLevel += 1;
    }

    if (this.feats.includes("Endurance, Realized")) {
      perLevel += 1;
    }

    if (this.feats.includes("Tailless Tailed Beasts")) {
      perLevel += 1;
    }

    if (this.clan.toLowerCase().includes("uzumaki")) {
      perLevel += 2;
    }

    if (this.feats.includes("Monstrous Reserves")) {
      perLevel += 2;
    }

    if (this.character.cp?.perLevelBonus) {
      perLevel += this.character.cp.perLevelBonus;
    }

    if (this.character.cp?.flatBonus) {
      flatBonus += this.character.cp.flatBonus;
    }

    return evaluate(formula, {
      chakraDie: this.chakraDie,
      conMod: this.conMod,
      level: this.character.level,
      otherBonusPerLevel: perLevel,
      otherBonus: flatBonus,
    });
  }

  public get movementSpeed() {
    return this.character.movementSpeed;
  }

  public get str() {
    return (
      this.character.abilities.Strength.value +
      (this.character.abilities.Strength.customBonus || 0)
    );
  }

  public get con() {
    return (
      this.character.abilities.Constitution.value +
      (this.character.abilities.Constitution.customBonus || 0)
    );
  }

  public get dex() {
    return (
      this.character.abilities.Dexterity.value +
      (this.character.abilities.Dexterity.customBonus || 0)
    );
  }

  public get int() {
    return (
      this.character.abilities.Intelligence.value +
      (this.character.abilities.Intelligence.customBonus || 0)
    );
  }

  public get wis() {
    return (
      this.character.abilities.Wisdom.value +
      (this.character.abilities.Wisdom.customBonus || 0)
    );
  }

  public get cha() {
    return (
      this.character.abilities.Charisma.value +
      (this.character.abilities.Charisma.customBonus || 0)
    );
  }

  public get abilities() {
    return {
      Strength: this.str,
      Constitution: this.con,
      Dexterity: this.dex,
      Intelligence: this.int,
      Wisdom: this.wis,
      Charisma: this.cha,
    };
  }

  public get abilityMods() {
    return {
      Strength: this.strMod,
      Constitution: this.conMod,
      Dexterity: this.dexMod,
      Intelligence: this.intMod,
      Wisdom: this.wisMod,
      Charisma: this.chaMod,
    };
  }

  public get saves() {
    return {
      Strength: this.strSave,
      Constitution: this.conSave,
      Dexterity: this.dexSave,
      Intelligence: this.intSave,
      Wisdom: this.wisSave,
      Charisma: this.chaSave,
    };
  }

  public get savesCustomBonuses() {
    return {
      Strength: this.character.savingThrows.Strength.customBonus,
      Constitution: this.character.savingThrows.Constitution.customBonus,
      Dexterity: this.character.savingThrows.Dexterity.customBonus,
      Intelligence: this.character.savingThrows.Intelligence.customBonus,
      Wisdom: this.character.savingThrows.Wisdom.customBonus,
      Charisma: this.character.savingThrows.Charisma.customBonus,
    };
  }

  public get savesCustomAbilities() {
    return {
      Strength: this.character.savingThrows.Strength.customAbility,
      Constitution: this.character.savingThrows.Constitution.customAbility,
      Dexterity: this.character.savingThrows.Dexterity.customAbility,
      Intelligence: this.character.savingThrows.Intelligence.customAbility,
      Wisdom: this.character.savingThrows.Wisdom.customAbility,
      Charisma: this.character.savingThrows.Charisma.customAbility,
    };
  }

  public get savesProficiencies() {
    return {
      Strength: this.character.savingThrows.Strength.isProficient,
      Constitution: this.character.savingThrows.Constitution.isProficient,
      Dexterity: this.character.savingThrows.Dexterity.isProficient,
      Intelligence: this.character.savingThrows.Intelligence.isProficient,
      Wisdom: this.character.savingThrows.Wisdom.isProficient,
      Charisma: this.character.savingThrows.Charisma.isProficient,
    };
  }

  public get abilityCustomBonuses() {
    return {
      Strength: this.character.abilities.Strength.customBonus,
      Constitution: this.character.abilities.Constitution.customBonus,
      Dexterity: this.character.abilities.Dexterity.customBonus,
      Intelligence: this.character.abilities.Intelligence.customBonus,
      Wisdom: this.character.abilities.Wisdom.customBonus,
      Charisma: this.character.abilities.Charisma.customBonus,
    };
  }

  public get strMod() {
    return modifierFormula(this.str);
  }

  public get conMod() {
    return modifierFormula(this.con);
  }

  public get dexMod() {
    return modifierFormula(this.dex);
  }

  public get intMod() {
    return modifierFormula(this.int);
  }

  public get wisMod() {
    return modifierFormula(this.wis);
  }

  public get chaMod() {
    return modifierFormula(this.cha);
  }

  public get strSave() {
    const customAbility = this.character.savingThrows.Strength.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Strength"],
      isProficient: this.character.savingThrows.Strength.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Strength.customBonus || 0,
    });
  }

  public get dexSave() {
    const customAbility = this.character.savingThrows.Dexterity.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Dexterity"],
      isProficient: this.character.savingThrows.Dexterity.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Dexterity.customBonus || 0,
    });
  }

  public get conSave() {
    const customAbility =
      this.character.savingThrows.Constitution.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Constitution"],
      isProficient: this.character.savingThrows.Constitution.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Constitution.customBonus || 0,
    });
  }

  public get intSave() {
    const customAbility =
      this.character.savingThrows.Intelligence.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Intelligence"],
      isProficient: this.character.savingThrows.Intelligence.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Intelligence.customBonus || 0,
    });
  }

  public get wisSave() {
    const customAbility = this.character.savingThrows.Wisdom.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Wisdom"],
      isProficient: this.character.savingThrows.Wisdom.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Wisdom.customBonus || 0,
    });
  }

  public get chaSave() {
    const customAbility = this.character.savingThrows.Charisma.customAbility;

    return savingThrowFormula({
      ability: this.abilityMods[customAbility || "Charisma"],
      isProficient: this.character.savingThrows.Charisma.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Charisma.customBonus || 0,
    });
  }

  public get skills(): SkillsRecord {
    return skills.reduce(
      (acc, skill) => {
        const skillObj = this.character.skills.find(
          (s) => s.name === skill.name,
        ) || {
          name: skill.name,
          isProficient: false,
          mastery: 0,
          customBonus: 0,
          customAbility: undefined,
        };

        const proficiencyBonusMultiplier = skillObj.isProficient ? 1 : 0;

        const skillBonusFormula = `abilityMod + (proficiencyBonus * ${proficiencyBonusMultiplier}) + customBonus + (mastery * 2)`;

        acc[skill.name as keyof typeof acc] = {
          isProficient: skillObj.isProficient,
          customBonus: skillObj.customBonus,
          customAbility: skillObj.customAbility,
          bonus: evaluate(skillBonusFormula, {
            abilityMod:
              this.abilityMods[
                (skillObj.customAbility || skill.defaultAbility) as AbilityName
              ],
            proficiencyBonus: this.proficiencyBonus,
            customBonus: skillObj.customBonus,
            mastery: skillObj.mastery || 0,
          }),
          mastery: skillObj.mastery || 0,
        };

        return acc;
      },
      {} as Record<
        SkillName,
        {
          isProficient: boolean;
          customBonus?: number;
          mastery: number;
          customAbility?: AbilityName;
          bonus: number;
        }
      >,
    );
  }

  public get ninjutsuAbility() {
    return this.character.jutsuCasting.ninjutsu.ability;
  }

  public get taijutsuAbility() {
    return this.character.jutsuCasting.taijutsu.ability;
  }

  public get genjutsuAbility() {
    return this.character.jutsuCasting.genjutsu.ability;
  }

  public get bukijutsuAbility() {
    return this.character.jutsuCasting.bukijutsu.ability;
  }

  public get ninjutsuAttackBonus() {
    const formula = `proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.ninjutsuAbility],
      otherBonus: this.character.jutsuCasting.ninjutsu.customAttackBonus || 0,
    });
  }

  public get taijutsuAttackBonus() {
    const formula = `proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.taijutsuAbility],
      otherBonus: this.character.jutsuCasting.taijutsu.customAttackBonus || 0,
    });
  }

  public get genjutsuAttackBonus() {
    const formula = `proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.genjutsuAbility],
      otherBonus: this.character.jutsuCasting.genjutsu.customAttackBonus || 0,
    });
  }

  public get bukijutsuAttackBonus() {
    const formula = `proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.bukijutsuAbility],
      otherBonus: this.character.jutsuCasting.bukijutsu.customAttackBonus || 0,
    });
  }

  public get ninjutsuDc() {
    const formula = `8 + proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.ninjutsuAbility],
      otherBonus: this.character.jutsuCasting.ninjutsu.customDCBonus || 0,
    });
  }

  public get taijutsuDc() {
    const formula = `8 + proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.taijutsuAbility],
      otherBonus: this.character.jutsuCasting.taijutsu.customDCBonus || 0,
    });
  }

  public get genjutsuDc() {
    const formula = `8 + proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.genjutsuAbility],
      otherBonus: this.character.jutsuCasting.genjutsu.customDCBonus || 0,
    });
  }

  public get bukijutsuDc() {
    const formula = `8 + proficiencyBonus + abilityMod + otherBonus`;

    return evaluate(formula, {
      proficiencyBonus: this.proficiencyBonus,
      abilityMod: this.abilityMods[this.bukijutsuAbility],
      otherBonus: this.character.jutsuCasting.bukijutsu.customDCBonus || 0,
    });
  }

  public get jutsuAbilities() {
    return {
      Ninjutsu: this.ninjutsuAbility,
      Taijutsu: this.taijutsuAbility,
      Genjutsu: this.genjutsuAbility,
      Bukijutsu: this.bukijutsuAbility,
    };
  }

  public get jutsuAttackBonuses() {
    return {
      Ninjutsu: this.ninjutsuAttackBonus,
      Taijutsu: this.taijutsuAttackBonus,
      Genjutsu: this.genjutsuAttackBonus,
      Bukijutsu: this.bukijutsuAttackBonus,
    };
  }

  public get jutsuDcs() {
    return {
      Ninjutsu: this.ninjutsuDc,
      Taijutsu: this.taijutsuDc,
      Genjutsu: this.genjutsuDc,
      Bukijutsu: this.bukijutsuDc,
    };
  }

  public get jutsuCustomDcBonuses() {
    return {
      Ninjutsu: this.character.jutsuCasting.ninjutsu.customDCBonus,
      Taijutsu: this.character.jutsuCasting.taijutsu.customDCBonus,
      Genjutsu: this.character.jutsuCasting.genjutsu.customDCBonus,
      Bukijutsu: this.character.jutsuCasting.bukijutsu.customDCBonus,
    };
  }

  public get jutsuCustomAttackBonuses() {
    return {
      Ninjutsu: this.character.jutsuCasting.ninjutsu.customAttackBonus,
      Taijutsu: this.character.jutsuCasting.taijutsu.customAttackBonus,
      Genjutsu: this.character.jutsuCasting.genjutsu.customAttackBonus,
      Bukijutsu: this.character.jutsuCasting.bukijutsu.customAttackBonus,
    };
  }

  public get jutsuQueries() {
    return {
      Ninjutsu: this.ninjutsuQuery,
      Taijutsu: this.taijutsuQuery,
      Genjutsu: this.genjutsuQuery,
      Bukijutsu: this.bukijutsuQuery,
    };
  }

  public get jutsusAvailable() {
    return {
      Ninjutsu: this.available.ninjutsu(),
      Taijutsu: this.available.taijutsu(),
      Genjutsu: this.available.genjutsu(),
      Bukijutsu: this.available.bukijutsu(),
    };
  }

  public get armorProficiencies() {
    return this.character.proficiencies.armor;
  }

  public get weaponProficiencies() {
    return this.character.proficiencies.weapons;
  }

  public get toolProficiencies() {
    return this.character.proficiencies.tools;
  }

  public get kitProficiencies() {
    return this.character.proficiencies.kits;
  }

  public get passiveSkills() {
    const passiveSkillFormula = "10 + skillBonus + otherBonus";

    return {
      Perception: evaluate(passiveSkillFormula, {
        skillBonus: this.skills.Perception.bonus,
        otherBonus: 0,
      }),
      Investigation: evaluate(passiveSkillFormula, {
        skillBonus: this.skills.Investigation.bonus,
        otherBonus: 0,
      }),
      Insight: evaluate(passiveSkillFormula, {
        skillBonus: this.skills.Insight.bonus,
        otherBonus: 0,
      }),
      Stealth: evaluate(passiveSkillFormula, {
        skillBonus: this.skills.Stealth.bonus,
        otherBonus: 0,
      }),
    };
  }

  public get bulk() {
    const formula = "(10 + (strengthMod * 2) + customBonus) * customMultiplier";

    return evaluate(formula, {
      strengthMod: this.strMod,
      customBonus: this.character.bulk.customBonus,
      customMultiplier: this.character.bulk.customMultiplier,
    });
  }

  // TODO: calculate bulk based on items
  public get currentBulk() {
    return 0;
  }

  public get backstory() {
    return this.character.info.background;
  }
}
