import { Separator } from "@craft/ui";
import { abilityScores, AbilityScore } from "./ability-score";
import { SavingThrow, savesArray } from "./saving-throws";
import { SkillGroup, getSkillsForAbility } from "./skills";

export type CompactAbilityProps = {
  ability: (typeof abilityScores)[number];
  skillsHeadingText?: string;
};

export const CompactAbility: React.FC<CompactAbilityProps> = ({
  ability,
  skillsHeadingText,
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
          value={0}
          modifier={0}
          headingText="Ability Score"
        />

        <div>
          <h3 className="uppercase font-[700] text-[#b0b7bd] text-[9px]">
            Saving
          </h3>
          <SavingThrow
            save={{
              name: ability,
              bonus: 0,
              isProficient: false,
              customModifier: undefined,
            }}
          />
        </div>
      </div>

      <Separator className="mb-10 bg-white/10" />

      <SkillGroup
        ability={ability}
        skills={[]}
        groupSkills={skills}
        headingText={skillsHeadingText}
      />
    </div>
  );
};
