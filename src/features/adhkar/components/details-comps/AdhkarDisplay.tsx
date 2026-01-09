import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing } from "@/shared/styles";

import { DetailsActionBar } from "./DetailsActionBar";
import { DetailsNavigator } from "./DetailsNavigator";

export type AdhkarDisplayProps = {
  item: AdhkarItem;
  onPrev?: () => void;
  onNext?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  onPlay?: () => void;
};

export const AdhkarDisplay: React.FC<AdhkarDisplayProps> = ({ item }) => {
  const { entries } = item;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DetailsNavigator item={item} />

      {entries.map(({ arabicText, translation, transliteration }, idx) => (
        <React.Fragment key={idx}>
          <View style={styles.section}>
            <View style={styles.arabicTextWrap}>
              <Text style={styles.arabicText}>{arabicText}</Text>
            </View>

            {transliteration ? <Text style={styles.transliteration}>{transliteration}</Text> : null}

            {translation?.en ? <Text style={styles.translation}>{translation.en}</Text> : null}

            <DetailsActionBar item={item} />
          </View>

          {idx < entries.length - 1 ? <View style={styles.divider} /> : null}
        </React.Fragment>
      ))}
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
    fontSize: 28,
    fontFamily: font.display.medium.fontFamily ?? font.heading.medium.fontFamily,
    lineHeight: 38,
    color: colors.context.brand.primary,
  },
  transliteration: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    fontStyle: "italic",
    color: colors.context.default.secondary,
    marginBottom: spacing.sm,
  },
  translation: {
    fontSize: font.body.medium.fontSize,
    fontFamily: font.body.medium.fontFamily,
    color: colors.context.default.primary,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.default.tertiary,
    marginVertical: spacing.lg,
  },
});
