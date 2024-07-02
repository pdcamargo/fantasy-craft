import { cn } from "@craft/ui/utils";

const defaultSaves = [
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

export type SaveName = (typeof defaultSaves)[number]["name"];

export type SaveConfig = Array<{
  name: SaveName;
  bonus: number;
  customModifier?: string;
  isProficient?: boolean;
}>;

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
          {defaultSaves.map((defaultSave) => {
            const save = saves.find((s) => s.name === defaultSave.name);

            if (!save) {
              return null;
            }

            const modifier = save.customModifier || defaultSave.modifier;

            return (
              <div
                key={save.name}
                className="flex items-center text-[#b0b7bd]"
                role="row"
              >
                <div
                  className="w-[30px] flex pl-[3px] items-center"
                  role="cell"
                >
                  <span
                    aria-label={
                      save.isProficient ? "Proficient" : "Not Proficient"
                    }
                  >
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
                  className="w-[40px] p-[0_5px] font-bold uppercase text-xs"
                  role="cell"
                >
                  {modifier.slice(0, 3)}
                </div>
                <div
                  className="p-[5px_0] flex-[1_1] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                  role="cell"
                >
                  {save.name}
                </div>
                <div
                  className="p-[3px] pr-[10px] border-[rgba(197,49,49,0.4)] border-b text-[14px]"
                  role="cell"
                >
                  <div className="h-[24px] w-[40px] text-[20px] border-[#C53131] border text-white flex items-center justify-center rounded">
                    {save.bonus > 0 ? `+${save.bonus}` : save.bonus}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
