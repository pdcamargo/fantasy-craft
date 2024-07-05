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
          ></CardContent>
        </Card>
      </DashboardContent>
    </div>
  );
}
