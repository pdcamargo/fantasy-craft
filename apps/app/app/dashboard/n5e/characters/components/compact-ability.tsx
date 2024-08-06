import { Button, Separator } from "@craft/ui";
import { abilityScores, AbilityScore } from "./ability-score";
import { SavingThrow, savesArray } from "./saving-throws";
import { SkillGroup, SkillName, getSkillsForAbility } from "./skills";
import { N5eCharacterWrapper } from "app/dashboard/n5e/utils/n5e-character-wrapper";
import { observer } from "mobx-react-lite";

import { Cog } from "lucide-react";
import { useAbilityConfigSheet } from "../[characterId]/components";

export type CompactAbilityProps = {
  ability: (typeof abilityScores)[number];
  skillsHeadingText?: string;
  character: N5eCharacterWrapper;
  onAbilityChange?: (value: number) => void;
  onSavingThrowProficiencyChange?: (isProficient: boolean) => void;
  onSkillProficiencyChange?: (skill: SkillName, isProficient: boolean) => void;
  editable?: boolean;
};

export const CompactAbility: React.FC<CompactAbilityProps> = observer(
  ({
    ability,
    skillsHeadingText,
    character,
    onAbilityChange,
    onSavingThrowProficiencyChange,
    onSkillProficiencyChange,
    editable = true,
  }) => {
    const skills = getSkillsForAbility(ability)!;
    const abilityConfig = useAbilityConfigSheet();

    return (
      <div
        className="inline-block relative p-[13px_20px] border-[20px]"
        style={{
          borderImage: "url(/fancy-box-2-bg.svg) 20 30 20 30 fill",
        }}
      >
        {editable && (
          <div className="absolute right-0 top-0">
            <Button
              size="lg"
              className="px-4 w-auto"
              onClick={() =>
                abilityConfig.show({
                  character,
                  ability,
                  groupSkills: skills as any,
                  skills: character.skills,
                })
              }
            >
              <Cog className="size-6" />
            </Button>
          </div>
        )}

        <div className="flex items-start gap-5 m-[-20px]">
          <AbilityScore
            name={ability}
            value={character.abilities[ability]}
            modifier={character.abilityMods[ability]}
            headingText="Ability Score"
            editable={editable}
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
              editable={editable}
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
          editable={editable}
          onProficiencyChange={onSkillProficiencyChange}
        />
      </div>
    );
  },
);
