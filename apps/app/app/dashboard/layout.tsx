"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@craft/ui/avatar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarHeader,
  NavbarItem,
} from "@craft/ui/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Logo } from "./logo";
import {
  UNAUTHORIZED_RESPONSE,
  setAuthToken,
  useCurrentUserQuery,
  useIsUserLoggedIn,
} from "@craft/query";
import { Separator, Skeleton } from "@craft/ui";
import { DashboardMenu } from "./components";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const isLoggedIn = useIsUserLoggedIn();

  useEffect(() => {
    const onUnauthorized = () => {
      setAuthToken(null);
      router.push("/");
    };

    window.addEventListener(UNAUTHORIZED_RESPONSE, onUnauthorized);

    return () => {
      window.removeEventListener(UNAUTHORIZED_RESPONSE, onUnauthorized);
    };
  }, []);

  if (!isLoggedIn) {
    router.push("/");

    return null;
  }

  return (
    <div
      className="flex flex-col items-start justify-start min-h-screen w-screen"
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
