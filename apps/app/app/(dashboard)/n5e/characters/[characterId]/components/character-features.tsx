import { parseMarkdown } from "@craft/editorjs";
import {
  AdaptivePopover,
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@craft/ui";
import { cn } from "@craft/ui/utils";
import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import { Trash } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useFeatSelect } from "./feat-select";

import feats from "app/(dashboard)/n5e/data/feats.json";

export const CharacterFeatures: React.FC<{
  character: N5eCharacterWrapper;
}> = observer(({ character }) => {
  const [displayFeatures, setDisplayFeatures] = useState<
    "all" | "class" | "clan" | "feat"
  >("all");

  const shouldDisplay = (type: typeof displayFeatures) => {
    return displayFeatures === "all" || displayFeatures === type;
  };

  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup
        size="sm"
        type="single"
        value={displayFeatures}
        onValueChange={(newDisplay) => {
          if (!newDisplay) return;

          setDisplayFeatures(newDisplay as typeof displayFeatures);
        }}
        className="justify-start"
      >
        <ToggleGroupItem className="uppercase" value="all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem className="uppercase" value="clan">
          Clan
        </ToggleGroupItem>
        <ToggleGroupItem className="uppercase" value="class">
          Class
        </ToggleGroupItem>
        <ToggleGroupItem className="uppercase" value="feat">
          Feats
        </ToggleGroupItem>
      </ToggleGroup>

      <div className={cn("h-[470px] overflow-y-auto")}>
        <div className="h-fit flex flex-col gap-3">
          {shouldDisplay("clan") && <ClanFeatures character={character} />}
          {shouldDisplay("class") && <ClassFeatures character={character} />}
          {shouldDisplay("feat") && <Feats character={character} />}
        </div>
      </div>
    </div>
  );
});

const Feats: React.FC<{ character: N5eCharacterWrapper }> = observer(
  ({ character }) => {
    const featSelect = useFeatSelect();

    return (
      <div className="h-fit">
        <span className="text-white font-semibold text-xs uppercase flex items-center gap-2 mb-2">
          Feats{" "}
          <Button
            size="xs"
            onClick={() => {
              featSelect.show({
                feats: character.availableFeats.getResults(),
                onFeatSelect: (feat) => {
                  character.saveFeat(feat);
                },
              });
            }}
          >
            +
          </Button>
        </span>
        <div className="w-full h-fit flex-1 grid gap-2 grid-cols-1 grid-flow-row lg:grid-cols-2">
          {character.currentFeats.getResults().map((feat) => {
            return (
              <AdaptivePopover
                key={feat.name}
                triggerProps={{
                  className:
                    "w-full font-semibold text-left flex items-center justify-between border-b border-muted bg-gray-100 pl-2",
                }}
                contentProps={{
                  className: "max-h-[350px] overflow-y-auto",
                }}
                trigger={
                  <>
                    <span>{feat.name}</span>

                    <Button
                      variant="link"
                      className="text-red-500"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        character.removeFeat(feat.name);
                      }}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </>
                }
              >
                <p className="text-black text-xs font-bold">{feat.type}</p>

                <pre
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(feat.description),
                  }}
                />
              </AdaptivePopover>
            );
          })}
        </div>
      </div>
    );
  },
);

const ClassFeatures: React.FC<{ character: N5eCharacterWrapper }> = observer(
  ({ character }) => {
    return (
      <div className="h-fit">
        <span className="text-white font-semibold text-xs uppercase">
          Class Features
        </span>
        <div className="w-full h-fit flex-1 grid gap-2 grid-cols-1 grid-flow-row lg:grid-cols-3">
          {character.classFeatures.map((feature) => (
            <AdaptivePopover
              key={feature.title}
              triggerProps={{
                className:
                  "w-full font-semibold text-left flex items-center justify-between border-b border-muted bg-gray-100 pl-2",
              }}
              contentProps={{
                className: "max-h-[350px] overflow-y-auto",
              }}
              trigger={feature.title.replace(`(${character.clan})`, "")}
            >
              <pre
                className="text-sm text-wrap font-sans m-0"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(feature.details),
                }}
              />

              {feature.items.length > 0 && (
                <ul>
                  {feature.items.map((item) => (
                    <li key={item.title}>
                      <pre
                        className="inline-flex text-sm"
                        dangerouslySetInnerHTML={{
                          __html: parseMarkdown(
                            `**${item.title}**: ${item.details}`,
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </AdaptivePopover>
          ))}
        </div>
      </div>
    );
  },
);

const ClanFeatures: React.FC<{ character: N5eCharacterWrapper }> = observer(
  ({ character }) => {
    return (
      <div className="h-fit">
        <span className="text-white font-semibold text-xs uppercase">
          Clan Features
        </span>
        <div className="w-full h-fit flex-1 grid gap-2 grid-cols-1 grid-flow-row lg:grid-cols-3">
          {character.clanFeatures.map((feature) => (
            <AdaptivePopover
              key={feature.title}
              triggerProps={{
                className:
                  "w-full font-semibold text-left flex items-center justify-between border-b border-muted bg-gray-100 pl-2",
              }}
              contentProps={{
                className: "max-h-[350px] overflow-y-auto",
              }}
              trigger={feature.title.replace(`(${character.clan})`, "")}
            >
              <pre
                className="text-sm text-wrap font-sans m-0"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(feature.details),
                }}
              />

              {feature.items.length > 0 && (
                <ul>
                  {feature.items.map((item) => (
                    <li key={item.title}>
                      <pre
                        className="inline-flex text-sm"
                        dangerouslySetInnerHTML={{
                          __html: parseMarkdown(
                            `**${item.title}**: ${item.details}`,
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </AdaptivePopover>
          ))}
        </div>
      </div>
    );
  },
);
