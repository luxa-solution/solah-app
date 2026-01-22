import { create } from "zustand";

import { AdhkarItem, AdhkarType } from "@/features-adhkar/types";

interface AdhkarStoreState {
  favouriteIds: string[];
  bookmarkIds: string[];
  groupBookmarkIds: string[];

  toggleFavourite: (adhkar: AdhkarItem) => void;
  toggleEntryFavourite: (adhkar: AdhkarItem, entryIndex: number) => void;
  toggleBookmark: (adhkar: AdhkarItem) => void;
  toggleGroupBookmark: (adhkarType: AdhkarType) => void;
  isFavourite: (adhkar: AdhkarItem) => boolean;
  isEntryFavourite: (adhkar: AdhkarItem, entryIndex: number) => boolean;
  isBookmarked: (adhkar: AdhkarItem) => boolean;
  isGroupBookmarked: (adhkarType: AdhkarType) => boolean;
  getFavourites: () => string[];
  getBookmarks: () => string[];
  getGroupBookmarks: () => string[];
  clearFavourites: () => void;
  clearBookmarks: () => void;
  clearGroupBookmarks: () => void;
}

export const useAdhkarStore = create<AdhkarStoreState>()((set, get) => ({
  favouriteIds: [],
  bookmarkIds: [],
  groupBookmarkIds: [],

  toggleFavourite: (adhkar: AdhkarItem) =>
    set((state) => {
      const id = `${adhkar.type}-${adhkar.id}`;
      const isCurrentlyFavourite = state.favouriteIds.includes(id);
      return {
        favouriteIds: isCurrentlyFavourite
          ? state.favouriteIds.filter((favId) => favId !== id)
          : [...state.favouriteIds, id],
      };
    }),

  toggleEntryFavourite: (adhkar: AdhkarItem, entryIndex: number) =>
    set((state) => {
      const id = `${adhkar.type}-${adhkar.id}-entry-${entryIndex}`;
      const isCurrentlyFavourite = state.favouriteIds.includes(id);
      return {
        favouriteIds: isCurrentlyFavourite
          ? state.favouriteIds.filter((favId) => favId !== id)
          : [...state.favouriteIds, id],
      };
    }),

  toggleBookmark: (adhkar: AdhkarItem) =>
    set((state) => {
      const id = `${adhkar.type}-${adhkar.id}`;
      const isCurrentlyBookmarked = state.bookmarkIds.includes(id);
      return {
        bookmarkIds: isCurrentlyBookmarked
          ? state.bookmarkIds.filter((bookmarkId) => bookmarkId !== id)
          : [...state.bookmarkIds, id],
      };
    }),

  toggleGroupBookmark: (adhkarType: AdhkarType) =>
    set((state) => {
      const isCurrentlyGroupBookmarked = state.groupBookmarkIds.includes(adhkarType);
      return {
        groupBookmarkIds: isCurrentlyGroupBookmarked
          ? state.groupBookmarkIds.filter((type) => type !== adhkarType)
          : [...state.groupBookmarkIds, adhkarType],
      };
    }),

  isFavourite: (adhkar: AdhkarItem) => {
    const id = `${adhkar.type}-${adhkar.id}`;
    return get().favouriteIds.includes(id);
  },

  isEntryFavourite: (adhkar: AdhkarItem, entryIndex: number) => {
    const id = `${adhkar.type}-${adhkar.id}-entry-${entryIndex}`;
    return get().favouriteIds.includes(id);
  },

  isBookmarked: (adhkar: AdhkarItem) => {
    const id = `${adhkar.type}-${adhkar.id}`;
    return get().bookmarkIds.includes(id);
  },

  isGroupBookmarked: (adhkarType: AdhkarType) => {
    return get().groupBookmarkIds.includes(adhkarType);
  },

  getFavourites: () => get().favouriteIds,
  getBookmarks: () => get().bookmarkIds,
  getGroupBookmarks: () => get().groupBookmarkIds,
  clearFavourites: () => set({ favouriteIds: [] }),
  clearBookmarks: () => set({ bookmarkIds: [] }),
  clearGroupBookmarks: () => set({ groupBookmarkIds: [] }),
}));
