import { cn } from "@craft/ui/utils";

export const Proficiency: React.FC<{
  proficiency: number;
  className?: string;
}> = ({ proficiency, className }) => {
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
        <div className="relative">
          <span className="uppercase font-[700] text-[#b0b7bd] text-[11px]">
            Proficiency
          </span>
        </div>

        <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
            <small className="text-[#b0b7bd] font-normal text-[60%]">
              {proficiency > 0 ? "+" : "-"}
            </small>
            {Math.abs(proficiency)}
          </span>
        </div>

        <div className="text-[#b0b7bd] bottom-[4px] text-[12px] font-bold absolute left-0 right-0 uppercase">
          Bonus
        </div>
      </div>
    </div>
  );
};
