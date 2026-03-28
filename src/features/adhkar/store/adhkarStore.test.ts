import type { AdhkarItem, AdhkarType } from "@/features-adhkar/types";

import { useAdhkarStore } from "./adhkarStore";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useAdhkarStore.getState();
const beforePrayerItem: AdhkarItem = {
  id: "1",
  type: "before",
  title: "Before Prayer",
  entries: [],
  illustration: 1,
};
const afterPrayerItem: AdhkarItem = {
  id: "2",
  type: "after",
  title: "After Prayer",
  entries: [],
  illustration: 2,
};

describe("useAdhkarStore", () => {
  beforeEach(() => {
    useAdhkarStore.setState(initialState, true);
  });

  it("starts empty", () => {
    const state = useAdhkarStore.getState();

    expect(state.getFavourites()).toEqual([]);
    expect(state.getBookmarks()).toEqual([]);
    expect(state.getGroupBookmarks()).toEqual([]);
  });

  it("toggles favourite item ids and exposes favourite selectors", () => {
    const state = useAdhkarStore.getState();

    state.toggleFavourite(beforePrayerItem);
    expect(useAdhkarStore.getState().isFavourite(beforePrayerItem)).toBe(true);
    expect(useAdhkarStore.getState().getFavourites()).toEqual(["before-1"]);

    state.toggleFavourite(beforePrayerItem);
    expect(useAdhkarStore.getState().isFavourite(beforePrayerItem)).toBe(false);
    expect(useAdhkarStore.getState().getFavourites()).toEqual([]);
  });

  it("toggles bookmark item ids and exposes bookmark selectors", () => {
    const state = useAdhkarStore.getState();

    state.toggleBookmark(afterPrayerItem);
    expect(useAdhkarStore.getState().isBookmarked(afterPrayerItem)).toBe(true);
    expect(useAdhkarStore.getState().getBookmarks()).toEqual(["after-2"]);

    state.toggleBookmark(afterPrayerItem);
    expect(useAdhkarStore.getState().isBookmarked(afterPrayerItem)).toBe(false);
    expect(useAdhkarStore.getState().getBookmarks()).toEqual([]);
  });

  it("toggles group bookmarks and exposes group bookmark selectors", () => {
    const state = useAdhkarStore.getState();
    const group: AdhkarType = "during";

    state.toggleGroupBookmark(group);
    expect(useAdhkarStore.getState().isGroupBookmarked(group)).toBe(true);
    expect(useAdhkarStore.getState().getGroupBookmarks()).toEqual([group]);

    state.toggleGroupBookmark(group);
    expect(useAdhkarStore.getState().isGroupBookmarked(group)).toBe(false);
    expect(useAdhkarStore.getState().getGroupBookmarks()).toEqual([]);
  });

  it("clears all stored adhkar ids", () => {
    const state = useAdhkarStore.getState();

    state.toggleFavourite(beforePrayerItem);
    state.toggleBookmark(afterPrayerItem);
    state.toggleGroupBookmark("before");

    useAdhkarStore.getState().clearFavourites();
    useAdhkarStore.getState().clearBookmarks();
    useAdhkarStore.getState().clearGroupBookmarks();

    expect(useAdhkarStore.getState().getFavourites()).toEqual([]);
    expect(useAdhkarStore.getState().getBookmarks()).toEqual([]);
    expect(useAdhkarStore.getState().getGroupBookmarks()).toEqual([]);
  });
});
