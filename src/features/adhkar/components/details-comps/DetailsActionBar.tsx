import { View, Pressable, Image, Alert } from "react-native";

import { useAdhkarStore } from "@/features/adhkar/store/adhkarStore";
import { AdhkarItem } from "@/features-adhkar/data";

import { detailsActionBarStyles as styles } from "./DetailsActionBar.styles";

const iconBookmarkFilled = require("@/assets/adhkar-icons/bookmark-filled.png");
const iconBookmark = require("@/assets/adhkar-icons/bookmark.png");
const iconPlay = require("@/assets/adhkar-icons/play.png");
const iconStar = require("@/assets/adhkar-icons/Star.png");
const iconStarFilled = require("@/assets/adhkar-icons/StarFilled.png");

export type DetailsActionBarProps = {
  item: AdhkarItem;
};

export const DetailsActionBar = ({ item }: DetailsActionBarProps) => {
  const { toggleFavourite, toggleBookmark, isFavourite, isBookmarked } = useAdhkarStore();
  const isFav = isFavourite(item);
  const isBook = isBookmarked(item);

  const onBookmark = () => {
    toggleBookmark(item);
    Alert.alert(
      isBook ? "Removed from Bookmarks" : "Added to Bookmarks",
      `${item.title} ${isBook ? "removed from" : "added to"} bookmarks`
    );
  };

  const onFavorite = () => {
    toggleFavourite(item);
    Alert.alert(
      isFav ? "Removed from Favourites" : "Added to Favourites",
      `${item.title} ${isFav ? "removed from" : "added to"} favourites`
    );
  };

  const onPlay = () => Alert.alert("Play", `Play adhkar ${item.id} (to be implemented)`);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPlay} style={styles.iconButton} accessibilityLabel="play">
        <Image source={iconPlay} style={styles.iconImage} />
      </Pressable>

      <Pressable onPress={onBookmark} style={styles.iconButton} accessibilityLabel="bookmark">
        <Image source={isBook ? iconBookmarkFilled : iconBookmark} style={styles.iconImage} />
      </Pressable>

      <Pressable onPress={onFavorite} style={styles.iconButton} accessibilityLabel="favorite">
        <Image source={isFav ? iconStarFilled : iconStar} style={styles.iconImage} />
      </Pressable>
    </View>
  );
};
