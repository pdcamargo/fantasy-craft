import { useTranslation } from "@craft/translation";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  MultiSelect,
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@craft/ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import { observer } from "mobx-react-lite";
import { z } from "zod";
import { compactAbilities } from "./ability-config-sheet";

const weaponSchema = z
  .object({
    name: z.string(),
    ability: z.string(),
    customAttackBonus: z.number(),
    type: z.string(),
    damage: z.string(),
    properties: z.array(z.string()),
  })
  .default({
    name: "",
    ability: "Strength",
    customAttackBonus: 0,
    type: "Slash",
    damage: "",
    properties: [],
  });

export type AddWeaponSheetProps = {
  character: N5eCharacterWrapper;
  weapon?: N5eCharacterWrapper["weapons"][0] & {
    index: number;
  };
};

export const AddWeaponSheet = NiceModal.create(
  observer(({ character, weapon }: AddWeaponSheetProps) => {
    const { index } = weapon || { index: -1 };

    const modal = useModal(AddWeaponSheet);
    const form = useForm({
      resolver: zodResolver(weaponSchema),
      defaultValues: weapon || {
        name: "",
        ability: "Strength",
        customAttackBonus: 0,
        type: "Slash",
        damage: "",
        properties: [],
      },
    });

    const ability = form.watch("ability");

    const onSubmit = form.handleSubmit(async (values) => {
      if (!weapon) {
        character.addWeapon(values);
      } else {
        character.updateWeapon(index, values);
      }

      modal.hide();
    });

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
            <SheetTitle>
              {weapon ? "Update" : "Add"} new Weapon/Attack
            </SheetTitle>
            <SheetDescription>
              Here you can {weapon ? "update" : "add"} a new weapon or attack to
              your character and assign an ability and custom bonus and stats.
            </SheetDescription>
          </SheetHeader>

          <Separator orientation="horizontal" className="my-4" />

          <div className="mt-2 flex flex-col items-start justify-start gap-2">
            <Form {...form}>
              <form className="w-full" onSubmit={onSubmit}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input variant="transparent" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ability</FormLabel>
                      <FormControl>
                        <Select {...field} value={ability}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an ability" />
                          </SelectTrigger>
                          <SelectContent>
                            {compactAbilities.map(({ ability }) => (
                              <SelectItem key={ability} value={ability}>
                                {ability}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customAttackBonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Attack Bonus</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          variant="transparent"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            let finalValue = 0;

                            if (!isNaN(e.currentTarget.valueAsNumber)) {
                              finalValue = e.currentTarget.valueAsNumber;
                            }

                            form.setValue("customAttackBonus", finalValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input variant="transparent" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="damage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Damage</FormLabel>
                      <FormControl>
                        <Input variant="transparent" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="properties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Properties</FormLabel>
                      <FormControl>
                        <MultiSelect
                          variant="transparent"
                          onChange={(properties) => {
                            form.setValue("properties", properties as any);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator orientation="horizontal" className="my-4" />

                <SheetFooter>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      modal.hide();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {weapon ? "Update" : "Add"} Weapon
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    );
  })
);

export const useAddWeaponSheet = () => useModal(AddWeaponSheet);
