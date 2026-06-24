import { useState, useMemo } from "react";

import { AdhkarItem } from "@/features-adhkar/types";
import { searchAdhkar } from "@/features-adhkar/utils/searchUtils";

export const useAdhkarSearch = (allItems: AdhkarItem[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Get 6 suggestions from each category
  const suggestions = useMemo(() => {
    const beforeItems = allItems.filter((item) => item.type === "before").slice(0, 6);
    const duringItems = allItems.filter((item) => item.type === "during").slice(0, 6);
    const afterItems = allItems.filter((item) => item.type === "after").slice(0, 6);
    return [...beforeItems, ...duringItems, ...afterItems];
  }, [allItems]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchAdhkar(allItems, searchQuery);
  }, [searchQuery, allItems]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleToggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      handleClearSearch();
    }
  };

  const handleBackFromSearch = () => {
    setIsSearchActive(false);
    handleClearSearch();
  };

  return {
    searchQuery,
    isSearchActive,
    searchResults,
    suggestions,
    handleSearch,
    handleClearSearch,
    handleToggleSearch,
    setIsSearchActive,
    handleBackFromSearch,
    isSearching: searchQuery.trim().length > 0,
    hasResults: searchResults.length > 0,
    resultsCount: searchResults.length,
  };
};
