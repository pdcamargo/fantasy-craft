import { cn } from "@craft/ui/utils";
import { AbilityScoreBoxSvg } from "../../components";
import { ContentEditable } from "@craft/ui";
import { observer } from "mobx-react-lite";

export const abilityScores = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
] as const;

export type AbilityScoreProps = {
  name: (typeof abilityScores)[number];
  value: number;
  modifier: number;
  editable?: boolean;
  onChange?: (value: number) => void;
};

export const AbilityScore: React.FC<
  AbilityScoreProps & {
    headingText?: string;
    className?: string;
  }
> = observer(
  ({ name, value, modifier, headingText, onChange, editable, className }) => {
    return (
      <div className={cn("relative w-[81px] h-[95px] text-center", className)}>
        <div className="absolute overflow-hidden top-0 bottom-0 left-0 right-0 pointer-events-none">
          <AbilityScoreBoxSvg className="w-full h-full" />
        </div>

        <div className="pt-[2px] relative">
          <span className="uppercase font-[700] text-[#b0b7bd] text-[9px]">
            {headingText ?? name}
          </span>
        </div>

        <div className="text-[#b0b7bd] text-[26px] font-medium relative top-[-0.125em]">
          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center border border-[#C53131] text-white rounded">
            {modifier > 0 ? `+${modifier}` : modifier}
          </span>
        </div>

        <ContentEditable
          editable={editable}
          type="number"
          className="text-[#b0b7bd] bottom-[4px] text-[16px] font-bold absolute px-3"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onChange={(newValue) => {
            if (onChange) {
              onChange(Number(newValue));
            }
          }}
        >
          {value}
        </ContentEditable>
      </div>
    );
  },
);

export const AbilitiesScores: React.FC<{
  abilities: Record<
    (typeof abilityScores)[number],
    Omit<AbilityScoreProps, "name">
  >;
}> = observer(({ abilities }) => {
  return (
    <div className="flex flex-col gap-2">
      {abilityScores.map((ability) => (
        <AbilityScore
          key={ability}
          name={ability}
          value={abilities[ability].value}
          modifier={abilities[ability].modifier}
        />
      ))}
    </div>
  );
});
