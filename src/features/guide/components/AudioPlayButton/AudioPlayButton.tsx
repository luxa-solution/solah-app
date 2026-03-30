import { Image } from "expo-image";
import { StyleSheet, Text, Pressable } from "react-native";

import { fontsize, fontweight, colors, spacing, borderRadius } from "@/shared/styles";

export const AudioPlayButton = () => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.audioContainer,
        pressed && { backgroundColor: colors.background.brand.inverted },
      ]}
    >
      <Image
        source={require("@/assets/guide-illustrations/Button/button-icon.png")}
        style={{ width: 24, height: 24 }}
      />
      <Text style={styles.audio}>Play audio</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  audio: {
    fontSize: fontsize.md,
    color: colors.context.default.inverted,
    fontWeight: fontweight.semibold,
    textAlign: "center",
  },
  audioContainer: {
    marginTop: spacing.m,
    backgroundColor: colors.background.brand.primary,
    paddingBlock: spacing.md,
    paddingInline: spacing.s,
    width: "100%",
    borderRadius: borderRadius.sm,
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
});
