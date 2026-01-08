import { TimeFormat } from "@/features-solah/types";

export type TimeFormatOption = {
  name: string;
  value: TimeFormat;
};

export const timeFormats: TimeFormatOption[] = [
  { name: "12-hour", value: "12hr" },
  { name: "24-hour", value: "24hr" },
];
