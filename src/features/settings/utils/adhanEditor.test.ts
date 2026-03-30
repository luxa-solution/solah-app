import {
  buildFixedTimeValue,
  buildRelativeOffsetMinutes,
  getPrayerWindow,
  getRelativeTimeParts,
  splitFixedTimeValue,
  validateAdhanConfigWithinPrayerWindow,
} from "./adhanEditor";

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

  it("returns empty fixed time values for invalid hour, minute, or period input", () => {
    expect(
      buildFixedTimeValue({
        timeFormat: "24hr",
        hour: "24",
        minute: "00",
      })
    ).toBe("");
    expect(
      buildFixedTimeValue({
        timeFormat: "12hr",
        hour: "8",
        minute: "00",
      })
    ).toBe("");
    expect(
      buildFixedTimeValue({
        timeFormat: "12hr",
        hour: "abc",
        minute: "00",
        period: "AM",
      })
    ).toBe("");
  });

  it("splits fixed time values for both 12-hour and 24-hour formats", () => {
    expect(splitFixedTimeValue(undefined, "12hr")).toEqual({
      hour: "",
      minute: "",
      period: "AM",
    });
    expect(splitFixedTimeValue("14:05", "24hr")).toEqual({
      hour: "14",
      minute: "05",
      period: "AM",
    });
    expect(splitFixedTimeValue("14:05", "12hr")).toEqual({
      hour: "2",
      minute: "05",
      period: "PM",
    });
  });

  it("builds and validates relative offset minute values", () => {
    expect(getRelativeTimeParts(135)).toEqual({ hours: "2", minutes: "15" });
    expect(getRelativeTimeParts(-10)).toEqual({ hours: "0", minutes: "00" });

    expect(buildRelativeOffsetMinutes("2", "15")).toBe(135);
    expect(buildRelativeOffsetMinutes("-1", "15")).toBeNull();
    expect(buildRelativeOffsetMinutes("2", "75")).toBeNull();
  });

  it("returns null prayer windows when location is unavailable and computes valid windows otherwise", () => {
    expect(getPrayerWindow("Dhuhr", null, "MoonsightingCommittee", 15, new Date("2026-01-01"))).toBe(
      null
    );

    const window = getPrayerWindow(
      "Dhuhr",
      { latitude: 21.4225, longitude: 39.8262 },
      "MoonsightingCommittee",
      15,
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(window).not.toBeNull();
    expect(window?.latestAllowedTime.getTime()).toBeGreaterThan(window?.solahTime.getTime() ?? 0);
    expect(window?.maxOffsetMinutes).toBeGreaterThanOrEqual(0);
  });

  it("bubbles invalid derived adhan errors through the prayer-window validator", () => {
    const result = validateAdhanConfigWithinPrayerWindow(
      { mode: "fixed_time", fixedTime: "99:99" },
      solahTime,
      latestAllowedTime,
      "Africa/Abidjan"
    );

    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});
