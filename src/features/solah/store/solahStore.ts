import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { SolahTime } from "@/features-solah/types";

type SolahStore = {
  lastKnownDate?: Date;
  lastKnownTimes: SolahTime[];
  setLastKnownTimes: (times: SolahTime[], date?: Date) => void;
  clearLastKnownTimes: () => void;
};

export const useSolahStore = create<SolahStore>()(
  persist(
    (set) => ({
      lastKnownDate: undefined,
      lastKnownTimes: [],
      setLastKnownTimes: (times: SolahTime[], date?: Date) =>
        set(() => ({
          lastKnownTimes: times,
          lastKnownDate: date ?? new Date(),
        })),
      clearLastKnownTimes: () => set(() => ({ lastKnownTimes: [], lastKnownDate: undefined })),
    }),
    {
      name: "solah-store-v1",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
