"use client";

import { useTranslation } from "@craft/translation";
import {
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ContentEditable,
  Loader,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  ScrollArea,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsScrollButton,
  TabsTrigger,
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
  FancyBox,
  HPCP,
  Initiative,
  MoveSpeed,
  Proficiency,
} from "../components";
import { useGetCharacter, useUpdateCharacter } from "@craft/query";
import {
  BackgroundSelect,
  ClanSelect,
  ClassModSelect,
  ClassSelect,
  JutsuList,
  useJutsuSelect,
} from "./components";
import { useDebouncedSave } from "@craft/ui/hooks";

import { N5eCharacterWrapper } from "app/dashboard/n5e/utils/n5e-character-wrapper";
import { JutsuDatabase } from "../../utils/jutsu-database";
import { FeatDatabase } from "../../utils/feat-database";
import { useFeatSelect } from "./components/feat-select";
import { JutsuGroup } from "./components/jutsu-group";
import { Trash } from "lucide-react";

export default function NewCharacterPage({
  params,
}: {
  params: {
    characterId: string;
  };
}) {
  const jutsuSelect = useJutsuSelect();
  const featSelect = useFeatSelect();

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
  const saveElementalAffinities = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ elementalAffinities: value }),
  );
  const saveJutsus = useDebouncedSave((value) =>
    updateCharacter.mutateAsync(
      { jutsus: value },
      {
        onSuccess: () => {
          jutsuSelect.hide();
        },
      },
    ),
  );
  const saveFeats = useDebouncedSave((value) =>
    updateCharacter.mutateAsync(
      { feats: value },
      {
        onSuccess: () => {
          featSelect.hide();
        },
      },
    ),
  );
  const saveLevel = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ level: value }),
  );
  const saveClassMod = useDebouncedSave((value) =>
    updateCharacter.mutateAsync({ classMod: value }),
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

  const available = JutsuDatabase.getJutsuAvailableForCharacter(n5eCharacter);
  const current = JutsuDatabase.createQueryableJutsuList(character.jutsus);
  const currentFeats = FeatDatabase.createQueryableFeatList(character.feats);

  const ninjutsuQuery = current.ninjutsu();
  const taijutsuQuery = current.taijutsu();
  const genjutsuQuery = current.genjutsu();
  const bukijutsuQuery = current.bukijutsu();

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
        <DashboradPageInfo className="pb-0 pt-0 lg:pt-12">
          <div className="flex items-start gap-3 flex-col lg:flex-row">
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
                    saveLevel(newLevel);
                  }}
                  min={1}
                  max={20}
                >
                  {character.level}
                </ContentEditable>
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

              <ClassModSelect
                value={character?.classMod?.name ?? ""}
                onChange={(newClassMod) => {
                  saveClassMod({
                    name: newClassMod,
                    level: 1,
                  });
                }}
              />

              <ElementalAffinity
                affinities={character.elementalAffinities}
                onChange={saveElementalAffinities}
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
                hp={{
                  current: n5eCharacter.currentHp,
                  max: n5eCharacter.maxHp,
                  temp: n5eCharacter.temporaryHp,
                  die: `d${n5eCharacter.hitDie}`,
                }}
                cp={{
                  current: n5eCharacter.currentCp,
                  max: n5eCharacter.maxCp,
                  temp: n5eCharacter.temporaryCp,
                  die: `d${n5eCharacter.chakraDie}`,
                }}
              />

              <Separator
                orientation="vertical"
                className="bg-white/10 h-14 hidden lg:block"
              />

              <div className="w-max grid grid-cols-3 md:grid-cols-2 gap-5 md:gap-3 lg:gap-2 xl:flex xl:items-center">
                <Proficiency
                  proficiency={n5eCharacter.proficiencyBonus}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />

                <ArmorClass
                  armorClass={n5eCharacter.armorClass}
                  className="mx-auto self-center lg:self-[unset] lg:mx-[unset]"
                />

                <Initiative
                  initiative={n5eCharacter.dexMod}
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
          <CardContent className="pt-6 flex flex-col gap-2">
            <div className="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            </div>
            <div className="flex-1 w-full mt-7">
              <Tabs defaultValue="ninjutsu">
                <TabsList className="px-0 md:px-1">
                  <TabsScrollButton className="md:hidden" direction="left" />

                  <TabsTrigger value="ninjutsu">
                    Ninjutsu ({ninjutsuQuery.queryLength})
                  </TabsTrigger>
                  <TabsTrigger value="genjutsu">
                    Genjutsu ({genjutsuQuery.queryLength})
                  </TabsTrigger>
                  <TabsTrigger value="taijutsu">
                    Taijutsu ({taijutsuQuery.queryLength})
                  </TabsTrigger>
                  <TabsTrigger value="bukijutsu">
                    Bukijutsu ({bukijutsuQuery.queryLength})
                  </TabsTrigger>

                  <TabsScrollButton className="md:hidden" direction="right" />
                </TabsList>

                <TabsContent
                  className="-mt-2 p-2 border-2 border-muted rounded"
                  value="ninjutsu"
                >
                  <JutsuGroup
                    groupType="Ninjutsu"
                    ability={n5eCharacter.ninjutsuAbility}
                    attackBonus={n5eCharacter.ninjutsuAttackBonus}
                    group={ninjutsuQuery.getResultsGroupedByRank()}
                    saveDc={n5eCharacter.ninjutsuDc}
                    availableJutsusQuery={available.ninjutsu()}
                    onJutsuSelect={(jutsuName) => {
                      saveJutsus([...character.jutsus, jutsuName]);
                    }}
                  />
                </TabsContent>

                <TabsContent
                  className="-mt-2 p-2 border-2 border-muted rounded"
                  value="genjutsu"
                >
                  <JutsuGroup
                    groupType="Genjutsu"
                    ability={n5eCharacter.genjutsuAbility}
                    attackBonus={n5eCharacter.genjutsuAttackBonus}
                    group={genjutsuQuery.getResultsGroupedByRank()}
                    saveDc={n5eCharacter.genjutsuDc}
                    availableJutsusQuery={available.genjutsu()}
                    onJutsuSelect={(jutsuName) => {
                      saveJutsus([...character.jutsus, jutsuName]);
                    }}
                  />
                </TabsContent>

                <TabsContent
                  className="-mt-2 p-2 border-2 border-muted rounded"
                  value="taijutsu"
                >
                  <JutsuGroup
                    groupType="Taijutsu"
                    ability={n5eCharacter.taijutsuAbility}
                    attackBonus={n5eCharacter.taijutsuAttackBonus}
                    group={taijutsuQuery.getResultsGroupedByRank()}
                    saveDc={n5eCharacter.taijutsuDc}
                    availableJutsusQuery={available.taijutsu()}
                    onJutsuSelect={(jutsuName) => {
                      saveJutsus([...character.jutsus, jutsuName]);
                    }}
                  />
                </TabsContent>

                <TabsContent
                  className="-mt-2 p-2 border-2 border-muted rounded"
                  value="bukijutsu"
                >
                  <JutsuGroup
                    groupType="Bukijutsu"
                    ability={n5eCharacter.bukijutsuAbility}
                    attackBonus={n5eCharacter.bukijutsuAttackBonus}
                    group={bukijutsuQuery.getResultsGroupedByRank()}
                    saveDc={n5eCharacter.bukijutsuDc}
                    availableJutsusQuery={available.bukijutsu()}
                    onJutsuSelect={(jutsuName) => {
                      saveJutsus([...character.jutsus, jutsuName]);
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex w-full">
              <div className="flex-1">
                <h2 className="text-xl font-bold">Feats</h2>
                <Button
                  onClick={() => {
                    featSelect.show({
                      feats: FeatDatabase.query
                        .withoutNames(...character.feats)
                        .getResults()
                        .filter((feat) => {
                          if (feat.type !== "Clan Feat") {
                            return true;
                          }

                          return feat.preRequisite
                            .toLowerCase()
                            .includes(character.clan.toLowerCase());
                        }),
                      onFeatSelect: (featName) => {
                        saveFeats([...character.feats, featName]);
                      },
                    });
                  }}
                >
                  Add feat
                </Button>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {currentFeats.getResults().map((feat) => {
                    return (
                      <Popover key={feat.name}>
                        <PopoverTrigger className="text-lg font-bold text-left flex items-center justify-between border-b border-muted">
                          <span>{feat.name}</span>

                          <Button
                            variant="link"
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();

                              saveFeats(
                                character.feats.filter(
                                  (featName) => featName !== feat.name,
                                ),
                              );
                            }}
                          >
                            <Trash className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverPortal>
                          <PopoverContent align="start" className="pr-1">
                            <PopoverArrow />

                            <h3>{feat.name}</h3>
                            <p className="text-sm font-bold">{feat.type}</p>

                            <ScrollArea
                              type="always"
                              style={{
                                height: "300px",
                              }}
                            >
                              <p className="pr-2">{feat.description}</p>
                            </ScrollArea>
                          </PopoverContent>
                        </PopoverPortal>
                      </Popover>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DashboardContent>
    </div>
  );
}
