import { getN5eCharacter } from "@lib/queries/n5e.query";
import EditPage from "./edit-page";
import { notFound } from "next/navigation";

export default async function NewCharacterPage({
  params,
}: {
  params: {
    characterId: string;
  };
}) {
  const character = await getN5eCharacter(params.characterId);

  if (!character) {
    notFound();
  }

  return <EditPage character={character} />;
}
