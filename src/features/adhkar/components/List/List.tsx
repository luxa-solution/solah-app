import { useMemo } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { adhkarData } from "@/features-adhkar/data";
import { AdhkarItem, AdhkarType } from "@/features-adhkar/types";
import { spacing } from "@/shared/styles";

import { ListItem } from "../ListItem";

export type AdhkarListProps = {
  type: AdhkarType;
};

export const List = ({ type }: AdhkarListProps) => {
  const items: AdhkarItem[] = useMemo(() => {
    const group = adhkarData.find((g) => g.type === type);
    return group ? group.items : [];
  }, [type]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem key={`${item.type}-${item.id}`} item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  contentContainer: {
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
});
