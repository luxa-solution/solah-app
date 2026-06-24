import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";

import { adhkarData } from "@/features-adhkar/data";
import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderWidth } from "@/shared/styles";

export function BookmarkAdhkar() {
  const router = useRouter();
  const { bookmarkIds } = useAdhkarStore();

  const allAdhkarItems: AdhkarItem[] = adhkarData.flatMap((group) => group.items);
  const bookmarkedItems = allAdhkarItems.filter((item) =>
    bookmarkIds.includes(`${item.type}-${item.id}`)
  );

  if (bookmarkedItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/bookmarkEmptyState.png")}
          style={styles.emptyIcon}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>No bookmarks found</Text>
        <Text style={styles.emptySubtitle}>Tap the bookmark icon on any adhkar to save it</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarkedItems}
      keyExtractor={(item) => `${item.type}-${item.id}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push(`/adhkar/details?adhkar_type=${item.type}&id=${item.id}`)}
        >
          <Ionicons
            name="bookmark"
            size={20}
            color={colors.context.brand.primary}
            style={styles.bookmarkIcon}
          />

          <View style={styles.textContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.itemType}>{item.type} prayer</Text>
          </View>

          <Text style={styles.countText}>({item.entries.length})</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 220.39,
    height: 242.52,
    marginTop: 68.74,
    marginBottom: spacing.lg,
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
  listContainer: {
    padding: spacing.lg,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: borderWidth.xs,
    borderBottomColor: colors.border.default.tertiary,
  },
  bookmarkIcon: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  itemTitle: {
    fontSize: font.body.large.fontSize,
    fontFamily: font.body.large.fontFamily,
    color: colors.context.brand.primary,
    marginBottom: spacing.xxs,
  },
  itemType: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    color: colors.context.default.tertiary,
    textTransform: "capitalize",
  },
  countText: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    color: colors.context.default.tertiary,
  },
});
