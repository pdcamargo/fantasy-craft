import { useCurrentUserQuery } from "@craft/query";

import {
  Separator,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@craft/ui";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarHeader,
  NavbarItem,
} from "@craft/ui/navbar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@craft/ui/navigation-menu";

import { Logo } from "../logo";
import Link from "next/link";
import { cn } from "@craft/ui/utils";
import React from "react";
import { useTranslation } from "@craft/translation";

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

const DashboardMenu = () => {
  const { t } = useTranslation();
  const currentUserQuery = useCurrentUserQuery();

  return (
    <Navbar isBordered>
      <NavbarHeader className="mx-auto">
        <NavbarContent justify="start">
          <NavbarBrand>
            <Logo />
            <p className="font-bold text-inherit">FANTASY CRAFT</p>
          </NavbarBrand>

          <Separator orientation="vertical" />

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn(
                            "flex",
                            "h-full",
                            "w-full",
                            "select-none",
                            "flex-col",
                            "justify-end",
                            "rounded-md",
                            "bg-gradient-to-b",
                            "from-muted/50",
                            "to-muted",
                            "p-6",
                            "no-underline",
                            "outline-none",
                            "focus:shadow-md",
                            "bg-black/40",
                          )}
                          href="/"
                        >
                          <Logo width="24px" height="24px" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>D&D</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {[
                      {
                        title: t("Navbar.dnd.myBooks"),
                        href: "/dashboard/dnd/books",
                        description: t("Navbar.dnd.myBooksDescription"),
                      },
                      {
                        title: t("Navbar.dnd.newBook"),
                        href: "/dashboard/dnd/books/new",
                        description: t("Navbar.dnd.newBookDescription"),
                      },
                    ].map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
  );
};

export { DashboardMenu };
