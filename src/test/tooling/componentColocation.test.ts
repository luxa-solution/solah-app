import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function flatFiles(relativeDir: string): string[] {
  return fs
    .readdirSync(path.join(repoRoot, relativeDir), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

describe("component colocation tooling", () => {
  it("folderizes the shared BottomSheet component family", () => {
    expect(exists("src/shared/components/BottomSheet/BottomSheet.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/BottomSheet.behavior.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/BottomSheet.gesture.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/BottomSheet.animation.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/index.ts")).toBe(true);

    expect(exists("src/shared/components/BottomSheet.tsx")).toBe(false);
    expect(exists("src/shared/components/BottomSheet.behavior.test.tsx")).toBe(false);
    expect(exists("src/shared/components/BottomSheet.gesture.test.tsx")).toBe(false);
    expect(exists("src/shared/components/BottomSheet.animation.test.tsx")).toBe(false);
  });

  it("folderizes shared Button, TitleBar, and ProgressBar", () => {
    expect(exists("src/shared/components/Button/Button.tsx")).toBe(true);
    expect(exists("src/shared/components/Button/Button.test.tsx")).toBe(true);
    expect(exists("src/shared/components/Button/index.ts")).toBe(true);
    expect(exists("src/shared/components/Button.tsx")).toBe(false);
    expect(exists("src/shared/components/Button.test.tsx")).toBe(false);

    expect(exists("src/shared/components/TitleBar/TitleBar.tsx")).toBe(true);
    expect(exists("src/shared/components/TitleBar/TitleBar.test.tsx")).toBe(true);
    expect(exists("src/shared/components/TitleBar/index.ts")).toBe(true);
    expect(exists("src/shared/components/TitleBar.tsx")).toBe(false);
    expect(exists("src/shared/components/TitleBar.test.tsx")).toBe(false);

    expect(exists("src/shared/components/ProgressBar/ProgressBar.tsx")).toBe(true);
    expect(exists("src/shared/components/ProgressBar/ProgressBar.test.tsx")).toBe(true);
    expect(exists("src/shared/components/ProgressBar/index.ts")).toBe(true);
    expect(exists("src/shared/components/ProgressBar.tsx")).toBe(false);
    expect(exists("src/shared/components/ProgressBar.test.tsx")).toBe(false);
  });

  it("removes remaining flat component files from collection folders", () => {
    expect(flatFiles("src/features/adhkar/components")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/adhkar/components/details-comps")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/guide/components")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/home/components")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/notifications/components")).toEqual(["index.ts"]);
    expect(flatFiles("src/features/onboarding/components")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/settings/components/pickers")).toEqual(["index.ts"]);
    expect(flatFiles("src/features/settings/components/pickers/shared")).toEqual([
      "index.ts",
      "styles.ts",
    ]);
    expect(flatFiles("src/features/settings/components/sheet")).toEqual(["index.ts"]);
    expect(flatFiles("src/features/settings/components/ui")).toEqual(["index.ts"]);
    expect(flatFiles("src/features/solah/components")).toEqual(["index.tsx"]);
    expect(flatFiles("src/features/solah/components/QiblaCompass")).toEqual([
      "constants.ts",
      "index.ts",
    ]);
    expect(flatFiles("src/shared/components")).toEqual(["index.tsx"]);
  });

  it("folderizes PrayerAdhanSettings with colocated parts and tests", () => {
    expect(
      exists("src/features/settings/components/pickers/PrayerAdhanSettings/PrayerAdhanSettings.tsx")
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/pickers/PrayerAdhanSettings/PrayerAdhanSettings.test.tsx"
      )
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/pickers/PrayerAdhanSettings/PrayerAdhanSettings.styles.ts"
      )
    ).toBe(true);
    expect(
      exists("src/features/settings/components/pickers/PrayerAdhanSettings/parts/ModeSelector.tsx")
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/pickers/PrayerAdhanSettings/parts/RelativeTimeFields.tsx"
      )
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/pickers/PrayerAdhanSettings/parts/FixedTimeFields.tsx"
      )
    ).toBe(true);
    expect(exists("src/features/settings/components/pickers/PrayerAdhanSettings/index.ts")).toBe(
      true
    );

    expect(exists("src/features/settings/components/pickers/PrayerAdhanSettings.tsx")).toBe(false);
    expect(exists("src/features/settings/components/pickers/PrayerAdhanSettings.test.tsx")).toBe(
      false
    );
    expect(exists("src/features/settings/components/pickers/PrayerAdhanSettings.styles.ts")).toBe(
      false
    );
  });

  it("folderizes NotificationCustomizationSheet with colocated test and parts", () => {
    expect(
      exists(
        "src/features/settings/components/sheet/NotificationCustomizationSheet/NotificationCustomizationSheet.tsx"
      )
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/sheet/NotificationCustomizationSheet/NotificationCustomizationSheet.test.tsx"
      )
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/sheet/NotificationCustomizationSheet/parts/NotificationModeCell.tsx"
      )
    ).toBe(true);
    expect(
      exists("src/features/settings/components/sheet/NotificationCustomizationSheet/index.ts")
    ).toBe(true);

    expect(
      exists("src/features/settings/components/sheet/NotificationCustomizationSheet.tsx")
    ).toBe(false);
    expect(
      exists("src/features/settings/components/sheet/NotificationCustomizationSheet.test.tsx")
    ).toBe(false);
  });
});
