import { Text } from "react-native";

import { renderWithProviders } from "@/shared/test";

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

describe("Providers", () => {
  it("renders children inside the shared provider tree", () => {
    const screen = renderWithProviders(<Text>Provider child</Text>);

    expect(screen.getByText("Provider child")).toBeTruthy();
  });
});
