import {
  Jutsu,
  JutsuGroupType,
  JutsuQuery,
  JutsuRankGroup,
} from "app/dashboard/n5e/utils/jutsu-database";
import { FancyBox } from "../../components";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsScrollButton,
  TabsTrigger,
} from "@craft/ui";
import { parseMarkdown } from "@craft/editorjs";
import { ChevronRight } from "lucide-react";
import { useJutsuSelect } from "./jutsu-select";

export type JutsuListProps = {
  group: JutsuRankGroup;
  availableJutsusQuery: JutsuQuery;
  onJutsuSelect?: (jutsuName: string) => void;
  groupType: JutsuGroupType;
};

const getJutsuBackgroundColor = (jutsu: Jutsu) => {
  const castingTime = jutsu.castingTime;

  if (castingTime.includes("Reaction")) return "#c9dbf8";
  if (castingTime.includes("Bonus Action")) return "#d9ead3";
  if (castingTime.includes("Full Turn Action")) return "#fce5cd";
  if (castingTime.includes("Action")) return "#fff3cc";

  return "#f5cbcc";
};

export const JutsuList: React.FC<JutsuListProps> = ({
  group,
  availableJutsusQuery,
  onJutsuSelect,
  groupType,
}) => {
  const entries = Object.entries(group);
  const jutsuSelect = useJutsuSelect();

  return (
    <div className="flex flex-col gap-7 mt-2">
      <Tabs defaultValue="E-Rank">
        <TabsList className="px-0 md:px-1">
          <TabsScrollButton className="md:hidden" direction="left" />

          {entries.map(([rank, jutsus]) => {
            return (
              <TabsTrigger key={rank} value={rank}>
                {rank} ({jutsus.length})
              </TabsTrigger>
            );
          })}

          <TabsScrollButton className="md:hidden" direction="right" />
        </TabsList>
        {entries.map(([rank, jutsus]) => {
          const availableForRank = availableJutsusQuery
            .withRank(rank)
            .withoutNames(...jutsus.map((j) => j.name))
            .getResults();

          return (
            <TabsContent value={rank} key={rank}>
              <Button
                variant="info"
                className="mb-4"
                onClick={() => {
                  jutsuSelect.show({
                    jutsus: availableForRank,
                    heading: rank,
                    onJutsuSelect: (jutsuName) => {
                      onJutsuSelect?.(jutsuName);
                    },
                  });
                }}
              >
                Add {groupType} {rank} jutsu
              </Button>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-4 w-full">
                {jutsus.map((jutsu) => {
                  return (
                    <Collapsible key={rank}>
                      <CollapsibleTrigger
                        className="w-full bg-white px-2 py-1 border-b border-black/30 flex items-center"
                        style={{
                          backgroundColor: getJutsuBackgroundColor(jutsu),
                        }}
                      >
                        <ChevronRight className="state-open-rotate size-4 transition" />

                        <span className="text-sm">{jutsu?.name}</span>

                        <span className="text-sm font-bold ml-auto">
                          {parseInt(jutsu?.cost ?? "", 10)}
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent
                        className="text-sm p-2 border-2"
                        style={{
                          borderColor: getJutsuBackgroundColor(jutsu),
                        }}
                      >
                        <div className="text-sm flex flex-col gap-2">
                          {jutsu.castingTime && (
                            <span>
                              <b>Casting time:</b> {jutsu.castingTime}
                            </span>
                          )}
                          {jutsu.range && (
                            <span>
                              <b>Range:</b> {jutsu.range}
                            </span>
                          )}
                          {jutsu.components && (
                            <span>
                              <b>Components:</b> {jutsu.components}
                            </span>
                          )}
                          {jutsu.duration && (
                            <span>
                              <b>Duration:</b> {jutsu.duration}
                            </span>
                          )}
                          {jutsu.cost && (
                            <span>
                              <b>Cost:</b> {jutsu.cost}
                            </span>
                          )}
                        </div>

                        <Separator className="my-3" />

                        <pre
                          className="text-sm text-wrap m-0 p-0 font-sans"
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(jutsu.description),
                          }}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
