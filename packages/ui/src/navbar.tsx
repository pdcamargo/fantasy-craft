import React from "react";

import { cn } from "./utils";

const Navbar = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    isBordered?: boolean;
  }
>(({ className, style, isBordered = false, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      "sticky flex z-40 top-0 inset-x-0 w-full h-auto items-center justify-center",
      "bg-[#0b0c10e3] backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 data-[menu-open=true]:border-none",
      {
        "border-b border-white/10": isBordered,
      },
      className,
    )}
    style={{
      // @ts-expect-error -- types does not support css variables yet
      "--navbar-height": "4rem",
      ...(style ?? {}),
    }}
    {...props}
  />
));
Navbar.displayName = "Navbar";

const NavbarHeader = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"header">
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "z-40 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] container",
      className,
    )}
    {...props}
  />
));
NavbarHeader.displayName = "NavbarHeader";

const NavbarContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul"> & {
    justify?: "start" | "center" | "end";
  }
>(({ className, justify = "start", ...props }, ref) => (
  <ul
    data-justify={justify}
    ref={ref}
    className={cn(
      "h-full flex-row flex-nowrap hidden sm:flex gap-4 items-center",
      "data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow",
      "data-[justify=end]:basis-0 data-[justify=start]:justify-start data-[justify=start]:flex-grow",
      className,
    )}
    {...props}
  />
));

const NavbarItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li"> & {
    isActive?: boolean;
  }
>(({ className, isActive, ...props }, ref) => (
  <li
    data-active={isActive === true}
    ref={ref}
    className={cn(
      "text-medium px-2 flex h-full items-center justify-center whitespace-nowrap box-border list-none data-[active=true]:font-semibold",
      "border-b-2 border-b-transparent data-[active=true]:border-primary/60 data-[active=false]:text-[#9a9cae] data-[active=true]:text-text",
      className,
    )}
    {...props}
  />
));

const NavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex basis-0 gap-3 flex-row flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border",
      className,
    )}
    {...props}
  />
));

export { Navbar, NavbarHeader, NavbarContent, NavbarItem, NavbarBrand };
