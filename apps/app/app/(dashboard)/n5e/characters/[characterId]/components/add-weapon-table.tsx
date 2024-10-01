import {
  Button,
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
  ContentEditable,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  MultiSelect,
} from "@craft/ui";
import { abilities, emptyWeapon } from "@lib/models/n5e-character";
import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import {
  Weapon,
  weaponDamageTypes,
  WeaponDatabase,
} from "app/(dashboard)/n5e/utils/weapons-database";
import { produce } from "immer";
import { EllipsisVertical } from "lucide-react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";

export type AddWeaponTableProps = {
  character: N5eCharacterWrapper;
};

const allWeapons = WeaponDatabase.all;

export const AddWeaponTable = observer(({ character }: AddWeaponTableProps) => {
  const [weaponToAdd, setWeaponToAdd] = React.useState<Weapon>(emptyWeapon);

  return (
    <>
      <span className="text-white font-semibold text-xs uppercase">
        Weapons/Attacks{" "}
        <Button
          variant="red"
          size="xs"
          // onClick={() => addWeaponSheet.show({ character })}
        >
          +
        </Button>
      </span>
      {/* <Table className="flex-1 w-full p-2 border-2 border-muted rounded mb-3"> */}
      <Table className="w-full p-2 border-2 border-muted rounded mb-3">
        <TableCaption>A list of your weapons/attacks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Name
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Dmg Dice
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Ability
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Add Prof.
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Dmg. Type
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] max-w-[80px]">
              Custom Atk. Bonus
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] max-w-[80px]">
              Custom Dmg. Bonus
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              Traits
            </TableHead>
            <TableHead className="uppercase text-[10px] leading-[1] text-nowrap">
              #
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white">
          {character.weapons.map((weapon, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <ContentEditable
                  placeholder="Weapon Name"
                  className="text-xs text-nowrap"
                  onChange={(newWeaponName: string) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.name = newWeaponName;
                      })
                    );
                  }}
                >
                  {weapon?.name}
                </ContentEditable>
              </TableCell>
              <TableCell>
                <ContentEditable
                  placeholder="Dmg. Dice"
                  className="text-nowrap text-xs text-center"
                  onChange={(newDamageDice: string) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.damageDice = newDamageDice;
                      })
                    );
                  }}
                >
                  {weapon?.damageDice}
                </ContentEditable>
              </TableCell>
              <TableCell>
                <Select
                  value={weapon?.ability}
                  onValueChange={(val) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.ability = val;
                      })
                    );
                  }}
                >
                  <SelectTrigger className="text-xs text-nowrap">
                    <SelectValue placeholder="Ability" />
                  </SelectTrigger>
                  <SelectContent>
                    {abilities.map((ability) => (
                      <SelectItem key={ability} value={ability}>
                        {ability}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="px-0">
                <Checkbox
                  className="border-gray-500 block mx-auto"
                  checked={weapon?.addProficiency}
                  onCheckedChange={(checkedState) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.addProficiency = !!checkedState;
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={weapon?.damageType}
                  onValueChange={(val) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.damageType = val;
                      })
                    );
                  }}
                >
                  <SelectTrigger className="text-xs text-nowrap">
                    <SelectValue placeholder="Dmg. Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {weaponDamageTypes.map((damageType) => (
                      <SelectItem key={damageType} value={damageType}>
                        {damageType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <ContentEditable
                  className="text-nowrap text-xs text-center"
                  placeholder="Custom Attack Bonus"
                  type="number"
                  onChange={(newCustomAttackBonus) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.customAttackBonus = newCustomAttackBonus;
                      })
                    );
                  }}
                >
                  {weapon?.customAttackBonus}
                </ContentEditable>
              </TableCell>
              <TableCell>
                <ContentEditable
                  className="text-nowrap text-xs text-center"
                  placeholder="Custom Damage Bonus"
                  type="number"
                  onChange={(newCustomDamageBonus: number) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.customDamageBonus = newCustomDamageBonus;
                      })
                    );
                  }}
                >
                  {weapon?.customDamageBonus}
                </ContentEditable>
              </TableCell>
              <TableCell className="max-w-56">
                <MultiSelect
                  variant="transparent"
                  size="sm"
                  value={weapon?.traits ? weapon?.traits.split(", ") : []}
                  onChange={(newTraits) => {
                    character.updateWeapon(
                      idx,
                      produce(toJS(weapon), (draft) => {
                        draft.traits = newTraits.join(", ");
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <EllipsisVertical
                  onClick={() => {
                    character.removeWeapon(idx);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow key={weaponToAdd?.name}>
            <TableCell>
              <Select
                value={weaponToAdd?.name}
                onValueChange={(val) => {
                  const weapon = allWeapons.find(
                    (weapon) => weapon.name === val
                  );
                  setWeaponToAdd(weapon!);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Weapon Name" />
                </SelectTrigger>
                <SelectContent>
                  {allWeapons.map((weapon) => (
                    <SelectItem key={weapon.name} value={weapon.name}>
                      {weapon.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <ContentEditable
                placeholder="Dmg. Dice"
                className="text-nowrap text-xs text-center"
                onChange={(newDamageDice: string) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.damageDice = newDamageDice;
                    })
                  );
                }}
              >
                {weaponToAdd?.damageDice}
              </ContentEditable>
            </TableCell>
            <TableCell>
              <Select
                value={weaponToAdd?.ability}
                onValueChange={(val) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.ability = val;
                    })
                  );
                }}
              >
                <SelectTrigger className="text-xs text-nowrap">
                  <SelectValue placeholder="Ability" />
                </SelectTrigger>
                <SelectContent>
                  {abilities.map((ability) => (
                    <SelectItem key={ability} value={ability}>
                      {ability}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="px-0">
              <Checkbox
                className="border-gray-500 block mx-auto"
                checked={weaponToAdd?.addProficiency}
                onCheckedChange={(checkedState) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.addProficiency = !!checkedState;
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Select
                value={weaponToAdd?.damageType}
                onValueChange={(val) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.damageType = val;
                    })
                  );
                }}
              >
                <SelectTrigger className="text-xs text-nowrap">
                  <SelectValue placeholder="Dmg. Type" />
                </SelectTrigger>
                <SelectContent>
                  {weaponDamageTypes.map((damageType) => (
                    <SelectItem key={damageType} value={damageType}>
                      {damageType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <ContentEditable
                className="text-nowrap text-xs text-center"
                placeholder="Custom Attack Bonus"
                type="number"
                onChange={(newCustomAttackBonus) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.customAttackBonus = newCustomAttackBonus;
                    })
                  );
                }}
              >
                {weaponToAdd?.customAttackBonus}
              </ContentEditable>
            </TableCell>
            <TableCell>
              <ContentEditable
                className="text-nowrap text-xs text-center"
                placeholder="Custom Damage Bonus"
                type="number"
                onChange={(newCustomDamageBonus: number) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.customDamageBonus = newCustomDamageBonus;
                    })
                  );
                }}
              >
                {weaponToAdd?.customDamageBonus}
              </ContentEditable>
            </TableCell>
            <TableCell>
              <MultiSelect
                variant="transparent"
                size="sm"
                value={
                  weaponToAdd?.traits ? weaponToAdd?.traits.split(", ") : []
                }
                onChange={(newTraits) => {
                  setWeaponToAdd(
                    produce(weaponToAdd, (draft) => {
                      draft.traits = newTraits.join(", ");
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="secondary"
                disabled={!weaponToAdd}
                onClick={() => {
                  character.addWeapon(weaponToAdd!);
                  setWeaponToAdd(emptyWeapon);
                }}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
});
