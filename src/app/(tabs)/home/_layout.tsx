import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default Layout;
