import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet } from "react-native";

import { colors, spacing, borderRadius, font } from "@/shared/styles";

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search" }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.context.default.secondary} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.context.default.secondary}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border.default.secondary,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius[4],
  },
  input: {
    flex: 1,
    ...font.body.small,
    color: colors.context.default.secondary,
    fontWeight: "400",
  },
});
