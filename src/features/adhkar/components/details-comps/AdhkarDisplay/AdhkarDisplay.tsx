import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { useAdhkarAudio } from "@/features-adhkar/hooks/useAdhkarAudio";
import { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderWidth } from "@/shared/styles";

import { DetailsActionBar } from "../DetailsActionBar";
import { DetailsNavigator } from "../DetailsNavigator";

export type AdhkarDisplayProps = {
  item: AdhkarItem;
  onPrev?: () => void;
  onNext?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  showNavigator?: boolean;
};

export const AdhkarDisplay: React.FC<AdhkarDisplayProps> = ({ item, showNavigator = true }) => {
  const { entries } = item;
  const { play, activeSourceId, isPlaying, isLoading } = useAdhkarAudio();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {showNavigator && <DetailsNavigator item={item} />}

      {entries.map((entry, idx) => {
        const { arabicText, translation, transliteration, sourceId } = entry;
        const isActiveEntry = sourceId !== null && activeSourceId === sourceId;

        return (
          <React.Fragment key={idx}>
            <View style={styles.section}>
              <View style={styles.arabicTextWrap}>
                <Text style={styles.arabicText}>{arabicText}</Text>
              </View>

              {transliteration ? (
                <Text style={styles.transliteration}>{transliteration}</Text>
              ) : null}

              {translation?.en ? <Text style={styles.translation}>{translation.en}</Text> : null}

              <DetailsActionBar
                item={item}
                entry={entry}
                onPlay={(e) => play(e.sourceId)}
                isPlaying={isActiveEntry && isPlaying}
                isLoading={isActiveEntry && isLoading}
              />
            </View>

            {idx < entries.length - 1 ? <View style={styles.divider} /> : null}
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default.primary,
  },

  section: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
  },

  arabicTextWrap: {
    alignItems: "flex-end",
    marginBottom: spacing.sm,
  },

  arabicText: {
    ...font.arabic.small,
    color: colors.context.brand.primary,
  },

  transliteration: {
    ...font.body.small,
    fontStyle: "italic",
    color: colors.context.default.secondary,
    marginBottom: spacing.sm,
  },

  translation: {
    ...font.body.medium,
    color: colors.context.default.primary,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },

  divider: {
    height: borderWidth.xs,
    backgroundColor: colors.border.default.tertiary,
    marginVertical: spacing.lg,
  },
});
