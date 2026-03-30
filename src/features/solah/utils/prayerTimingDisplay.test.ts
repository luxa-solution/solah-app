import { defaultPrayerScheduleConfig } from "./prayerScheduleUtils";
import { getPrayerTimingDisplay } from "./prayerTimingDisplay";

describe("getPrayerTimingDisplay", () => {
  it("returns raw adhan and iqamah display for at_solah_time", () => {
    const schedule = defaultPrayerScheduleConfig();
    schedule.Dhuhr.iqamahDelayMinutes = 15;

    expect(getPrayerTimingDisplay("Dhuhr", "12:00 PM", schedule, "12hr", "Africa/Abidjan")).toEqual(
      {
        adhanDisplay: "12:00 PM",
        iqamahDisplay: "12:15 PM",
      }
    );
  });

  it("returns relative adhan display using offset minutes", () => {
    const schedule = defaultPrayerScheduleConfig();
    schedule.Dhuhr.adhan = { mode: "relative_after_solah", offsetMinutes: 10 };
    schedule.Dhuhr.iqamahDelayMinutes = 20;

    expect(getPrayerTimingDisplay("Dhuhr", "12:00 PM", schedule, "12hr", "Africa/Abidjan")).toEqual(
      {
        adhanDisplay: "12:10 PM",
        iqamahDisplay: "12:30 PM",
      }
    );
  });

  it("returns fixed adhan display and wraps after midnight in 24-hour format", () => {
    const schedule = defaultPrayerScheduleConfig();
    schedule.Isha.adhan = { mode: "fixed_time", fixedTime: "23:50" };
    schedule.Isha.iqamahDelayMinutes = 15;

    expect(getPrayerTimingDisplay("Isha", "08:00 PM", schedule, "24hr", "Africa/Abidjan")).toEqual({
      adhanDisplay: "23:50",
      iqamahDisplay: "00:05",
    });
  });

  it("falls back to zero offset and midnight fixed time defaults when config is incomplete", () => {
    const schedule = defaultPrayerScheduleConfig();
    schedule.Subhi.adhan = { mode: "relative_after_solah" };

    expect(getPrayerTimingDisplay("Subhi", "05:00 AM", schedule, "12hr", "Africa/Abidjan")).toEqual(
      {
        adhanDisplay: "05:00 AM",
        iqamahDisplay: "05:20 AM",
      }
    );

    schedule.Subhi.adhan = { mode: "fixed_time" };
    expect(getPrayerTimingDisplay("Subhi", "05:00 AM", schedule, "12hr", "Africa/Abidjan")).toEqual(
      {
        adhanDisplay: "12:00 AM",
        iqamahDisplay: "12:20 AM",
      }
    );
  });
});
