import { ShieldCheck, Star, Bookmark } from "lucide-react-native";
import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from "react-native";

import { background, context, font } from "@/shared/styles";

type TabLayout = { x: number; width: number };

type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

const TAB_ITEMS: { key: string; label: string; Icon: IconComponent }[] = [
  { key: "all", label: "All Adhkar", Icon: ShieldCheck },
  { key: "fav", label: "Favourite", Icon: Star },
  { key: "bm", label: "Bookmark", Icon: Bookmark },
];

export function TopNav() {
  const [active, setActive] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([]);

  // stable handler that captures index and saves measured layout
  const handleTabLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      setTabLayouts((prev) => {
        const copy = [...(prev || [])];
        copy[index] = { x, width };
        return copy;
      });
    },
    []
  );

  const indicatorWidth = tabLayouts[active]?.width ?? 0;
  const indicatorLeft =
    (tabLayouts[active]?.x ?? 0) + ((tabLayouts[active]?.width ?? 0) - indicatorWidth) / 2;

  const TabButton = ({
    index,
    label,
    Icon,
  }: {
    index: number;
    label: string;
    Icon: IconComponent;
  }) => (
    <TouchableOpacity
      key={index}
      onPress={() => setActive(index)}
      style={styles.tabButton}
      onLayout={handleTabLayout(index)}
      activeOpacity={1}
    >
      <View style={styles.iconWrapper}>
        <Icon
          size={22.5}
          color={active === index ? context.brand.secondary : context.default.tertiary}
          strokeWidth={1.8}
        />
      </View>
      <View style={styles.tabTextBox}>
        <Text style={[styles.tab, active === index && styles.activeTab]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {TAB_ITEMS.map((t, i) => TabButton({ index: i, label: t.label, Icon: t.Icon }))}
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
  container: { marginBottom: 20 },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 52,
    gap: 16,
    alignItems: "center",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 52,
    paddingHorizontal: 12,
    justifyContent: "flex-start",
  },
  iconWrapper: {
    width: 15,
    height: 20,
    borderWidth: 1.6,
    borderColor: "transparent",
    paddingTop: 1.2,
    paddingLeft: 2.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  tabTextBox: {
    minWidth: 90,
    height: 20,
    justifyContent: "center",
    paddingRight: 6,
  },
  tab: {
    ...font.body.medium,
    fontSize: 15,
    color: context.default.tertiary,
    fontFamily: "Figtree_700Bold",
    fontWeight: "700",
  },
  activeTab: {
    ...font.body.medium,
    fontSize: 15,
    color: context.brand.secondary,
    fontFamily: "Figtree_700Bold",
    fontWeight: "700",
  },
  indicatorWrapper: {
    height: 3,
    marginTop: 2,
  },
  indicator: {
    height: 3,
    backgroundColor: background.brand.primary,
    borderRadius: 3,
    position: "absolute",
  },
});
