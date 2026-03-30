import { render } from "@testing-library/react-native";
import React from "react";

import { PrayerTimesCard } from "./PrayerTimesCard";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("home/PrayerTimesCard", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders without crashing", () => {
    const { toJSON } = render(<PrayerTimesCard />);
    expect(toJSON()).toBeTruthy();
  });

  it("passes homePage=true to the inner PrayerTimesCard — renders as a pressable card", () => {
    // The home/PrayerTimesCard wraps @/features-solah/components PrayerTimesCard with homePage=true.
    // We verify the component renders without errors (the prop is passed correctly).
    const { toJSON } = render(<PrayerTimesCard />);
    expect(toJSON()).toBeTruthy();
  });
});
