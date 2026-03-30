import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { SettingsToggleRow } from "./SettingsToggleRow";

describe("SettingsToggleRow", () => {
  it("toggles from the row press and switch change", () => {
    const onToggle = jest.fn();
    const { getByText, getByRole } = render(
      <SettingsToggleRow label="Prayer notification" value="On" enabled onToggle={onToggle} />
    );

    fireEvent.press(getByText("Prayer notification"));
    expect(onToggle).toHaveBeenCalledWith(false);

    fireEvent(getByRole("switch"), "valueChange", true);
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
