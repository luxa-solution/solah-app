import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { font, colors, spacing, borderRadius, borderWidth } from "@/shared/styles";

import { AudioPlayButton } from "../AudioPlayButton";

interface SolahEntriesProps {
  items: SolahGroup["items"][number];
}

export const AdhkarCard = ({ items }: SolahEntriesProps) => {
  const entries = items.entries;

  // Track expanded state per card entry item index
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleTranslation = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {entries.map((item, i) => {
        const isExpanded = expandedIndex === i;

        return (
          <View key={i} style={styles.entryContainer}>
            {/* Arabic Text */}
            <Text style={styles.arabic}>{item.arabicText}</Text>

            {/* Transliteration */}
            {item.transliteration ? (
              <Text style={styles.transliteration}>{item.transliteration}</Text>
            ) : null}

            {/* Small Expand Text with Arrow Trigger */}
            {item.translation?.en ? (
              <TouchableOpacity
                onPress={() => toggleTranslation(i)}
                style={styles.expandButton}
                activeOpacity={0.7}
              >
                <Text style={styles.expandText}>
                  {isExpanded ? "Hide Translation ↑" : "Show Translation ↓"}
                </Text>
              </TouchableOpacity>
            ) : null}

            {/* Collapsible Translation Text */}
            {isExpanded && item.translation?.en ? (
              <Text style={styles.translation}>{item.translation.en}</Text>
            ) : null}

            {item.media?.audio ? <AudioPlayButton /> : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    marginBottom: spacing.m,
    backgroundColor: colors.background.brand.inverted,
    borderColor: colors.border.default.secondary,
    borderWidth: borderWidth.sm,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
    borderRadius: borderRadius.sm,
  },

  arabic: {
    ...font.arabic.small,
    color: colors.context.brand.primary,
    lineHeight: 40,
  },

  transliteration: {
    ...font.body.small,
    color: colors.context.brand.primary,
    marginTop: spacing.m,
  },
  expandButton: {
    marginTop: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  expandText: {
    ...font.label.small,
    color: colors.context.brand.secondary,
    textAlign: "center",
  },

  translation: {
    ...font.body.small,
    color: colors.context.brand.secondary,
    fontStyle: "italic",
    marginTop: spacing.s,
  },
});
