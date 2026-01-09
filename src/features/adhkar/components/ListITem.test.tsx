import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

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
});
