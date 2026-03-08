import { Redirect } from "expo-router";

import { useOnboardingStore } from "@/features-onboarding/store";

export default function Index() {
  const hasOnboarded = useOnboardingStore((s) => s.hasOnboarded);

  if (!hasOnboarded) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)/home" />;
}
