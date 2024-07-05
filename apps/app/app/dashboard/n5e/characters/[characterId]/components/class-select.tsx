import { N5eCharacter } from "@craft/query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@craft/ui/select";
import classes from "app/dashboard/n5e/data/classes.json";
import { useState } from "react";

export const ClassSelect: React.FC<{
  value: N5eCharacter["classes"];
  onChange: (value: N5eCharacter["classes"]) => void;
}> = ({ value, onChange }) => {
  const [selectedClass, setSelectedClass] = useState(value?.[0] ?? undefined);

  const subclasses =
    classes.find((classObj) => classObj.name === selectedClass?.name)
      ?.subclasses ?? [];

  return (
    <div className="inline-flex items-center gap-1">
      <Select
        defaultValue={selectedClass?.name}
        onValueChange={(newValue) => {
          const classObj = classes.find(
            (classObj) => classObj.name === newValue,
          );

          if (!classObj) return;

          const subclassBelongsToClass = classObj.subclasses.includes(
            selectedClass?.subclass ?? "",
          );

          const newChange = {
            name: newValue,
            subclass: subclassBelongsToClass
              ? selectedClass?.subclass
              : undefined,
            chakraDie: classObj.chakraDie,
            hitDie: classObj.hitDie,
            level: 1,
          };
          onChange([newChange]);

          setSelectedClass(newChange);
        }}
      >
        <SelectTrigger
          className="inline-flex w-auto border-none px-0 pt-0 pb-2 h-auto font-thin text-xs text-nowrap whitespace-nowrap"
          style={{
            minWidth: "fit-content",
          }}
        >
          <SelectValue placeholder="Select a class">
            {selectedClass?.name ?? "Select a class"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {classes.map((classObj) => (
              <SelectItem key={classObj.name} value={classObj.name}>
                {classObj.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={selectedClass?.subclass}
        onValueChange={(newValue) => {
          const classObj = classes.find(
            (classObj) => classObj.name === selectedClass?.name,
          );

          if (!classObj) return;

          const newChange = {
            name: selectedClass?.name,
            subclass: newValue,
            chakraDie: classObj.chakraDie,
            hitDie: classObj.hitDie,
            level: 1,
          };

          onChange([newChange]);

          setSelectedClass(newChange);
        }}
      >
        <SelectTrigger
          className="inline-flex w-auto border-none pl-0 pt-0 pb-2 h-auto font-thin text-xs text-nowrap whitespace-nowrap"
          style={{
            minWidth: "fit-content",
          }}
        >
          <SelectValue placeholder="Select a subclass">
            {selectedClass?.subclass ?? "Select a subclass"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {subclasses.map((subclass) => (
              <SelectItem key={subclass} value={subclass}>
                {subclass}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
