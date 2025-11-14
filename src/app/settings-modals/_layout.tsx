import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="[settings_type]" />
    </Stack>
  );
}

export default Layout;
