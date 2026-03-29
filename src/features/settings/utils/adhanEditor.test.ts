import { validateAdhanConfigWithinPrayerWindow, buildFixedTimeValue } from "./adhanEditor";

describe("adhanEditor", () => {
  const solahTime = new Date(Date.UTC(2026, 0, 1, 12, 0));
  const latestAllowedTime = new Date(Date.UTC(2026, 0, 1, 14, 40));

  it("rejects relative offsets that push adhan into the next prayer window", () => {
    const result = validateAdhanConfigWithinPrayerWindow(
      { mode: "relative_after_solah", offsetMinutes: 180 },
      solahTime,
      latestAllowedTime,
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Adhan time must stay before the next prayer window",
    });
  });

  it("accepts fixed times inside the prayer window", () => {
    const result = validateAdhanConfigWithinPrayerWindow(
      { mode: "fixed_time", fixedTime: "14:15" },
      solahTime,
      latestAllowedTime,
      "Africa/Abidjan"
    );

    expect(result).toEqual({ valid: true });
  });

  it("builds 12-hour fixed time values", () => {
    expect(
      buildFixedTimeValue({
        timeFormat: "12hr",
        hour: "2",
        minute: "05",
        period: "PM",
      })
    ).toBe("14:05");
  });

  it("builds 24-hour fixed time values", () => {
    expect(
      buildFixedTimeValue({
        timeFormat: "24hr",
        hour: "14",
        minute: "05",
      })
    ).toBe("14:05");
  });
});
