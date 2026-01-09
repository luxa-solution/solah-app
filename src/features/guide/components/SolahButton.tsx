import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { colors, spacing, borderRadius, effect, borderWidth, font } from "@/shared/styles";

interface SolahButtonProps {
  data: SolahGroup;
}

export const SolahButton = ({ data }: SolahButtonProps) => {
  const router = useRouter();

  const { solah, description, illustration, rakaat } = data;
  const handlePress = () => router.push(`/guide/${solah}`);
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>
          {solah} • {description.en}
        </Text>
        <Text style={styles.rakaatText}>{rakaat} Raka&rsquo;at</Text>
      </View>
      <Image source={illustration} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.background.default.primary, // #FDFDFD
    borderWidth: borderWidth.sm,
    borderColor: colors.border.default.tertiary, // #E8E8E8
    borderRadius: borderRadius[4],
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.m,
    ...effect.E2,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  rakaatText: {
    ...font.display.small,
    color: colors.context.default.primary,
  },
  descriptionText: {
    ...font.label.small,
    color: colors.context.brand.secondary,
  },
  image: {
    width: 55,
    height: 55,
  },
});
