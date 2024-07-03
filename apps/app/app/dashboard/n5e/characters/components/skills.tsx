import { cn } from "@craft/ui/utils";

export const skillArray = [
  {
    name: "Acrobatics",
    defaultModifier: "Dexterity" as const,
  },
  {
    name: "Animal Handling",
    defaultModifier: "Wisdom" as const,
  },
  {
    name: "Athletics",
    defaultModifier: "Strength" as const,
  },
  {
    name: "Chakra Control",
    defaultModifier: "Constitution" as const,
  },
  {
    name: "Crafting",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Deception",
    defaultModifier: "Charisma" as const,
  },
  {
    name: "History",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Illusions",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Insight",
    defaultModifier: "Wisdom" as const,
  },
  {
    name: "Intimidation",
    defaultModifier: "Charisma" as const,
  },
  {
    name: "Investigation",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Martial Arts",
    defaultModifier: "Strength" as const,
  },
  {
    name: "Medicine",
    defaultModifier: "Wisdom" as const,
  },
  {
    name: "Nature",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Ninshou",
    defaultModifier: "Intelligence" as const,
  },
  {
    name: "Perception",
    defaultModifier: "Wisdom" as const,
  },
  {
    name: "Performance",
    defaultModifier: "Charisma" as const,
  },
  {
    name: "Persuasion",
    defaultModifier: "Charisma" as const,
  },
  {
    name: "Sleight of Hand",
    defaultModifier: "Dexterity" as const,
  },
  {
    name: "Stealth",
    defaultModifier: "Dexterity" as const,
  },
  {
    name: "Survival",
    defaultModifier: "Wisdom" as const,
  },
];

export type SkillName = (typeof skillArray)[number]["name"];

const groupOrder = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

const skillGroups = Object.groupBy(
  skillArray,
  (skill) => skill.defaultModifier,
);

export const skillGroupsArray = Object.entries(skillGroups).sort(
  ([a], [b]) => groupOrder.indexOf(a) - groupOrder.indexOf(b),
);

export const getSkillsForAbility = (
  ability: (typeof skillArray)[number]["defaultModifier"],
) => {
  return skillGroups[ability as keyof typeof skillGroups];
};
export type SkillConfig = Array<{
  name: SkillName;
  bonus: number;
  customModifier?: string;
  isProficient?: boolean;
}>;

export type SkillsProps = {
  skills: SkillConfig;
};

export const SkillGroup: React.FC<{
  groupSkills: typeof skillArray;
  skills: SkillConfig;
  ability: string;
  headingText?: string;
}> = ({ groupSkills, skills, ability, headingText }) => {
  return (
    <div
      className="relative"
      // className="relative p-[13px_20px] border-[20px]"
      // style={{
      //   borderImage: "url(/fancy-box-2-bg.svg) 20 30 20 30 fill",
      // }}
    >
      <div className="relative -m-[20px]" role="table">
        <h3 className="text-xs uppercase font-bold text-white mb-4 text-center">
          {headingText ?? `${ability} Skills`}
        </h3>

        {/* <div
          className="flex mb-[5px] text-[10px] font-bold uppercase text-[#b0b7bd]"
          role="row"
        >
          <div className="w-[30px]" role="columnheader">
            Prof
          </div>
          <div className="w-[40px] p-[0_5px]" role="columnheader">
            Mod
          </div>
          <div className="flex-[1_1]" role="columnheader">
            Skill
          </div>
          <div className="pr-[10px]" role="columnheader">
            Bonus
          </div>
        </div> */}
        <div
          role="rowgroup"
          style={{
            display: "grid",
            gap: "5px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {groupSkills.map((groupSkill) => {
            let skill = skills.find((s) => s.name === groupSkill.name);

            if (!skill) {
              skill = {
                bonus: 0,
                name: groupSkill.name,
                isProficient: false,
              };
            }

            const modifier = skill.customModifier || groupSkill.defaultModifier;

            return (
              <div
                key={skill.name}
                className="flex items-center mb-[5px] text-[#b0b7bd]"
                role="row"
              >
                <div className="flex px-[3px] items-center" role="cell">
                  <span
                    aria-label={
                      skill.isProficient ? "Proficient" : "Not Proficient"
                    }
                  >
                    <div
                      className={cn(
                        "bg-[#333] border border-dotted border-[#838383] h-[10px] w-[10px] inline-flex rounded-full",
                        {
                          "bg-[#C53131]": skill.isProficient,
                        },
                      )}
                    ></div>
                  </span>
                </div>
                <div
                  className="w-[35px] font-bold uppercase text-xs text-center"
                  role="cell"
                >
                  {modifier.slice(0, 3)}
                </div>
                <div
                  className="p-[5px_0] flex-[1_1] border-[rgba(197,49,49,0.4)] border-b text-[14px] text-nowrap whitespace-nowrap"
                  role="cell"
                >
                  {skill.name}
                </div>
                <div
                  className="p-[3px] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                  role="cell"
                >
                  <div className="h-[24px] w-[30px] text-[20px] border-[#C53131] border text-white flex items-center justify-center rounded">
                    {skill.bonus > 0 ? `+${skill.bonus}` : skill.bonus}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skills }: SkillsProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
      }}
    >
      {skillGroupsArray.map(([modifier, groupSkills]) => (
        <SkillGroup
          key={modifier}
          ability={modifier}
          groupSkills={groupSkills!}
          skills={skills}
        />
      ))}
    </div>
  );
};
