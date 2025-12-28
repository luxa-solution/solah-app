import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { AdhkarDisplay } from "@/features/adhkar/components/details-comps/AdhkarDisplay";
import { HomeButton } from "@/features/adhkar/components/HomeButton";
import { TopNav } from "@/features/adhkar/components/TopNav";
import { BookmarkAdhkar } from "@/features/adhkar/screens/BookmarkAdhkar";
import { FavouriteAdhkar } from "@/features/adhkar/screens/FavouriteAdhkar";
import { useAdhkarStore } from "@/features/adhkar/store/adhkarStore";
import { AdhkarCategory } from "@/features/adhkar/types/AdhkarCategory";
import { AdhkarTab } from "@/features/adhkar/types/AdhkarTab";
import { adhkarData, type AdhkarItem } from "@/features-adhkar/data";
import { colors, font, spacing } from "@/shared/styles";

export function AdhkarHome() {
  const router = useRouter();
  const [tab, setTab] = useState<AdhkarTab>("all");

  const { favouriteIds } = useAdhkarStore();
  const favouriteCount = favouriteIds.length;

  // Get all favourite items
  const allAdhkarItems: AdhkarItem[] = useMemo(
    () => adhkarData.flatMap((group) => group.items),
    []
  );

  const favouriteItems = useMemo(
    () => allAdhkarItems.filter((item) => favouriteIds.includes(`${item.type}-${item.id}`)),
    [favouriteIds, allAdhkarItems]
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Adhkar</Text>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search-outline" size={22} color={colors.context.brand.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs with counts (only for favourite) */}
      <TopNav value={tab} onChange={setTab} favouriteCount={favouriteCount} />

      {/* Content */}
      {tab === "all" && (
        <View style={styles.buttonGroup}>
          <HomeButton
            category={AdhkarCategory.BEFORE_PRAYER}
            image={require("@/assets/images/solah_illustrations/BeforePrayer.png")}
            backgroundColor={colors.background.brand.primary}
            href="/adhkar/before"
          />

          <HomeButton
            category={AdhkarCategory.DURING_PRAYER}
            image={require("@/assets/images/solah_illustrations/DuringPrayer.png")}
            backgroundColor={colors.background.brand.secondary}
            href="/adhkar/during"
          />

          <HomeButton
            category={AdhkarCategory.AFTER_PRAYER}
            image={require("@/assets/images/solah_illustrations/AfterPrayer.png")}
            backgroundColor={colors.background.brand.tertiary}
            href="/adhkar/after"
          />
        </View>
      )}

      {tab === "fav" && favouriteCount > 0 && (
        <ScrollView
          style={styles.favouritesScrollView}
          contentContainerStyle={styles.favouritesContainer}
          showsVerticalScrollIndicator={false}
        >
          {favouriteItems.map((item) => (
            <View key={`${item.type}-${item.id}`} style={styles.favouriteItem}>
              <AdhkarDisplay item={item} />
            </View>
          ))}
        </ScrollView>
      )}

      {tab === "fav" && favouriteCount === 0 && <FavouriteAdhkar />}
      {tab === "bm" && <BookmarkAdhkar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 45,
    backgroundColor: colors.background.default.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: font.heading.small.fontSize,
    fontFamily: font.heading.small.fontFamily,
    fontWeight: "600",
    marginLeft: spacing.md,
    color: colors.context.brand.primary,
  },
  buttonGroup: {
    gap: spacing.lg,
  },
  favouritesScrollView: {
    flex: 1,
  },
  favouritesContainer: {
    paddingBottom: spacing.xl,
  },
  favouriteItem: {
    marginBottom: spacing.xl,
  },
});
