import type { SolahGroup, SolahItem, SolahName } from "@/features-solah/types";

import { guideIllustrations } from "../media";

import { openingSequence, SequenceItemInput } from "./opening";
import { qiyamCore, qiyamShort } from "./qiyam";
import { afterRukuSequence, rukuSequence } from "./ruku";
import { sujoodBlock } from "./sujud";
import { finalSitting, firstTashahhud } from "./tashahhud";

function withIdPrefix(
  solah: SolahName,
  prefix: string,
  rakahNumber: number,
  items: SequenceItemInput[]
): SolahItem[] {
  return items.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
    solah,
    rakahNumber,
  }));
}

function buildFirstRakaah(solah: SolahName): SequenceItemInput[] {
  return [
    ...openingSequence,
    ...qiyamCore(solah),
    ...rukuSequence,
    ...afterRukuSequence,
    ...sujoodBlock,
  ];
}

function buildSecondRakaah(solah: SolahName): SequenceItemInput[] {
  return [...qiyamCore(solah), ...rukuSequence, ...afterRukuSequence, ...sujoodBlock];
}

function buildLaterRakaah(solah: SolahName): SequenceItemInput[] {
  return [...qiyamShort(solah), ...rukuSequence, ...afterRukuSequence, ...sujoodBlock];
}

export function buildSolahGuide(
  solah: SolahName,
  rakaat: 2 | 3 | 4,
  descriptionEn: string
): SolahGroup {
  const items: SolahItem[] = [];

  // Rakaah 1
  items.push(...withIdPrefix(solah, "r1", 1, buildFirstRakaah(solah)));

  // Rakaah 2

  if (rakaat === 2) {
    items.push(...withIdPrefix(solah, "r2", 2, [...buildSecondRakaah(solah), ...finalSitting]));
  } else {
    items.push(...withIdPrefix(solah, "r2", 2, [...buildSecondRakaah(solah), ...firstTashahhud]));
  }

  // Rakaah 3

  if (rakaat === 3) {
    items.push(...withIdPrefix(solah, "r3", 3, [...buildLaterRakaah(solah), ...finalSitting]));
  }

  // Rakaah 4

  if (rakaat === 4) {
    items.push(...withIdPrefix(solah, "r3", 3, buildLaterRakaah(solah)));

    items.push(...withIdPrefix(solah, "r4", 4, [...buildLaterRakaah(solah), ...finalSitting]));
  }

  return {
    solah,

    description: {
      en: descriptionEn,
    },

    illustration: guideIllustrations[solah],

    rakaat,

    items,
  };
}
