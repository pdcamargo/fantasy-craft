import { observer } from "mobx-react-lite";
import { FancyBox } from "../../components";
import { JutsuList } from "./jutsu-list";
import {
  JutsuRankGroup,
  JutsuQuery,
  JutsuGroupType,
} from "app/dashboard/n5e/utils/jutsu-database";

export type JutsuGroupProps = {
  saveDc: number;
  attackBonus: number;
  ability: string;
  group: JutsuRankGroup;
  groupType: JutsuGroupType;
  availableJutsusQuery: JutsuQuery;
  onJutsuSelect?: (jutsuName: string) => void;
};

const justuActionsDict = {
  "Full Turn Action": "#fce5cd",
  Action: "#fff3cc",
  "Bonus Action": "#d9ead3",
  Reaction: "#c9dbf8",
};

export const JutsuGroup: React.FC<JutsuGroupProps> = observer(
  ({
    ability,
    attackBonus,
    saveDc,
    group,
    groupType,
    availableJutsusQuery,
    onJutsuSelect,
  }) => {
    return (
      <div>
        <div className="bg-gray-100 rounded-lg shadow-smooth-lg p-2 flex flex-col lg:flex-row items-center gap-2 justify-between">
          <FancyBox className="w-full lg:w-[250px]">{groupType}</FancyBox>

          <FancyBox
            className="w-full lg:w-[200px]"
            heading={groupType}
            subheading="Ability"
          >
            {ability}
          </FancyBox>
          <FancyBox
            className="w-full lg:w-[200px]"
            heading={groupType}
            subheading="Save DC"
          >
            {saveDc}
          </FancyBox>
          <FancyBox
            className="w-full lg:w-[200px]"
            heading={groupType}
            subheading="Attack Bonus"
          >
            {attackBonus}
          </FancyBox>

          <div className="flex flex-col w-full lg:w-[200px]">
            {Object.entries(justuActionsDict).map(([label, color]) => {
              return (
                <div
                  key={label}
                  className="w-full text-xs font-semibold border border-black/20 px-2"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        <JutsuList
          group={group}
          availableJutsusQuery={availableJutsusQuery}
          onJutsuSelect={onJutsuSelect}
          groupType={groupType}
        />
      </div>
    );
  },
);
