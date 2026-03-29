import { render } from "@testing-library/react-native";
import React from "react";

import type { SolahGroup } from "@/features-solah/types";

import { StepTitle } from "./StepTitle";

type Item = SolahGroup["items"][number];

const makeItem = (overrides: Partial<Item> = {}): Item =>
  ({
    id: "1",
    solah: "Fajr" as any,
    title: "Qiyām",
    entries: [],
    ...overrides,
  }) as Item;

describe("StepTitle", () => {
  it("renders the item title", () => {
    const { getByText } = render(<StepTitle items={makeItem({ title: "Rukūʿ" })} />);
    expect(getByText("Rukūʿ")).toBeTruthy();
  });

  it("renders a different title when prop changes", () => {
    const { getByText, rerender } = render(<StepTitle items={makeItem({ title: "Sujūd" })} />);
    expect(getByText("Sujūd")).toBeTruthy();

    rerender(<StepTitle items={makeItem({ title: "Qiyām" })} />);
    expect(getByText("Qiyām")).toBeTruthy();
  });

  it("renders an empty string title without crashing", () => {
    const { queryByText } = render(<StepTitle items={makeItem({ title: "" })} />);
    expect(queryByText("Qiyām")).toBeNull();
  });
});
