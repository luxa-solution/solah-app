import { render } from "@testing-library/react-native";
import React from "react";

import type { DetailsProps } from "@/features-adhkar/components/Details";
import type { TitleBarProps } from "@/features-adhkar/components/TitleBar";

import { AdhkarDetails } from "./AdhkarDetails";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 16, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    {
      type: "before",
      items: [
        {
          id: "1",
          type: "before",
          title: "Before Prayer Adhkar",
          entries: [{ arabicText: "بِسْمِ اللَّهِ", transliteration: "Bismillah" }],
          illustration: null,
        },
      ],
    },
    {
      type: "after",
      items: [
        {
          id: "2",
          type: "after",
          title: "After Prayer Adhkar",
          entries: [],
          illustration: null,
        },
      ],
    },
  ],
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
    TitleBar: ({ adhkar_type, adhkarItem, showBookmark }: TitleBarProps) => (
      <Text>
        TitleBar:{adhkar_type}:{adhkarItem?.title ?? "none"}:{showBookmark ? "bm" : "no-bm"}
      </Text>
    ),
    Details: ({ id, adhkar_type }: DetailsProps) => (
      <Text>
        Details:{id}:{adhkar_type}
      </Text>
    ),
  };
});

describe("AdhkarDetails", () => {
  it("renders TitleBar and Details for a known adhkar item", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="1" />);

    expect(getByText("TitleBar:before:Before Prayer Adhkar:bm")).toBeTruthy();
    expect(getByText("Details:1:before")).toBeTruthy();
  });

  it("renders TitleBar with no item when adhkar not found", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="999" />);

    expect(getByText("TitleBar:before:none:bm")).toBeTruthy();
    expect(getByText("Details:999:before")).toBeTruthy();
  });

  it("renders correctly for after prayer type", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="after" id="2" />);

    expect(getByText("TitleBar:after:After Prayer Adhkar:bm")).toBeTruthy();
    expect(getByText("Details:2:after")).toBeTruthy();
  });
});
