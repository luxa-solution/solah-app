import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="solah-time" />
      <Stack.Screen name="qibla-direction" />
    </Stack>
  );
}

export default Layout;
