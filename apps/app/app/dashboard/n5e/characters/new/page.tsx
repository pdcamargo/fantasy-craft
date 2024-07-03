"use client";

import { useTranslation } from "@craft/translation";
import { Card, CardContent, ScrollArea, Separator } from "@craft/ui";

import {
  DashboardToolbar,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";

import {
  AbilitiesScores,
  ArmorClass,
  CompactAbility,
  ElementalAffinity,
  HPCP,
  Initiative,
  MoveSpeed,
  Proficiency,
  SavingThrows,
  Skills,
} from "../components";

export default function NewCharacterPage() {
  const { t } = useTranslation();

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
                LVL 1
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                Ashura
                <small className="font-thin">
                  {" "}
                  - Futton clan, <small className="font-semibold">Leader</small>
                </small>
              </span>
              <span className="font-thin text-xs">
                Genjutsu-Specialist - Layered-Reality
              </span>
              <span className="font-thin text-xs mt-1 italic">
                Tobirama's Legacy Class Mod
              </span>

              <ElementalAffinity affinities={[]} />
            </div>

            <Separator
              orientation="vertical"
              className="bg-white/10 h-14 self-center mx-10"
            />

            <div className="flex items-center gap-5 ml-auto">
              <HPCP
                hp={{
                  current: 20,
                  max: 20,
                  temp: 0,
                }}
                cp={{
                  current: 10,
                  max: 10,
                  temp: 0,
                }}
              />

              <Separator orientation="vertical" className="bg-white/10 h-14" />

              <Proficiency proficiency={6} />

              <ArmorClass armorClass={16} />

              <Initiative initiative={0} />

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
            <CompactAbility skillsHeadingText="Skills" ability="Strength" />
            <CompactAbility skillsHeadingText="Skills" ability="Constitution" />
            <CompactAbility skillsHeadingText="Skills" ability="Dexterity" />

            <CompactAbility skillsHeadingText="Skills" ability="Intelligence" />
            <CompactAbility skillsHeadingText="Skills" ability="Wisdom" />
            <CompactAbility skillsHeadingText="Skills" ability="Charisma" />

            {/* <div className="w-full">
              <div className="flex gap-3">
                <AbilitiesScores
                  abilities={{
                    Charisma: {
                      value: 14,
                      modifier: 2,
                    },
                    Constitution: {
                      value: 18,
                      modifier: 4,
                    },
                    Dexterity: {
                      value: 10,
                      modifier: 0,
                    },
                    Intelligence: {
                      value: 18,
                      modifier: 4,
                    },
                    Strength: {
                      value: 10,
                      modifier: 0,
                    },
                    Wisdom: {
                      value: 12,
                      modifier: 1,
                    },
                  }}
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <SavingThrows
                      saves={[
                        {
                          name: "Strength",
                          bonus: 0,
                        },
                        {
                          name: "Dexterity",
                          bonus: 0,
                        },
                        {
                          name: "Constitution",
                          bonus: 5,
                          isProficient: true,
                        },
                        {
                          name: "Intelligence",
                          bonus: 5,
                          isProficient: true,
                        },
                        {
                          name: "Wisdom",
                          bonus: 2,
                          isProficient: true,
                        },
                        {
                          name: "Charisma",
                          bonus: 2,
                        },
                      ]}
                    />

                    <div className="flex gap-2">
                      <Proficiency proficiency={6} />

                      <MoveSpeed speed={30} />

                      <ArmorClass armorClass={16} />
                    </div>
                  </div>

                  <Skills skills={[]} />
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </DashboardContent>
    </div>
  );
}
