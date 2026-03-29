import { render } from "@testing-library/react-native";
import React from "react";

import { AdhkarDetails } from "./AdhkarDetails";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 16, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/features-adhkar/data", () => ({
  totalAdhkarAmt: {
    before: 10,
    during: 5,
    after: 8,
  },
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

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}));

describe("AdhkarDetails", () => {
  it("renders the title for a known adhkar item", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="1" />);

    expect(getByText("Before Prayer")).toBeTruthy();
  });

  it("shows arabic text content when item has entries", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="1" />);

    expect(getByText("بِسْمِ اللَّهِ")).toBeTruthy();
  });

  it("renders title bar when adhkar not found", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="999" />);

    expect(getByText("Before Prayer")).toBeTruthy();
  });

  it("shows No data available when item not found", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="before" id="999" />);

    expect(getByText("No data available")).toBeTruthy();
  });

  it("renders correctly for after prayer type", () => {
    const { getByText } = render(<AdhkarDetails adhkar_type="after" id="2" />);

    expect(getByText("After Prayer")).toBeTruthy();
  });
});
