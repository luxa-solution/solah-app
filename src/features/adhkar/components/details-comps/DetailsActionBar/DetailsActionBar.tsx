import { View, Pressable, Image, Share, StyleSheet, ActivityIndicator } from "react-native";

import { useAdhkarStore } from "@/features-adhkar/store";
import { AdhkarEntry, AdhkarItem } from "@/features-adhkar/types";
import { colors, spacing, borderRadius } from "@/shared/styles";

const iconPause = require("@/assets/adhkar-icons/pause.png"); // add this asset — see note below
const iconPlay = require("@/assets/adhkar-icons/play.png");
const iconShare = require("@/assets/adhkar-icons/share.png");
const iconStar = require("@/assets/adhkar-icons/Star.png");
const iconStarFilled = require("@/assets/adhkar-icons/StarFilled.png");

export type DetailsActionBarProps = {
  item: AdhkarItem;
  /** Which entry within item.entries this action bar instance belongs to. */
  entry: AdhkarEntry;
  /** True while this entry's audio is the one currently loaded+playing. */
  isPlaying?: boolean;
  /** True while this entry's audio is buffering. */
  isLoading?: boolean;
  /** Called when the play button is tapped — toggles play/pause for `entry`. */
  onPlay?: (entry: AdhkarEntry) => void;
};

export const DetailsActionBar = ({
  item,
  entry,
  isPlaying = false,
  isLoading = false,
  onPlay,
}: DetailsActionBarProps) => {
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

  const hasAudio = Boolean(entry.audio && entry.sourceId);
  const handlePlay = () => {
    if (!hasAudio || !onPlay) return;
    onPlay(entry);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onShare} style={styles.iconButton} accessibilityLabel="share">
        <Image source={iconShare} style={styles.iconImage} />
      </Pressable>

      <Pressable
        onPress={handlePlay}
        disabled={!hasAudio}
        style={[styles.iconButton, !hasAudio && styles.iconButtonDisabled]}
        accessibilityLabel={isPlaying ? "pause" : "play"}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.context.brand.primary} />
        ) : (
          <Image
            source={isPlaying ? iconPause : iconPlay}
            style={[styles.iconImage, !hasAudio && styles.iconImageDisabled]}
          />
        )}
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
  iconButtonDisabled: {
    opacity: 0.4,
  },
  iconImage: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: colors.context.brand.primary,
  },
  iconImageDisabled: {
    tintColor: colors.context.default.tertiary,
  },
});
