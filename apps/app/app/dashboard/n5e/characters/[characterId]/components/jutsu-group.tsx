import { FancyBox } from "../../components";
import { JutsuList } from "./jutsu-list";
import { JutsuRankGroup } from "app/dashboard/n5e/utils/jutsu-database";

export type JutsuGroupProps = {
  saveDc: number;
  attackBonus: number;
  ability: string;
  group: JutsuRankGroup;
  groupType: "Ninjutsu" | "Genjutsu" | "Taijutsu" | "Bukijutsu";
};

export const JutsuGroup: React.FC<JutsuGroupProps> = ({
  ability,
  attackBonus,
  saveDc,
  group,
  groupType,
}) => {
  return (
    <div>
      <div className="bg-gray-100 rounded-lg shadow-smooth-lg p-2 flex items-center gap-2">
        <FancyBox className="w-[250px]">{groupType}</FancyBox>

        <FancyBox
          className="w-[200px]"
          heading={groupType}
          subheading="Ability"
        >
          {ability}
        </FancyBox>
        <FancyBox
          className="w-[200px]"
          heading={groupType}
          subheading="Save DC"
        >
          {saveDc}
        </FancyBox>
        <FancyBox
          className="w-[200px]"
          heading={groupType}
          subheading="Attack Bonus"
        >
          {attackBonus}
        </FancyBox>
      </div>

      <JutsuList group={group} />
    </div>
  );
};
