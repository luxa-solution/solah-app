import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { SolahTime } from "../types";

type SolahStore = {
  lastKnownDate?: string; // YYYY-MM-DD
  lastKnownTimes: SolahTime[];
  setLastKnownTimes: (times: SolahTime[], date?: string) => void;
  clearLastKnownTimes: () => void;
};

export const useSolahStore = create<SolahStore>()(
  persist(
    (set) => ({
      lastKnownDate: undefined,
      lastKnownTimes: [],
      setLastKnownTimes: (times: SolahTime[], date?: string) =>
        set(() => ({
          lastKnownTimes: times,
          lastKnownDate: date ?? new Date().toISOString().slice(0, 10),
        })),
      clearLastKnownTimes: () => set(() => ({ lastKnownTimes: [], lastKnownDate: undefined })),
    }),
    {
      name: "solah-store-v1",
      // Use zustand's createJSONStorage wrapper so values are stringified
      // before being passed to AsyncStorage (avoids the runtime warning).
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
