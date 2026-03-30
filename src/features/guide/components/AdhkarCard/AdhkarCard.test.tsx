import { render } from "@testing-library/react-native";
import React from "react";

import type { SolahGroup } from "@/features-solah/types";

import { AdhkarCard } from "./AdhkarCard";

jest.mock("expo-image", () => {
  const mockReact = require("react");
  const { View } = require("react-native");
  return {
    Image: (props: any) => mockReact.createElement(View, { testID: "expo-image", ...props }),
  };
});

type Item = SolahGroup["items"][number];

const makeItem = (overrides: Partial<Item> = {}): Item =>
  ({
    id: "1",
    solah: "Fajr" as any,
    title: "Takbīr",
    entries: [],
    ...overrides,
  }) as Item;

describe("guide/AdhkarCard", () => {
  it("renders nothing when entries array is empty", () => {
    const { queryByText } = render(<AdhkarCard items={makeItem({ entries: [] })} />);
    expect(queryByText("بِسْمِ اللَّهِ")).toBeNull();
  });

  it("renders arabic text for each entry", () => {
    const item = makeItem({
      entries: [
        {
          arabicText: "اللَّهُ أَكْبَرُ",
          transliteration: "Allāhu Akbar",
          translation: { en: "Allah is the Greatest." },
        },
      ],
    });

    const { getByText } = render(<AdhkarCard items={item} />);
    expect(getByText("اللَّهُ أَكْبَرُ")).toBeTruthy();
  });

  it("renders transliteration for each entry", () => {
    const item = makeItem({
      entries: [
        {
          arabicText: "اللَّهُ أَكْبَرُ",
          transliteration: "Allāhu Akbar",
          translation: { en: "Allah is the Greatest." },
        },
      ],
    });

    const { getByText } = render(<AdhkarCard items={item} />);
    expect(getByText("Allāhu Akbar")).toBeTruthy();
  });

  it("renders multiple entries", () => {
    const item = makeItem({
      entries: [
        {
          arabicText: "بِسْمِ اللَّهِ",
          transliteration: "Bismillāh",
          translation: { en: "In the name of Allah." },
        },
        {
          arabicText: "الْحَمْدُ لِلَّهِ",
          transliteration: "Alḥamdulillāh",
          translation: { en: "All praise is due to Allah." },
        },
      ],
    });

    const { getByText } = render(<AdhkarCard items={item} />);
    expect(getByText("بِسْمِ اللَّهِ")).toBeTruthy();
    expect(getByText("الْحَمْدُ لِلَّهِ")).toBeTruthy();
    expect(getByText("Bismillāh")).toBeTruthy();
    expect(getByText("Alḥamdulillāh")).toBeTruthy();
  });

  it("renders an AudioPlayButton for each entry", () => {
    const item = makeItem({
      entries: [
        {
          arabicText: "اللَّهُ أَكْبَرُ",
          transliteration: "Allāhu Akbar",
          translation: { en: "Allah is the Greatest." },
        },
        {
          arabicText: "سُبْحَانَ اللَّهِ",
          transliteration: "Subḥānallāh",
          translation: { en: "Glory be to Allah." },
        },
      ],
    });

    const { getAllByText } = render(<AdhkarCard items={item} />);
    expect(getAllByText("Play audio")).toHaveLength(2);
  });
});
