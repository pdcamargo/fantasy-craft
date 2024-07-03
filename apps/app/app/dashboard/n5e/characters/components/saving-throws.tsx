import { cn } from "@craft/ui/utils";

export const savesArray = [
  {
    name: "Strength",
    modifier: "Strength",
  },
  {
    name: "Dexterity",
    modifier: "Dexterity",
  },
  {
    name: "Constitution",
    modifier: "Constitution",
  },
  {
    name: "Intelligence",
    modifier: "Intelligence",
  },
  {
    name: "Wisdom",
    modifier: "Wisdom",
  },
  {
    name: "Charisma",
    modifier: "Charisma",
  },
] as const;

export type SaveName = (typeof savesArray)[number]["name"];

export type SaveConfig = Array<{
  name: SaveName;
  bonus: number;
  customModifier?: string;
  isProficient?: boolean;
}>;

export const SavingThrow: React.FC<{
  save: {
    name: SaveName;
    bonus: number;
    customModifier?: string;
    isProficient?: boolean;
  };
  className?: string;
}> = ({ save, className }) => {
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
          <div
            className={cn(
              "bg-[#333] border border-dotted border-[#838383] h-[10px] w-[10px] inline-flex rounded-full",
              {
                "bg-[#C53131]": save.isProficient,
              },
            )}
          ></div>
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
};

export type SavingThrowsProps = {
  saves: SaveConfig;
};

export const SavingThrows: React.FC<SavingThrowsProps> = ({
  saves,
}: SavingThrowsProps) => {
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
};
