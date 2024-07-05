import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@craft/ui/select";
import clans from "app/dashboard/n5e/data/clans.json";

export const ClanSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <Select
      defaultValue={value}
      onValueChange={(newValue) => {
        onChange(newValue);
      }}
    >
      <SelectTrigger className="inline-flex w-auto border-none px-0 py-1 h-auto font-thin text-[15px]">
        <SelectValue placeholder="Select a clan" />
        <span className="inline-block ml-1"> Clan</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clans</SelectLabel>

          {clans.map((clan) => (
            <SelectItem key={clan} value={clan}>
              {clan}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
