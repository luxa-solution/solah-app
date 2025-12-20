import { View, StyleSheet } from "react-native";

import { useQiblaHeading } from "@/features-solah/hooks";
import { useQiblaHaptics } from "@/features-solah/hooks/useQiblaHaptics";
import { colors } from "@/shared/styles";

import { BearingText } from "./BearingText";
import { CompassCardinals } from "./CompassCardinals";
import { CompassNeedle } from "./CompassNeedle";
import { CompassTicks } from "./CompassTicks";
import { SIZE } from "./constants";
import { KaabaIndicator } from "./KaabaIndicator";

type Props = {
  qiblaBearing: number;
  distanceKm?: number;
};

export function QiblaCompass({ qiblaBearing, distanceKm }: Props) {
  const { heading, needleAngle } = useQiblaHeading(qiblaBearing);
  useQiblaHaptics(needleAngle);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CompassCardinals heading={heading} />
        <KaabaIndicator angle={needleAngle} />

        {/* Fixed heading marker */}
        <View style={styles.currentHeadingMarker} />

        <View style={styles.compass_body}>
          <CompassTicks heading={heading} />
          <CompassNeedle angle={needleAngle} />
        </View>
      </View>

      <BearingText qiblaBearing={qiblaBearing} distanceKm={distanceKm} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 32,
  },

  wrapper: {
    width: SIZE + 60,
    height: SIZE + 60,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  compass_body: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.palette.primary[700],
    borderWidth: 10,
    borderColor: colors.palette.secondary[300],
    alignItems: "center",
    justifyContent: "center",
  },

  currentHeadingMarker: {
    position: "absolute",
    top: -6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E3DEB1",
    borderWidth: 2,
    borderColor: "#7F5539",
    zIndex: 10,
  },
});
