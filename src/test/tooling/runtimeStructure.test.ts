import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function read(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

describe("runtime structure tooling", () => {
  it("splits notification runtime helpers into a dedicated folder while preserving the facade", () => {
    expect(exists("src/features/notifications/utils/solahNotifications.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/channels.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/permissions.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/schedule.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/sound.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/storage.ts")).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications/index.ts")).toBe(true);
  });

  it("splits the shared responsive runtime by concern while preserving the compatibility entry", () => {
    expect(exists("src/shared/utils/responsive-dimensions.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/config.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/device.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/hooks.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/scale.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/types.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive/index.ts")).toBe(true);

    const compatibilityEntry = read("src/shared/utils/responsive-dimensions.ts");
    expect(compatibilityEntry).toContain('export { default } from "./responsive";');
    expect(compatibilityEntry).toContain('export * from "./responsive";');
    expect(compatibilityEntry).not.toContain("class ResponsiveDesignSystem");
  });

  it("extracts prayer adhan picker constants and styles out of the component file", () => {
    expect(
      exists("src/features/settings/components/pickers/PrayerAdhanSettings/PrayerAdhanSettings.tsx")
    ).toBe(true);
    expect(
      exists(
        "src/features/settings/components/pickers/PrayerAdhanSettings/PrayerAdhanSettings.styles.ts"
      )
    ).toBe(true);
    expect(exists("src/features/settings/constants/prayerAdhan.ts")).toBe(true);
  });
});
