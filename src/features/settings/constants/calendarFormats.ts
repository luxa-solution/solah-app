import { CalendarFormat } from "@/features-solah/types";

export type CalendarFormatOption = {
  name: string;
  value: CalendarFormat;
};

export const calendarFormats: CalendarFormatOption[] = [
  { name: "Hijri", value: "hijri" },
  { name: "Gregorian", value: "miladi" },
];
