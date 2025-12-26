import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BookOpenText, Bolt, ShieldCheck } from "lucide-react-native";

import { context } from "@/shared/styles";

function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarActiveTintColor: context.brand.secondary,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="adhkar"
        options={{
          title: "Adhkar",
          tabBarIcon: ({ color, size }) => <ShieldCheck color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: "Guide",
          tabBarIcon: ({ color, size }) => <BookOpenText color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Bolt color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

export default Layout;
