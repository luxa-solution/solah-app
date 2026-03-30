import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { NotificationCustomizationSheet } from "./NotificationCustomizationSheet";

const initialState = useSettingsStore.getState();

describe("NotificationCustomizationSheet", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
    useSettingsStore.setState({
      prayerSchedule: {
        ...initialState.prayerSchedule,
        Subhi: {
          ...initialState.prayerSchedule.Subhi,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
      },
    });
  });

  it("shows the current notification icons immediately", () => {
    const { getByText } = render(<NotificationCustomizationSheet />);

    expect(getByText("volume-high")).toBeTruthy();
    expect(getByText("vibrate")).toBeTruthy();
  });

  it("renders rows without divider lines", () => {
    const { getByTestId } = render(<NotificationCustomizationSheet />);

    expect(getByTestId("notification-row-subhi")).toHaveStyle({ borderBottomWidth: 0 });
  });

  it("cycles notification delivery modes when a cell is pressed", () => {
    const { getByTestId, getByLabelText } = render(<NotificationCustomizationSheet />);

    expect(getByLabelText("Sound")).toBeTruthy();
    fireEvent.press(getByTestId("notification-mode-subhi-adhan"));
    expect(useSettingsStore.getState().prayerSchedule.Subhi.adhanNotificationMode).toBe("mute");

    fireEvent.press(getByTestId("notification-mode-subhi-iqamah"));
    expect(useSettingsStore.getState().prayerSchedule.Subhi.iqamahNotificationMode).toBe("sound");
  });
});
