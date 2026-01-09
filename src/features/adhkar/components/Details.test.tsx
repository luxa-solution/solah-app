import { render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarItem } from "@/features-adhkar/types";

import { Details } from "./Details";

jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    {
      type: "before",
      items: [{ id: "1", type: "before", title: "Found", entries: [] }],
    },
  ],
}));

jest.mock("./details-comps", () => ({
  AdhkarDisplay: ({ item }: { item: AdhkarItem }) => {
    const { Text } = require("react-native");
    return <Text>DISPLAY:{item.title}</Text>;
  },
}));

describe("Details (critical behavior)", () => {
  it("shows No data available when item not found", () => {
    const { getByText } = render(<Details id="999" adhkar_type={"before" as any} />);
    expect(getByText("No data available")).toBeTruthy();
  });

  it("renders AdhkarDisplay when item found", () => {
    const { getByText } = render(<Details id="1" adhkar_type={"before" as any} />);
    expect(getByText("DISPLAY:Found")).toBeTruthy();
  });
});
