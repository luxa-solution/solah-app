import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TestRenderer from "react-test-renderer";

import { FindQiblaButton } from "./FindQiblaButton";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("FindQiblaButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button label and icons", () => {
    const screen = render(<FindQiblaButton />);

    expect(screen.getByText("Find Qibla Direction")).toBeTruthy();
    expect(screen.getAllByText(/map-marker-circle|chevron-right|Icon/).length).toBeGreaterThan(0);
  });

  it("navigates to the qibla-direction screen when pressed", () => {
    const screen = render(<FindQiblaButton />);

    fireEvent.press(screen.getByText("Find Qibla Direction"));

    expect(mockPush).toHaveBeenCalledWith("/solah/qibla-direction");
  });

  it("uses the pressed style branch", () => {
    let tree: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<FindQiblaButton />);
    });
    const pressable = tree.root.find((node) => typeof node.props.style === "function");

    const pressedStyles = pressable.props.style({ pressed: true });

    expect(Array.isArray(pressedStyles)).toBe(true);
    expect(pressedStyles[1]).toEqual({ opacity: 0.8 });
  });
});
