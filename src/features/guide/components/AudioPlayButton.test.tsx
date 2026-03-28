import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

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
});
