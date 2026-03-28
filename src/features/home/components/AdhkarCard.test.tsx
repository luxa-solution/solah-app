import { render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarItem } from "@/features-adhkar/types";

import { AdhkarCard } from "./AdhkarCard";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const makeMockItem = (id: string, type: AdhkarItem["type"], title: string): AdhkarItem =>
  ({
    id,
    type,
    title,
    cardTitle: title,
    entries: [],
    illustration: undefined,
    tags: [],
  }) as unknown as AdhkarItem;

const mockLarge = makeMockItem("1", "before", "Large Card");
const mockTopSmall = makeMockItem("2", "during", "Top Small Card");
const mockBottomSmall = makeMockItem("3", "after", "Bottom Small Card");

jest.mock("@/features-home/hooks", () => ({
  useAdhkarAutoRotation: () => ({
    largeCard: mockLarge,
    topSmallCard: mockTopSmall,
    bottomSmallCard: mockBottomSmall,
  }),
}));

describe("home/AdhkarCard", () => {
  it("renders the Adhkār section title", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Adhkār")).toBeTruthy();
  });

  it("renders the large card from useAdhkarAutoRotation", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Large Card")).toBeTruthy();
  });

  it("renders the top small card from useAdhkarAutoRotation", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Top Small Card")).toBeTruthy();
  });

  it("renders the bottom small card from useAdhkarAutoRotation", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Bottom Small Card")).toBeTruthy();
  });

  it("renders all three cards simultaneously", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Large Card")).toBeTruthy();
    expect(getByText("Top Small Card")).toBeTruthy();
    expect(getByText("Bottom Small Card")).toBeTruthy();
  });
});
