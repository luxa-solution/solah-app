import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CurrentLocation, QiblaCompass } from "@/features-solah/components";
import { useQiblaParams } from "@/features-solah/hooks";
import { TitleBar } from "@/shared/components";
import { colors, screenStyle } from "@/shared/styles";

export function QiblaDirectionScreen() {
  const { bottom } = useSafeAreaInsets();
  const { qiblaBearing, distanceKm, loading } = useQiblaParams();

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
      {!loading && qiblaBearing !== undefined && (
        <QiblaCompass qiblaBearing={qiblaBearing} distanceKm={distanceKm} />
      )}
    </ScrollView>
  );
}
