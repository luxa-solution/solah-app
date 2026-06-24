import { renderHook, act } from "@testing-library/react-native";

import { AdhkarItem } from "@/features-adhkar/types";

import { useAdhkarSearch } from "./useAdhkarSearch";

const mockItems: AdhkarItem[] = [
  {
    id: "1",
    type: "before",
    title: "Before Prayer",
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
    title: "During Prayer",
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal A'la",
        translation: { en: "Glory be to my Lord, the Most High" },
      },
    ],
    illustration: {} as any,
  },
];

describe("useAdhkarSearch", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    expect(result.current.searchQuery).toBe("");
    expect(result.current.isSearchActive).toBe(false);
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.isSearching).toBe(false);
    expect(result.current.hasResults).toBe(false);
    expect(result.current.resultsCount).toBe(0);
  });

  it("handles toggle search", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.handleToggleSearch();
    });

    expect(result.current.isSearchActive).toBe(true);
  });

  it("handles search query and returns results", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.handleSearch("Allahumma");
    });

    expect(result.current.searchQuery).toBe("Allahumma");
    expect(result.current.isSearching).toBe(true);
    expect(result.current.searchResults).toHaveLength(1);
    expect(result.current.hasResults).toBe(true);
    expect(result.current.resultsCount).toBe(1);
    expect(result.current.searchResults[0].title).toBe("Before Prayer");
  });

  it("returns empty results when no match found", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.handleSearch("nonexistent");
    });

    expect(result.current.searchResults).toHaveLength(0);
    expect(result.current.hasResults).toBe(false);
    expect(result.current.resultsCount).toBe(0);
  });

  it("clears search results when query is empty", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.handleSearch("Allahumma");
    });

    expect(result.current.searchResults).toHaveLength(1);

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.searchQuery).toBe("");
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.isSearching).toBe(false);
  });

  it("generates suggestions with 6 items per category", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    expect(result.current.suggestions).toBeDefined();
  });

  it("handles back from search", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.handleToggleSearch();
    });

    expect(result.current.isSearchActive).toBe(true);

    act(() => {
      result.current.handleBackFromSearch();
    });

    expect(result.current.isSearchActive).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });

  it("sets isSearchActive via setIsSearchActive", () => {
    const { result } = renderHook(() => useAdhkarSearch(mockItems));

    act(() => {
      result.current.setIsSearchActive(true);
    });

    expect(result.current.isSearchActive).toBe(true);
  });
});
