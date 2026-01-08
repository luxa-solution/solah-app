import { TimeZone } from "@/features-settings/types";

export const parseTimeToMinutes = (time: string): number => {
  const t = time.trim().toUpperCase();
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/.exec(t);
  if (!match) return 0;

  const [, hStr, mStr, period] = match;
  let h = Number(hStr);
  const m = Number(mStr);

  if (period) {
    if (period === "AM" && h === 12) h = 0;
    if (period === "PM" && h < 12) h += 12;
  }
  return h * 60 + m;
};

export const getCurrentMinutes = (timezone: TimeZone): number => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone as string,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);

  return hour * 60 + minute;
};
