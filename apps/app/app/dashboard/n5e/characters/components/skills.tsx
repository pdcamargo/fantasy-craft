import { cn } from "@craft/ui/utils";

const defaultSkills = [
  {
    name: "Acrobatics",
    defaultModifier: "Dexterity",
  },
  {
    name: "Animal Handling",
    defaultModifier: "Wisdom",
  },
  {
    name: "Athletics",
    defaultModifier: "Strength",
  },
  {
    name: "Chakra Control",
    defaultModifier: "Constitution",
  },
  {
    name: "Crafting",
    defaultModifier: "Intelligence",
  },
  {
    name: "Deception",
    defaultModifier: "Charisma",
  },
  {
    name: "History",
    defaultModifier: "Intelligence",
  },
  {
    name: "Illusions",
    defaultModifier: "Intelligence",
  },
  {
    name: "Insight",
    defaultModifier: "Wisdom",
  },
  {
    name: "Intimidation",
    defaultModifier: "Charisma",
  },
  {
    name: "Investigation",
    defaultModifier: "Intelligence",
  },
  {
    name: "Martial Arts",
    defaultModifier: "Strength",
  },
  {
    name: "Medicine",
    defaultModifier: "Wisdom",
  },
  {
    name: "Nature",
    defaultModifier: "Intelligence",
  },
  {
    name: "Ninshou",
    defaultModifier: "Intelligence",
  },
  {
    name: "Perception",
    defaultModifier: "Wisdom",
  },
  {
    name: "Performance",
    defaultModifier: "Charisma",
  },
  {
    name: "Persuasion",
    defaultModifier: "Charisma",
  },
  {
    name: "Sleight of Hand",
    defaultModifier: "Dexterity",
  },
  {
    name: "Stealth",
    defaultModifier: "Dexterity",
  },
  {
    name: "Survival",
    defaultModifier: "Wisdom",
  },
] as const;

export type SkillName = (typeof defaultSkills)[number]["name"];

const groupOrder = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

const skillGroups = Object.groupBy(
  defaultSkills,
  (skill) => skill.defaultModifier,
);

const skillGroupsArray = Object.entries(skillGroups).sort(
  ([a], [b]) => groupOrder.indexOf(a) - groupOrder.indexOf(b),
);

export type SkillConfig = Array<{
  name: SkillName;
  bonus: number;
  customModifier?: string;
  isProficient?: boolean;
}>;

export type SkillsProps = {
  skills: SkillConfig;
};

const SkillGroup: React.FC<{
  groupSkills: typeof defaultSkills;
  skills: SkillConfig;
  ability: string;
}> = ({ groupSkills, skills, ability }) => {
  return (
    <div
      className="relative w-[281px] p-[13px_20px] border-[20px]"
      style={{
        borderImage: "url(/fancy-box-2-bg.svg) 20 30 20 30 fill",
      }}
    >
      <div className="relative -m-[20px]" role="table">
        <h3 className="text-xs uppercase font-bold text-white mb-4 text-center">
          {ability} Skills
        </h3>

        <div
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
        </div>
        <div role="rowgroup">
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
                <div
                  className="w-[30px] flex pl-[3px] items-center"
                  role="cell"
                >
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
                  className="w-[40px] p-[0_5px] font-bold uppercase text-xs"
                  role="cell"
                >
                  {modifier.slice(0, 3)}
                </div>
                <div
                  className="p-[5px_0] flex-[1_1] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                  role="cell"
                >
                  {skill.name}
                </div>
                <div
                  className="p-[3px] pr-[10px] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                  role="cell"
                >
                  <div className="h-[24px] w-[40px] text-[20px] border-[#C53131] border text-white flex items-center justify-center rounded">
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
