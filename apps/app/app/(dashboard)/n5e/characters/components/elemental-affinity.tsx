import { Separator } from "@craft/ui";
import { cn } from "@craft/ui/utils";
import { observer } from "mobx-react-lite";

const elementalAffinities = [
  "fire",
  "earth",
  "wind",
  "lightning",
  "water",
] as const;

type AffinityName = (typeof elementalAffinities)[number];

export type ElementalAffinityProps = {
  affinities: ((typeof elementalAffinities)[number] | "medical")[];
  editable?: boolean;
  onChange?: (affinities: Array<AffinityName>) => void;
};

export const ElementalAffinity: React.FC<ElementalAffinityProps> = observer(
  ({ affinities, editable, onChange }) => {
    return (
      <span className="flex items-center gap-2 mt-3">
        {elementalAffinities.map((affinity) => (
          <img
            key={affinity}
            src={`/img/naruto/icons/${affinity.toLowerCase()}.png`}
            alt={`${affinity} Icon`}
            className={cn("size-6", {
              "opacity-75": !affinities.includes(affinity),
              "cursor-pointer": editable,
            })}
            style={{
              filter: !affinities.includes(affinity)
                ? "grayscale(1) brightness(75%)"
                : undefined,
            }}
            onClick={
              editable
                ? () => {
                    if (onChange) {
                      if (affinities.includes(affinity)) {
                        onChange(
                          affinities.filter(
                            (a) => a !== affinity,
                          ) as Array<AffinityName>,
                        );
                      } else {
                        onChange([
                          ...affinities,
                          affinity,
                        ] as Array<AffinityName>);
                      }
                    }
                  }
                : undefined
            }
          />
        ))}

        <Separator orientation="vertical" className="h-4" />

        <img
          src="/img/naruto/icons/medical.png"
          alt="Medical Icon"
          className={cn("size-6", {
            "opacity-75": !affinities.includes("medical"),
          })}
          style={{
            filter: !affinities.includes("medical")
              ? "grayscale(1) brightness(75%)"
              : undefined,
          }}
        />
      </span>
    );
  },
);
