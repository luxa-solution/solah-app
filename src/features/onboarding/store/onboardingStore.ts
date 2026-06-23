import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

type OnboardingState = {
  hasOnboarded: boolean;
  setHasOnboarded: (status: boolean) => void;
  resetOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // App state
        hasOnboarded: false,

        // Set onboarding status
        setHasOnboarded: (status: boolean) => {
          set({ hasOnboarded: status });
        },

        resetOnboarding: () => {
          set({ hasOnboarded: false });
        },
        // Add more above as needed
      }),
      {
        name: "onboarding-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
