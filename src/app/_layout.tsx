import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import { Figtree_400Regular, Figtree_500Medium, Figtree_700Bold } from "@expo-google-fonts/figtree";
import { ReemKufi_400Regular, ReemKufi_500Medium } from "@expo-google-fonts/reem-kufi";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { SolahNotificationsEffect } from "@/features/notifications/components/SolahNotificationsEffect";
import { Providers } from "@/shared/components";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Arabic
    Amiri_400Regular,
    Amiri_700Bold,
    ReemKufi_400Regular,
    ReemKufi_500Medium,

    // English
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Providers>
      <SolahNotificationsEffect />
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="adhkar" />
        <Stack.Screen name="solah" />
        <Stack.Screen name="guide" />
      </Stack>
    </Providers>
  );
}
