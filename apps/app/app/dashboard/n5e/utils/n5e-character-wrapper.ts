import { N5eCharacter } from "@craft/query";

import skills from "app/dashboard/n5e/data/skills.json";

import { evaluate } from "mathjs";

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
    customBonus?: number;
    customAbility?: AbilityName;
    bonus: number;
  }
>;

export class N5eCharacterWrapper {
  constructor(private readonly character: N5eCharacter) {}

  public get proficiencyBonus() {
    const { level } = this.character;

    if (level < 1 || level > 20) {
      return 6;
    }

    const formula = `floor((level - 1) / 4) + 2`;

    return evaluate(formula, { level });
  }

  public get armorClass() {
    const formula = `10 + abilityMod + armorBonus + shieldBonus + otherBonus`;

    return evaluate(formula, {
      abilityMod: this.dexMod,
      armorBonus: 0,
      shieldBonus: 0,
      otherBonus: 0,
    });
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

  // TODO: custom ability
  public get strSave() {
    return savingThrowFormula({
      ability: this.strMod,
      isProficient: this.character.savingThrows.Strength.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Strength.customBonus || 0,
    });
  }

  // TODO: custom ability
  public get dexSave() {
    return savingThrowFormula({
      ability: this.dexMod,
      isProficient: this.character.savingThrows.Dexterity.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Dexterity.customBonus || 0,
    });
  }

  // TODO: custom ability
  public get conSave() {
    return savingThrowFormula({
      ability: this.conMod,
      isProficient: this.character.savingThrows.Constitution.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Constitution.customBonus || 0,
    });
  }

  // TODO: custom ability
  public get intSave() {
    return savingThrowFormula({
      ability: this.intMod,
      isProficient: this.character.savingThrows.Intelligence.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Intelligence.customBonus || 0,
    });
  }

  // TODO: custom ability
  public get wisSave() {
    return savingThrowFormula({
      ability: this.wisMod,
      isProficient: this.character.savingThrows.Wisdom.isProficient,
      proficiencyBonus: this.proficiencyBonus,
      otherBonus: this.character.savingThrows.Wisdom.customBonus || 0,
    });
  }

  // TODO: custom ability
  public get chaSave() {
    return savingThrowFormula({
      ability: this.chaMod,
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
          customBonus: 0,
          customAbility: undefined,
        };

        const skillBonusFormula = `abilityMod + (proficiencyBonus * ${skillObj.isProficient ? 1 : 0}) + customBonus`;

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
          }),
        };

        return acc;
      },
      {} as Record<
        SkillName,
        {
          isProficient: boolean;
          customBonus?: number;
          customAbility?: AbilityName;
          bonus: number;
        }
      >,
    );
  }
}
