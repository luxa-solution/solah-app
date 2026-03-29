import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarItem } from "@/features-adhkar/types";

import { Card } from "./Card";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    push: (url: string) => mockPush(url),
  },
}));

describe("Adhkar Card (critical behavior)", () => {
  beforeEach(() => mockPush.mockClear());

  it("maps type to display title (before/during/after)", () => {
    const itemBefore = { id: "1", title: "X", type: "before", entries: [] } as any as AdhkarItem;
    const itemDuring = { id: "1", title: "X", type: "during", entries: [] } as any as AdhkarItem;
    const itemAfter = { id: "1", title: "X", type: "after", entries: [] } as any as AdhkarItem;

    const { getByText, rerender } = render(<Card data={itemBefore} />);
    expect(getByText("Before Prayer")).toBeTruthy();

    rerender(<Card data={itemDuring} />);
    expect(getByText("During Prayer")).toBeTruthy();

    rerender(<Card data={itemAfter} />);
    expect(getByText("After Prayer")).toBeTruthy();
  });

  it("navigates to details with adhkar_type and id when pressed", () => {
    const item = {
      id: "7",
      title: "Some Adhkar",
      type: "before",
      entries: [],
      illustration: undefined,
    } as any as AdhkarItem;

    const { getByText } = render(<Card data={item} />);

    // press on visible text (Pressable contains it)
    fireEvent.press(getByText("Some Adhkar"));

    expect(mockPush).toHaveBeenCalledWith("/adhkar/details?adhkar_type=before&id=7");
  });

  it("falls back to an empty type label for unknown types", () => {
    const item = {
      id: "8",
      title: "Unknown",
      type: "other",
      entries: [],
      illustration: undefined,
    } as any as AdhkarItem;

    const { queryByText, getByText } = render(<Card data={item} />);

    expect(queryByText("Before Prayer")).toBeNull();
    expect(getByText("Unknown")).toBeTruthy();
  });

  it("prefers cardTitle over title and renders the illustration", () => {
    const item = {
      id: "9",
      title: "Title",
      cardTitle: "Card Title",
      type: "before",
      entries: [],
      illustration: 1,
    } as any as AdhkarItem;

    const { getByText, UNSAFE_getByType } = render(<Card data={item} variant="large" />);
    const { Image } = require("react-native");

    expect(getByText("Card Title")).toBeTruthy();
    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });
});
