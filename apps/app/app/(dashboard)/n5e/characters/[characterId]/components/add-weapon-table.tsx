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
import { abilities } from "@lib/models/n5e-character";
import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import {
  Weapon,
  weaponDamageTypes,
  WeaponDatabase,
} from "app/(dashboard)/n5e/utils/weapons-database";
import { produce } from "immer";
import { EllipsisVertical } from "lucide-react";
import { observer } from "mobx-react-lite";
import React from "react";

export type AddWeaponTableProps = {
  character: N5eCharacterWrapper;
};

const allWeapons = WeaponDatabase.all;

const emptyWeapon = {
  name: "",
  damageDice: "",
  ability: "",
  addProficiency: false,
  addAbilityModifierToAttack: false,
  addAbilityModifierToDamage: false,
  damageType: "",
  customAttackBonus: 0,
  customDamageBonus: 0,
  traits: "",
};

export const AddWeaponTable = observer(({ character }: AddWeaponTableProps) => {
  const [weapon, setWeapon] = React.useState<Weapon | null>(null);

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
            <TableHead>Name</TableHead>
            <TableHead>Damage Dice</TableHead>
            <TableHead>Ability</TableHead>
            <TableHead>Add Prof.</TableHead>
            <TableHead>Ability to Atk.</TableHead>
            <TableHead>Ability to Dmg.</TableHead>
            <TableHead>Dmg. Type</TableHead>
            <TableHead>Custom Atk. Bonus</TableHead>
            <TableHead>Custom Dmg. Bonus</TableHead>
            <TableHead>Traits</TableHead>
            <TableHead>#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white">
          {character.weapons.map((weapon, idx) => (
            <TableRow key={weapon?.name}>
              <TableCell>
                <ContentEditable
                  placeholder="Weapon Name"
                  onChange={(newWeaponName: string) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
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
                  placeholder="Damage Dice"
                  onChange={(newDamageDice: string) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
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
                      produce(weapon, (draft) => {
                        draft.ability = val;
                      })
                    );
                  }}
                >
                  <SelectTrigger>
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
              <TableCell>
                <Checkbox
                  className="border-gray-500"
                  checked={weapon?.addProficiency}
                  onCheckedChange={(checkedState) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
                        draft.addProficiency = !!checkedState;
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  className="border-gray-500"
                  checked={weapon?.addAbilityModifierToAttack}
                  onCheckedChange={(checkedState) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
                        draft.addAbilityModifierToAttack = !!checkedState;
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  className="border-gray-500"
                  checked={weapon?.addAbilityModifierToDamage}
                  onCheckedChange={(checkedState) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
                        draft.addAbilityModifierToDamage = !!checkedState;
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
                      produce(weapon, (draft) => {
                        draft.damageType = val;
                      })
                    );
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Damage Type" />
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
                  placeholder="Custom Attack Bonus"
                  type="number"
                  onChange={(newCustomAttackBonus) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
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
                  placeholder="Custom Damage Bonus"
                  type="number"
                  onChange={(newCustomDamageBonus: number) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
                        draft.customDamageBonus = newCustomDamageBonus;
                      })
                    );
                  }}
                >
                  {weapon?.customDamageBonus}
                </ContentEditable>
              </TableCell>
              <TableCell>
                <MultiSelect
                  value={weapon?.traits ? weapon?.traits.split(", ") : []}
                  onChange={(newTraits) => {
                    character.updateWeapon(
                      idx,
                      produce(weapon, (draft) => {
                        draft.traits = newTraits.join(", ");
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <EllipsisVertical />
              </TableCell>
            </TableRow>
          ))}
          <TableRow key={weapon?.name}>
            <TableCell>
              <Select
                value={weapon?.name}
                onValueChange={(val) => {
                  const weapon = allWeapons.find(
                    (weapon) => weapon.name === val
                  );
                  setWeapon(weapon!);
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
                placeholder="Damage Dice"
                className="text-nowrap"
                onChange={(newDamageDice: string) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
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
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.ability = val;
                    })
                  );
                }}
              >
                <SelectTrigger>
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
            <TableCell>
              <Checkbox
                className="border-gray-500"
                checked={weapon?.addProficiency}
                onCheckedChange={(checkedState) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.addProficiency = !!checkedState;
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                className="border-gray-500"
                checked={weapon?.addAbilityModifierToAttack}
                onCheckedChange={(checkedState) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.addAbilityModifierToAttack = !!checkedState;
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                className="border-gray-500"
                checked={weapon?.addAbilityModifierToDamage}
                onCheckedChange={(checkedState) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.addAbilityModifierToDamage = !!checkedState;
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Select
                value={weapon?.damageType}
                onValueChange={(val) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.damageType = val;
                    })
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Damage Type" />
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
                placeholder="Custom Attack Bonus"
                type="number"
                onChange={(newCustomAttackBonus) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
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
                placeholder="Custom Damage Bonus"
                type="number"
                onChange={(newCustomDamageBonus: number) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.customDamageBonus = newCustomDamageBonus;
                    })
                  );
                }}
              >
                {weapon?.customDamageBonus}
              </ContentEditable>
            </TableCell>
            <TableCell>
              <MultiSelect
                value={weapon?.traits ? weapon?.traits.split(", ") : []}
                onChange={(newTraits) => {
                  setWeapon(
                    produce(weapon || emptyWeapon, (draft) => {
                      draft.traits = newTraits.join(", ");
                    })
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="secondary"
                disabled={!weapon}
                onClick={() => {
                  character.addWeapon(weapon!);
                  setWeapon(null);
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
