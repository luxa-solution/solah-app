import { render } from "@testing-library/react-native";
import React from "react";

import { adhkarData } from "@/features-adhkar/data";

import { List } from "./List";

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("adhkar/List", () => {
  it("renders list items for the 'before' type", () => {
    const { getAllByText } = render(<List type="before" />);
    const beforeGroup = adhkarData.find((g) => g.type === "before")!;
    const firstItem = beforeGroup.items[0];
    expect(getAllByText(firstItem.title).length).toBeGreaterThanOrEqual(1);
  });

  it("renders list items for the 'during' type", () => {
    const { getAllByText } = render(<List type="during" />);
    const duringGroup = adhkarData.find((g) => g.type === "during")!;
    const firstItem = duringGroup.items[0];
    expect(getAllByText(firstItem.title).length).toBeGreaterThanOrEqual(1);
  });

  it("renders list items for the 'after' type", () => {
    const { getAllByText } = render(<List type="after" />);
    const afterGroup = adhkarData.find((g) => g.type === "after")!;
    const firstItem = afterGroup.items[0];
    expect(getAllByText(firstItem.title).length).toBeGreaterThanOrEqual(1);
  });

  it("renders entry count for each item", () => {
    const beforeGroup = adhkarData.find((g) => g.type === "before")!;
    const firstItem = beforeGroup.items[0];
    const count = firstItem.entries.length;

    const { getAllByText } = render(<List type="before" />);
    expect(getAllByText(`(${count})`).length).toBeGreaterThanOrEqual(1);
  });

  it("renders correct number of items for before type", () => {
    const beforeGroup = adhkarData.find((g) => g.type === "before")!;
    const { getAllByText } = render(<List type="before" />);

    beforeGroup.items.forEach((item) => {
      expect(getAllByText(item.title).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders an empty list for an unknown type", () => {
    // @ts-expect-error intentionally covering the fallback branch
    const { queryAllByText } = render(<List type="unknown" />);

    expect(queryAllByText(/\(.+\)/).length).toBe(0);
  });
});
