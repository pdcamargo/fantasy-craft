import { getGotCharacters } from "@/lib/queries/got.query";

export default async function GotPage() {
  const characters = await getGotCharacters();

  return (
    <div>
      <h1>Got Page</h1>

      <ul>
        {characters.map((character) => (
          <li key={character.publicId}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}
