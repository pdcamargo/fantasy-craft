import { Separator } from "@craft/ui";
import { abilityScores, AbilityScore } from "./ability-score";
import { SavingThrow, savesArray } from "./saving-throws";
import { SkillGroup, SkillName, getSkillsForAbility } from "./skills";
import { N5eCharacterWrapper } from "app/dashboard/n5e/utils/n5e-character-wrapper";
import { observer } from "mobx-react-lite";

export type CompactAbilityProps = {
  ability: (typeof abilityScores)[number];
  skillsHeadingText?: string;
  character: N5eCharacterWrapper;
  onAbilityChange?: (value: number) => void;
  onSavingThrowProficiencyChange?: (isProficient: boolean) => void;
  onSkillProficiencyChange?: (skill: SkillName, isProficient: boolean) => void;
};

export const CompactAbility: React.FC<CompactAbilityProps> = observer(
  ({
    ability,
    skillsHeadingText,
    character,
    onAbilityChange,
    onSavingThrowProficiencyChange,
    onSkillProficiencyChange,
  }) => {
    const skills = getSkillsForAbility(ability)!;

    return (
      <div
        className="inline-block relative p-[13px_20px] border-[20px]"
        style={{
          borderImage: "url(/fancy-box-2-bg.svg) 20 30 20 30 fill",
        }}
      >
        <div className="flex items-start gap-5 m-[-20px]">
          <AbilityScore
            name={ability}
            value={character.abilities[ability]}
            modifier={character.abilityMods[ability]}
            headingText="Ability Score"
            editable
            onChange={onAbilityChange}
          />

          <div>
            <h3 className="uppercase font-[700] text-[#b0b7bd] text-[9px]">
              Saving
            </h3>
            <SavingThrow
              save={{
                name: ability,
                bonus: character.saves[ability],
                isProficient: character.savesProficiencies[ability],
                customAbility: undefined,
              }}
              editable
              onProficiencyChange={onSavingThrowProficiencyChange}
            />
          </div>
        </div>

        <Separator className="mb-10 bg-white/10" />

        <SkillGroup
          ability={ability}
          skills={character.skills}
          groupSkills={skills as any}
          headingText={skillsHeadingText}
          editable
          onProficiencyChange={onSkillProficiencyChange}
        />
      </div>
    );
  },
);
