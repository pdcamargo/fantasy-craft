import { getGotCharacter } from "@/lib/queries/got.query";
import { notFound } from "next/navigation";

export default async function GotCharacterPage({
  params: { characterId },
}: {
  params: {
    characterId: string;
  };
}) {
  const character = await getGotCharacter(characterId);

  if (!character) {
    notFound();
  }

  return (
    <div>
      <h1>Character</h1>
      <p>{character.name}</p>
    </div>
  );
}
