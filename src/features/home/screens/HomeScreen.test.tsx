import { render } from "@testing-library/react-native";
import React from "react";

import { HomeScreen } from "./HomeScreen";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");

  return {
    SafeAreaView: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
  };
});

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

describe("HomeScreen", () => {
  it("renders the expected screen composition", () => {
    const screen = render(<HomeScreen />);

    // TitleBar renders Arabic greeting
    expect(screen.getByText("السلام عليكم")).toBeTruthy();
    // PrayerGuideCard renders its title
    expect(screen.getByText("Prayer Guide")).toBeTruthy();
    // PrayerGuideCard renders its subtitle
    expect(screen.getByText("Learn Solah the Prophetic Way")).toBeTruthy();
  });
});
