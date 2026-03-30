import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { borderRadius, borderWidth, colors, effect, font, spacing } from "@/shared/styles";

export function FindQiblaButton() {
  const router = useRouter();
  // const iconStyle = {
  //   color:
  // }

  return (
    <Pressable
      onPress={() => router.push("/solah/qibla-direction")}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
    >
      <View style={styles.content}>
        {/* Left Content */}
        <View style={styles.leftContent}>
          <MaterialCommunityIcons name="map-marker-circle" size={24} color={styles.text.color} />
          <Text style={styles.text}>Find Qibla Direction</Text>
        </View>

        {/* Right Content */}
        <MaterialCommunityIcons name="chevron-right" size={24} color={styles.text.color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: borderRadius[4],
    borderWidth: borderWidth.xs,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.m,
    ...effect.E3,
  },
  text: {
    ...font.label.large,
    color: colors.context.brand.primary,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContent: {
    flexDirection: "row",
    gap: spacing.xxs,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
});
