// src/features/adhkar/components/SearchBar.tsx - CORRECTED
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

import { spacing } from "@/shared/styles";

// Use the correct colors import based on your project
// Based on your AdhkarHome.tsx, you use: colors.context.brand.primary
// Let me check what's available...

// Or use safe defaults
const COLORS = {
  brandPrimary: "#1E90FF", // Blue color as fallback
  textPrimary: "#333333",
  textSecondary: "#666666",
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  borderDefault: "#E0E0E0",
};

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder = "Search adhkar...",
  isExpanded = false,
  onToggleExpand,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleToggle = () => {
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  return (
    <View style={styles.container}>
      {!isExpanded ? (
        <TouchableOpacity onPress={handleToggle} style={styles.searchIconButton}>
          <Ionicons name="search-outline" size={22} color={COLORS.brandPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.expandedSearchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={COLORS.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textSecondary}
              value={query}
              onChangeText={handleSearch}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleToggle} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.md,
  },
  searchIconButton: {
    padding: spacing.xs,
  },
  expandedSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundPrimary,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    height: "100%",
  },
  clearButton: {
    padding: spacing.xs,
  },
  cancelButton: {
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.brandPrimary,
    fontWeight: "500",
  },
});
