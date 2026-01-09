import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

import { AppButton } from "./Button";

describe("AppButton (critical behavior)", () => {
  it("calls onPress when pressed", () => {
    const onPress = jest.fn();

    const { getByText } = render(<AppButton title="Continue" onPress={onPress} />);

    fireEvent.press(getByText("Continue"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();

    const { getByText } = render(<AppButton title="Continue" onPress={onPress} disabled />);

    fireEvent.press(getByText("Continue"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows spinner and blocks press when loading", () => {
    const onPress = jest.fn();

    const { queryByText, getByTestId, UNSAFE_getByType } = render(
      <AppButton title="Continue" onPress={onPress} loading />
    );

    // text is replaced by spinner
    expect(queryByText("Continue")).toBeNull();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    // press is blocked
    fireEvent.press(getByTestId("app-button"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
