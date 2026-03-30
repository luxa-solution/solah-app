import {
  defaultPrayerScheduleConfig,
  deriveAdhanTime,
  deriveIqamahTime,
  validateAdhanConfig,
  validateIqamahDelay,
} from "./prayerScheduleUtils";

describe("defaultPrayerScheduleConfig", () => {
  it("returns the authoritative defaults for all prayers", () => {
    const result = defaultPrayerScheduleConfig();

    expect(result.Subhi.iqamahDelayMinutes).toBe(20);
    expect(result.Dhuhr.iqamahDelayMinutes).toBe(15);
    expect(result.Asr.iqamahDelayMinutes).toBe(15);
    expect(result.Maghrib.iqamahDelayMinutes).toBe(10);
    expect(result.Isha.iqamahDelayMinutes).toBe(15);

    for (const prayer of Object.values(result)) {
      expect(prayer.adhan.mode).toBe("at_solah_time");
      expect(prayer.adhanNotificationMode).toBe("mute");
      expect(prayer.iqamahNotificationMode).toBe("mute");
    }
  });
});

describe("deriveAdhanTime", () => {
  it("returns the solah time when mode is at_solah_time", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(
      deriveAdhanTime(solahTime, { mode: "at_solah_time" }, "Africa/Abidjan").toISOString()
    ).toBe(solahTime.toISOString());
  });

  it("returns a time relative to solah time", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(
      deriveAdhanTime(
        solahTime,
        { mode: "relative_after_solah", offsetMinutes: 5 },
        "Africa/Abidjan"
      ).toISOString()
    ).toBe(new Date(Date.UTC(2026, 0, 1, 10, 5)).toISOString());
  });

  it("allows a zero-minute relative offset", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(
      deriveAdhanTime(
        solahTime,
        { mode: "relative_after_solah", offsetMinutes: 0 },
        "Africa/Abidjan"
      ).toISOString()
    ).toBe(solahTime.toISOString());
  });

  it("rejects a negative relative offset", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() =>
      deriveAdhanTime(
        solahTime,
        { mode: "relative_after_solah", offsetMinutes: -5 },
        "Africa/Abidjan"
      )
    ).toThrow("Relative adhan offset must be zero or greater");
  });

  it("rejects a missing relative offset", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() =>
      deriveAdhanTime(solahTime, { mode: "relative_after_solah" }, "Africa/Abidjan")
    ).toThrow("Relative adhan offset is required");
  });

  it("interprets fixed time in the provided timezone", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 7, 0)); // 10:00 in Asia/Riyadh

    expect(
      deriveAdhanTime(
        solahTime,
        { mode: "fixed_time", fixedTime: "10:15" },
        "Asia/Riyadh"
      ).toISOString()
    ).toBe(new Date(Date.UTC(2026, 0, 1, 7, 15)).toISOString());
  });

  it("throws when fixed time is before solah time on the same prayer day", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() =>
      deriveAdhanTime(solahTime, { mode: "fixed_time", fixedTime: "09:30" }, "Africa/Abidjan")
    ).toThrow("Fixed adhan time must be after solah time");
  });

  it("throws when fixed time is malformed", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() =>
      deriveAdhanTime(solahTime, { mode: "fixed_time", fixedTime: "ab:cd" }, "Africa/Abidjan")
    ).toThrow("Fixed adhan time is invalid");
  });

  it("falls back to returning the solah time for unknown modes", () => {
    const solahTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(
      deriveAdhanTime(
        solahTime,
        // @ts-expect-error intentional default branch coverage
        { mode: "unknown_mode" },
        "Africa/Abidjan"
      ).toISOString()
    ).toBe(solahTime.toISOString());
  });
});

describe("deriveIqamahTime", () => {
  it("adds the delay to the adhan time", () => {
    const adhanTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(deriveIqamahTime(adhanTime, 15).toISOString()).toBe(
      new Date(Date.UTC(2026, 0, 1, 10, 15)).toISOString()
    );
  });

  it("accepts the minimum supported delay", () => {
    const adhanTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(deriveIqamahTime(adhanTime, 5).toISOString()).toBe(
      new Date(Date.UTC(2026, 0, 1, 10, 5)).toISOString()
    );
  });

  it("accepts the maximum supported delay", () => {
    const adhanTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(deriveIqamahTime(adhanTime, 60).toISOString()).toBe(
      new Date(Date.UTC(2026, 0, 1, 11, 0)).toISOString()
    );
  });

  it("rejects delays below the minimum", () => {
    const adhanTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() => deriveIqamahTime(adhanTime, 4)).toThrow(
      "Iqamah delay must be between 5 and 60 minutes"
    );
  });

  it("rejects delays above the maximum", () => {
    const adhanTime = new Date(Date.UTC(2026, 0, 1, 10, 0));

    expect(() => deriveIqamahTime(adhanTime, 61)).toThrow(
      "Iqamah delay must be between 5 and 60 minutes"
    );
  });
});

describe("validateIqamahDelay", () => {
  it("accepts the minimum supported delay", () => {
    expect(validateIqamahDelay(5)).toEqual({ valid: true });
  });

  it("accepts the maximum supported delay", () => {
    expect(validateIqamahDelay(60)).toEqual({ valid: true });
  });

  it("rejects delays below the minimum", () => {
    expect(validateIqamahDelay(4)).toEqual({
      valid: false,
      reason: "Iqamah delay must be between 5 and 60 minutes",
    });
  });

  it("rejects delays above the maximum", () => {
    expect(validateIqamahDelay(61)).toEqual({
      valid: false,
      reason: "Iqamah delay must be between 5 and 60 minutes",
    });
  });
});

describe("validateAdhanConfig", () => {
  it("accepts at_solah_time as valid", () => {
    const result = validateAdhanConfig(
      { mode: "at_solah_time" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({ valid: true });
  });

  it("rejects relative_after_solah when offsetMinutes is missing", () => {
    const result = validateAdhanConfig(
      { mode: "relative_after_solah" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Relative adhan offset is required",
    });
  });

  it("rejects relative_after_solah when offsetMinutes is negative", () => {
    const result = validateAdhanConfig(
      { mode: "relative_after_solah", offsetMinutes: -5 },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Relative adhan offset must be zero or greater",
    });
  });

  it("accepts a valid fixed time after solah time", () => {
    const result = validateAdhanConfig(
      { mode: "fixed_time", fixedTime: "10:15" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({ valid: true });
  });

  it("rejects a fixed time before solah time", () => {
    const result = validateAdhanConfig(
      { mode: "fixed_time", fixedTime: "09:15" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Fixed adhan time must be after solah time",
    });
  });

  it("rejects an undefined fixed time", () => {
    const result = validateAdhanConfig(
      { mode: "fixed_time" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Fixed adhan time is invalid",
    });
  });

  it("rejects a malformed fixed time string", () => {
    const result = validateAdhanConfig(
      { mode: "fixed_time", fixedTime: "25:99" },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({
      valid: false,
      reason: "Fixed adhan time is invalid",
    });
  });

  it("accepts a zero-minute relative offset as valid", () => {
    const result = validateAdhanConfig(
      { mode: "relative_after_solah", offsetMinutes: 0 },
      new Date(Date.UTC(2026, 0, 1, 10, 0)),
      "Africa/Abidjan"
    );

    expect(result).toEqual({ valid: true });
  });
});
