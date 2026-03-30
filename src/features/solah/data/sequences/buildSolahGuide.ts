import type { SolahGroup, SolahItem, SolahName } from "@/features-solah/types";

import { guideIllustrations } from "../media";

import { openingSequence, SequenceItemInput } from "./opening";
import { qiyamCore } from "./qiyam";
import { afterRukuSequence, rukuSequence } from "./ruku";
import { sujoodBlock } from "./sujud";
import { finalSitting, firstTashahhud } from "./tashahhud";

function withIdPrefix(solah: SolahName, prefix: string, items: SequenceItemInput[]): SolahItem[] {
  return items.map((it, idx) => ({
    ...it,
    id: `${prefix}-${idx + 1}`,
    solah,
  }));
}

function buildRakaah1(solah: SolahName): SequenceItemInput[] {
  return [
    ...openingSequence,
    ...qiyamCore(solah),
    ...rukuSequence,
    ...afterRukuSequence,
    ...sujoodBlock,
  ];
}

function buildRakaahN(solah: SolahName): SequenceItemInput[] {
  return [...qiyamCore(solah), ...rukuSequence, ...afterRukuSequence, ...sujoodBlock];
}

export function buildSolahGuide(
  solah: SolahName,
  rakaat: 2 | 3 | 4,
  descriptionEn: string
): SolahGroup {
  const items: SolahItem[] = [];

  items.push(...withIdPrefix(solah, "r1", buildRakaah1(solah)));

  const r2 = buildRakaahN(solah);

  if (rakaat === 2) {
    items.push(...withIdPrefix(solah, "r2", [...r2, ...finalSitting]));
  } else {
    items.push(...withIdPrefix(solah, "r2", [...r2, ...firstTashahhud]));
  }

  if (rakaat === 3) {
    items.push(...withIdPrefix(solah, "r3", [...buildRakaahN(solah), ...finalSitting]));
  }

  if (rakaat === 4) {
    items.push(...withIdPrefix(solah, "r3", buildRakaahN(solah)));
    items.push(...withIdPrefix(solah, "r4", [...buildRakaahN(solah), ...finalSitting]));
  }

  return {
    solah,
    description: { en: descriptionEn },
    illustration: guideIllustrations[solah],
    rakaat,
    items,
  };
}
