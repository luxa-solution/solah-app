import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { HomeButton } from "@/features/adhkar/components/HomeButton";
import { TopNav } from "@/features/adhkar/components/TopNav";
import { AdhkarCategory } from "@/features/adhkar/types/AdhkarCategory";
import { background } from "@/shared/styles";

export function AdhkarHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Adhkar Page</Text>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search-outline" size={22} />
        </TouchableOpacity>
      </View>

      <TopNav />

      {/* Content Cards */}
      <HomeButton
        category={AdhkarCategory.BEFORE_PRAYER}
        image={require("@/assets/images/solah_illustrations/BeforePrayer.png")}
        backgroundColor={background.brand.primary}
        href="/adhkar/before"
      />

      <HomeButton
        category={AdhkarCategory.DURING_PRAYER}
        image={require("@/assets/images/solah_illustrations/DuringPrayer.png")}
        backgroundColor={background.brand.secondary}
        href="/adhkar/during"
      />

      <HomeButton
        category={AdhkarCategory.AFTER_PRAYER}
        image={require("@/assets/images/solah_illustrations/AfterPrayer.png")}
        backgroundColor={background.brand.tertiary}
        href="/adhkar/after"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
});
