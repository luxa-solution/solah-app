import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

import { context, font } from "@/shared/styles";

export type OnboardingContentProps = {
  imgsrc: any;
  title: string;
  description: string;
  imgPos?: "top" | "middle" | "bottom";
};

export function OnboardingContent({
  imgsrc,
  title,
  description,
  imgPos = "top",
}: OnboardingContentProps) {
  const Title = () => (
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const Description = () => (
    <View style={styles.textContainer}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );

  const OnboardingImage = () => (
    <View style={styles.imageContainer}>
      <Image source={imgsrc} style={styles.image} contentFit="contain" />
    </View>
  );

  switch (imgPos) {
    case "top":
      return (
        <View style={styles.container}>
          <OnboardingImage />
          <Title />
          <Description />
        </View>
      );

    case "middle":
      return (
        <View style={styles.container}>
          <Title />
          <OnboardingImage />
          <Description />
        </View>
      );

    case "bottom":
      return (
        <View style={styles.container}>
          <Title />
          <Description />
          <OnboardingImage />
        </View>
      );

    default:
      return (
        <View style={styles.container}>
          <OnboardingImage />
          <Title />
          <Description />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
    width: "100%",
  },
  image: {
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 16,
    width: "100%",
  },
  title: {
    ...font.heading.large,
    width: "70%",
    textAlign: "left",
    marginBottom: 16,
    marginTop: 16,
    color: context.brand.primary,
  },

  description: {
    ...font.body.medium,
    width: "75%",
    textAlign: "left",
    color: context.brand.primary,
    paddingHorizontal: 0,
    marginBottom: 25,
  },
});
