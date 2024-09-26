import { AbilityName, N5eCharacter } from "@craft/query";
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
import { observer } from "mobx-react-lite";

export type HPCPConfigSheetProps = {
  character: N5eCharacterWrapper;
};

export const HPCPConfigSheet = NiceModal.create(
  observer(({ character }: HPCPConfigSheetProps) => {
    const modal = useModal(HPCPConfigSheet);

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
            <SheetTitle>Edit Chakra and Hit Points</SheetTitle>
            <SheetDescription>
              Here you can change the chakra and hit points of your character as
              well as bonuses per level or flat bonuses.
            </SheetDescription>
          </SheetHeader>

          <Separator orientation="horizontal" className="my-4" />

          <div className="mt-2 flex flex-col items-start justify-start gap-2">
            <Label className="flex flex-col gap-2 mb-2c">
              Hit Points Bonus per Level
              <Input
                variant="transparent"
                type="number"
                value={character.hpConfig?.perLevelBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveHpPerLevelBonus(newBonus);
                  }
                }}
              />
            </Label>

            <Label className="flex flex-col gap-2 mb-2c">
              Hit Points Flat Bonus
              <Input
                variant="transparent"
                type="number"
                value={character.hpConfig?.flatBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveHpFlatBonus(newBonus);
                  }
                }}
              />
            </Label>

            <Separator orientation="horizontal" className="my-4" />

            <Label className="flex flex-col gap-2 mb-2c">
              Chakra Bonus per Level
              <Input
                variant="transparent"
                type="number"
                value={character.cpConfig?.perLevelBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveCpPerLevelBonus(newBonus);
                  }
                }}
              />
            </Label>

            <Label className="flex flex-col gap-2 mb-2c">
              Chakra Flat Bonus
              <Input
                variant="transparent"
                type="number"
                value={character.cpConfig?.flatBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveCpFlatBonus(newBonus);
                  }
                }}
              />
            </Label>
          </div>
        </SheetContent>
      </Sheet>
    );
  }),
);

export const useHPCPConfigSheet = () => useModal(HPCPConfigSheet);
