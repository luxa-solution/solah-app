import { useState, useMemo } from "react";

import { AdhkarItem } from "@/features-adhkar/types";
import { searchAdhkar } from "@/features-adhkar/utils/searchUtils";

export const useAdhkarSearch = (allItems: AdhkarItem[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  return {
    searchQuery,
    setSearchQuery,
    isSearchActive,
    setIsSearchActive,
    searchResults,
    handleSearch,
    handleClearSearch,
    handleToggleSearch,
    hasSearchResults: searchResults.length > 0,
    isSearching: searchQuery.trim().length > 0,
  };
};
