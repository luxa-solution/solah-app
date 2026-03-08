import { View, Text, Image, StyleSheet } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

export function FavouriteAdhkar() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/BookmarkEmpty.png")} style={styles.image} />
      <Text style={styles.emptyTitle}>No favourite adhkar found</Text>
      <Text style={styles.emptySubtitle}>Tap the ☆ icon on any adhkar to add it to favourites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: font.heading.xsmall.fontSize,
    fontFamily: font.heading.xsmall.fontFamily,
    fontWeight: "600",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.context.brand.primary,
  },
  emptySubtitle: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    textAlign: "center",
    color: colors.context.default.tertiary,
    lineHeight: 20,
  },
});
