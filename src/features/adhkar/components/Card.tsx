import { router } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";

import { AdhkarItem } from "@/features-adhkar/types";
import { borderRadius, colors, effect, font, spacing } from "@/shared/styles";

export type AdhkarCardProps = {
  data: AdhkarItem;
  variant?: "large" | "small";
};

export const Card = ({ data, variant = "small" }: AdhkarCardProps) => {
  const { id, title, type, illustration } = data;

  const getAdhkarTitle = (adhkar_type: string) => {
    switch (adhkar_type) {
      case "before":
        return "Before Prayer";
      case "during":
        return "During Prayer";
      case "after":
        return "After Prayer";
      default:
        return "";
    }
  };

  const height = useMemo(() => {
    switch (variant) {
      case "large":
        return 268;
      case "small":
        return 129;
      default:
        return 129;
    }
  }, [variant]);

  const handlePress = () => router.push(`/adhkar/details?adhkar_type=${type}&id=${id}`);

  return (
    <Pressable onPress={handlePress} style={[styles.container, { height }]}>
      {/* Text Content */}
      <View style={styles.textContainer}>
        <View style={[styles.textWrapper]}>
          <Text style={styles.title}>{getAdhkarTitle(type)}</Text>
          <Text
            style={[
              styles.subtitle,
              variant === "small" ? styles.smallCardSubtitle : styles.largeCardSubtitle,
            ]}
          >
            {title}
          </Text>
        </View>
      </View>

      {/* Image */}
      {illustration && (
        <Image
          source={illustration}
          style={[
            styles.illustration,
            variant === "small" ? styles.smallCardsIllustration : styles.largeCardIllustration,
          ]}
          resizeMode={variant === "small" ? "cover" : "contain"}
          height={height}
        />
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
    borderRadius: borderRadius[4],
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    ...effect.E2,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    alignContent: "center",
    justifyContent: "center",
  },
  textWrapper: {
    position: "absolute",
    zIndex: 2,
  },
  title: {
    ...font.label.xsmall,
    fontWeight: "600",
    color: colors.context.default.secondary,
  },
  subtitle: {
    color: colors.context.brand.secondary,
  },
  largeCardSubtitle: {
    ...font.heading.large,
    fontWeight: "600",
  },
  smallCardSubtitle: {
    ...font.heading.xsmall,
    fontWeight: "600",
  },
  illustration: {
    position: "absolute",
    zIndex: 1,
  },
  largeCardIllustration: {
    width: "100%",
    height: "100%",
    bottom: -80,
    right: 0,
  },
  smallCardsIllustration: {
    width: "50%",
    height: "100%",
    bottom: 0,
    right: 0,
  },
});
