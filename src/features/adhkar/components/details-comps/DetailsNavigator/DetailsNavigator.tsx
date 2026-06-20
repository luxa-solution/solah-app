import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

import { totalAdhkarAmt } from "@/features-adhkar/data";
import type { AdhkarItem } from "@/features-adhkar/types";
import { colors, font, spacing, borderRadius } from "@/shared/styles";

const chevronLeft = require("@/assets/adhkar-icons/chev-left.png");
const chevronRight = require("@/assets/adhkar-icons/chev-right.png");

const ICON_SIZE = 20;

export type DetailsNavigatorProps = {
  item: AdhkarItem;
};

export const DetailsNavigator = ({ item }: DetailsNavigatorProps) => {
  const router = useRouter();

  const { id, title, type: adhkarType } = item;

  const { currentId, canPrev, canNext } = useMemo(() => {
    const current = Number(id);
    const max = totalAdhkarAmt[adhkarType];

    return {
      currentId: current,
      total: max,
      canPrev: current > 1,
      canNext: current < max,
    };
  }, [id, adhkarType]);

  const goTo = useCallback(
    (newId: number) => {
      router.push({
        pathname: "/adhkar/details",
        params: {
          adhkar_type: adhkarType,
          id: String(newId),
        },
      });
    },
    [router, adhkarType]
  );

  return (
    <View style={styles.container}>
      <NavigatorButton
        icon={chevronLeft}
        disabled={!canPrev}
        onPress={() => goTo(currentId - 1)}
        accessibilityLabel="previous"
      />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <NavigatorButton
        icon={chevronRight}
        disabled={!canNext}
        onPress={() => goTo(currentId + 1)}
        accessibilityLabel="next"
      />
    </View>
  );
};

type NavigatorButtonProps = {
  icon: number;
  disabled: boolean;
  onPress: () => void;
  accessibilityLabel: string;
};

const NavigatorButton = ({ icon, disabled, onPress, accessibilityLabel }: NavigatorButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={styles.button}
      accessibilityLabel={accessibilityLabel}
    >
      <Image
        source={icon}
        style={[
          styles.icon,
          {
            opacity: disabled ? 0.4 : 1,
          },
        ]}
      />
    </Pressable>
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

  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    tintColor: colors.context.default.inverted,
  },

  titleWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...font.heading.xsmall,
    color: colors.background.default.primary,
  },
});
