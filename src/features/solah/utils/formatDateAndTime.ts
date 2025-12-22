import { CalendarFormat, TimeFormat } from "../types";

// ---- Format Time with Timezone ----
export const formatTime = (
  d: Date,
  timeFormat: TimeFormat = "24hr",
  targetTimezoneOffset: number = 0
): string => {
  // Convert the date to target timezone
  const utcTime = d.getTime();
  const targetTime = new Date(utcTime + targetTimezoneOffset * 60 * 60 * 1000);

  // Use UTC methods to avoid local timezone contamination
  let hours = targetTime.getUTCHours();
  const minutes = targetTime.getUTCMinutes();

  const formattedMinutes = minutes.toString().padStart(2, "0");

  if (timeFormat === "24hr") {
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${formattedMinutes} ${period}`;
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

// ---- Get timezone offset for cities ----
export const getTimezoneOffsetForCity = (city: string): number => {
  switch (city) {
    case "Ilorin":
    case "Nigeria":
      return 1; // GMT+1
    case "Islamabad":
    case "Pakistan":
      return 5; // GMT+5
    case "Rabat":
    case "Morocco":
      return 0; // GMT+0
    case "New York":
    case "United States":
      return -5; // GMT-5 (EST)
    case "Riyadh":
    case "Saudi Arabia":
      return 3; // GMT+3
    case "Sana'a":
    case "Yemen":
      return 3; // GMT+3
    case "Buenos Aires":
    case "Argentina":
      return -3; // GMT-3
    default:
      return 1; // Default to Nigeria time
  }
};
