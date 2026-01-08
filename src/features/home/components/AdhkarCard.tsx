import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/features-adhkar/components";
import { useAdhkarAutoRotation } from "@/features-home/hooks";
import { context, fontsize } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

export function AdhkarCard() {
  const { largeCard, topSmallCard, bottomSmallCard } = useAdhkarAutoRotation();

  return (
    <>
      <Text style={styles.title}>Adhkār</Text>

      <View style={styles.mainCardWrapper}>
        {/* Left - Large Card */}
        <View style={styles.largeCardWrapper}>
          <Card data={largeCard} variant="large" height={268} bgStyle="dark" />
        </View>

        {/* Right - Two Small Cards Stacked */}
        <View style={styles.smallCardWrapper}>
          <Card data={topSmallCard} variant="small" height={129} bgStyle="light" />

          <Card data={bottomSmallCard} variant="small" height={129} bgStyle="light" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontsize.xl,
    textAlign: "left",
    marginBottom: ds(20),
    fontWeight: "bold",
    color: context.brand.primary,
  },

  mainCardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    gap: ds(8),
  },
  largeCardWrapper: {
    width: "50%",
    justifyContent: "flex-start",
  },
  smallCardWrapper: {
    width: "48%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
