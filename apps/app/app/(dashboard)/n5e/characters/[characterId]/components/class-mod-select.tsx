import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@craft/ui/select";
import classMod from "app/(dashboard)/n5e/data/class-mods.json";

export const ClassModSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="pr-2">
      <Select
        defaultValue={value}
        onValueChange={(newValue) => {
          onChange(newValue);
        }}
      >
        <SelectTrigger
          className="inline-flex w-auto border-none px-0 pt-0 h-auto font-thin text-xs text-nowrap whitespace-nowrap italic"
          style={{
            minWidth: "fit-content",
          }}
        >
          <SelectValue placeholder="Select a class mod">
            {value || "Select a class mod"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Class Mods</SelectLabel>

            {classMod.map((classMod) => (
              <SelectItem key={classMod.name} value={classMod.name}>
                {classMod.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
