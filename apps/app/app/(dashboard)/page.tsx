import { Card, CardContent, CardHeader, CardTitle } from "@craft/ui/card";
import { getDndbooks } from "@lib/queries/dnd.query";
import { getN5eCharacters } from "@lib/queries/n5e.query";
import {
  DashboardContent,
  DashboardMenu,
  DashboardToolbar,
  DashboradPageInfo,
} from "./components";

export default async function RootPage() {
  const characters = await getN5eCharacters();
  const books = await getDndbooks();

  return (
    <>
      <DashboardToolbar>
        <DashboradPageInfo className="pb-0 pt-7" title="Home" description="" />
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <Card variant="white">
              <CardHeader>
                <CardTitle>My N5e Characters</CardTitle>
              </CardHeader>
              <CardContent>
                {characters.map((character) => (
                  <div key={character.id}>{character.name}</div>
                ))}
              </CardContent>
            </Card>

            <Card variant="white">
              <CardHeader>
                <CardTitle>My D&D Books</CardTitle>
              </CardHeader>
              <CardContent>
                {books.map((book) => (
                  <div key={book.id}>{book.title}</div>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
