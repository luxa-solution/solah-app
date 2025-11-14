import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CurrentLocation } from "@/features-solah/components";
import { TitleBar } from "@/shared/components";
import { colors, screenStyle } from "@/shared/styles";

/**
 * HomeScreen component
 *
 * @description
 * Renders the main home screen for the Solah app. The layout is wrapped
 * in a ScrollView and automatically adjusts its top and bottom padding
 * according to the device's safe area insets to ensure proper spacing
 * on devices with notches, status bars, or navigation indicators.
 *
 *
 * @example
 * ```tsx
 * <HomeScreen />
 * ```
 */

export function QiblaDirectionScreen() {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        ...screenStyle.container,
        backgroundColor: colors.background.default.primary,
        paddingBottom: bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TitleBar title="Qibla direction" />

      <CurrentLocation type="container" />
    </ScrollView>
  );
}
