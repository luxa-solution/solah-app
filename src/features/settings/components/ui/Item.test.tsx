import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TestRenderer from "react-test-renderer";

import { Item, itemStyles } from "./Item";

describe("Item", () => {
  it("renders the label and value", () => {
    const screen = render(<Item label="Language" value="English" />);

    expect(screen.getByText("Language")).toBeTruthy();
    expect(screen.getByText("English")).toBeTruthy();
  });

  it("calls onPress when enabled", () => {
    const onPress = jest.fn();
    const screen = render(<Item label="Language" value="English" onPress={onPress} />);

    fireEvent.press(screen.getByText("Language"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("uses the pressed style callback", () => {
    let tree: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<Item label="Language" value="English" />);
    });
    const pressable = tree.root.find((node) => typeof node.props.style === "function");

    const pressedStyles = pressable.props.style({ pressed: true });

    expect(pressedStyles).toContain(itemStyles.pressed);
  });
});
