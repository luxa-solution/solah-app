import { AdhkarItem } from "@/features-adhkar/types";

import { searchAdhkar } from "./searchUtils";

const mockItems: AdhkarItem[] = [
  {
    id: "1",
    type: "before",
    title: "Before Prayer Dua",
    entries: [
      {
        arabicText: "اللَّهُمَّ أَنْتَ رَبِّي",
        transliteration: "Allahumma anta rabbi",
        translation: { en: "O Allah, You are my Lord" },
      },
    ],
    illustration: {} as any,
  },
  {
    id: "2",
    type: "during",
    title: "During Prayer Supplication",
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal A'la",
        translation: { en: "Glory be to my Lord, the Most High" },
      },
    ],
    illustration: {} as any,
  },
  {
    id: "3",
    type: "after",
    title: "After Prayer Dhikr",
    entries: [
      {
        arabicText: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullah",
        translation: { en: "I seek forgiveness from Allah" },
      },
    ],
    illustration: {} as any,
  },
];

describe("searchAdhkar", () => {
  it("returns empty array when query is empty", () => {
    const result = searchAdhkar(mockItems, "");
    expect(result).toEqual([]);
  });

  it("returns empty array when query is only whitespace", () => {
    const result = searchAdhkar(mockItems, "   ");
    expect(result).toEqual([]);
  });

  it("finds items by title", () => {
    const result = searchAdhkar(mockItems, "Prayer");
    expect(result).toHaveLength(3);
    expect(result[0].title).toContain("Prayer");
  });

  it("finds items by arabic text", () => {
    const result = searchAdhkar(mockItems, "اللَّهُمَّ");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("finds items by transliteration", () => {
    const result = searchAdhkar(mockItems, "Subhana");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("finds items by translation", () => {
    const result = searchAdhkar(mockItems, "forgiveness");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("is case insensitive", () => {
    const result1 = searchAdhkar(mockItems, "prayer");
    const result2 = searchAdhkar(mockItems, "PRAYER");
    expect(result1).toHaveLength(3);
    expect(result2).toHaveLength(3);
  });

  it("returns multiple matches when query matches multiple items", () => {
    const result = searchAdhkar(mockItems, "Prayer");
    expect(result).toHaveLength(3);
  });

  it("returns empty array when no matches found", () => {
    const result = searchAdhkar(mockItems, "nonexistent");
    expect(result).toEqual([]);
  });

  it("searches across all entry fields", () => {
    // Search in arabic
    const arabicResult = searchAdhkar(mockItems, "اللَّهُمَّ");
    expect(arabicResult).toHaveLength(1);

    // Search in transliteration
    const translitResult = searchAdhkar(mockItems, "Astaghfirullah");
    expect(translitResult).toHaveLength(1);

    // Search in translation
    const translationResult = searchAdhkar(mockItems, "Glory be to my Lord");
    expect(translationResult).toHaveLength(1);
  });
});
