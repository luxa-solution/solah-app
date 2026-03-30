import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { PrayerSettingsOverviewCard } from "./PrayerSettingsOverviewCard";

describe("PrayerSettingsOverviewCard", () => {
  it("renders the configured overview card and routes presses", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PrayerSettingsOverviewCard type="adhansettings" onPress={onPress} />
    );

    fireEvent.press(getByText("Adhan settings"));

    expect(getByText("Adhan")).toBeTruthy();
    expect(onPress).toHaveBeenCalledWith("adhansettings");
  });

  it("returns null for an unknown overview type", () => {
    const { toJSON } = render(
      <PrayerSettingsOverviewCard
        // @ts-expect-error intentional invalid branch coverage
        type="unknown"
        onPress={jest.fn()}
      />
    );

    expect(toJSON()).toBeNull();
  });
});
