import { render } from "@testing-library/react-native";
import React from "react";

import type { SolahGroup } from "@/features-solah/types";

import { StepDescription } from "./StepDescription";

type Item = SolahGroup["items"][number];

const makeItem = (overrides: Partial<Item> = {}): Item =>
  ({
    id: "1",
    solah: "Fajr" as any,
    title: "Qiyām",
    entries: [],
    ...overrides,
  }) as Item;

describe("StepDescription", () => {
  it("renders the English instruction text", () => {
    const { getByText } = render(
      <StepDescription
        items={makeItem({ instruction: { en: "Stand upright facing the Qiblah." } })}
      />
    );
    expect(getByText("Stand upright facing the Qiblah.")).toBeTruthy();
  });

  it("renders nothing visible when instruction is undefined", () => {
    const { queryByText } = render(
      <StepDescription items={makeItem({ instruction: undefined })} />
    );
    expect(queryByText("Stand upright facing the Qiblah.")).toBeNull();
  });

  it("renders updated text when props change", () => {
    const { getByText, rerender } = render(
      <StepDescription items={makeItem({ instruction: { en: "First instruction" } })} />
    );
    expect(getByText("First instruction")).toBeTruthy();

    rerender(<StepDescription items={makeItem({ instruction: { en: "Second instruction" } })} />);
    expect(getByText("Second instruction")).toBeTruthy();
  });
});
