"use client";

import { useTranslation } from "@craft/translation";
import { Card, CardContent } from "@craft/ui/card";
import {
  DashboardToolbar,
  DashboardBreadcrumb,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";
import { cn } from "@craft/ui/utils";
import { useAllCharacters, useCreateCharacter } from "@craft/query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Loader,
  toast,
} from "@craft/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";

export default function BooksPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, isLoading } = useAllCharacters();

  const { mutateAsync: createCharacter, isPending: isCreatingCharacter } =
    useCreateCharacter();

  if (!data || isLoading) {
    return (
      <div className="fixed w-screen h-screen bg-white flex items-center justify-center">
        <Loader className="text-red-500" />
      </div>
    );
  }

  const [_, result] = data;

  if (!result) {
    return (
      <div className="fixed w-screen h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">No data found</div>
      </div>
    );
  }

  return (
    <>
      <DashboardToolbar>
        <DashboardBreadcrumb
          items={[
            {
              label: t("General.dashboard"),
              href: "/dashboard",
            },
            {
              label: t("General.naruto5e"),
              href: "/dashboard/n5e",
            },
            {
              label: t("General.characters"),
              href: "/dashboard/n5e/characters",
            },
          ]}
        />

        <DashboradPageInfo
          className="pb-0 pt-7"
          title={
            <div className="flex items-center gap-1 justify-between">
              My Characters
              <Button
                variant="info"
                size="sm"
                disabled={isCreatingCharacter}
                onClick={() =>
                  createCharacter({
                    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                  }).then((newCharacter) => {
                    router.push(
                      `/dashboard/n5e/characters/${newCharacter.data.id}`,
                    );

                    toast.success("Character created successfully", {
                      duration: 5000,
                    });
                  })
                }
              >
                {isCreatingCharacter ? "Creating..." : "New Character"}
              </Button>
            </div>
          }
          description=""
        />
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
            {result.data.map((character) => {
              return (
                <Link
                  key={character.id}
                  href={`/dashboard/n5e/characters/${character.id}`}
                >
                  <div
                    className={cn(
                      "inline-flex items-start gap-3 pb-2 justify-between border-b border-gray-200",
                    )}
                  >
                    <Avatar size="lg" className="rounded-lg">
                      <AvatarFallback className="text-white">
                        {character.name[0]}
                      </AvatarFallback>
                      <AvatarImage src={character.info.avatar} />
                    </Avatar>
                    <div>
                      <div className="font-bold">
                        {character.name || "Unamed"}{" "}
                        <span className="font-normal">
                          (lvl {character.level})
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {character.clan ? `${character.clan} clan -` : ""}{" "}
                        {character.classes?.[0]?.name}{" "}
                        {character.classes?.[0]?.subclass}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
