import { useTranslation } from "@craft/translation";
import { Input, Label, Separator } from "@craft/ui";
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

export type OtherConfigSheetProps = {
  character: N5eCharacterWrapper;
};

export const OtherConfigSheet = NiceModal.create(
  observer(({ character }: OtherConfigSheetProps) => {
    const modal = useModal(OtherConfigSheet);

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
            <SheetTitle>Other config</SheetTitle>
            <SheetDescription>
              Here you can change your move speed, initiative bonus and armor
              class.
            </SheetDescription>
          </SheetHeader>

          <Separator orientation="horizontal" className="my-4" />

          <div className="mt-2 flex flex-col items-start justify-start gap-2">
            <Label className="flex flex-col gap-2 mb-2c">
              Armor class bonus
              <Input
                variant="transparent"
                type="number"
                value={character.armorClassCustomBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveArmorClassCustomBonus(newBonus);
                  }
                }}
              />
            </Label>

            <Label className="flex flex-col gap-2 mb-2c">
              Initiative bonus
              <Input
                variant="transparent"
                type="number"
                value={character.initiativeBonus ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveInitiativeBonus(newBonus);
                  }
                }}
              />
            </Label>

            {/* <Separator orientation="horizontal" className="my-4" /> */}

            <Label className="flex flex-col gap-2 mb-2c">
              Movement speed
              <Input
                variant="transparent"
                type="number"
                value={character.movementSpeed ?? 0}
                onChange={(e) => {
                  const newBonus = e.currentTarget.valueAsNumber;

                  if (!Number.isNaN(newBonus)) {
                    character.saveMovementSpeed(newBonus);
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

export const useOtherConfigSheet = () => useModal(OtherConfigSheet);
