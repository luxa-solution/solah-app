import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/features-adhkar/components";
import { background, context, fontsize } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

export function AdhkarCard() {
  const router = useRouter();

  return (
    <>
      <Text style={styles.title}>Adhkār</Text>

      <View style={styles.mainCardWrapper}>
        {/* Left - Large Card */}
        <View style={styles.largeCardWrapper}>
          <Card
            title="Before Prayer"
            subtitle="Upon completing the ablution"
            onPress={() => {
              router.push("/adhkar/before");
            }}
            variant="large"
            height={268}
            bgStyle="light"
            backgroundColor={background.default.primary}
            illustration={require("@/assets/images/solah_illustrations/man-ablution.png")}
          />
        </View>

        {/* Right - Two Small Cards Stacked */}
        <View style={styles.smallCardWrapper}>
          <Card
            title="During Prayer"
            subtitle="While bowing in prayer (Rukoo')"
            onPress={() => {
              router.push("/adhkar/during");
            }}
            variant="small"
            height={129}
            bgStyle="light"
            backgroundColor={background.default.primary}
            illustration={require("@/assets/images/solah_illustrations/Prostration.png")}
          />

          <Card
            title="After Prayer"
            subtitle="Remembrance after salām"
            onPress={() => {
              router.push("/adhkar/after");
            }}
            variant="small"
            height={129}
            bgStyle="light"
            backgroundColor={background.default.primary}
            illustration={require("@/assets/images/solah_illustrations/AfterSolah.png")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontsize.xl,
    textAlign: "left",
    marginBottom: ds(12),
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
