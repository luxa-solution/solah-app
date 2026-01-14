import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { AdhkarDisplay, HomeButton, TopNav } from "@/features-adhkar/components";
import { adhkarData } from "@/features-adhkar/data";
import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarCategory, AdhkarTab, AdhkarItem } from "@/features-adhkar/types";
import { searchAdhkar } from "@/features-adhkar/utils/searchUtils";
import { colors, font, spacing, borderRadius } from "@/shared/styles";

import { BookmarkAdhkar } from "./BookmarkAdhkar";
import { FavouriteAdhkar } from "./FavouriteAdhkar";

export function AdhkarHome() {
  const router = useRouter();
  const [tab, setTab] = useState<AdhkarTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AdhkarItem[]>([]);

  const { favouriteIds } = useAdhkarStore();
  const favouriteCount = favouriteIds.length;

  // Get all adhkar items
  const allAdhkarItems: AdhkarItem[] = useMemo(
    () => adhkarData.flatMap((group) => group.items),
    []
  );

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

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim()) {
      setIsSearching(true);
      const results = searchAdhkar(allAdhkarItems, text);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
    Keyboard.dismiss();
  };

  const handleToggleSearch = () => {
    if (isSearching) {
      handleClearSearch();
    } else {
      setIsSearching(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
            </TouchableOpacity>

            {!isSearching ? (
              <Text style={styles.pageTitle}>Adhkar</Text>
            ) : (
              <View style={styles.searchInputContainer}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color={colors.context.default.secondary}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search adhkar..."
                  placeholderTextColor={colors.context.default.secondary}
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {searchQuery ? (
                  <TouchableOpacity onPress={handleClearSearch}>
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={colors.context.default.secondary}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          </View>

          {/* Search Button - Show only when not searching */}
          {!isSearching && (
            <TouchableOpacity onPress={handleToggleSearch}>
              <Ionicons name="search-outline" size={22} color={colors.context.brand.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results Info */}
        {isSearching && searchQuery.trim() && (
          <View style={styles.searchInfo}>
            <Text style={styles.searchResultsText}>
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
              {searchQuery.trim() && ` for "${searchQuery}"`}
            </Text>
            {searchResults.length === 0 && searchQuery.trim() && (
              <Text style={styles.noResultsText}>No adhkar found. Try different keywords.</Text>
            )}
          </View>
        )}

        {/* Tabs with counts - Hide when searching */}
        {!isSearching && <TopNav value={tab} onChange={setTab} favouriteCount={favouriteCount} />}

        {/* Content - Show category buttons only when not searching */}
        {tab === "all" && !isSearching && (
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

        {/* Search Results */}
        {isSearching && searchQuery.trim() && searchResults.length > 0 && (
          <ScrollView
            style={styles.favouritesScrollView}
            contentContainerStyle={styles.favouritesContainer}
            showsVerticalScrollIndicator={false}
          >
            {searchResults.map((item) => (
              <View key={`${item.type}-${item.id}`} style={styles.resultItem}>
                <TouchableOpacity
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
              </View>
            ))}
          </ScrollView>
        )}

        {/* Original Favourites - Only show when not searching */}
        {!isSearching && tab === "fav" && favouriteCount > 0 && (
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

        {/* Original Empty States - Only show when not searching */}
        {!isSearching && tab === "fav" && favouriteCount === 0 && <FavouriteAdhkar />}
        {!isSearching && tab === "bm" && <BookmarkAdhkar />}
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
  // Search styles
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.default.secondary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    marginLeft: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: font.body.medium.fontSize,
    color: colors.context.default.primary,
    height: "100%",
    padding: 0,
    fontFamily: font.body.medium.fontFamily,
  },
  searchInfo: {
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchResultsText: {
    fontSize: font.body.small.fontSize,
    color: colors.context.default.primary,
    fontFamily: font.body.small.fontFamily,
    fontWeight: "500",
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
