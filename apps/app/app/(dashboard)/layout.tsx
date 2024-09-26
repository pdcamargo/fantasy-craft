"use client";

import { DashboardMenu } from "./components";

import "reflect-metadata";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div
      className="flex flex-col items-start justify-start min-h-screen w-full overflow-hidden"
      style={{
        // @ts-expect-error -- types does not support css variables yet
        "--body-text-color": "#071437",
      }}
    >
      <DashboardMenu />

      <main className="flex-1 flex w-full flex-col bg-[#f4f6fa]">
        {children}
      </main>
    </div>
  );
}
