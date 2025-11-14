import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Providers } from "@/shared/components";

export default function RootLayout() {
  return (
    <Providers>
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
        <Stack.Screen name="settings-modals" />
      </Stack>
    </Providers>
  );
}
