"use client";

import { useTranslation } from "@craft/translation";
import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  toast,
} from "@craft/ui";
import { cn } from "@craft/ui/utils";
import { faker } from "@faker-js/faker";
import { createN5eCharacter } from "@lib/actions/n5e.action";
import { N5eCharacters } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  DashboardToolbar,
  DashboradPageInfo,
  DashboardContent,
} from "app/(dashboard)/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CharacterPageClient({
  characters,
}: {
  characters: N5eCharacters[];
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const { mutateAsync: createCharacter, isPending: isCreatingCharacter } =
    useMutation({
      mutationFn: createN5eCharacter,
    });

  return (
    <>
      <DashboardToolbar>
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
                  createCharacter(
                    {
                      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                    },
                    {
                      onSuccess: (response) => {
                        router.push(
                          `/dashboard/n5e/characters/${response?.data?.publicId}`,
                        );

                        toast.success("Character created successfully", {
                          duration: 5000,
                        });
                      },
                      onError: (error) => {
                        toast.error("Failed to create character", {
                          duration: 5000,
                        });

                        console.error(error);
                      },
                    },
                  )
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
            {characters.map((character) => {
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
                      <AvatarImage src={character.info?.avatar} />
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
