import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/shared/components";
import { colors } from "@/shared/styles/colors";
import { fontsize, fontweight } from "@/shared/styles/font";
import { borderRadius } from "@/shared/styles/layout";
import { ds } from "@/shared/utils/responsive-dimensions";

export const PrayerGuideCard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Prayer Guide</Text>
          <Text style={styles.subtitle}>Learn Solah the Prophetic Way</Text>
        </View>

        <AppButton
          title="Get started"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => router.push("/(tabs)/guide")}
        />
      </View>

      <Image
        source={require("@/assets/images/solah_illustrations/prayerguide.png")}
        style={styles.illustration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: ds(32), // Converting spacing.xl
    position: "relative",
    padding: ds(16), // Converting spacing.md
    borderRadius: ds(borderRadius.lg),
    backgroundColor: colors.background.brand.inverted,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    zIndex: 2,
    paddingRight: ds(12), // Converting spacing.sm
  },
  textContainer: {
    gap: ds(8), // Converting spacing.xs
    marginBottom: ds(12), // Converting spacing.sm
  },
  title: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: fontsize.xxl,
    fontWeight: fontweight.semibold,
    textAlign: "left",
    color: colors.context.brand.primary,
  },
  subtitle: {
    fontFamily: "Figtree_400Regular",
    fontSize: fontsize.sm,
    textAlign: "left",
    color: colors.context.brand.secondary,
  },
  button: {
    backgroundColor: colors.background.brand.primary,
    paddingVertical: ds(12), // Converting spacing.sm
    borderRadius: ds(borderRadius.md),
  },
  buttonText: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: fontsize.md,
    fontWeight: fontweight.semibold,
    color: colors.context.brand.inverted,
  },
  illustration: {
    position: "absolute",
    right: 0,
    top: 0,
    width: ds(140),
    height: "100%",
    resizeMode: "contain",
    zIndex: 1,
  },
});
