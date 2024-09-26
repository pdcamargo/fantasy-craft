import { getWorlds } from "@/lib/queries/world.query";
import { CreateWorldButton } from "./create-world.button";

export default async function WorldsPage() {
  const worlds = await getWorlds();

  return (
    <div>
      <CreateWorldButton />

      {worlds.map((world) => (
        <div key={world.id}>
          <h2>{world.name}</h2>
          <p>{world.description}</p>
          <p>{world.slug}</p>
        </div>
      ))}
    </div>
  );
}
