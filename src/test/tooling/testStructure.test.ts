import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

describe("test structure tooling", () => {
  it("splits notification scheduling tests by concern", () => {
    expect(exists("src/features/notifications/utils/solahNotifications.channels.test.ts")).toBe(
      true
    );
    expect(exists("src/features/notifications/utils/solahNotifications.sync.core.test.ts")).toBe(
      true
    );
    expect(
      exists("src/features/notifications/utils/solahNotifications.sync.behavior.test.ts")
    ).toBe(true);
    expect(
      exists("src/features/notifications/utils/solahNotifications.sync.integration.test.ts")
    ).toBe(true);
    expect(exists("src/features/notifications/utils/solahNotifications.storage.test.ts")).toBe(
      true
    );
    expect(exists("src/features/notifications/utils/solahNotifications.sync.test.ts")).toBe(false);
    expect(exists("src/features/notifications/utils/solahNotifications.test.ts")).toBe(false);
  });

  it("splits settings integration tests by concern", () => {
    expect(
      exists("src/features/settings/screens/test/SettingsHome.integration.general.test.tsx")
    ).toBe(true);
    expect(
      exists("src/features/settings/screens/test/SettingsHome.integration.adhan.test.tsx")
    ).toBe(true);
    expect(
      exists("src/features/settings/screens/test/SettingsHome.integration.iqamah.test.tsx")
    ).toBe(true);
    expect(
      exists("src/features/settings/screens/test/SettingsHome.integration.notifications.test.tsx")
    ).toBe(true);
    expect(
      exists("src/features/settings/screens/test/SettingsHome.integration.timezone.test.tsx")
    ).toBe(true);
    expect(exists("src/features/settings/screens/SettingsHome.integration.test.tsx")).toBe(false);
  });

  it("splits notification effect tests by concern", () => {
    expect(
      exists("src/features/notifications/components/SolahNotificationsEffect.mount.test.tsx")
    ).toBe(true);
    expect(
      exists(
        "src/features/notifications/components/SolahNotificationsEffect.foregroundRenewal.test.tsx"
      )
    ).toBe(true);
    expect(
      exists(
        "src/features/notifications/components/SolahNotificationsEffect.permissionFallback.test.tsx"
      )
    ).toBe(true);
    expect(exists("src/features/notifications/components/SolahNotificationsEffect.test.tsx")).toBe(
      false
    );
  });

  it("splits bottom sheet tests by concern", () => {
    expect(exists("src/shared/components/BottomSheet/BottomSheet.behavior.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/BottomSheet.gesture.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet/BottomSheet.animation.test.tsx")).toBe(true);
    expect(exists("src/shared/components/BottomSheet.test.tsx")).toBe(false);
  });

  it("splits responsive-dimensions tests by concern", () => {
    expect(exists("src/shared/utils/responsive-dimensions.scale.test.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive-dimensions.typography.test.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive-dimensions.spacing.test.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive-dimensions.device.test.ts")).toBe(true);
    expect(exists("src/shared/utils/responsive-dimensions.test.ts")).toBe(false);
  });
});
