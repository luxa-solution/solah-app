import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { PrayerTimesCard } from "./PrayerTimesCard";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("PrayerTimesCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders its child sections on the default screen variant", () => {
    const screen = render(<PrayerTimesCard />);

    expect(screen.getByText(/Next/i)).toBeTruthy();
    expect(screen.getByText("Saudi Arabia")).toBeTruthy();
  });

  it("renders the home-page variant and navigates when pressed", () => {
    const screen = render(<PrayerTimesCard homePage />);

    expect(screen.getByText(/Next/i)).toBeTruthy();
    fireEvent.press(screen.getByText(/Next/i));

    expect(mockPush).toHaveBeenCalledWith("/solah/solah-time");
  });
});
