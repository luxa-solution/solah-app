import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ActivityIndicator, Text } from "react-native";

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

  it("renders the left icon and outline styles", () => {
    const { getByText, getByTestId } = render(
      <AppButton
        title="Continue"
        variant="outline"
        leftIcon={<Text>Icon</Text>}
        fullWidth={false}
      />
    );

    expect(getByText("Icon")).toBeTruthy();

    const styles = getByTestId("app-button").props.style.flat();
    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "transparent" }),
        expect.objectContaining({ borderColor: expect.any(String) }),
      ])
    );
    expect(styles).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ alignSelf: "stretch" })])
    );
  });

  it("renders ghost variant without calling a missing handler", () => {
    const { getByText, getByTestId } = render(<AppButton title="Skip" variant="ghost" />);

    fireEvent.press(getByText("Skip"));

    const styles = getByTestId("app-button").props.style.flat();
    expect(styles).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: "transparent" })])
    );
  });

  it("renders filled variant with brand background color", () => {
    const { getByTestId } = render(<AppButton title="Submit" variant="filled" />);

    const styles = getByTestId("app-button").props.style.flat();
    const hasBrandBg = styles.some(
      (s: any) => s && typeof s.backgroundColor === "string" && s.backgroundColor !== "transparent"
    );
    expect(hasBrandBg).toBe(true);
  });

  it("applies opacity style when disabled", () => {
    const { getByTestId } = render(<AppButton title="Disabled" disabled />);

    const styles = getByTestId("app-button").props.style.flat();
    expect(styles).toEqual(expect.arrayContaining([expect.objectContaining({ opacity: 0.6 })]));
  });

  it("stretches to full width by default", () => {
    const { getByTestId } = render(<AppButton title="Wide" />);

    const styles = getByTestId("app-button").props.style.flat();
    expect(styles).toEqual(
      expect.arrayContaining([expect.objectContaining({ alignSelf: "stretch" })])
    );
  });
});
