import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { colors, spacing } from "@/shared/styles";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
  onBack: () => void;
}

export const SearchHeader = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onBack,
}: SearchHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
      </TouchableOpacity>

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
          onChangeText={onSearchChange}
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={onClearSearch}>
            <Ionicons name="close-circle" size={20} color={colors.context.default.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: spacing.sm,
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
    padding: 0,
  },
});
