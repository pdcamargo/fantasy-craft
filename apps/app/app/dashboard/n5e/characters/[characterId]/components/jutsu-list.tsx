import { Jutsu, JutsuRankGroup } from "app/dashboard/n5e/utils/jutsu-database";
import { FancyBox } from "../../components";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craft/ui";
import { parseMarkdown } from "@craft/editorjs";
import { ChevronRight } from "lucide-react";

export type JutsuListProps = {
  group: JutsuRankGroup;
};

const getJutsuBackgroundColor = (jutsu: Jutsu) => {
  const castingTime = jutsu.castingTime;

  if (castingTime.includes("Reaction")) return "#c9dbf8";
  if (castingTime.includes("Action")) return "#fff3cc";
  if (castingTime.includes("Bonus Action")) return "#d9ead3";
  if (castingTime.includes("Full Turn Action")) return "#fce5cd";

  return "#f5cbcc";
};

export const JutsuList: React.FC<JutsuListProps> = ({ group }) => {
  const entries = Object.entries(group);

  return (
    <div className="flex flex-col gap-7">
      <Tabs defaultValue="E-Rank">
        <TabsList>
          {entries.map(([rank, jutsus]) => {
            return (
              <TabsTrigger key={rank} value={rank}>
                {rank} ({jutsus.length})
              </TabsTrigger>
            );
          })}
        </TabsList>
        {entries.map(([rank, jutsus]) => {
          return (
            <TabsContent value={rank} key={rank}>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-full">
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
