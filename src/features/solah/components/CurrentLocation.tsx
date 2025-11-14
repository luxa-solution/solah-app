import { ChevronDown } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";

import { useCurrentLocation } from "@/features-solah/hooks";
import { LocationData } from "@/features-solah/types/index";
import { borderRadius, colors, context, fontsize, fontweight, spacing } from "@/shared/styles";

type CurrentLocationProps = {
  type: "chevron" | "container";
};

export function CurrentLocation({ type }: CurrentLocationProps) {
  const { loading, location } = useCurrentLocation();
  if (type === "chevron")
    return <ChevronLocation country={location?.country || "No location data"} />;
  if (type === "container") return <ContainerLocation loading={loading} location={location} />;
  return null;
}

type ChevronLocationProps = {
  country: string;
};

function ChevronLocation({ country }: ChevronLocationProps) {
  return (
    <Pressable
      style={{
        position: "relative",
        zIndex: 10,
        height: 27,
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderRadius: 22,
        paddingLeft: 6,
        paddingRight: 2,
      }}
    >
      <Text
        style={{
          fontSize: fontsize.xs,
          textAlign: "left",
          color: context.default.inverted,
        }}
      >
        {country}
      </Text>

      <ChevronDown color={context.default.inverted} size={18} />
    </Pressable>
  );
}

type ContainerLocationProps = {
  loading: boolean;
  location: LocationData | null;
};

function ContainerLocation({ loading, location }: ContainerLocationProps) {
  // Loading ui
  if (loading) {
    return (
      <View style={[styles.card, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#999" />
        <Text style={{ marginTop: 8, color: "#666" }}>Fetching location...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>No location data</Text>
      </View>
    );
  }

  const { city, region, country } = location;

  return (
    <View style={styles.card}>
      <Text style={styles.subText}>
        {city}, {region}
      </Text>
      <Text style={styles.mainText}>{country}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.brand.primary,
    borderRadius: borderRadius.sm,
    padding: spacing.s,
    alignItems: "center",
    width: "100%",
  },
  subText: {
    fontSize: fontsize.xs,
    color: colors.context.brand.inverted,
    textAlign: "center",
    fontWeight: fontweight.normal,
  },
  mainText: {
    fontSize: fontsize.xxxl,
    fontWeight: fontweight.bold,
    color: colors.context.default.inverted,
    marginTop: 4,
    textAlign: "center",
  },
  errorText: {
    fontSize: fontsize.md,
    color: "red",
    textAlign: "center",
  },
});
