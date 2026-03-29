import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TestRenderer from "react-test-renderer";

import { AudioPlayButton } from "./AudioPlayButton";

jest.mock("expo-image", () => {
  const mockReact = require("react");
  const { View } = require("react-native");
  return {
    Image: (props: any) => mockReact.createElement(View, { testID: "expo-image", ...props }),
  };
});

describe("AudioPlayButton", () => {
  it("renders the play audio label", () => {
    const { getByText } = render(<AudioPlayButton />);
    expect(getByText("Play audio")).toBeTruthy();
  });

  it("renders the button icon via expo-image", () => {
    const { getByTestId } = render(<AudioPlayButton />);
    expect(getByTestId("expo-image")).toBeTruthy();
  });

  it("can be pressed without throwing", () => {
    const { getByText } = render(<AudioPlayButton />);
    expect(() => fireEvent.press(getByText("Play audio"))).not.toThrow();
  });

  it("uses the pressed style branch", () => {
    let tree: any;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<AudioPlayButton />);
    });
    const pressable = tree.root.find((node: any) => typeof node.props.style === "function");

    const pressedStyles = pressable.props.style({ pressed: true });

    expect(Array.isArray(pressedStyles)).toBe(true);
    expect(pressedStyles[1]).toBeTruthy();
  });
});
