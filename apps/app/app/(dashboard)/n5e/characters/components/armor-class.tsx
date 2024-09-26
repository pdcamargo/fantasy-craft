import { cn } from "@craft/ui/utils";
import { observer } from "mobx-react-lite";

export const ArmorClass: React.FC<{
  armorClass: number;
  className?: string;
}> = observer(({ armorClass, className }) => {
  return (
    <div
      className={cn(
        "relative h-[110px] w-[95px] text-center border-[20px]",
        className,
      )}
      style={{
        borderImage: "url(/fancy-armor-box-bg.svg) 20 20 20 20 fill",
      }}
    >
      <div className="w-[inherit] h-[inherit] m-[-20px] relative flex flex-col justify-center">
        <div className="uppercase font-[700] text-[#b0b7bd] text-[12px]">
          Armor
        </div>

        <div className="text-[30px] font-medium relative text-white leading-[1]">
          {armorClass}
        </div>

        <div className="text-[#b0b7bd] text-[12px] font-bold uppercase">
          Class
        </div>
      </div>
    </div>
  );
});
