import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { SettingsHome } from "./SettingsHome";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const initialSettingsState = useSettingsStore.getState();

describe("SettingsHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useSettingsStore.setState(initialSettingsState, true);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders the Settings title", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Settings")).toBeTruthy();
  });

  it("renders the settings group labels", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Solah times")).toBeTruthy();
    expect(screen.getByText("Notifications")).toBeTruthy();
    expect(screen.getByText("General")).toBeTruthy();
    expect(screen.getByText("Appearance")).toBeTruthy();
  });

  it("renders the settings item labels", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Calculation method")).toBeTruthy();
    expect(screen.getByText("Automatically get time zone")).toBeTruthy();
    expect(screen.getByText("Adhan settings")).toBeTruthy();
    expect(screen.getByText("Iqamah settings")).toBeTruthy();
    expect(screen.getByText("Language")).toBeTruthy();
  });

  it("keeps prayer-specific adhan and iqamah rows out of the home screen", () => {
    const screen = render(<SettingsHome />);

    expect(screen.queryByText("Dhuhr adhan")).toBeNull();
    expect(screen.queryByText("Maghrib iqamah")).toBeNull();
  });

  it("renders the notification toggle", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Prayer time notification")).toBeTruthy();
  });

  it("opens the bottom sheet when pressing a settings item", () => {
    const screen = render(<SettingsHome />);

    // The bottom sheet is closed initially (not mounted = not rendered)
    // Press an item to open it
    act(() => {
      fireEvent.press(screen.getByText("Calculation method"));
      jest.runOnlyPendingTimers();
    });

    // Sheet content should be visible - the search bar for calmethod
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();
  });

  it("shows read-only time zone text while automatic time zone is enabled", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Time zone")).toBeTruthy();
    expect(screen.queryByText("Manual time zone")).toBeNull();
  });

  it("shows the manual time zone item when automatic time zone is disabled", () => {
    act(() => {
      useSettingsStore.getState().setAutoTimezoneEnabled(false);
    });

    const screen = render(<SettingsHome />);

    expect(screen.getByText("Manual time zone")).toBeTruthy();
    expect(screen.queryByText("Time zone")).toBeNull();
  });

  it("keeps customize notifications hidden while prayer time notifications are off", () => {
    const screen = render(<SettingsHome />);

    expect(screen.queryByText("Customize notifications")).toBeNull();
    expect(screen.queryByText("Dhuhr adhan notification")).toBeNull();
  });

  it("shows the customize notifications action when prayer time notifications are enabled", () => {
    act(() => {
      useSettingsStore.getState().setSolahTimeNotification(true);
    });

    const screen = render(<SettingsHome />);

    expect(screen.getByText("Customize notifications")).toBeTruthy();
  });
});
