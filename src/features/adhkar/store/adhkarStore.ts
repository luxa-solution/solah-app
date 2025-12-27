import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import { AdhkarItem } from "@/features-adhkar/data";

interface AdhkarStoreState {
  favouriteIds: string[];
  bookmarkIds: string[];

  toggleFavourite: (adhkar: AdhkarItem) => void;
  toggleBookmark: (adhkar: AdhkarItem) => void;
  isFavourite: (adhkar: AdhkarItem) => boolean;
  isBookmarked: (adhkar: AdhkarItem) => boolean;
  getFavourites: () => string[];
  getBookmarks: () => string[];
  clearFavourites: () => void;
  clearBookmarks: () => void;
}

export const useAdhkarStore = create<AdhkarStoreState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        favouriteIds: [],
        bookmarkIds: [],

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

        isFavourite: (adhkar: AdhkarItem) => {
          const id = `${adhkar.type}-${adhkar.id}`;
          return get().favouriteIds.includes(id);
        },

        isBookmarked: (adhkar: AdhkarItem) => {
          const id = `${adhkar.type}-${adhkar.id}`;
          return get().bookmarkIds.includes(id);
        },

        getFavourites: () => get().favouriteIds,
        getBookmarks: () => get().bookmarkIds,
        clearFavourites: () => set({ favouriteIds: [] }),
        clearBookmarks: () => set({ bookmarkIds: [] }),
      }),
      {
        name: "adhkar-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
