import { ContentEditable, Separator } from "@craft/ui";
import { cn } from "@craft/ui/utils";
import { observer } from "mobx-react-lite";

export type ValueConfig = {
  current: number;
  max: number;
  temp: number;
  die: string;
};

export const HPCP: React.FC<{
  hp: ValueConfig;
  cp: ValueConfig;
  className?: string;
  editable?: boolean;
  onChangeCurrentHp?: (value: number) => void;
  onChangeCurrentCp?: (value: number) => void;
  onChangeTempHp?: (value: number) => void;
  onChangeTempCp?: (value: number) => void;
}> = observer(
  ({
    hp,
    cp,
    editable,
    onChangeCurrentCp,
    onChangeCurrentHp,
    onChangeTempCp,
    onChangeTempHp,
    className,
  }) => {
    return (
      <div
        className={cn("relative w-[317px] h-[90px] border-[20px]", className)}
        style={{
          borderImage: "url(/fancy-horizontal-box-2-bg.svg) 20 20 20 20 fill",
        }}
      >
        <div className="w-[-webkit-fill-available] h-[inherit] m-[-20px] relative px-2 py-1 flex items-center">
          <div className="w-[50%] h-[inherit] flex flex-col items-center justify-center">
            <span className="text-[#b0b7bd] text-[11px] uppercase font-[700] mt-[-10px]">
              Hit Points ({hp.die})
            </span>

            <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
              <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded text-nowrap gap-1">
                <span className="inline-flex flex-col relative">
                  <ContentEditable
                    as="span"
                    className="leading-[1] w-[50px] text-right"
                    max={hp.max}
                    editable={editable}
                    type="number"
                    onChange={(newCurrentHP) => {
                      if (onChangeCurrentHp) {
                        onChangeCurrentHp(newCurrentHP);
                      }
                    }}
                  >
                    {hp.current}
                  </ContentEditable>
                  <small
                    className="text-[10px] uppercase absolute font-thin"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-13px",
                    }}
                  >
                    Current
                  </small>
                </span>{" "}
                <small className="font-thin">/</small>{" "}
                <span className="inline-flex flex-col relative">
                  <span className="leading-[1] w-[50px] text-right">
                    {hp.max}
                  </span>
                  <small
                    className="text-[10px] uppercase absolute font-thin"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-13px",
                    }}
                  >
                    Max
                  </small>
                </span>
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="bg-[#C53131] h-14" />

          <div className="w-[50%] h-[inherit] flex flex-col items-center justify-center">
            <span className="text-[#b0b7bd] text-[11px] uppercase font-[700] mt-[-10px]">
              Chakra Points ({cp.die})
            </span>

            <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
              <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded text-nowrap gap-1">
                <span className="inline-flex flex-col relative">
                  <ContentEditable
                    as="span"
                    className="leading-[1] w-[50px] text-right"
                    max={cp.max}
                    editable={editable}
                    type="number"
                    onChange={(newCurrentCP) => {
                      if (onChangeCurrentCp) {
                        onChangeCurrentCp(newCurrentCP);
                      }
                    }}
                  >
                    {cp.current}
                  </ContentEditable>
                  <small
                    className="text-[10px] uppercase absolute font-thin"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-13px",
                    }}
                  >
                    Current
                  </small>
                </span>{" "}
                <small className="font-thin">/</small>{" "}
                <span className="inline-flex flex-col relative">
                  <span className="leading-[1] w-[50px] text-left">
                    {cp.max}
                  </span>
                  <small
                    className="text-[10px] uppercase absolute font-thin"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-13px",
                    }}
                  >
                    Max
                  </small>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
