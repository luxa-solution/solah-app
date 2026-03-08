import { TimeZone } from "@/features-settings/types";

import { CalendarFormat, TimeFormat } from "../types";

// ---- Format Time with Timezone ----
export const formatTime = (
  d: Date,
  timezone: TimeZone,
  timeFormat: TimeFormat = "24hr"
): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: timeFormat === "12hr",
  });

  // This is SAFE — no Date parsing
  const parts = formatter.formatToParts(d);

  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;

  if (timeFormat === "24hr") {
    return `${hour}:${minute}`;
  }

  return `${hour}:${minute} ${dayPeriod}`;
};

// ---- Format Date ----

export const formatDate = (
  d: Date,
  calendar: CalendarFormat = "hijri",
  locale: string = "en-US",
  output: "full" | "collapse" = "full"
): string => {
  const useHijri = calendar === "hijri";

  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    ...(output === "full" ? { month: "long" } : { month: "numeric", numberingSystem: "latn" }),
    ...(useHijri ? { calendar: "islamic" } : {}),
  };

  const fmt = new Intl.DateTimeFormat(locale, opts);
  const parts = fmt.formatToParts(d);

  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";

  return output === "full"
    ? `${day} ${month}, ${year}` // e.g., "4 Rajab, 1447"
    : `${day}/${month}/${year}`; // e.g., "4/7/1447"
};
