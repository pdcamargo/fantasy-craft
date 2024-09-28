import { N5eCharacterWrapper } from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import {
  Weapon,
  WeaponDatabase,
} from "app/(dashboard)/n5e/utils/weapons-database";
import { observer } from "mobx-react-lite";

export type AddWeaponTableProps = {
  character: N5eCharacterWrapper;
};

const allWeapons = WeaponDatabase.all;

export const AddWeaponTable = observer(({ character }: AddWeaponTableProps) => {
  return <div></div>;
});
