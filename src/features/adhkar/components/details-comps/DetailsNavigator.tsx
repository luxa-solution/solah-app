import { useRouter } from "expo-router";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

import { totalAdhkarAmt } from "@/features-adhkar/data";
import { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderRadius } from "@/shared/styles";

const chevronLeft = require("@/assets/adhkar-icons/chev-left.png");
const chevronRight = require("@/assets/adhkar-icons/chev-right.png");

export type DetailsNavigatorProps = {
  item: AdhkarItem;
};

export const DetailsNavigator = ({ item }: DetailsNavigatorProps) => {
  const router = useRouter();

  const { id, title, type: adhkar_type } = item;

  const currentId = Number(id);
  const total = totalAdhkarAmt[adhkar_type];

  const canPrev = currentId > 1;
  const canNext = currentId < total;

  const goTo = (newId: number) => {
    router.push({
      pathname: "/adhkar/details",
      params: { adhkar_type, id: String(newId) },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => canPrev && goTo(currentId - 1)}
        disabled={!canPrev}
        style={styles.chevronLeft}
        accessibilityLabel="previous"
      >
        <Image
          source={chevronLeft}
          style={{
            width: 20,
            height: 20,
            tintColor: colors.context.default.inverted,
            opacity: canPrev ? 1 : 0.4,
          }}
        />
      </Pressable>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Pressable
        onPress={() => canNext && goTo(currentId + 1)}
        style={styles.chevronRight}
        accessibilityLabel="next"
        disabled={!canNext}
      >
        <Image
          source={chevronRight}
          style={{
            width: 20,
            height: 20,
            tintColor: colors.context.default.inverted,
            opacity: canNext ? 1 : 0.4,
          }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.context.brand.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  chevronLeft: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...font.heading.xsmall,
    color: colors.background.default.primary,
    fontWeight: "700",
  },
  chevronRight: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
