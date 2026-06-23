import { setAudioModeAsync } from "expo-audio";
import { Redirect } from "expo-router";
import { useEffect } from "react";

import { useOnboardingStore } from "@/features-onboarding/store";

export default function Index() {
  const hasOnboarded = useOnboardingStore((s) => s.hasOnboarded);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: "duckOthers",
    });
  }, []);

  if (!hasOnboarded) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)/home" />;
}
