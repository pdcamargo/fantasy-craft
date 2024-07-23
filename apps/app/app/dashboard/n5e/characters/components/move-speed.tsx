import { cn } from "@craft/ui/utils";
import { observer } from "mobx-react-lite";

export const MoveSpeed: React.FC<{
  speed: number;
  className?: string;
}> = observer(({ speed, className }) => {
  return (
    <div
      className={cn(
        "relative w-[100px] h-[95px] text-center border-[20px]",
        className,
      )}
      style={{
        borderImage: "url(/fancy-box-2-bg.svg) 10 10 10 10 fill",
      }}
    >
      <div className="w-[inherit] h-[inherit] m-[-20px] relative">
        <div className="pt-[2px] relative">
          <span className="uppercase font-[700] text-[#b0b7bd] text-[11px]">
            Walking
          </span>
        </div>

        <div className="text-[#b0b7bd] text-[30px] font-medium relative">
          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded">
            {speed}{" "}
            <small className="text-[#b0b7bd] font-normal text-[60%] absolute right-[-7px]">
              ft.
            </small>
          </span>
        </div>

        <div className="text-[#b0b7bd] bottom-[4px] text-[12px] font-bold absolute left-0 right-0 uppercase">
          Speed
        </div>
      </div>
    </div>
  );
});
