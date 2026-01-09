import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { NotificationToggle } from "./NotificationToggle";

const mockSetSolahTimeNotification = jest.fn();

let mockSolahTimeNotification = false;

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: () => ({
    solahTimeNotification: mockSolahTimeNotification,
    setSolahTimeNotification: mockSetSolahTimeNotification,
  }),
}));

describe("NotificationToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSolahTimeNotification = false;
  });

  it("pressing the row toggles the value", () => {
    const { getByText } = render(<NotificationToggle />);

    fireEvent.press(getByText("Prayer time notification"));

    expect(mockSetSolahTimeNotification).toHaveBeenCalledWith(true);
  });

  it("switch valueChange calls setter", () => {
    const { UNSAFE_getByType } = render(<NotificationToggle />);
    const { Switch } = require("react-native");

    fireEvent(UNSAFE_getByType(Switch), "valueChange", true);

    expect(mockSetSolahTimeNotification).toHaveBeenCalledWith(true);
  });
});
