import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SettingsHome } from "./SettingsHome";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("SettingsHome integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("updates the language through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Language"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId("bottomsheet-backdrop")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "English");
    act(() => {
      fireEvent.press(screen.getByText("English"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().language.value).toBe("English");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("English")).toBeTruthy();
  });

  it("updates the calculation method through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Calculation method"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "Karachi");
    act(() => {
      fireEvent.press(screen.getByText("Karachi"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().calculationMethod.method).toBe("Karachi");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("Karachi")).toBeTruthy();
  });

  it("updates a prayer adhan mode through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Adhan settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Dhuhr adhan"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("At solah time")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByLabelText("Relative after solah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Hours"), "0");
    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "10");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhan).toEqual({
        mode: "relative_after_solah",
        offsetMinutes: 10,
      });
    });

    expect(screen.getByText("Subhi adhan")).toBeTruthy();
    expect(screen.getByText("Isha adhan")).toBeTruthy();
  });

  it("rejects a fixed adhan time that is before the prayer time", async () => {
    useSettingsStore.setState({
      location: {
        name: "Riyadh",
        location: {
          latitude: 24.7136,
          longitude: 46.6753,
          city: "Riyadh",
          region: "Riyadh",
          country: "Saudi Arabia",
        },
        timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
        isDefault: false,
      },
    });

    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Adhan settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Dhuhr adhan"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByLabelText("Fixed time"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Hour"), "10");
    fireEvent.changeText(screen.getByPlaceholderText("Minute"), "00");
    fireEvent.press(screen.getByText("AM"));

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Fixed adhan time must be after solah time")).toBeTruthy();
    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhan.mode).toBe("at_solah_time");
  });

  it("updates iqamah delay within range and rejects values above 60", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Iqamah settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Maghrib iqamah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "60");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahDelayMinutes).toBe(60);
    });

    expect(screen.getByText("Subhi iqamah")).toBeTruthy();
    expect(screen.getByText("Isha iqamah")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Iqamah settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Maghrib iqamah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "65");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Iqamah delay must be between 5 and 60 minutes")).toBeTruthy();
    expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahDelayMinutes).toBe(60);
  });

  it("shows the manual time zone item and persists override when auto time zone is turned off", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Automatically get time zone"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().autoTimezoneEnabled).toBe(false);
    });

    expect(screen.getByText("Manual time zone")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Manual time zone"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "Paris");
    act(() => {
      fireEvent.press(screen.getByText("(UTC+01:00) Central European Time (Paris)"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().timezone.timezone).toBe("Europe/Paris");
    });

    expect(screen.queryByText("Time zone")).toBeNull();
  });

  it("opens the customize notifications sheet only after prayer time notifications are enabled", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Prayer time notification"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
    });

    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhanNotificationMode).toBe("sound");
    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.iqamahNotificationMode).toBe("vibrate");

    act(() => {
      fireEvent.press(screen.getByText("Customize notifications"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Customize Notifications")).toBeTruthy();
    expect(screen.getByText("Solah")).toBeTruthy();
    expect(screen.getByText("Adhan")).toBeTruthy();
    expect(screen.getByText("Iqamah")).toBeTruthy();
  });

  it("cycles per-prayer notification delivery modes inside the customize notifications sheet", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Prayer time notification"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
    });

    act(() => {
      fireEvent.press(screen.getByText("Customize notifications"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByTestId("notification-mode-dhuhr-adhan"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByTestId("notification-mode-maghrib-iqamah"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhanNotificationMode).toBe("mute");
      expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahNotificationMode).toBe(
        "sound"
      );
    });
  });
});
