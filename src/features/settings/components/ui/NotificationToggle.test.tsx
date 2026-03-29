import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { Switch } from "react-native";
import TestRenderer from "react-test-renderer";

import { useSettingsStore } from "@/features-settings/store";

import { NotificationToggle } from "./NotificationToggle";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useSettingsStore.getState();

describe("NotificationToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialState, true);
    useSettingsStore.setState({ solahTimeNotification: false });
  });

  it("pressing the row toggles the value", () => {
    const { getByText } = render(<NotificationToggle />);

    fireEvent.press(getByText("Prayer time notification"));

    expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
  });

  it("switch valueChange calls setter", () => {
    const { UNSAFE_getByType } = render(<NotificationToggle />);

    fireEvent(UNSAFE_getByType(Switch), "valueChange", true);

    expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
  });

  it("renders the current On state and pressed style callback", () => {
    useSettingsStore.setState({ solahTimeNotification: true });

    const { getByText } = render(<NotificationToggle />);
    let tree: any;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<NotificationToggle />);
    });

    expect(getByText("On")).toBeTruthy();

    const pressable = tree.root.find((node: any) => typeof node.props.style === "function");
    const pressedStyles = pressable.props.style({ pressed: true });
    expect(Array.isArray(pressedStyles)).toBe(true);
  });
});
