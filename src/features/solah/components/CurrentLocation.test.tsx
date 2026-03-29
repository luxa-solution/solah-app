import { render } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { CurrentLocation } from "./CurrentLocation";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("CurrentLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
  });

  it("renders the selected country in chevron mode", () => {
    useSettingsStore.setState({
      location: {
        name: "Riyadh",
        location: {
          city: "Riyadh",
          region: "Riyadh Region",
          country: "Saudi Arabia",
          latitude: 24.7136,
          longitude: 46.6753,
        },
        timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
      },
    });

    const screen = render(<CurrentLocation type="chevron" />);

    expect(screen.getByText("Saudi Arabia")).toBeTruthy();
    expect(screen.getByText("ChevronDown")).toBeTruthy();
  });

  it("falls back when no selected location exists in chevron mode", () => {
    useSettingsStore.setState({
      location: { name: "Unknown", location: null as any } as any,
    });

    const screen = render(<CurrentLocation type="chevron" />);

    expect(screen.getByText("No location data")).toBeTruthy();
  });

  it("renders the default location in container mode", () => {
    useDefaultStore.setState({
      defaultLocation: {
        name: "Riyadh",
        location: {
          city: "Riyadh",
          region: "Riyadh Region",
          country: "Saudi Arabia",
          latitude: 24.7136,
          longitude: 46.6753,
        },
        timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
      },
    });

    const screen = render(<CurrentLocation type="container" />);

    expect(screen.getByText("Riyadh, Riyadh Region")).toBeTruthy();
    expect(screen.getByText("Saudi Arabia")).toBeTruthy();
  });

  it("renders the empty-state message in container mode when no location exists", () => {
    useDefaultStore.setState({
      defaultLocation: { name: "Default", location: null as any } as any,
    });

    const screen = render(<CurrentLocation type="container" />);

    expect(screen.getByText("No location data")).toBeTruthy();
  });
});
