import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SolahButton } from "@/features-guide/components";
import { solahNames, solahGuides } from "@/features-solah/data";
import { TitleBar } from "@/shared/components";
import { screenStyle, spacing } from "@/shared/styles";

export const GuideHome = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...screenStyle.container,
        paddingBottom: bottom,
      }}
    >
      <TitleBar title="Solah Guide" showBack={false} />

      {/* Solah Cards */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {solahNames.map((item) => (
          <SolahButton key={item} data={solahGuides[item]} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: spacing.l,
  },
});
