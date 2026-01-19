import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { SearchHeader } from "@/features/adhkar/components/SearchHeader";
import { useAdhkarSearch } from "@/features/adhkar/hooks/useAdhkarSearch";
import { AdhkarDisplay, HomeButton, TopNav } from "@/features-adhkar/components";
import { adhkarData } from "@/features-adhkar/data";
import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarCategory, AdhkarTab, AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderRadius } from "@/shared/styles";

import { BookmarkAdhkar } from "./BookmarkAdhkar";
import { FavouriteAdhkar } from "./FavouriteAdhkar";

export function AdhkarHome() {
  const router = useRouter();
  const [tab, setTab] = useState<AdhkarTab>("all");

  const { favouriteIds } = useAdhkarStore();
  const favouriteCount = favouriteIds.length;

  // Get all adhkar items
  const allAdhkarItems: AdhkarItem[] = useMemo(
    () => adhkarData.flatMap((group) => group.items),
    []
  );

  // Use search hook
  const {
    searchQuery,
    isSearchActive,
    searchResults,
    handleSearch,
    handleClearSearch,
    handleToggleSearch,
    setIsSearchActive,
    isSearching,
  } = useAdhkarSearch(allAdhkarItems);

  const favouriteItems = useMemo(
    () => allAdhkarItems.filter((item) => favouriteIds.includes(`${item.type}-${item.id}`)),
    [favouriteIds, allAdhkarItems]
  );

  // Calculate real counts from data
  const beforeGroup = adhkarData.find((group) => group.type === "before");
  const duringGroup = adhkarData.find((group) => group.type === "during");
  const afterGroup = adhkarData.find((group) => group.type === "after");

  const beforeSubCount = beforeGroup?.items.length || 0;
  const beforeAdhkarCount =
    beforeGroup?.items.reduce((total, item) => total + item.entries.length, 0) || 0;

  const duringSubCount = duringGroup?.items.length || 0;
  const duringAdhkarCount =
    duringGroup?.items.reduce((total, item) => total + item.entries.length, 0) || 0;

  const afterSubCount = afterGroup?.items.length || 0;
  const afterAdhkarCount =
    afterGroup?.items.reduce((total, item) => total + item.entries.length, 0) || 0;

  const handleBackFromSearch = () => {
    setIsSearchActive(false);
    handleClearSearch();
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header - Changes based on search state */}
        <View style={styles.header}>
          {isSearchActive ? (
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onClearSearch={handleClearSearch}
              onBack={handleBackFromSearch}
            />
          ) : (
            <>
              <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Adhkar</Text>
              </View>

              <TouchableOpacity onPress={handleToggleSearch}>
                <Ionicons name="search-outline" size={22} color={colors.context.brand.primary} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Search Results - Overlay on top when searching */}
        {isSearchActive && isSearching && (
          <View style={styles.searchResultsOverlay}>
            <Text style={styles.searchResultsText}>
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
              {searchQuery.trim() && ` for "${searchQuery}"`}
            </Text>

            {searchResults.length === 0 ? (
              <Text style={styles.noResultsText}>No adhkar found. Try different keywords.</Text>
            ) : (
              <ScrollView
                style={styles.searchResultsScrollView}
                showsVerticalScrollIndicator={false}
              >
                {searchResults.map((item) => (
                  <TouchableOpacity
                    key={`${item.type}-${item.id}`}
                    style={styles.resultItem}
                    onPress={() =>
                      router.push(`/adhkar/details?adhkar_type=${item.type}&id=${item.id}`)
                    }
                  >
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    {item.entries[0] && (
                      <Text style={styles.resultText} numberOfLines={2}>
                        {item.entries[0].translation?.en || item.entries[0].arabicText}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {/* Regular Content - ALWAYS visible (even when searching) */}
        <View style={styles.regularContent}>
          {/* Tabs with counts - ALWAYS show */}
          <TopNav value={tab} onChange={setTab} favouriteCount={favouriteCount} />

          {/* Category buttons - Show when on "all" tab */}
          {tab === "all" && (
            <View style={styles.buttonGroup}>
              <HomeButton
                category={AdhkarCategory.BEFORE_PRAYER}
                subCount={beforeSubCount}
                adhkarCount={beforeAdhkarCount}
                image={require("@/assets/images/solah_illustrations/BeforePrayer.png")}
                backgroundColor={colors.background.brand.primary}
                href="/adhkar/before"
              />

              <HomeButton
                category={AdhkarCategory.DURING_PRAYER}
                subCount={duringSubCount}
                adhkarCount={duringAdhkarCount}
                image={require("@/assets/images/solah_illustrations/DuringPrayer.png")}
                backgroundColor={colors.background.brand.secondary}
                href="/adhkar/during"
              />

              <HomeButton
                category={AdhkarCategory.AFTER_PRAYER}
                subCount={afterSubCount}
                adhkarCount={afterAdhkarCount}
                image={require("@/assets/images/solah_illustrations/AfterPrayer.png")}
                backgroundColor={colors.background.brand.tertiary}
                href="/adhkar/after"
              />
            </View>
          )}

          {/* Favourites - Show when on "fav" tab */}
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

          {/* Empty States */}
          {tab === "fav" && favouriteCount === 0 && <FavouriteAdhkar />}
          {tab === "bm" && <BookmarkAdhkar />}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    height: 40,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  pageTitle: {
    fontSize: font.heading.small.fontSize,
    fontFamily: font.heading.small.fontFamily,
    fontWeight: "600",
    marginLeft: spacing.md,
    color: colors.context.brand.primary,
  },
  regularContent: {
    flex: 1,
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
  searchResultsOverlay: {
    position: "absolute",
    top: 90,
    left: spacing.lg,
    right: spacing.lg,
    bottom: 0,
    backgroundColor: colors.background.default.primary,
    zIndex: 10,
    paddingTop: spacing.md,
  },
  searchResultsScrollView: {
    flex: 1,
  },
  searchResultsText: {
    fontSize: font.body.small.fontSize,
    color: colors.context.default.primary,
    fontFamily: font.body.small.fontFamily,
    fontWeight: "500",
    marginBottom: spacing.sm,
  },
  noResultsText: {
    fontSize: font.body.small.fontSize,
    color: colors.context.default.secondary,
    marginTop: spacing.xs,
    fontStyle: "italic",
    fontFamily: font.body.small.fontFamily,
  },
  resultItem: {
    backgroundColor: colors.palette.primary[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.palette.primary[300],
    marginBottom: spacing.lg,
  },
  resultTitle: {
    fontSize: font.heading.xsmall.fontSize,
    fontFamily: font.heading.xsmall.fontFamily,
    fontWeight: "600",
    color: colors.palette.primary[900],
    marginBottom: spacing.xs,
  },
  resultText: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    color: colors.palette.primary[800],
    lineHeight: 20,
  },
});
