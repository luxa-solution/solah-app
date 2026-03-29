import { render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarListProps } from "@/features-adhkar/components/List";
import type { TitleBarProps } from "@/features-adhkar/components/TitleBar";

import { AdhkarList } from "./AdhkarList";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 20, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => ({
    toggleBookmark: jest.fn(),
    isBookmarked: jest.fn(() => false),
  }),
}));

jest.mock("@/features-adhkar/components", () => {
  const { Text } = require("react-native");
  return {
    TitleBar: ({ adhkar_type, showBookmark }: TitleBarProps) => (
      <Text>
        TitleBar:{adhkar_type}:{showBookmark ? "bm" : "no-bm"}
      </Text>
    ),
    List: ({ type }: AdhkarListProps) => <Text>List:{type}</Text>,
  };
});

describe("AdhkarList", () => {
  it("renders TitleBar without bookmark and List for before type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="before" />);

    expect(getByText("TitleBar:before:no-bm")).toBeTruthy();
    expect(getByText("List:before")).toBeTruthy();
  });

  it("renders correctly for during type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="during" />);

    expect(getByText("TitleBar:during:no-bm")).toBeTruthy();
    expect(getByText("List:during")).toBeTruthy();
  });

  it("renders correctly for after type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="after" />);

    expect(getByText("TitleBar:after:no-bm")).toBeTruthy();
    expect(getByText("List:after")).toBeTruthy();
  });
});
