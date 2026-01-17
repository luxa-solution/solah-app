import { Image } from "expo-image";
import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  ScrollView,
  FlatList,
  ViewToken,
} from "react-native";
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
  const items = solahGuides[solahName].items;
  const windowWidth = useWindowDimensions().width;

  const progressPercent = ((GuideIndex + 1) / totalSteps) * 100;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setGuideIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View
      style={{
        ...screenStyle.container,
        paddingBottom: bottom,
        paddingHorizontal: 0,
      }}
    >
      <View style={{ paddingHorizontal: spacing.l }}>
        <TitleBar title={solahName} />

        {/*  Header with Progress Bar */}
        <View style={styles.header}>
          <Text style={styles.stepText}>
            Step {GuideIndex + 1}/{totalSteps}
          </Text>
          <ProgressBar percent={progressPercent} />
        </View>
      </View>

      <FlatList
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const source = item.entries[0]?.media?.image;
          return (
            <ScrollView
              style={{ width: windowWidth }}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
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
                <StepTitle items={item} />
                <StepDescription items={item} />
                <AdhkarCard items={item} />
              </View>
            </ScrollView>
          );
        }}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  container: {
    gap: 16,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.l,
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
