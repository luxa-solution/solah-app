import { AdhkarCard, PrayerGuideCard, PrayerTimesCard, TitleBar } from "@/features-home/components";
import ScreenContainer, { edgesHorizontal } from "@/shared/components/screen-container";

/**
 * HomeScreen component
 *
 * @description
 * Renders the main home screen for the Solah app. The layout is wrapped
 * in a ScreenContainer which handles safe area insets, scrolling, and
 * proper spacing on devices with notches, status bars, or navigation
 * indicators.
 *
 * @example
 * ```tsx
 * <HomeScreen />
 * ```
 */

export function HomeScreen() {
  return (
    <ScreenContainer scrollable edges={["top", ...edgesHorizontal]} withPadding>
      <TitleBar />
      <PrayerTimesCard />
      <AdhkarCard />
      <PrayerGuideCard />
    </ScreenContainer>
  );
}
