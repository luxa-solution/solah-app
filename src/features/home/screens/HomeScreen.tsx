import { AdhkarCard, PrayerGuideCard, PrayerTimesCard, TitleBar } from "@/features-home/components";
import { PrayerTimingCard } from "@/features-solah/components";
import ScreenContainer, { edgesHorizontal } from "@/shared/components/screen-container";

export function HomeScreen() {
  return (
    <ScreenContainer scrollable edges={["top", "bottom", ...edgesHorizontal]} withPadding>
      <TitleBar />
      <PrayerTimesCard />
      <PrayerTimingCard />
      <AdhkarCard />
      <PrayerGuideCard />
    </ScreenContainer>
  );
}
