import { render } from "@testing-library/react-native";
import React from "react";

import { PrayerTimesCard } from "./PrayerTimesCard";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/features-solah/components", () => {
  const mockReact = require("react");
  const { View, Text } = require("react-native");
  return {
    PrayerTimesCard: ({ homePage }: { homePage?: boolean }) =>
      mockReact.createElement(
        View,
        { testID: "prayer-times-card" },
        mockReact.createElement(Text, { testID: "home-page-prop" }, homePage ? "home" : "not-home")
      ),
  };
});

describe("home/PrayerTimesCard", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the inner PrayerTimesCard", () => {
    const { getByTestId } = render(<PrayerTimesCard />);
    expect(getByTestId("prayer-times-card")).toBeTruthy();
  });

  it("passes homePage={true} to the inner PrayerTimesCard", () => {
    const { getByTestId } = render(<PrayerTimesCard />);
    expect(getByTestId("home-page-prop").props.children).toBe("home");
  });
});
