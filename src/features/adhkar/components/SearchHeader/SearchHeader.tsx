import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { colors, spacing } from "@/shared/styles";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onBack: () => void;
  placeholder?: string;
}

export const SearchHeader = ({
  searchQuery,
  onSearchChange,
  onBack,
  placeholder = "Search adhkar...",
}: SearchHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color={colors.context.brand.primary} />
      </TouchableOpacity>

      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.context.default.secondary}
          value={searchQuery}
          onChangeText={onSearchChange}
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.context.default.primary,
    height: "100%",
    padding: 0,
  },
});
