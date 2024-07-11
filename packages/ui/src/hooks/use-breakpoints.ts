import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return matches;
}

export const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export const isScreenXxl = () => window.innerWidth >= screenSizes.xxl;
export const isScreenXl = () => window.innerWidth >= screenSizes.xl;
export const isScreenLg = () => window.innerWidth >= screenSizes.lg;
export const isScreenMd = () => window.innerWidth >= screenSizes.md;
export const isScreenSm = () => window.innerWidth >= screenSizes.sm;

export function useBreakpoints() {
  const breakpoints = {
    isXs: useMediaQuery("(max-width: 639px)"),
    isSm: useMediaQuery("(min-width: 640px) and (max-width: 767px)"),
    isMd: useMediaQuery("(min-width: 768px) and (max-width: 1023px)"),
    isLg: useMediaQuery("(min-width: 1024px) and (max-width: 1279px)"),
    isXl: useMediaQuery("(min-width: 1280px) and (max-width: 1535px)"),
    isXxl: useMediaQuery("(min-width: 1536px)"),
    isMinLg: useMediaQuery("(min-width: 1024px)"),
    active: "xs",
  };

  if (breakpoints.isXs) breakpoints.active = "xs";
  if (breakpoints.isSm) breakpoints.active = "sm";
  if (breakpoints.isMd) breakpoints.active = "md";
  if (breakpoints.isLg) breakpoints.active = "lg";
  if (breakpoints.isXl) breakpoints.active = "xl";
  if (breakpoints.isXxl) breakpoints.active = "xxl";

  return breakpoints;
}
