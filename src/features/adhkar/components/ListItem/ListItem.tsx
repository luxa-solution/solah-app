import { useRouter } from "expo-router";
import { memo } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

import { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderRadius, borderWidth } from "@/shared/styles";

const BORDER_COLOR = colors.border.brand.primary;
const TEXT_COLOR = colors.context.brand.primary;
const BG = colors.background.default.primary;

const listIcon = require("@/assets/adhkar-icons/list-icon.png");

export type AdhkarListItemProps = {
  item: AdhkarItem;
};

export const ListItem = memo(function AdhkarListItem({ item }: AdhkarListItemProps) {
  const { id, title, type, entries } = item;
  const count = entries.length;

  const router = useRouter();
  const handlePress = () => router.push(`/adhkar/details?adhkar_type=${type}&id=${id}`);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.75 }]}
      onPress={handlePress}
    >
      <View style={styles.left}>
        {/* ✅ Changed from View to Image with icon */}
        <Image source={listIcon} style={styles.icon} />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.countText}>({count})</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
    borderRadius: borderRadius[4],
    borderWidth: borderWidth.sm,
    borderColor: BORDER_COLOR,
    backgroundColor: BG,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: spacing.sm,
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: spacing.md,
    resizeMode: "contain",
  },
  title: {
    flexShrink: 1,
    fontSize: font.label.large.fontSize,
    fontFamily: font.label.large.fontFamily,
    fontWeight: "700",
    color: TEXT_COLOR,
    lineHeight: 22,
  },
  right: {
    width: 56,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  countText: {
    fontSize: font.label.medium.fontSize,
    fontFamily: font.label.medium.fontFamily,
    fontWeight: "700",
    color: BORDER_COLOR,
  },
});
