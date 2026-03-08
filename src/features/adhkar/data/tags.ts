import { AdhkarType } from "@/features-adhkar/types";

export const adhkarTags = [
  // before
  "ablution",
  "adhan",
  "mosque_before",
  "walking",

  // during
  "opening",
  "ruku",
  "sujud",
  "between_sujud",
  "tashahhud",

  // after
  "after_tasleem",
  "dhikr",
  "dua",
  "mosque_after",
] as const;

export type AdhkarTag = (typeof adhkarTags)[number];

export const phaseBasedAdhkarTags: Record<AdhkarType, AdhkarTag[]> = {
  before: ["ablution", "adhan", "mosque_before", "walking"],
  during: ["opening", "ruku", "sujud", "between_sujud", "tashahhud"],
  after: ["after_tasleem", "dhikr", "dua", "mosque_after"],
};
