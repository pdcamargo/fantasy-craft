"use client";

import { useCreateCharacter } from "@craft/query";
import { Loader, toast } from "@craft/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { faker } from "@faker-js/faker";
import { useDebouncedSave } from "@craft/ui/hooks";

export default function NewCharacterPage() {
  const router = useRouter();

  const { mutateAsync: createCharacter, isPending: isCreatingCharacter } =
    useCreateCharacter();

  const newCharacter = useDebouncedSave((value) =>
    createCharacter(
      {
        name: value,
      },
      {
        onSuccess: (charData) => {
          router.replace(`/dashboard/n5e/characters/${charData.data.id}`);
        },
        onError: () => {
          toast.error("Error while creating your character");

          router.replace("/dashboard/n5e/characters");
        },
      },
    ),
  );

  useEffect(() => {
    if (!isCreatingCharacter) {
      newCharacter(faker.person.firstName() + " " + faker.person.lastName());
    }
  }, [newCharacter, isCreatingCharacter]);

  return (
    <div className="flex-1 w-full h-full flex items-center justify-center">
      <Loader className="text-red-500" />
    </div>
  );
}
