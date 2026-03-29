import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";
import TestRenderer from "react-test-renderer";

import type { AdhkarItem } from "@/features-adhkar/types";

import { ListItem } from "./ListItem";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ListItem (critical behavior)", () => {
  beforeEach(() => mockPush.mockClear());

  it("shows entry count", () => {
    const item: AdhkarItem = {
      id: "10",
      title: "Adhkar Title",
      type: "before" as any,
      entries: [{}, {}, {}] as any,
    } as any;

    const { getByText } = render(<ListItem item={item} />);
    expect(getByText("(3)")).toBeTruthy();
  });

  it("navigates to details on press", () => {
    const item: AdhkarItem = {
      id: "10",
      title: "Adhkar Title",
      type: "before" as any,
      entries: [] as any,
    } as any;

    const { getByText } = render(<ListItem item={item} />);

    fireEvent.press(getByText("Adhkar Title"));

    expect(mockPush).toHaveBeenCalledWith("/adhkar/details?adhkar_type=before&id=10");
  });

  it("renders the icon and pressed style callback", () => {
    const item: AdhkarItem = {
      id: "11",
      title: "Adhkar Title",
      type: "before" as any,
      entries: [] as any,
    } as any;

    const { UNSAFE_getByType } = render(<ListItem item={item} />);
    let tree: any;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<ListItem item={item} />);
    });

    expect(UNSAFE_getByType(Image)).toBeTruthy();

    const pressable = tree.root.find((node: any) => typeof node.props.style === "function");
    const pressedStyles = pressable.props.style({ pressed: true });
    expect(pressedStyles[1]).toEqual({ opacity: 0.75 });
  });
});
