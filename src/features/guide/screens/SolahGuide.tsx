import { Image } from "expo-image";
import { useState } from "react";
import { View, StyleSheet, useWindowDimensions, Pressable, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AdhkarCard, StepDescription, StepTitle } from "@/features/guide/components";
import { solahGuides } from "@/features-solah/data";
import { SolahName } from "@/features-solah/types";
import { ProgressBar, TitleBar } from "@/shared/components";
import {
  colors,
  borderRadius,
  spacing,
  borderWidth,
  screenStyle,
  font,
  fontweight,
} from "@/shared/styles";

interface SolahGuideProps {
  solahName: SolahName;
}

export function SolahGuide({ solahName }: SolahGuideProps) {
  const { bottom } = useSafeAreaInsets();
  const [GuideIndex, setGuideIndex] = useState(0);
  const totalSteps = solahGuides[solahName].items.length;

  const items = solahGuides[solahName].items[GuideIndex];
  const source = items.entries[0]?.media?.image;
  const windowWidth = useWindowDimensions().width;

  const progressPercent = ((GuideIndex + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (GuideIndex < totalSteps - 1) {
      setGuideIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (GuideIndex > 0) {
      setGuideIndex((prev) => prev - 1);
    }
  };

  return (
    <View
      style={{
        ...screenStyle.container,
        paddingBottom: bottom,
        // paddingTop: top + spacing.l,
      }}
    >
      <TitleBar title={solahName} />

      {/*  Header with Progress Bar */}
      <View style={styles.header}>
        <Text style={styles.stepText}>
          Step {GuideIndex + 1}/{totalSteps}
        </Text>
        <ProgressBar percent={progressPercent} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Illustration Image */}
        <View style={styles.container}>
          {source && (
            <Image
              source={source}
              style={{
                width: windowWidth - spacing.xxxl,
                aspectRatio: 16 / 9,
                borderRadius: borderRadius[2],
                borderColor: colors.border.default.secondary,
                borderWidth: borderWidth.sm,
                marginTop: spacing.m,
              }}
              contentFit="cover"
            />
          )}
          {/* Step Title, Description, and Adhkar Entries */}
          <StepTitle items={items} />
          <StepDescription items={items} />
          <AdhkarCard items={items} />
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.btn}>
        <Pressable onPress={handlePrevious} disabled={GuideIndex === 0}>
          <Text style={[styles.navText, GuideIndex === 0 && styles.disabled]}>Previous</Text>
        </Pressable>

        <Pressable onPress={handleNext} disabled={GuideIndex === totalSteps - 1}>
          <Text style={[styles.navText, GuideIndex === totalSteps - 1 && styles.disabled]}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "column",
  },
  container: {
    gap: 16,
    paddingBottom: spacing.xl,
  },
  navText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.context.brand.secondary,
    fontWeight: "600",
  },
  disabled: {
    color: colors.context.brand.inverted,
  },

  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  header: {
    width: "90%",
    alignSelf: "center",
  },
  stepText: {
    ...font.label.medium,
    fontWeight: fontweight.semibold,
    marginBottom: 8,
    color: colors.context.default.primary,
  },
});
