import { router } from "expo-router";
import { DimensionValue, Image, Pressable, Text, View, StyleSheet } from "react-native";

import { AdhkarItem } from "@/features-adhkar/types";
import { background, context } from "@/shared/styles";

export type AdhkarCardProps = {
  data: AdhkarItem;
  variant?: "large" | "small";
  height?: DimensionValue;
  bgStyle: "light" | "dark";
};

export const Card = ({
  data,
  variant = "small",
  height = 126,
  bgStyle = "light",
}: AdhkarCardProps) => {
  const isLight = bgStyle === "light";

  const titleColor = isLight ? context.brand.secondary : context.brand.inverted;
  const subtitleColor = isLight ? context.brand.primary : context.default.inverted;
  const bgColor = isLight ? background.brand.inverted : background.brand.secondary;

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

  const handlePress = () => router.push(`/adhkar/details?adhkar_type=${type}&id=${id}`);

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        { height, backgroundColor: bgColor },
        variant === "large" && styles.largeContainer,
      ]}
    >
      {/* Text Content */}
      <View style={styles.textContainer}>
        <View
          style={[
            styles.textWrapper,
            isLight ? styles.lightCardsTextWrapper : styles.darkCardTextWrapper,
          ]}
        >
          <Text style={[styles.title, { color: titleColor }]}>{getAdhkarTitle(type)}</Text>
          <Text
            style={[styles.subtitle, { color: subtitleColor }, !isLight && styles.darkCardSubtitle]}
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
            isLight ? styles.lightCardsIllustration : styles.darkCardIllustration,
            { height: "100%" },
          ]}
          resizeMode="cover"
        />
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    margin: 0,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  textWrapper: {
    position: "absolute",
    left: 14,
    right: 14,
    zIndex: 2,
  },
  darkCardTextWrapper: {
    top: "30%",
    transform: [{ translateY: -20 }],
  },
  darkCardSubtitle: {
    fontSize: 24,
    lineHeight: 32,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "semibold",
  },
  lightCardsTextWrapper: {
    top: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 24,
    flexWrap: "wrap",
    fontWeight: "semibold",
  },
  illustration: {
    position: "absolute",
    right: -10,
    zIndex: 1,
  },
  darkCardIllustration: {
    width: 100,
    bottom: -30,
  },
  lightCardsIllustration: {
    width: 90,
    bottom: 0,
  },
  largeContainer: {
    // Large container styles
  },
});
