import { cn } from "@craft/ui/utils";
import {
  N5eCharacterWrapper,
  SkillsRecord,
} from "../../utils/n5e-character-wrapper";
import { observer } from "mobx-react-lite";
import { SheetCheckbox } from "./sheet-checkbox";

export const skillArray = [
  {
    name: "Acrobatics",
    defaultAbility: "Dexterity",
  },
  {
    name: "Animal Handling",
    defaultAbility: "Wisdom",
  },
  {
    name: "Athletics",
    defaultAbility: "Strength",
  },
  {
    name: "Chakra Control",
    defaultAbility: "Constitution",
  },
  {
    name: "Crafting",
    defaultAbility: "Intelligence",
  },
  {
    name: "Deception",
    defaultAbility: "Charisma",
  },
  {
    name: "History",
    defaultAbility: "Intelligence",
  },
  {
    name: "Illusions",
    defaultAbility: "Intelligence",
  },
  {
    name: "Insight",
    defaultAbility: "Wisdom",
  },
  {
    name: "Intimidation",
    defaultAbility: "Charisma",
  },
  {
    name: "Investigation",
    defaultAbility: "Intelligence",
  },
  {
    name: "Martial Arts",
    defaultAbility: "Strength",
  },
  {
    name: "Medicine",
    defaultAbility: "Wisdom",
  },
  {
    name: "Nature",
    defaultAbility: "Intelligence",
  },
  {
    name: "Ninshou",
    defaultAbility: "Intelligence",
  },
  {
    name: "Perception",
    defaultAbility: "Wisdom",
  },
  {
    name: "Performance",
    defaultAbility: "Charisma",
  },
  {
    name: "Persuasion",
    defaultAbility: "Charisma",
  },
  {
    name: "Sleight of Hand",
    defaultAbility: "Dexterity",
  },
  {
    name: "Stealth",
    defaultAbility: "Dexterity",
  },
  {
    name: "Survival",
    defaultAbility: "Wisdom",
  },
] as const;

export type SkillName = (typeof skillArray)[number]["name"];

const groupOrder = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

const skillGroups = Object.groupBy(skillArray, (skill) => skill.defaultAbility);

export const skillGroupsArray = Object.entries(skillGroups).sort(
  ([a], [b]) => groupOrder.indexOf(a) - groupOrder.indexOf(b),
);

export const getSkillsForAbility = (
  ability: (typeof skillArray)[number]["defaultAbility"],
) => {
  return skillGroups[ability as keyof typeof skillGroups];
};
export type SkillConfig = Array<{
  name: SkillName;
  bonus: number;
  customAbility?: string;
  isProficient?: boolean;
}>;

export type SkillsProps = {
  skills: SkillConfig;
};

export const SkillGroup: React.FC<{
  groupSkills: typeof skillArray;
  skills: SkillsRecord;
  ability: string;
  headingText?: string;
  editable?: boolean;
  onProficiencyChange?: (skill: SkillName, isProficient: boolean) => void;
}> = observer(
  ({
    groupSkills,
    skills,
    ability,
    headingText,
    editable,
    onProficiencyChange,
  }) => {
    return (
      <div className="relative">
        <div className="relative -m-[20px]" role="table">
          <h3 className="text-xs uppercase font-bold text-white mb-4 text-center">
            {headingText ?? `${ability} Skills`}
          </h3>

          <div
            role="rowgroup"
            className="grid gap-1 grid-cols-1 xl:grid-cols-2"
          >
            {groupSkills.map((groupSkill) => {
              let skill = skills[groupSkill.name];

              if (!skill) {
                skill = {
                  customBonus: 0,
                  isProficient: false,
                  mastery: 0,
                  customAbility: undefined,
                  bonus: 0,
                };
              }

              const ability = skill.customAbility || groupSkill.defaultAbility;

              return (
                <div
                  key={groupSkill.name}
                  className="flex items-center mb-[5px] text-[#b0b7bd]"
                  role="row"
                >
                  <div className="flex px-[3px] items-center" role="cell">
                    <span
                      aria-label={
                        skill.isProficient ? "Proficient" : "Not Proficient"
                      }
                    >
                      <SheetCheckbox
                        checked={!!skill.isProficient}
                        editable={editable}
                        onCheckedChange={(newProficient) => {
                          onProficiencyChange?.(groupSkill.name, newProficient);
                        }}
                      />
                    </span>
                  </div>
                  <div
                    className="w-[35px] font-bold uppercase text-xs text-center"
                    role="cell"
                  >
                    {ability.slice(0, 3)}
                  </div>
                  <div
                    className="p-[5px_0] flex-[1_1] border-[rgba(197,49,49,0.4)] border-b text-[14px] text-nowrap whitespace-nowrap"
                    role="cell"
                  >
                    {groupSkill.name}
                  </div>
                  <div
                    className="p-[3px] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                    role="cell"
                  >
                    <div className="h-[24px] w-[30px] text-[18px] border-[#C53131] border text-white flex items-center justify-center rounded">
                      <small className="font-thin text-[60%]">
                        {skill.bonus > 0 ? `+` : ""}
                      </small>{" "}
                      {skill.bonus}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
