import { cn } from "@craft/ui/utils";
import { observer } from "mobx-react-lite";
import { SheetCheckbox } from "./sheet-checkbox";

export const savesArray = [
  {
    name: "Strength",
    defaultAbility: "Strength",
  },
  {
    name: "Dexterity",
    defaultAbility: "Dexterity",
  },
  {
    name: "Constitution",
    defaultAbility: "Constitution",
  },
  {
    name: "Intelligence",
    defaultAbility: "Intelligence",
  },
  {
    name: "Wisdom",
    defaultAbility: "Wisdom",
  },
  {
    name: "Charisma",
    defaultAbility: "Charisma",
  },
] as const;

export type SaveName = (typeof savesArray)[number]["name"];

export type SaveConfig = Array<{
  name: SaveName;
  bonus: number;
  customAbility?: string;
  isProficient?: boolean;
}>;

export const SavingThrow: React.FC<{
  save: {
    name: SaveName;
    bonus: number;
    customAbility?: string;
    isProficient?: boolean;
  };
  editable?: boolean;
  onProficiencyChange?: (isProficient: boolean) => void;
  className?: string;
}> = observer(({ save, className, editable, onProficiencyChange }) => {
  return (
    <div
      className={cn(
        "flex items-center text-[#b0b7bd] relative bg-no-repeat bg-cover w-[115px] h-[34px]",
        className,
      )}
      role="row"
      style={{
        backgroundImage: "url(/fancy-horizontal-box-bg.svg)",
      }}
    >
      <div className="w-[30px] flex pl-[10px] items-center" role="cell">
        <span aria-label={save.isProficient ? "Proficient" : "Not Proficient"}>
          <SheetCheckbox
            checked={!!save.isProficient}
            editable={editable}
            onCheckedChange={onProficiencyChange}
          />
        </span>
      </div>

      <div
        className="flex-[1_1] text-[14px] uppercase font-bold text-white"
        role="cell"
      >
        {save.name.slice(0, 3)}
      </div>
      <div className="ext-[14px]" role="cell">
        <div className="w-[40px] h-[24px] text-[20px] text-white flex items-center justify-center text-center">
          <small className="text-[#b0b7bd] font-normal">
            {save.bonus >= 0 ? "+" : "-"}
          </small>
          {Math.abs(save.bonus)}
        </div>
      </div>
    </div>
  );
});

export type SavingThrowsProps = {
  saves: SaveConfig;
};

export const SavingThrows: React.FC<SavingThrowsProps> = observer(
  ({ saves }: SavingThrowsProps) => {
    return (
      <div
        className="w-[281px] p-[13px_20px] relative border-[20px]"
        style={{
          borderImage: "url(/fancy-box-2-bg.svg) 20 30 20 30 fill",
        }}
      >
        <div className="relative -m-[20px]" role="table">
          <h3
            className="text-xs uppercase font-bold text-white mb-4 text-center"
            role="row"
          >
            Saving Throws
          </h3>

          <div className="flex flex-col" role="row">
            {savesArray.map((defaultSave) => {
              const save = saves.find((s) => s.name === defaultSave.name);

              if (!save) {
                return null;
              }

              return <SavingThrow key={save.name} save={save} />;
            })}
          </div>
        </div>
      </div>
    );
  },
);
