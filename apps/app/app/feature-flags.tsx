import { useFeatureFlags } from "./providers";

export async function getFeatureFlags() {
  return (await import("./feature-flags.json")).default;
}

export type FeatureFlagName = keyof Awaited<ReturnType<typeof getFeatureFlags>>;

export type FeatureFlags = typeof import("./feature-flags.json");
