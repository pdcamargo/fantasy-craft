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

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const isLoggedIn = useIsUserLoggedIn();

  const currentUserQuery = useCurrentUserQuery();

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
      <Navbar isBordered>
        <NavbarHeader className="mx-auto">
          <NavbarContent justify="start">
            <NavbarBrand>
              <Logo />
              <p className="font-bold text-inherit">FANTASY CRAFT</p>
            </NavbarBrand>

            <Separator orientation="vertical" />

            <NavbarItem isActive>Home</NavbarItem>
            <NavbarItem>D&D Homebrew</NavbarItem>
            <NavbarItem>MTG Cards</NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              {currentUserQuery.isLoading && (
                <Skeleton className="w-10 h-10" roundedFull />
              )}
              {!currentUserQuery.isLoading && (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </NavbarItem>
          </NavbarContent>
        </NavbarHeader>
      </Navbar>
      <main className="flex-1 flex w-full flex-col bg-[#f4f6fa]">
        {children}
      </main>
    </div>
  );
}
