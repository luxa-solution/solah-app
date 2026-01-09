import type { SettingsType } from "@/features-settings/types";

import { toText } from "./toText";

describe("toText", () => {
  it("maps each SettingsType to the expected display text", () => {
    const cases: { type: SettingsType; value: any; expected: string }[] = [
      // objects -> option.name
      {
        type: "calmethod",
        value: { name: "Muslim World League", method: "MuslimWorldLeague" },
        expected: "Muslim World League",
      },
      {
        type: "timezone",
        value: { name: "(UTC+03:00) Kuwait, Riyadh", timezone: "Asia/Riyadh" },
        expected: "(UTC+03:00) Kuwait, Riyadh",
      },
      {
        type: "location",
        value: { name: "Riyadh, Saudi Arabia" },
        expected: "Riyadh, Saudi Arabia",
      },
      { type: "arabicfontsize", value: { name: "20", value: 20 }, expected: "20" },
      { type: "arabicfontstyle", value: { name: "Amiri", value: "Amiri" }, expected: "Amiri" },
      { type: "language", value: { name: "English", value: "English" }, expected: "English" },
      { type: "calendarformat", value: { name: "Hijri", value: "hijri" }, expected: "Hijri" },
      { type: "timeformat", value: { name: "24-hour", value: "24hr" }, expected: "24-hour" },

      // primitives
      { type: "sound", value: "Chime", expected: "Chime" },
      { type: "solahtimenotif", value: true, expected: "On" },
      { type: "solahtimenotif", value: false, expected: "Off" },
    ];

    for (const c of cases) {
      expect(toText(c.type, c.value)).toBe(c.expected);
    }
  });

  it("returns empty string for unknown type", () => {
    // @ts-expect-error - testing default branch
    expect(toText("unknown", {})).toBe("");
  });
});
