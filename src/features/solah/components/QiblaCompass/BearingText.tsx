import { View, Text, StyleSheet } from "react-native";

import { colors } from "@/shared/styles";

type Props = {
  qiblaBearing: number;
  distanceKm?: number;
};

export function BearingText({ qiblaBearing, distanceKm }: Props) {
  return (
    <View>
      <Text style={styles.bearingText}>Qibla {qiblaBearing.toFixed(2)}° from the North</Text>

      {distanceKm !== undefined && (
        <Text style={styles.distanceText}>Distance to Ka‘bah {distanceKm} km</Text>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  bearingText: {
    marginTop: 24,
    color: colors.context.brand.primary,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  distanceText: {
    marginTop: 6,
    color: colors.context.default.secondary,
    fontSize: 13,
    textAlign: "center",
  },
});
