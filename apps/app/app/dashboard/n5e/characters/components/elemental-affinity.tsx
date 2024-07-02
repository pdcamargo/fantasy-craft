import { Separator } from "@craft/ui";
import { cn } from "@craft/ui/utils";

const elementalAffinities = [
  "fire",
  "earth",
  "wind",
  "lightning",
  "water",
] as const;

export type ElementalAffinityProps = {
  affinities: ((typeof elementalAffinities)[number] | "medical")[];
};

export const ElementalAffinity: React.FC<ElementalAffinityProps> = ({
  affinities,
}) => {
  return (
    <span className="flex items-center gap-2 mt-3">
      {elementalAffinities.map((affinity) => (
        <img
          key={affinity}
          src={`/img/naruto/icons/${affinity.toLowerCase()}.png`}
          alt={`${affinity} Icon`}
          className={cn("size-6", {
            "opacity-75": !affinities.includes(affinity),
          })}
          style={{
            filter: !affinities.includes(affinity)
              ? "grayscale(1) brightness(75%)"
              : undefined,
          }}
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
};
