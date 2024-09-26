import { getWorld } from "@/lib/queries/world.query";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const world = await getWorld(slug);

  if (!world) {
    return {
      title: "World not found",
      description: "World not found",
    };
  }

  return {
    title: world.name,
    description: world.description,
  };
}

export default async function WorldSlugPage({
  params: { slug },
}: Readonly<{
  params: { slug: string };
}>) {
  const world = await getWorld(slug);

  if (!world) {
    return <div>World not found {slug}</div>;
  }

  return <pre>{JSON.stringify(world, null, 2)}</pre>;
}
