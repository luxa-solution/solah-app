import { render } from "@testing-library/react-native";
import React from "react";

import { SolahTimeScreen } from "./SolahTimeScreen";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 24, top: 0, left: 0, right: 0 }),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: (props: object) => React.createElement(Text, props, "Ionicon"),
    MaterialCommunityIcons: (props: object) => React.createElement(Text, props, "MCIcon"),
  };
});

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text, View, Pressable } = require("react-native");

  return {
    Appbar: {
      Header: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
        React.createElement(View, props, children),
      BackAction: ({ onPress }: { onPress: () => void }) =>
        React.createElement(Pressable, { onPress, accessibilityLabel: "Back" }, "Back"),
      Content: ({ title }: { title: string }) => React.createElement(Text, null, title),
      Action: ({
        icon,
        onPress,
        accessibilityLabel,
      }: {
        icon: string;
        onPress: () => void;
        accessibilityLabel: string;
      }) =>
        React.createElement(
          Pressable,
          { onPress, accessibilityLabel },
          React.createElement(Text, null, icon)
        ),
    },
  };
});

describe("SolahTimeScreen", () => {
  it("renders the screen title", () => {
    const screen = render(<SolahTimeScreen />);

    expect(screen.getByText("Solah time")).toBeTruthy();
  });

  it("renders Find Qibla Direction button", () => {
    const screen = render(<SolahTimeScreen />);

    expect(screen.getByText("Find Qibla Direction")).toBeTruthy();
  });
});
