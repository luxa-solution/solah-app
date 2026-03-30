import fs from "fs";
import path from "path";

import { storageOwnershipInventory } from "./storageOwnership";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

describe("core audit tooling", () => {
  it("does not introduce src/core before a justified app-wide slice exists", () => {
    expect(fs.existsSync(path.join(repoRoot, "src", "core"))).toBe(false);
  });

  it("keeps persisted storage keys feature-owned", () => {
    expect(storageOwnershipInventory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ owner: "settings", key: "settings-storage" }),
        expect.objectContaining({ owner: "settings", key: "defaults-storage" }),
        expect.objectContaining({ owner: "solah", key: "solah-store-v1" }),
        expect.objectContaining({ owner: "adhkar", key: "adhkar-store" }),
        expect.objectContaining({ owner: "onboarding", key: "onboarding-storage" }),
        expect.objectContaining({ owner: "notifications", key: "solah-notification-ids-v1" }),
        expect.objectContaining({
          owner: "notifications",
          key: "solah-notification-last-synced-at-v1",
        }),
        expect.objectContaining({
          owner: "notifications",
          key: "solah-notification-sync-input-v1",
        }),
      ])
    );

    const duplicateKeys = storageOwnershipInventory.filter((entry, index, all) => {
      return all.findIndex((candidate) => candidate.key === entry.key) !== index;
    });

    expect(duplicateKeys).toEqual([]);
    expect(storageOwnershipInventory.every((entry) => (entry.owner as string) !== "shared")).toBe(
      true
    );
    expect(storageOwnershipInventory.every((entry) => (entry.owner as string) !== "core")).toBe(
      true
    );
  });
});
