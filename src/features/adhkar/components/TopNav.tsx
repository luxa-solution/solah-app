import { ShieldCheck, Star, Bookmark } from "lucide-react-native";
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from "react-native";

import { AdhkarTab } from "@/features-adhkar/types";
import { colors } from "@/shared/styles";

type TabLayout = { x: number; width: number };

type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

interface TopNavProps {
  value: AdhkarTab;
  onChange: (tab: AdhkarTab) => void;
  favouriteCount?: number;
}

const TAB_ITEMS: { key: AdhkarTab; label: string; Icon: IconComponent }[] = [
  { key: "all", label: "All Adhkar", Icon: ShieldCheck },
  { key: "fav", label: "Favourite", Icon: Star },
  { key: "bm", label: "Bookmark", Icon: Bookmark },
];

export function TopNav({ value, onChange, favouriteCount = 0 }: TopNavProps) {
  const [tabLayouts, setTabLayouts] = React.useState<TabLayout[]>([]);

  const active = TAB_ITEMS.findIndex((t) => t.key === value);

  const handleTabLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      setTabLayouts((prev) => {
        const copy = [...prev];
        copy[index] = { x, width };
        return copy;
      });
    },
    []
  );

  const indicatorWidth = tabLayouts[active]?.width ?? 0;
  const indicatorLeft = tabLayouts[active]?.x ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {TAB_ITEMS.map((item, index) => {
          const isActive = active === index;

          // Only show count for favourite tab
          const showCount = item.key === "fav" && favouriteCount > 0;

          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => onChange(item.key)}
              style={styles.tabButton}
              onLayout={handleTabLayout(index)}
              activeOpacity={1}
            >
              <View style={styles.iconWrapper}>
                <item.Icon
                  size={20}
                  color={
                    isActive ? colors.context.brand.secondary : colors.context.default.tertiary
                  }
                  strokeWidth={2}
                />
              </View>

              <View style={styles.tabContent}>
                <Text style={[styles.tab, isActive && styles.activeTab]}>{item.label}</Text>
                {showCount && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{favouriteCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.indicatorWrapper} pointerEvents="none">
        {indicatorWidth > 0 && (
          <View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                left: indicatorLeft,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 4,
    justifyContent: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tab: {
    fontSize: 14,
    color: colors.context.default.tertiary,
    fontWeight: "600",
    fontFamily: "Figtree_600SemiBold",
    includeFontPadding: false,
    textAlign: "center",
    flexShrink: 0,
  },
  activeTab: {
    color: colors.context.brand.secondary,
  },
  countBadge: {
    backgroundColor: colors.background.brand.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
  },
  countText: {
    fontSize: 11,
    color: colors.context.brand.inverted,
    fontWeight: "700",
    fontFamily: "Figtree_700Bold",
  },
  indicatorWrapper: {
    height: 2,
    marginTop: 1,
  },
  indicator: {
    height: 2,
    backgroundColor: colors.background.brand.primary,
    borderRadius: 1,
    position: "absolute",
  },
});
