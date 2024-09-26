import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@craft/ui/select";
import backgrounds from "app/dashboard/n5e/data/backgrounds.json";

export const BackgroundSelect: React.FC<{
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
      <SelectTrigger className="inline-flex w-auto border-none pl-0 py-1 h-auto font-bold">
        <SelectValue placeholder="Select a background" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clans</SelectLabel>

          {backgrounds.map((background) => (
            <SelectItem key={background} value={background}>
              {background}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
