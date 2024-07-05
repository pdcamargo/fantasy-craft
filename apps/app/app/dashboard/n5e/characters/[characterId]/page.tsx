"use client";

import { useTranslation } from "@craft/translation";
import {
  Card,
  CardContent,
  ContentEditable,
  Loader,
  Separator,
} from "@craft/ui";

import {
  DashboardToolbar,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";

import {
  ArmorClass,
  CompactAbility,
  ElementalAffinity,
  HPCP,
  Initiative,
  MoveSpeed,
  Proficiency,
} from "../components";
import { useGetCharacter, useUpdateCharacter } from "@craft/query";
import { BackgroundSelect, ClanSelect, ClassSelect } from "./components";
import { useDebouncedSave } from "@craft/ui/hooks";

import { N5eCharacterWrapper } from "app/dashboard/n5e/utils/n5e-character-wrapper";
import { useQueryClient } from "@tanstack/react-query";

export default function NewCharacterPage({
  params,
}: {
  params: {
    characterId: string;
  };
}) {
  const updateCharacter = useUpdateCharacter(params.characterId);

  const saveName = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ name: value }),
  );
  const saveBackground = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ background: value }),
  );
  const saveClan = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ clan: value }),
  );
  const saveClass = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ classes: value }),
  );

  const saveAbilities = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ abilities: value }),
  );

  const saveSavingThrows = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ savingThrows: value }),
  );

  const saveSkills = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({
      skills: value,
    }),
  );

  const { data, isLoading } = useGetCharacter(params.characterId);
  const { t } = useTranslation();

  if (!data || isLoading) {
    return (
      <div className="w-screen h-screen backdrop-blur bg-black/10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const [response, { data: character }] = data;

  if (response.status === 404 || !character) {
    return (
      <div className="w-screen h-screen backdrop-blur bg-black/10 flex items-center justify-center">
        <div className="text-white text-3xl font-bold">Character not found</div>
      </div>
    );
  }

  if (response.status !== 200) {
    return (
      <div className="w-screen h-screen backdrop-blur bg-black/10 flex items-center justify-center">
        <div className="text-white text-3xl font-bold">
          An error occurred while fetching the character
        </div>
      </div>
    );
  }

  const n5eCharacter = new N5eCharacterWrapper(character);

  return (
    <div className="bg-contain bg-no-repeat">
      <div
        className="w-full h-[720px] top-0 absolute pointer-events-none"
        style={{
          maskImage: "linear-gradient(black, transparent)",
        }}
      >
        <img src="/konoha.png" className="absolute left-0 right-0 w-full" />
      </div>

      <DashboardToolbar className="relative z-[1]">
        <DashboradPageInfo className="pb-0">
          <div className="flex items-start gap-3">
            <div className="rounded-lg border border-[#C53131] size-[100px] font-roboto relative overflow-hidden select-none">
              <img
                src="/ashura.jpg"
                alt="Character Avatar"
                className="w-full"
              />
              <div className="bg-black h-5 w-full rounded-b absolute flex items-center justify-center text-center text-xs font-bold bottom-0">
                LVL {character.level}
              </div>
            </div>
            <div className="flex flex-col w-[250px]">
              <span className="text-xl font-bold">
                <ContentEditable
                  className="text-base max-w-full line-clamp-2 border-b border-b-white/10"
                  onChange={saveName}
                >
                  {character.name}
                </ContentEditable>
                <small className="font-thin">
                  <ClanSelect value={character.clan} onChange={saveClan} /> -{" "}
                  <BackgroundSelect
                    value={character.background}
                    onChange={saveBackground}
                  />
                </small>
              </span>
              <ClassSelect onChange={saveClass} value={character.classes} />
              <span className="font-thin text-xs mt-1 italic">
                Tobirama's Legacy Class Mod
              </span>

              <ElementalAffinity affinities={character.elementalAffinities} />
            </div>

            <Separator
              orientation="vertical"
              className="bg-white/10 h-14 self-center mx-10"
            />

            <div className="flex items-center gap-5 ml-auto">
              <HPCP
                hp={{
                  current: character.currentHp,
                  max: character.maxHp,
                  temp: character.temporaryHp,
                }}
                cp={{
                  current: character.currentCp,
                  max: character.maxCp,
                  temp: character.temporaryCp,
                }}
              />

              <Separator orientation="vertical" className="bg-white/10 h-14" />

              <Proficiency proficiency={n5eCharacter.proficiencyBonus} />

              <ArmorClass armorClass={n5eCharacter.armorClass} />

              <Initiative initiative={n5eCharacter.dexMod} />

              <MoveSpeed speed={30} />
            </div>
          </div>
        </DashboradPageInfo>
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1 font-roboto relative z-[1]">
          <CardContent
            className="pt-6 grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
            }}
          >
            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Strength"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Strength"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Strength"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />
            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Constitution"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Constitution"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Constitution"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />
            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Dexterity"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Dexterity"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Dexterity"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />

            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Intelligence"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Intelligence"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Intelligence"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />
            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Wisdom"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Wisdom"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Wisdom"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />
            <CompactAbility
              character={n5eCharacter}
              skillsHeadingText="Skills"
              ability="Charisma"
              onAbilityChange={(newValue) => {
                const copy = { ...character.abilities };
                copy["Charisma"].value = newValue;

                saveAbilities(copy);
              }}
              onSavingThrowProficiencyChange={(isProficient) => {
                const copy = { ...character.savingThrows };
                copy["Charisma"].isProficient = isProficient;

                saveSavingThrows(copy);
              }}
              onSkillProficiencyChange={(skill, isProficient) => {
                const copy = [...character.skills];
                const index = copy.findIndex((s) => s.name === skill);

                if (index !== -1) {
                  copy[index].isProficient = isProficient;
                } else {
                  copy.push({
                    isProficient,
                    name: skill,
                    customAbility: undefined,
                    customBonus: 0,
                  });
                }

                saveSkills(copy);
              }}
            />
          </CardContent>
        </Card>
      </DashboardContent>
    </div>
  );
}
