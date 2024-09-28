import { useTranslation } from "@craft/translation";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@craft/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@craft/ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import { savesArray, SheetCheckbox, skillArray } from "../../components";
import { observer } from "mobx-react-lite";
import { AbilityName } from "@lib/models/n5e-character";

export type JutsuConfigSheetProps = {
  character: N5eCharacterWrapper;
  jutsuGroup: "Ninjutsu" | "Genjutsu" | "Taijutsu" | "Bukijutsu";
};

export const JutsuConfigSheet = NiceModal.create(
  observer(({ character, jutsuGroup }: JutsuConfigSheetProps) => {
    const modal = useModal(JutsuConfigSheet);

    return (
      <Sheet
        open={modal.visible}
        onOpenChange={(open) => {
          if (!open) {
            modal.hide();
          }
        }}
      >
        <SheetContent withOverlay={false} className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit {jutsuGroup}</SheetTitle>
            <SheetDescription>
              Here you can change the ability used for {jutsuGroup} casting and
              add custom bonuses to the DC and attack rolls.
            </SheetDescription>
          </SheetHeader>

          <Separator orientation="horizontal" className="my-4" />

          <div className="mt-2 flex flex-col items-start justify-start gap-2">
            <Label className="w-full flex flex-col gap-2 mb-2c">
              {jutsuGroup} Custom DC Bonus
              <Input
                variant="transparent"
                type="number"
                value={character.jutsuCustomDcBonuses[jutsuGroup]}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveJutsuCustomDCBonus(jutsuGroup, newBonus);
                  }
                }}
              />
            </Label>

            <Label className="w-full flex flex-col gap-2 mb-2c">
              {jutsuGroup} Custom Attack Bonus
              <Input
                variant="transparent"
                type="number"
                value={character.jutsuCustomAttackBonuses[jutsuGroup]}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveJutsuCustomAttackBonus(jutsuGroup, newBonus);
                  }
                }}
              />
            </Label>

            <div className="w-full space-y-3">
              <Label className="flex flex-col gap-2">
                {jutsuGroup} casting Attribute
                <Select
                  value={character.jutsuAbilities[jutsuGroup]}
                  onValueChange={(newAbility) => {
                    character.saveJutsuCustomAbility(
                      jutsuGroup,
                      newAbility as AbilityName,
                    );
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a save" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Saves</SelectLabel>

                      {savesArray.map((save) => (
                        <SelectItem key={save.name} value={save.defaultAbility}>
                          {save.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }),
);

export const useJutsuConfigSheet = () => useModal(JutsuConfigSheet);
