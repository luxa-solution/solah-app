import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";

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
        <Appbar.Action
          icon={isBookmarked ? "bookmark" : "bookmark-outline"}
          onPress={onBookmark}
          accessibilityLabel={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        />
      )}
    </Appbar.Header>
  );
};
