import { cn } from "@craft/ui/utils";

export const FancyBox: React.FC<{
  heading?: string;
  subheading?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ heading, subheading, className, children }) => {
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
      <div
        className={cn("w-[inherit] h-[inherit] m-[-20px] relative", {
          "flex items-center justify-center": !heading && !subheading,
        })}
      >
        {heading && (
          <div className="relative">
            <span className="uppercase font-[700] text-[#b0b7bd] text-[11px]">
              {heading}
            </span>
          </div>
        )}

        <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full">
          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
            {children}
          </span>
        </div>

        {subheading && (
          <div className="text-[#b0b7bd] bottom-[4px] text-[12px] font-bold absolute left-0 right-0 uppercase">
            {subheading}
          </div>
        )}
      </div>
    </div>
  );
};
