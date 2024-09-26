import { observer } from "mobx-react-lite";
import { FancyBox } from "../../components";
import { JutsuList } from "./jutsu-list";
import {
  JutsuRankGroup,
  JutsuQuery,
  JutsuGroupType,
} from "app/(dashboard)/n5e/utils/jutsu-database";
import { useJutsuConfigSheet } from "./justu-config-sheet";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  Button,
  TooltipContent,
} from "@craft/ui";
import { Cog } from "lucide-react";
import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";

export type JutsuGroupProps = {
  saveDc: number;
  attackBonus: number;
  ability: string;
  group: JutsuRankGroup;
  groupType: JutsuGroupType;
  availableJutsusQuery: JutsuQuery;
  onJutsuSelect?: (jutsuName: string) => void;
  character: N5eCharacterWrapper;
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
    character,
  }) => {
    const justuConfig = useJutsuConfigSheet();

    return (
      <div>
        <div className="bg-gray-100 rounded-lg shadow-smooth-lg p-2 flex flex-col lg:flex-row items-center gap-2 justify-between">
          <FancyBox className="w-full lg:w-[250px]">
            {groupType}

            <div className="absolute top-0 right-3">
              <TooltipProvider delayDuration={80}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-2 w-auto text-gray-400 hover:text-white hover:bg-transparent"
                      onClick={() =>
                        justuConfig.show({
                          character,
                          jutsuGroup: groupType,
                        })
                      }
                    >
                      <Cog className="size-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Advanced configuration for {ability}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </FancyBox>

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
