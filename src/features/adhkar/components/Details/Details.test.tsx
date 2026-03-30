import { render } from "@testing-library/react-native";
import React from "react";

import { Details } from "./Details";

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
          title: "Before Item",
          entries: [{ arabicText: "arabic", transliteration: "trans", translation: { en: "eng" } }],
          illustration: null,
        },
      ],
    },
    {
      type: "during",
      items: [
        {
          id: "2",
          type: "during",
          title: "During Item",
          entries: [],
          illustration: null,
        },
      ],
    },
    {
      type: "after",
      items: [
        {
          id: "3",
          type: "after",
          title: "After Item",
          entries: [],
          illustration: null,
        },
      ],
    },
  ],
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => ({
    toggleFavourite: jest.fn(),
    isFavourite: jest.fn(() => false),
  }),
}));

describe("Details", () => {
  it("shows No data available when item not found", () => {
    const { getByText } = render(<Details id="999" adhkar_type={"before" as any} />);
    expect(getByText("No data available")).toBeTruthy();
  });

  it("renders the arabic text for a before-type item", () => {
    const { getByText } = render(<Details id="1" adhkar_type={"before" as any} />);
    expect(getByText("arabic")).toBeTruthy();
  });

  it("renders for a during-type item (no entries, no crash)", () => {
    const { queryByText } = render(<Details id="2" adhkar_type={"during" as any} />);
    expect(queryByText("No data available")).toBeNull();
  });

  it("renders for an after-type item (no entries, no crash)", () => {
    const { queryByText } = render(<Details id="3" adhkar_type={"after" as any} />);
    expect(queryByText("No data available")).toBeNull();
  });

  it("shows No data when id matches but type does not", () => {
    const { getByText } = render(<Details id="1" adhkar_type={"during" as any} />);
    expect(getByText("No data available")).toBeTruthy();
  });

  it("shows No data when type matches but id does not", () => {
    const { getByText } = render(<Details id="999" adhkar_type={"after" as any} />);
    expect(getByText("No data available")).toBeTruthy();
  });
});
