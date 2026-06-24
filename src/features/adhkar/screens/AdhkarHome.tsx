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

import { SearchHeader } from "@/features/adhkar/components/SearchHeader/SearchHeader";
import { useAdhkarSearch } from "@/features/adhkar/hooks/useAdhkarSearch";
import { AdhkarDisplay, HomeButton, TopNav } from "@/features-adhkar/components";
import { adhkarData } from "@/features-adhkar/data";
import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarCategory, AdhkarTab, AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing } from "@/shared/styles";

import { BookmarkAdhkar } from "./BookmarkAdhkar";
import { FavouriteAdhkar } from "./FavouriteAdhkar";

export function AdhkarHome() {
  const router = useRouter();
  const [tab, setTab] = useState<AdhkarTab>("all");

  const { favouriteIds, bookmarkIds } = useAdhkarStore();
  const favouriteCount = favouriteIds?.length || 0;
  const bookmarkCount = bookmarkIds?.length || 0;

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
    suggestions,
    handleSearch,
    handleToggleSearch,
    handleBackFromSearch,
    isSearching,
    hasResults,
    resultsCount,
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

  const handleResultPress = (item: AdhkarItem) => {
    handleBackFromSearch();
    router.push(`/adhkar/details?adhkar_type=${item.type}&id=${item.id}`);
  };

  // Render list item (used for both suggestions and results)
  const renderListItem = (item: AdhkarItem, showArrow: boolean) => (
    <TouchableOpacity
      key={`${item.type}-${item.id}`}
      style={styles.listItem}
      onPress={() => handleResultPress(item)}
    >
      <View style={styles.listItemContent}>
        {showArrow && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.context.default.tertiary}
            style={styles.arrowIcon}
          />
        )}
        <Text style={styles.listItemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header - Changes based on search state */}
        <View style={styles.header}>
          {isSearchActive ? (
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
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

        {/* Search Results / Suggestions */}
        {isSearchActive && (
          <View style={styles.searchContainer}>
            <ScrollView style={styles.resultsScrollView} showsVerticalScrollIndicator={false}>
              {/* Show suggestions when not typing */}
              {!isSearching && <>{suggestions.map((item) => renderListItem(item, true))}</>}

              {/* Show results when typing */}
              {isSearching && (
                <>
                  <Text style={styles.searchResultsText}>
                    {resultsCount} result{resultsCount !== 1 ? "s" : ""} found
                    {searchQuery.trim() && ` for "${searchQuery}"`}
                  </Text>

                  {!hasResults ? (
                    <Text style={styles.noResultsText}>
                      No adhkar found. Try different keywords.
                    </Text>
                  ) : (
                    searchResults.map((item) => renderListItem(item, false))
                  )}
                </>
              )}
            </ScrollView>
          </View>
        )}

        {/* Regular Content - Hidden when search is active */}
        {!isSearchActive && (
          <>
            {/* Tabs with counts */}
            <TopNav
              value={tab}
              onChange={setTab}
              favouriteCount={favouriteCount}
              bookmarkCount={bookmarkCount}
            />

            {/* Content */}
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

            {tab === "fav" && favouriteCount > 0 && (
              <ScrollView
                style={styles.favouritesScrollView}
                contentContainerStyle={styles.favouritesContainer}
                showsVerticalScrollIndicator={false}
              >
                {favouriteItems.map((item) => (
                  <View key={`${item.type}-${item.id}`} style={styles.favouriteItem}>
                    <AdhkarDisplay item={item} showNavigator={false} />
                  </View>
                ))}
              </ScrollView>
            )}

            {tab === "fav" && favouriteCount === 0 && <FavouriteAdhkar />}
            {tab === "bm" && <BookmarkAdhkar />}
          </>
        )}
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
  //search styles
  searchContainer: {
    flex: 1,
    marginTop: spacing.md,
  },
  resultsScrollView: {
    flex: 1,
  },

  listItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default.tertiary,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    marginRight: spacing.sm,
  },
  listItemText: {
    fontSize: font.body.medium.fontSize,
    fontFamily: font.body.medium.fontFamily,
    color: colors.context.default.primary,
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
});
