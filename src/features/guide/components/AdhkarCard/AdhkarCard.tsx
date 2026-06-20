import { StyleSheet, Text, View, ScrollView } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { font, colors, spacing, borderRadius, borderWidth } from "@/shared/styles";

import { AudioPlayButton } from "../AudioPlayButton";

interface SolahEntriesProps {
  items: SolahGroup["items"][number];
}

export const AdhkarCard = ({ items }: SolahEntriesProps) => {
  const entries = items.entries;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {entries.map((item, i) => (
        <View key={i} style={styles.entryContainer}>
          <Text style={styles.arabic}>{item.arabicText}</Text>

          {item.transliteration ? (
            <Text style={styles.transliteration}>{item.transliteration}</Text>
          ) : null}

          {item.media?.audio ? <AudioPlayButton /> : null}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    marginBottom: spacing.m,
    backgroundColor: colors.background.brand.inverted,
    borderColor: colors.border.default.secondary,
    borderWidth: borderWidth.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.s,
    borderRadius: borderRadius.sm,
  },

  arabic: {
    ...font.arabic.small,
    color: colors.context.brand.primary,
  },

  transliteration: {
    ...font.body.small,
    color: colors.context.brand.primary,
    textAlign: "left",
    marginTop: spacing.m,
  },
});
