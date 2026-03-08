// import { Image } from "expo-image";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { fontsize, colors, spacing, borderRadius, borderWidth } from "@/shared/styles";

import { AudioPlayButton } from "./AudioPlayButton";

interface SolahEntriesProps {
  items: SolahGroup["items"][number];
}

export const AdhkarCard = ({ items }: SolahEntriesProps) => {
  const entries = items.entries;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {entries.map((item, i) => (
        <View key={i.toString()} style={styles.entryContainer}>
          <Text style={styles.arabic}>{item.arabicText}</Text>
          <Text style={styles.transliteration}>{item.transliteration}</Text>

          <AudioPlayButton />
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
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    borderRadius: borderRadius.sm,
  },
  arabic: {
    fontSize: fontsize.xxl,
    fontWeight: "400", //no defined fontweight in the shared styles
    color: colors.context.brand.primary,
    textAlign: "right",
  },
  transliteration: {
    fontSize: fontsize.sm,
    color: colors.context.brand.primary,
    textAlign: "left",
    marginTop: spacing.m,
  },
});
