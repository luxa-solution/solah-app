export type StorageOwnershipEntry = {
  owner: "settings" | "solah" | "adhkar" | "onboarding" | "notifications";
  key: string;
  type: "zustand-persist" | "notification-runtime";
  readers: string[];
};

export const storageOwnershipInventory: StorageOwnershipEntry[] = [
  {
    owner: "settings",
    key: "settings-storage",
    type: "zustand-persist",
    readers: ["src/features/settings/store/settingsStore.ts"],
  },
  {
    owner: "settings",
    key: "defaults-storage",
    type: "zustand-persist",
    readers: ["src/features/settings/store/defaultStore.ts"],
  },
  {
    owner: "solah",
    key: "solah-store-v1",
    type: "zustand-persist",
    readers: ["src/features/solah/store/solahStore.ts"],
  },
  {
    owner: "adhkar",
    key: "adhkar-store",
    type: "zustand-persist",
    readers: ["src/features/adhkar/store/adhkarStore.ts"],
  },
  {
    owner: "onboarding",
    key: "onboarding-storage",
    type: "zustand-persist",
    readers: ["src/features/onboarding/store/onboardingStore.ts"],
  },
  {
    owner: "notifications",
    key: "solah-notification-ids-v1",
    type: "notification-runtime",
    readers: ["src/features/notifications/utils/solahNotifications/storage.ts"],
  },
  {
    owner: "notifications",
    key: "solah-notification-last-synced-at-v1",
    type: "notification-runtime",
    readers: [
      "src/features/notifications/utils/solahNotifications/storage.ts",
      "src/features/notifications/utils/notificationBackgroundTask.ts",
    ],
  },
  {
    owner: "notifications",
    key: "solah-notification-sync-input-v1",
    type: "notification-runtime",
    readers: [
      "src/features/notifications/utils/solahNotifications/storage.ts",
      "src/features/notifications/utils/notificationBackgroundTask.ts",
    ],
  },
];
