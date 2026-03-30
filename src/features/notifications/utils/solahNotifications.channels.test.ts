import { getSolahNotificationChannelId } from "./solahNotifications";

describe("getSolahNotificationChannelId", () => {
  it("returns default channel for null sound", () => {
    expect(getSolahNotificationChannelId(null as any)).toBe("solah-times-default");
  });

  it("returns default channel for 'Default' sound", () => {
    expect(getSolahNotificationChannelId("Default")).toBe("solah-times-default");
  });

  it("returns default channel for undefined sound", () => {
    expect(getSolahNotificationChannelId(undefined as any)).toBe("solah-times-default");
  });

  it("slugifies a custom sound name", () => {
    expect(getSolahNotificationChannelId("Adhan Makkah")).toBe("solah-times-adhan_makkah");
  });

  it("strips apostrophes from sound name", () => {
    expect(getSolahNotificationChannelId("Adhan Al-Madinah")).toBe("solah-times-adhan_al_madinah");
  });

  it("strips curly apostrophes from sound name", () => {
    expect(getSolahNotificationChannelId("Fajr\u2019s Call")).toBe("solah-times-fajrs_call");
  });

  it("trims leading and trailing underscores from the slug", () => {
    expect(getSolahNotificationChannelId("  ")).toBe("solah-times-custom");
  });

  it("falls back to custom when the slug is empty after sanitisation", () => {
    expect(getSolahNotificationChannelId("---")).toBe("solah-times-custom");
  });
});
