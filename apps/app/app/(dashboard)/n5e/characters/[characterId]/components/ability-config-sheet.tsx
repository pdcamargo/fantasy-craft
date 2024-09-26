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

import {
  N5eCharacterWrapper,
  SkillsRecord,
} from "app/(dashboard)/n5e/utils/n5e-character-wrapper";
import { savesArray, SheetCheckbox, skillArray } from "../../components";
import { observer } from "mobx-react-lite";

export const compactAbilities = [
  {
    skillsHeadingText: "Skills",
    ability: "Strength",
  },
  {
    skillsHeadingText: "Skills",
    ability: "Dexterity",
  },
  {
    skillsHeadingText: "Skills",
    ability: "Constitution",
  },
  {
    skillsHeadingText: "Skills",
    ability: "Intelligence",
  },
  {
    skillsHeadingText: "Skills",
    ability: "Wisdom",
  },
  {
    skillsHeadingText: "Skills",
    ability: "Charisma",
  },
] as const;

export type AbilityConfigSheetProps = {
  character: N5eCharacterWrapper;
  ability: (typeof compactAbilities)[number]["ability"];
  groupSkills: typeof skillArray;
  skills: SkillsRecord;
};

export const AbilityConfigSheet = NiceModal.create(
  observer(
    ({ character, groupSkills, skills, ability }: AbilityConfigSheetProps) => {
      const modal = useModal(AbilityConfigSheet);

      const defaultSaveAttribute = savesArray.find(
        (save) => save.name === ability,
      )?.defaultAbility;

      const biggestSkillGroupName = groupSkills.reduce((prev, curr) =>
        prev.name.length > curr.name.length ? prev : curr,
      ).name;

      const biggestSkillGroupNameLength = biggestSkillGroupName.length;

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
                Edit {ability}{" "}
                {
                  compactAbilities.find((a) => a.ability === ability)
                    ?.skillsHeadingText
                }
              </SheetTitle>
              <SheetDescription>
                Here you can change the ability used for saving throws and
                skills or add flat bonuses.
              </SheetDescription>
            </SheetHeader>

            <Separator orientation="horizontal" className="my-4" />

            <div className="mt-2 flex flex-col items-start justify-start gap-2">
              <Label className="flex flex-col gap-2 mb-2c">
                {character.savesCustomAbilities[ability] ??
                  defaultSaveAttribute}{" "}
                Attribute Custom Bonus
                <Input
                  variant="transparent"
                  type="number"
                  value={0}
                  onChange={(e) => {
                    const newBonus = e.currentTarget.valueAsNumber;

                    if (!Number.isNaN(newBonus)) {
                      character.saveAbilityCustomBonus(ability, newBonus);
                    }
                  }}
                />
              </Label>

              <div className="w-full space-y-3">
                <Label className="flex flex-col gap-2">
                  Saving Throw Attribute
                  <Select
                    value={
                      character.savesCustomAbilities[ability] ??
                      defaultSaveAttribute
                    }
                    onValueChange={() => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a save" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Saves</SelectLabel>

                        {savesArray.map((save) => (
                          <SelectItem
                            key={save.name}
                            value={save.defaultAbility}
                          >
                            {save.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Label>

                <Label className="flex flex-col gap-2">
                  {character.savesCustomAbilities[ability] ??
                    defaultSaveAttribute}{" "}
                  Save Custom Bonus
                  <Input
                    variant="transparent"
                    type="number"
                    value={0}
                    onChange={() => {}}
                  />
                </Label>
              </div>

              <Separator orientation="horizontal" className="my-4" />

              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center mb-[5px] text-[#b0b7bd]">
                  <div className="flex text-[10px] font-semibold text-nowrap whitespace-nowrap w-[40px] uppercase">
                    Prof
                  </div>

                  <div
                    className="p-[5px_0] flex-[1_1] text-[10px] font-semibold text-nowrap whitespace-nowrap uppercase"
                    style={{
                      minWidth: `${biggestSkillGroupNameLength}ch`,
                    }}
                  >
                    Name
                  </div>
                  <div className="flex text-[10px] font-semibold text-nowrap whitespace-nowrap w-[70px] uppercase">
                    Ability
                  </div>
                  <div className="flex text-[10px] font-semibold text-nowrap whitespace-nowrap w-[45px] uppercase">
                    Bonus
                  </div>
                  <div className="flex text-[10px] font-semibold text-nowrap whitespace-nowrap w-[45px] uppercase">
                    Mast.
                  </div>
                </div>

                {groupSkills.map((groupSkill) => {
                  let skill = skills[groupSkill.name];

                  if (!skill) {
                    skill = {
                      customBonus: 0,
                      isProficient: false,
                      mastery: 0,
                      customAbility: undefined,
                      bonus: 0,
                    };
                  }

                  const ability =
                    skill.customAbility || groupSkill.defaultAbility;

                  return (
                    <div
                      key={groupSkill.name}
                      className="w-full flex items-center mb-[5px] text-[#b0b7bd] border-[rgba(197,49,49,0.4)] border-b"
                    >
                      <div className="w-min px-2 flex items-center">
                        <SheetCheckbox
                          checked={!!skill.isProficient}
                          editable
                          onCheckedChange={(newProficient) => {
                            character.saveSkillProficiency(
                              groupSkill.name,
                              newProficient,
                            );
                          }}
                        />
                      </div>

                      <div
                        className="p-[5px_0] flex-[1_1] text-[14px] text-nowrap whitespace-nowrap"
                        style={{
                          minWidth: `${biggestSkillGroupNameLength}ch`,
                        }}
                      >
                        {groupSkill.name}
                      </div>

                      <div className="w-[70px] ml-2 font-bold uppercase text-xs text-center">
                        <Select
                          value={ability}
                          onValueChange={(skillAbility) => {
                            character.saveSkillCustomAbility(
                              groupSkill.name,
                              skillAbility as AbilityName,
                            );
                          }}
                        >
                          <SelectTrigger className="text-[14px]">
                            <SelectValue className="uppercase">
                              {ability.slice(0, 3).toUpperCase()}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Abilities</SelectLabel>

                              {compactAbilities.map((a) => (
                                <SelectItem key={a.ability} value={a.ability}>
                                  {a.ability}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-[40px] ml-2 text-[14px]">
                        <Input
                          type="number"
                          defaultValue={skill.customBonus ?? 0}
                          onChange={(e) => {
                            const newBonus = e.currentTarget.valueAsNumber;

                            if (!Number.isNaN(+newBonus)) {
                              character.saveSkillCustomBonus(
                                groupSkill.name,
                                newBonus,
                              );
                            }
                          }}
                          className="px-1 text-center"
                          variant="transparent"
                        />
                      </div>
                      <div className="w-[50px] ml-2 text-[14px]">
                        <Select
                          onValueChange={(newMastery) => {
                            character.saveSkillMastery(
                              groupSkill.name,
                              +newMastery,
                            );
                          }}
                          value={(skill.mastery ?? 0).toString()}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Mastery Rank</SelectLabel>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    },
  ),
);

export const useAbilityConfigSheet = () => useModal(AbilityConfigSheet);
