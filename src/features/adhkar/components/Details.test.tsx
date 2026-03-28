import { render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarItem } from "@/features-adhkar/types";

import { Details } from "./Details";

jest.mock("@/features-adhkar/data", () => ({
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

jest.mock("./details-comps", () => ({
  AdhkarDisplay: ({ item }: { item: AdhkarItem }) => {
    const { Text } = require("react-native");
    return <Text>DISPLAY:{item.title}</Text>;
  },
}));

describe("Details", () => {
  it("shows No data available when item not found", () => {
    const { getByText } = render(<Details id="999" adhkar_type={"before" as any} />);
    expect(getByText("No data available")).toBeTruthy();
  });

  it("renders AdhkarDisplay for a before-type item", () => {
    const { getByText } = render(<Details id="1" adhkar_type={"before" as any} />);
    expect(getByText("DISPLAY:Before Item")).toBeTruthy();
  });

  it("renders AdhkarDisplay for a during-type item", () => {
    const { getByText } = render(<Details id="2" adhkar_type={"during" as any} />);
    expect(getByText("DISPLAY:During Item")).toBeTruthy();
  });

  it("renders AdhkarDisplay for an after-type item", () => {
    const { getByText } = render(<Details id="3" adhkar_type={"after" as any} />);
    expect(getByText("DISPLAY:After Item")).toBeTruthy();
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
