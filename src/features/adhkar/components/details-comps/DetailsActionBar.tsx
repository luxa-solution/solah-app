import { View, Pressable, Image, Share } from "react-native";

import { useAdhkarStore } from "@/features/adhkar/store/adhkarStore";
import { AdhkarItem } from "@/features-adhkar/data";

import { detailsActionBarStyles as styles } from "./DetailsActionBar.styles";

const iconPlay = require("@/assets/adhkar-icons/play.png");
const iconShare = require("@/assets/adhkar-icons/share.png");
const iconStar = require("@/assets/adhkar-icons/Star.png");
const iconStarFilled = require("@/assets/adhkar-icons/StarFilled.png");

export type DetailsActionBarProps = {
  item: AdhkarItem;
};

export const DetailsActionBar = ({ item }: DetailsActionBarProps) => {
  const { toggleFavourite, isFavourite } = useAdhkarStore();
  const isFav = isFavourite(item);

  const onShare = async () => {
    try {
      const firstEntry = item.entries[0];

      if (!firstEntry) {
        await Share.share({
          message: item.title,
          title: item.title,
        });
        return;
      }

      const shareMessage = `${item.title}\n\n${firstEntry.arabicText}\n\n${firstEntry.transliteration}\n\n${firstEntry.translation.en}`;

      await Share.share({
        message: shareMessage,
        title: item.title,
      });
    } catch {}
  };

  const onFavorite = () => {
    toggleFavourite(item);
  };

  const onPlay = () => {
    // TODO: Implement audio playback when audio files are ready
    // Placeholder for future audio implementation
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onShare} style={styles.iconButton} accessibilityLabel="share">
        <Image source={iconShare} style={styles.iconImage} />
      </Pressable>

      <Pressable onPress={onPlay} style={styles.iconButton} accessibilityLabel="play">
        <Image source={iconPlay} style={styles.iconImage} />
      </Pressable>

      <Pressable onPress={onFavorite} style={styles.iconButton} accessibilityLabel="favorite">
        <Image source={isFav ? iconStarFilled : iconStar} style={styles.iconImage} />
      </Pressable>
    </View>
  );
};
