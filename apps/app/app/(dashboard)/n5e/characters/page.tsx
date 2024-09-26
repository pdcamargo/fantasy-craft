import { getN5eCharacters } from "@lib/queries/n5e.query";
import CharacterPageClient from "./page-client";

export default async function BooksPage() {
  const data = await getN5eCharacters();

  return <CharacterPageClient characters={data} />;
}
