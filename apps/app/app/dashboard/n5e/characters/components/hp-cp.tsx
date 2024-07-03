import { Separator } from "@craft/ui";

export type ValueConfig = {
  current: number;
  max: number;
  temp: number;
};

export const HPCP: React.FC<{
  hp: ValueConfig;
  cp: ValueConfig;
}> = ({ hp, cp }) => {
  return (
    <div
      className="relative w-[317px] h-[90px] border-[20px]"
      style={{
        borderImage: "url(/fancy-horizontal-box-2-bg.svg) 20 20 20 20 fill",
      }}
    >
      <div className="w-[inherit] h-[inherit] m-[-20px] relative px-3 py-1 flex items-center">
        <div className="w-[50%] h-[inherit] flex flex-col items-center justify-center">
          <span className="text-[#b0b7bd] text-[11px] uppercase font-[700] mt-[-10px]">
            Hit Points
          </span>

          <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
            <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded text-nowrap gap-3">
              <span className="inline-flex flex-col relative">
                <span className="leading-[1]">{hp.current}</span>
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
                <span className="leading-[1]">{hp.max}</span>
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
            Chakra Points
          </span>

          <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
            <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded text-nowrap gap-3">
              <span className="inline-flex flex-col relative">
                <span className="leading-[1]">{cp.current}</span>
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
                <span className="leading-[1]">{cp.max}</span>
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
};
