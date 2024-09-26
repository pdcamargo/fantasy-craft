"use client";

import { useDebouncedSave } from "@craft/ui/hooks";
import { N5eCharacterWrapper } from "../../utils/n5e-character-wrapper";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import {
  ContentEditable,
  Separator,
  Card,
  CardContent,
  Tabs,
  TabsList,
  TabsScrollButton,
  TabsTrigger,
  TabsContent,
  MultiSelect,
  Loader,
} from "@craft/ui";
import {
  DashboardToolbar,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";
import {
  ElementalAffinity,
  HPCP,
  Proficiency,
  ArmorClass,
  Initiative,
  MoveSpeed,
  CompactAbility,
} from "../components";
import {
  ClanSelect,
  BackgroundSelect,
  ClassSelect,
  ClassModSelect,
  CharacterFeatures,
  compactAbilities,
  useJutsuConfigSheet,
} from "./components";
import { useRelativeTime } from "@craft/ui/hooks";
import { JutsuGroup } from "./components/jutsu-group";
import { N5eCharacters } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { updateN5eCharacter } from "@lib/actions/n5e.action";
import { toJS } from "mobx";
import PuffLoader from "react-spinners/PuffLoader";

const jutsuGroups = [
  {
    type: "Ninjutsu",
    ability: "Intelligence",
    attackBonus: "Intelligence",
    dc: "Intelligence",
  },
  {
    type: "Genjutsu",
    ability: "Wisdom",
    attackBonus: "Wisdom",
    dc: "Wisdom",
  },
  {
    type: "Taijutsu",
    ability: "Dexterity",
    attackBonus: "Dexterity",
    dc: "Dexterity",
  },
  {
    type: "Bukijutsu",
    ability: "Dexterity",
    attackBonus: "Dexterity",
    dc: "Dexterity",
  },
] as const;

const Jutsus: React.FC<{ character: N5eCharacterWrapper }> = observer(
  ({ character }) => {
    return (
      <div className="flex-1 w-full">
        <Tabs defaultValue="Ninjutsu">
          <TabsList className="px-0 md:px-1">
            <TabsScrollButton className="md:hidden" direction="left" />

            {jutsuGroups.map((group) => (
              <TabsTrigger value={group.type} key={group.type}>
                {group.type} ({character.jutsuQueries[group.type].queryLength})
              </TabsTrigger>
            ))}

            <TabsScrollButton className="md:hidden" direction="right" />
          </TabsList>

          {jutsuGroups.map((group) => (
            <TabsContent
              className="-mt-2 p-2 border-2 border-muted rounded"
              value={group.type}
              key={group.type}
            >
              <JutsuGroup
                groupType={group.type}
                ability={character.jutsuAbilities[group.type]}
                attackBonus={character.jutsuAttackBonuses[group.type]}
                group={character.jutsuQueries[
                  group.type
                ].getResultsGroupedByRank()}
                saveDc={character.jutsuDcs[group.type]}
                availableJutsusQuery={character.jutsusAvailable[group.type]}
                onJutsuSelect={(jutsuName) => {
                  character.saveJutsu(jutsuName);
                }}
                character={character}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  },
);

const EditPage: React.FC<{
  character: N5eCharacters;
}> = ({ character: serverCharacter }) => {
  const [lastUpdate, setLastUpdate] = useState<Date>(
    new Date(serverCharacter.updatedAt ?? Date.now()),
  );

  const updateCharacter = useMutation({
    mutationFn: updateN5eCharacter,
  });

  const relativeTime = useRelativeTime(new Date(lastUpdate));

  const saveCharacter = useDebouncedSave<{
    data: Partial<N5eCharacters>;
    onSuccess?: () => void;
  }>(({ data, onSuccess }) => {
    return updateCharacter.mutateAsync(toJS(data) as any, {
      onSuccess: () => {
        onSuccess?.();

        setLastUpdate(new Date());
      },
    });
  }, 3000);

  const [character] = useState(
    () => new N5eCharacterWrapper(serverCharacter, saveCharacter),
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (updateCharacter.isPending) {
        event.preventDefault();
        // Some browsers require setting the returnValue for the confirmation dialog to be shown.
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [updateCharacter.isPending]);

  return (
    <div className="bg-contain bg-no-repeat relative">
      <div
        className="w-full h-[720px] top-0 absolute pointer-events-none"
        style={{
          maskImage: "linear-gradient(black, transparent)",
        }}
      >
        <img src="/konoha.png" className="absolute left-0 right-0 w-full" />
      </div>

      <DashboardToolbar className="relative z-[1]">
        <DashboradPageInfo className="pb-0 pt-0 lg:pt-12">
          <div className="flex items-start gap-3 flex-col lg:flex-row">
            <div>
              <div className="rounded-lg border border-[#C53131] min-w-[100px] size-[100px] font-roboto relative overflow-hidden select-none">
                <img
                  src="/ashura.jpg"
                  alt="Character Avatar"
                  className="w-full"
                />
                <div className="bg-black h-5 w-full rounded-b absolute flex items-center justify-center text-center text-xs font-bold bottom-0">
                  <span>LVL</span>
                  <ContentEditable
                    className="px-1"
                    as="span"
                    type="number"
                    onChange={(newLevel) => {
                      character.saveLevel(+newLevel);
                    }}
                    min={1}
                    max={20}
                  >
                    {character.level}
                  </ContentEditable>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-[105px] relative">
                <small className="text-[10px] leading-[1]">
                  Last saved {relativeTime}
                </small>
                {updateCharacter.isPending && (
                  <div className="flex items-center gap-2">
                    <PuffLoader color="#006eff" size={18} />
                    <span className="text-[10px]">saving...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col w-[250px]">
              <span className="text-xl font-bold">
                <ContentEditable
                  className="text-base max-w-full line-clamp-2 border-b border-b-white/10"
                  onChange={character.saveName}
                  placeholder="Character Name"
                >
                  {character.name}
                </ContentEditable>
                <small className="font-thin">
                  <ClanSelect
                    value={character.clan}
                    onChange={character.saveClan}
                  />{" "}
                  -{" "}
                  <BackgroundSelect
                    value={character.background}
                    onChange={character.saveBackground}
                  />
                </small>
              </span>
              <ClassSelect
                onChange={character.saveClass}
                value={character.classes}
              />

              <ClassModSelect
                value={character?.classMod?.name ?? ""}
                onChange={(newClassMod) => {
                  character.saveClassMod({
                    name: newClassMod,
                    level: 1,
                  });
                }}
              />

              <ElementalAffinity
                affinities={character.elementalAffinities}
                onChange={character.saveElementalAffinities}
                editable
              />
            </div>

            <Separator
              orientation="vertical"
              className="bg-white/10 h-14 self-center mx-10 hidden lg:block"
            />

            <div className="flex justify-start gap-5 flex-col w-full md:w-[unset] lg:flex-row xl:ml-auto lg:items-center lg:justify-start flex-1">
              <HPCP
                className="w-full md:w-[317px] md:min-w-[317px]"
                editable
                hp={{
                  current: character.currentHp,
                  max: character.maxHp,
                  temp: character.temporaryHp,
                  die: `d${character.hitDie}`,
                }}
                cp={{
                  current: character.currentCp,
                  max: character.maxCp,
                  temp: character.temporaryCp,
                  die: `d${character.chakraDie}`,
                }}
                onChangeCurrentHp={(newCurrentHp) => {
                  character.saveCurrentHp(+newCurrentHp);
                }}
                onChangeCurrentCp={(newCurrentCp) => {
                  character.saveCurrentCp(+newCurrentCp);
                }}
              />

              <Separator
                orientation="vertical"
                className="bg-white/10 h-14 hidden lg:block"
              />

              <div className="w-max grid grid-cols-3 md:grid-cols-2 gap-5 md:gap-3 lg:gap-2 xl:flex xl:items-center">
                <Proficiency
                  proficiency={character.proficiencyBonus}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />

                <ArmorClass
                  armorClass={character.armorClass}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />

                <Initiative
                  initiative={character.dexMod}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />

                <MoveSpeed
                  speed={30}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />
              </div>
            </div>
          </div>
        </DashboradPageInfo>
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1 font-roboto relative z-[1]">
          <CardContent className="pt-6 flex flex-col gap-8">
            <div className="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {compactAbilities.map((ability) => (
                <CompactAbility
                  key={ability.ability}
                  character={character}
                  skillsHeadingText={ability.skillsHeadingText}
                  ability={ability.ability}
                  onAbilityChange={(newValue) => {
                    character.saveAbility(ability.ability, newValue);
                  }}
                  onSavingThrowProficiencyChange={(isProficient) => {
                    character.saveSavingThrow(ability.ability, isProficient);
                  }}
                  onSkillProficiencyChange={(skill, isProficient) => {
                    character.saveSkill(skill, isProficient);
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-5">
              <div className="w-full lg:w-[400px] space-y-5">
                <div
                  className="relative w-full h-auto border-[20px] overflow-hidden"
                  style={{
                    borderImage: "url(/fancy-box-bg.svg) 60 60 60 60 fill",
                  }}
                >
                  <span className="block text-white font-semibold text-xs uppercase mb-1">
                    Armour Proficiencies
                  </span>

                  <MultiSelect
                    onChange={(armorProficiencies) => {
                      character.saveArmorProficiencies(armorProficiencies);
                    }}
                    value={character.armorProficiencies}
                  />

                  <span className="block text-white font-semibold text-xs uppercase mb-1 mt-3">
                    Weapon Proficiencies
                  </span>

                  <MultiSelect
                    onChange={(weaponProficiencies) => {
                      character.saveWeaponProficiencies(weaponProficiencies);
                    }}
                    value={character.weaponProficiencies}
                  />

                  <span className="block text-white font-semibold text-xs uppercase mb-1 mt-3">
                    Tools Proficiencies
                  </span>

                  <MultiSelect
                    onChange={(toolProficiencies) => {
                      character.saveToolProficiencies(toolProficiencies);
                    }}
                    value={character.toolProficiencies}
                  />
                </div>

                <div
                  className="relative w-full h-auto border-[20px] overflow-hidden"
                  style={{
                    borderImage: "url(/fancy-box-bg.svg) 60 60 60 60 fill",
                  }}
                >
                  <div className="flex flex-col">
                    <span className="block text-white font-semibold text-xs uppercase">
                      Passive Skills
                    </span>
                    <div className="grid grid-cols-2 gap-y-7 mt-7">
                      {Object.entries(character.passiveSkills).map(
                        ([skill, value]) => (
                          <div
                            className={
                              "justify-self-center relative w-[85px] h-[55px] text-center border-[20px]"
                            }
                            style={{
                              borderImage:
                                "url(/fancy-box-3-bg.svg) 20 20 20 20 fill",
                            }}
                            key={skill}
                          >
                            <div className="w-[inherit] h-[inherit] m-[-20px] flex flex-col items-center">
                              <span
                                className="absolute top-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
                                style={{
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                }}
                              >
                                {skill}
                              </span>

                              <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full mt-[8px]">
                                <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
                                  <small className="text-[#b0b7bd] font-normal text-[60%]">
                                    {value > 0 ? "+" : "-"}
                                  </small>
                                  {Math.abs(value)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="relative w-full h-auto border-[20px] overflow-hidden"
                  style={{
                    borderImage: "url(/fancy-box-bg.svg) 60 60 60 60 fill",
                  }}
                >
                  <div className="grid grid-cols-2 gap-y-7 my-7">
                    <div
                      className={
                        "justify-self-center relative w-[85px] h-[55px] text-center border-[20px]"
                      }
                      style={{
                        borderImage:
                          "url(/fancy-box-3-bg.svg) 20 20 20 20 fill",
                      }}
                    >
                      <div className="w-[inherit] h-[inherit] m-[-20px] flex flex-col items-center">
                        <span
                          className="absolute top-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Bulk
                        </span>

                        <span
                          className="absolute bottom-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Max
                        </span>

                        <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full mt-[8px]">
                          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
                            {character.bulk}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        "justify-self-center relative w-[85px] h-[55px] text-center border-[20px]"
                      }
                      style={{
                        borderImage:
                          "url(/fancy-box-3-bg.svg) 20 20 20 20 fill",
                      }}
                    >
                      <div className="w-[inherit] h-[inherit] m-[-20px] flex flex-col items-center">
                        <span
                          className="absolute top-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Bulk
                        </span>

                        <span
                          className="absolute bottom-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Current
                        </span>

                        <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full mt-[8px]">
                          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
                            {character.currentBulk}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative w-full h-[600px] border-[20px] overflow-hidden"
                style={{
                  borderImage: "url(/fancy-box-2-bg.svg) 60 60 60 60 fill",
                }}
              >
                <Tabs defaultValue="jutsus" variant="underline">
                  <TabsList className="px-0 md:px-1">
                    <TabsScrollButton className="md:hidden" direction="left" />

                    <TabsTrigger value="jutsus">Jutsus</TabsTrigger>
                    <TabsTrigger value="features">
                      Features & Traits
                    </TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>

                    <TabsScrollButton className="md:hidden" direction="right" />
                  </TabsList>

                  <TabsContent
                    value="jutsus"
                    className="overflow-y-auto h-[calc(600px-36px)]"
                  >
                    <Jutsus character={character} />
                  </TabsContent>

                  <TabsContent
                    value="features"
                    className="overflow-y-auto h-[calc(600px-36px)]"
                  >
                    <CharacterFeatures character={character} />
                  </TabsContent>

                  <TabsContent
                    value="notes"
                    className="overflow-y-auto h-[calc(600px-36px)]"
                  >
                    <div className="flex flex-col w-full gap-2">
                      <span className="block border-b border-red-600 w-full uppercase text-red-600 font-semibold text-xs">
                        Backstory
                      </span>

                      <ContentEditable
                        spellCheck={false}
                        placeholder="+ Add backstory"
                        className="w-full text-[#b0b7bd]"
                        onChange={character.saveBackstory}
                      >
                        {character.backstory}
                      </ContentEditable>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </DashboardContent>
    </div>
  );
};

export default observer(EditPage);
