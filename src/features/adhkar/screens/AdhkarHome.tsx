import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { AdhkarDisplay } from "@/features/adhkar/components/details-comps/AdhkarDisplay";
import { HomeButton } from "@/features/adhkar/components/HomeButton";
import { TopNav } from "@/features/adhkar/components/TopNav";
import { BookmarkAdhkar } from "@/features/adhkar/screens/BookmarkAdhkar";
import { FavouriteAdhkar } from "@/features/adhkar/screens/FavouriteAdhkar";
import { useAdhkarStore } from "@/features/adhkar/store/adhkarStore";
import { AdhkarCategory } from "@/features/adhkar/types/AdhkarCategory";
import { AdhkarTab } from "@/features/adhkar/types/AdhkarTab";
import { searchAdhkar } from "@/features/adhkar/utils/searchUtils";
import { adhkarData, type AdhkarItem } from "@/features-adhkar/data";
import { colors, font, spacing } from "@/shared/styles";

export function AdhkarHome() {
  const router = useRouter();
  const [tab, setTab] = useState<AdhkarTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AdhkarItem[]>([]);

  const { favouriteIds, bookmarkIds } = useAdhkarStore();
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

  const bookmarkedItems = useMemo(
    () => allAdhkarItems.filter((item) => bookmarkIds.includes(`${item.type}-${item.id}`)),
    [bookmarkIds, allAdhkarItems]
  );

  // Calculate counts from main branch
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

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim()) {
      setIsSearching(true);

      let itemsToSearch: AdhkarItem[] = [];

      switch (tab) {
        case "fav":
          itemsToSearch = favouriteItems;
          break;
        case "bm":
          itemsToSearch = bookmarkedItems;
          break;
        default:
          itemsToSearch = allAdhkarItems;
      }

      const results = searchAdhkar(itemsToSearch, text);
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

  // Get current items based on tab and search
  const getCurrentItems = () => {
    if (isSearching && searchQuery.trim()) {
      return searchResults;
    }

    switch (tab) {
      case "fav":
        return favouriteItems;
      case "bm":
        return bookmarkedItems;
      default:
        return [];
    }
  };

  const currentItems = getCurrentItems();
  const showCategoryButtons = tab === "all" && !isSearching;
  const showList = isSearching || tab !== "all";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header with search */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {!isSearching ? (
              <>
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Adhkar</Text>
              </>
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
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={handleClearSearch}>
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={colors.context.default.secondary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity onPress={handleToggleSearch} style={styles.searchButton}>
            {isSearching ? (
              <Text style={styles.cancelText}>Cancel</Text>
            ) : (
              <Ionicons name="search-outline" size={22} color={colors.context.brand.primary} />
            )}
          </TouchableOpacity>
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

        {/* Tabs - Hide when searching */}
        {!isSearching && <TopNav value={tab} onChange={setTab} favouriteCount={favouriteCount} />}

        {/* Content */}
        {showCategoryButtons && (
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

        {/* Search Results or Favourites/Bookmarks List */}
        {showList && (
          <FlatList
            data={currentItems}
            renderItem={({ item }) => {
              if (tab === "fav") {
                return (
                  <View style={styles.listItem}>
                    <View style={styles.favouriteItem}>
                      <AdhkarDisplay item={item} />
                    </View>
                  </View>
                );
              }

              return (
                <View style={styles.listItem}>
                  <TouchableOpacity
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
                </View>
              );
            }}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !isSearching ? (
                <>
                  {tab === "fav" && favouriteCount === 0 && <FavouriteAdhkar />}
                  {tab === "bm" && <BookmarkAdhkar />}
                </>
              ) : null
            }
          />
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
  searchButton: {
    padding: spacing.xs,
    minWidth: 40,
    alignItems: "flex-end",
  },
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
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.context.default.primary,
    height: "100%",
  },
  cancelText: {
    fontSize: 16,
    color: colors.context.brand.primary,
    fontWeight: "500",
  },
  searchInfo: {
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchResultsText: {
    fontSize: 14,
    color: colors.context.default.primary,
    fontWeight: "500",
  },
  noResultsText: {
    fontSize: 14,
    color: colors.context.default.secondary,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  buttonGroup: {
    gap: spacing.lg,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
  listItem: {
    marginBottom: spacing.lg,
  },
  resultItem: {
    backgroundColor: colors.palette.primary[100],
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.palette.primary[300],
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
  favouriteItem: {
    marginBottom: spacing.xl,
  },
});
