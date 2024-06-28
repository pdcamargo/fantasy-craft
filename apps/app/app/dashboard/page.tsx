import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Editorjs,
} from "@craft/ui";
import {
  DashboardBreadcrumb,
  DashboardContent,
  DashboardToolbar,
  DashboradPageInfo,
} from "./components";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/dnd/books");

  return (
    <>
      {/* <DashboardToolbar>
        <DashboardBreadcrumb />

        <DashboradPageInfo title="Dashboard" description="Overview" />
      </DashboardToolbar>

      <DashboardContent>
        <div className="flex-1 flex items-start justify-start gap-12">
          <Card className="w-[350px]" variant="white">
            <CardHeader>
              <Avatar className="mx-auto mb-5" size="xl">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">Patrick Dias</CardTitle>
              <CardDescription className="text-center">Admin</CardDescription>
            </CardHeader>
            <CardContent>dasdas</CardContent>
          </Card>

          <div className="flex-1 flex flex-col gap-9">
            <Card variant="white">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  A Cool Block
                </CardTitle>
                <CardDescription>A Description</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-0 pb-0"></CardContent>
            </Card>

            <Card variant="white">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  A Cool Block
                </CardTitle>
                <CardDescription>A Description</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione ad cum culpa quis provident quas, tenetur labore modi,
                  nemo fugit eius recusandae, delectus expedita placeat quam
                  porro. Nisi, quas architecto?
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione ad cum culpa quis provident quas, tenetur labore modi,
                  nemo fugit eius recusandae, delectus expedita placeat quam
                  porro. Nisi, quas architecto?
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione ad cum culpa quis provident quas, tenetur labore modi,
                  nemo fugit eius recusandae, delectus expedita placeat quam
                  porro. Nisi, quas architecto?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContent> */}
    </>
  );
}
