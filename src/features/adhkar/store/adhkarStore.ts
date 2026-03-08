import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import { AdhkarItem, AdhkarType } from "@/features-adhkar/types";

interface AdhkarStoreState {
  favouriteIds: string[];
  bookmarkIds: string[];
  groupBookmarkIds: string[];

  toggleFavourite: (adhkar: AdhkarItem) => void;
  toggleBookmark: (adhkar: AdhkarItem) => void;
  toggleGroupBookmark: (adhkarType: AdhkarType) => void;
  isFavourite: (adhkar: AdhkarItem) => boolean;
  isBookmarked: (adhkar: AdhkarItem) => boolean;
  isGroupBookmarked: (adhkarType: AdhkarType) => boolean;
  getFavourites: () => string[];
  getBookmarks: () => string[];
  getGroupBookmarks: () => string[];
  clearFavourites: () => void;
  clearBookmarks: () => void;
  clearGroupBookmarks: () => void;
}

export const useAdhkarStore = create<AdhkarStoreState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
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
            const isCurrentlyBookmarked = state.groupBookmarkIds.includes(adhkarType);
            return {
              groupBookmarkIds: isCurrentlyBookmarked
                ? state.groupBookmarkIds.filter((type) => type !== adhkarType)
                : [...state.groupBookmarkIds, adhkarType],
            };
          }),

        isFavourite: (adhkar: AdhkarItem) => {
          const id = `${adhkar.type}-${adhkar.id}`;
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
      }),
      {
        name: "adhkar-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
