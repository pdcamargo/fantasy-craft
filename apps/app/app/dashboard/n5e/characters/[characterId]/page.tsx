"use client";

import { Loader } from "@craft/ui";

import { useGetCharacter } from "@craft/query";

import EditPage from "./edit-page";

export default function NewCharacterPage({
  params,
}: {
  params: {
    characterId: string;
  };
}) {
  const { data: character, isLoading } = useGetCharacter(params.characterId);

  if (isLoading) {
    return (
      <div className="w-screen h-screen backdrop-blur bg-black/10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="w-screen h-screen backdrop-blur bg-black/10 flex items-center justify-center">
        <div className="text-white text-3xl font-bold">
          An error occurred while fetching the character
        </div>
      </div>
    );
  }

  return <EditPage character={character} />;
}
