import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(repoRoot, relativePath));
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
