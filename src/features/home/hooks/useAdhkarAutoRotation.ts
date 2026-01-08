import { useMemo } from "react";

import { adhkarData } from "@/features-adhkar/data";
import { AdhkarItem, AdhkarType } from "@/features-adhkar/types";
import { useSettingsStore } from "@/features-settings/store";
import { useCurrentSolah, useMinuteTick, useSolahTimes } from "@/features-solah/hooks";
import { getCurrentMinutes, parseTimeToMinutes } from "@/features-solah/utils";

type AdhkarAutoRotationReturn = {
  largeCard: AdhkarItem;
  topSmallCard: AdhkarItem;
  bottomSmallCard: AdhkarItem;
};

type AdhkarPhase = AdhkarType | "random";

const CONFIG = {
  BEFORE_OFFSET: 15, // mins before Adhan
  DURING_BUFFER: 5, // mins after Iqamah
  AFTER_DURATION: 30, // mins after "during" state ends

  // rotation frequencies (how often we switch content within each phase)
  ROTATE_MINUTES: {
    before: 5,
    during: 5,
    after: 10,
    random: 15,
  },
} as const;

export function useAdhkarAutoRotation(): AdhkarAutoRotationReturn {
  const { times } = useSolahTimes();
  const { currentSolah } = useCurrentSolah();
  const { timezone } = useSettingsStore();

  useMinuteTick();

  const itemsByType = useMemo(() => {
    const [before, during, after] = adhkarData;
    return {
      before: before.items,
      during: during.items,
      after: after.items,
    };
  }, []);

  const nowMinutes = useMemo(() => getCurrentMinutes(timezone), [timezone]);

  // Determine current phase based on current prayer’s Adhan window
  const phase = useMemo<AdhkarPhase>(() => {
    if (!times || times.length === 0) return "random";

    const currentPrayer = times.find((p) => p.title === currentSolah);
    if (!currentPrayer) return "random";

    const adhan = parseTimeToMinutes(currentPrayer.time);
    const IQAMAH_OFFSET = 15;
    const iqamah = adhan + IQAMAH_OFFSET; // TODO:  Implement with settings store.
    const midPoint = adhan + (iqamah - adhan) / 2;

    const startBefore = adhan - CONFIG.BEFORE_OFFSET;
    const endDuring = iqamah + CONFIG.DURING_BUFFER;
    const endAfter = endDuring + CONFIG.AFTER_DURATION;

    if (nowMinutes >= startBefore && nowMinutes < midPoint) return "before";
    if (nowMinutes >= midPoint && nowMinutes < endDuring) return "during";
    if (nowMinutes >= endDuring && nowMinutes < endAfter) return "after";

    return "random";
  }, [times, currentSolah, nowMinutes]);

  const rotationKey = useMemo(() => {
    const rotateEvery = CONFIG.ROTATE_MINUTES[phase];
    const bucket = Math.floor(nowMinutes / rotateEvery);
    return `${phase}:${bucket}`;
  }, [phase, nowMinutes]);

  const cards = useMemo<AdhkarAutoRotationReturn>(() => {
    void rotationKey; // Not used but needed for stability.

    // Always ensure one from each bucket exists (even in random phase)
    const before = getRandomItem(itemsByType.before);
    const during = getRandomItem(itemsByType.during);
    const after = getRandomItem(itemsByType.after);

    switch (phase) {
      case "before":
        return { largeCard: before, topSmallCard: during, bottomSmallCard: after };
      case "during":
        return { largeCard: during, topSmallCard: after, bottomSmallCard: before };
      case "after":
        return { largeCard: after, topSmallCard: before, bottomSmallCard: during };
      case "random":
      default:
        // random: still one from each, but rotate the positions
        return getRandomLayout([before, during, after]);
    }
  }, [phase, itemsByType, rotationKey]);

  return cards;
}

// HELPERS

const getRandomItem = (items: AdhkarItem[]) => items[Math.floor(Math.random() * items.length)];

const getRandomLayout = (cards: [AdhkarItem, AdhkarItem, AdhkarItem]) => {
  const layouts = [
    { largeCard: cards[0], topSmallCard: cards[1], bottomSmallCard: cards[2] },
    { largeCard: cards[1], topSmallCard: cards[2], bottomSmallCard: cards[0] },
    { largeCard: cards[2], topSmallCard: cards[0], bottomSmallCard: cards[1] },
  ] as const;

  return layouts[Math.floor(Math.random() * layouts.length)];
};
