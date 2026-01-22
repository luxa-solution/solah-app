import { View, Pressable, Image, Share, StyleSheet } from "react-native";

import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarItem } from "@/features-adhkar/types";
import { colors, spacing, borderRadius } from "@/shared/styles";

const iconPlay = require("@/assets/adhkar-icons/play.png");
const iconShare = require("@/assets/adhkar-icons/share.png");
const iconStar = require("@/assets/adhkar-icons/Star.png");
const iconStarFilled = require("@/assets/adhkar-icons/StarFilled.png");

export type DetailsActionBarProps = {
  item: AdhkarItem;
  entryIndex?: number;
};

export const DetailsActionBar = ({ item, entryIndex }: DetailsActionBarProps) => {
  const { toggleFavourite, isFavourite, toggleEntryFavourite, isEntryFavourite } = useAdhkarStore();

  const isFav = entryIndex !== undefined ? isEntryFavourite(item, entryIndex) : isFavourite(item);

  const onShare = async () => {
    try {
      const entryToShare = entryIndex !== undefined ? item.entries[entryIndex] : item.entries[0];

      if (!entryToShare) {
        await Share.share({
          message: item.title,
          title: item.title,
        });
        return;
      }

      const shareMessage = `${item.title}\n\n${entryToShare.arabicText}\n\n${entryToShare.transliteration}\n\n${entryToShare.translation.en}`;

      await Share.share({
        message: shareMessage,
        title: item.title,
      });
    } catch {}
  };

  const onFavorite = () => {
    if (entryIndex !== undefined) {
      toggleEntryFavourite(item, entryIndex);
    } else {
      toggleFavourite(item);
    }
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

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.md,
    backgroundColor: "#ecd8cf",
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: spacing.sm,
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: colors.context.brand.primary,
  },
});
