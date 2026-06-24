import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import { colors } from "@/shared/styles";

export interface TitleBarProps {
  title: string;
  showBack?: boolean;
  showBookmark?: boolean;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const TitleBar = ({
  title,
  showBack = true,
  showBookmark = false,
  onBookmark,
  isBookmarked = false,
}: TitleBarProps) => {
  const router = useRouter();

  return (
    <Appbar.Header style={{ paddingLeft: 0 }}>
      {showBack && <Appbar.BackAction onPress={() => router.back()} />}
      <Appbar.Content title={title} />

      {showBookmark && onBookmark && (
        <View style={[styles.bookmarkContainer, isBookmarked && styles.bookmarkContainerFilled]}>
          <Appbar.Action
            icon={isBookmarked ? "bookmark" : "bookmark-outline"}
            onPress={onBookmark}
            accessibilityLabel={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            iconColor={
              isBookmarked ? colors.context.brand.secondary : colors.context.default.tertiary
            }
          />
        </View>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  bookmarkContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginRight: 8,
    backgroundColor: "transparent",
  },
  bookmarkContainerFilled: {
    borderColor: colors.context.brand.secondary,
    backgroundColor: "transparent",
  },
});
