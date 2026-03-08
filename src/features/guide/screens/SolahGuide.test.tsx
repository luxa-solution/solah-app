import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { SolahGuide } from "./SolahGuide";

// Safe area inset
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

// Keep UI stable: mock heavy children
jest.mock("@/shared/components", () => {
  const { Text, View } = require("react-native");
  return {
    TitleBar: ({ title }: { title: string }) => <Text>{title}</Text>,
    ProgressBar: ({ percent }: { percent: number }) => (
      <View>
        <Text>PROGRESS:{Math.round(percent)}</Text>
      </View>
    ),
  };
});

jest.mock("@/features/guide/components", () => {
  const { Text, View } = require("react-native");
  return {
    StepTitle: ({ items }: any) => <Text>STEP_TITLE:{items.title}</Text>,
    StepDescription: ({ items }: any) => <Text>STEP_DESC:{items.instruction?.en ?? ""}</Text>,
    AdhkarCard: () => (
      <View>
        <Text>ADHKAR_CARD</Text>
      </View>
    ),
  };
});

// Make solahGuides deterministic for test
jest.mock("@/features-solah/data", () => ({
  solahGuides: {
    Fajr: {
      items: [
        {
          title: "Step One",
          instruction: { en: "Do the first thing" },
          entries: [{ arabicText: "A", transliteration: "T", media: {} }],
        },
        {
          title: "Step Two",
          instruction: { en: "Do the second thing" },
          entries: [{ arabicText: "B", transliteration: "T2", media: {} }],
        },
        {
          title: "Step Three",
          instruction: { en: "Do the third thing" },
          entries: [{ arabicText: "C", transliteration: "T3", media: {} }],
        },
      ],
    },
  },
}));

describe("SolahGuide (critical behavior)", () => {
  it("renders initial step and title", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    expect(getByText("Fajr")).toBeTruthy();
    expect(getByText("Step 1/3")).toBeTruthy();
    expect(getByText("STEP_TITLE:Step One")).toBeTruthy();
  });

  it("goes to next step and stops at last step", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    fireEvent.press(getByText("Next"));
    expect(getByText("Step 2/3")).toBeTruthy();
    expect(getByText("STEP_TITLE:Step Two")).toBeTruthy();

    fireEvent.press(getByText("Next"));
    expect(getByText("Step 3/3")).toBeTruthy();
    expect(getByText("STEP_TITLE:Step Three")).toBeTruthy();

    // pressing Next at last step should not move beyond
    fireEvent.press(getByText("Next"));
    expect(getByText("Step 3/3")).toBeTruthy();
  });

  it("goes to previous step and stops at first step", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    // Move forward first
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Next"));
    expect(getByText("Step 3/3")).toBeTruthy();

    // Go back
    fireEvent.press(getByText("Previous"));
    expect(getByText("Step 2/3")).toBeTruthy();

    fireEvent.press(getByText("Previous"));
    expect(getByText("Step 1/3")).toBeTruthy();

    // pressing Previous at first step should not move before
    fireEvent.press(getByText("Previous"));
    expect(getByText("Step 1/3")).toBeTruthy();
  });
});
