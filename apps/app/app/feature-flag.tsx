"use client";

import { FeatureFlagName } from "./feature-flags";
import { useFeatureFlags } from "./providers";

type FeatureFlagProps =
  | {
      active?: Array<FeatureFlagName>;
      inactive?: Array<FeatureFlagName>;
      children: React.ReactNode;
    }
  | {
      oneOf?: Array<FeatureFlagName>;
      children: React.ReactNode;
    }
  | {
      noneOf?: Array<FeatureFlagName>;
      children: React.ReactNode;
    }
  | {
      name: FeatureFlagName;
      children: React.ReactNode;
    };

export const FeatureFlag = ({ children, ...props }: FeatureFlagProps) => {
  const featureFlags = useFeatureFlags();

  if ("active" in props && props.active) {
    if (props.active.every((flag) => featureFlags[flag].active)) {
      return <>{children}</>;
    }
  }

  if ("inactive" in props && props.inactive) {
    if (props.inactive.every((flag) => !featureFlags[flag].active)) {
      return <>{children}</>;
    }
  }

  if ("oneOf" in props && props.oneOf) {
    if (props.oneOf.some((flag) => featureFlags[flag].active)) {
      return <>{children}</>;
    }
  }

  if ("noneOf" in props && props.noneOf) {
    if (props.noneOf.every((flag) => !featureFlags[flag].active)) {
      return <>{children}</>;
    }
  }

  if ("name" in props) {
    if (featureFlags[props.name].active) {
      return <>{children}</>;
    }
  }

  return null;
};

