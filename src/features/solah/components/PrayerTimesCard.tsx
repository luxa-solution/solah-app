import { useRouter } from "expo-router";
import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { colors } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

import { CurrentDateAndTime } from "./CurrentDateAndTime";
import { CurrentLocation } from "./CurrentLocation";
import { CurrentSolahIcons } from "./CurrentSolahIcons";
import { NextSolahTime } from "./NextSolahTime";

interface PrayerTimeCardProps {
  homePage?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const PrayerTimesCard = ({ homePage = false, style }: PrayerTimeCardProps) => {
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => {
        if (homePage) return router.push("/solah/solah-time");
      }}
    >
      <View style={styles.subContainer}>
        <NextSolahTime />
        <CurrentLocation type="chevron" />
      </View>

      <CurrentDateAndTime />
      {homePage && <CurrentSolahIcons />}

      <Image
        source={require("@/assets/images/home-image-1.png")}
        style={[styles.image, homePage && { top: null, bottom: 0 }]}
        resizeMode="cover"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: ds(24),
    rowGap: ds(24),
    position: "relative",
    padding: ds(12),
    borderRadius: ds(8),
    overflow: "hidden",
    backgroundColor: colors.background.brand.primary,
  },
  image: {
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.8,
    width: "60%",
    height: "100%",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
