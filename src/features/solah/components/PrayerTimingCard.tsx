import { Sun, Moon } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";

import { useNextSolah } from "@/features-solah/hooks";
import { background, borderRadius, spacing, context } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

// Helper function to add minutes to a time string (HH:MM format)
const addMinutesToTime = (timeStr: string, minutes: number = 5): string => {
  const [hours, mins] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

interface TimingCardProps {
  type: "adhan" | "iqaamah";
  time: string;
}

function TimingCard({ type, time }: TimingCardProps) {
  const isAdhan = type === "adhan";
  const Icon = isAdhan ? Sun : Moon;
  const label = isAdhan ? "Adhan starts" : "Iqaamah starts";

  return (
    <View style={styles.card}>
      <Icon size={ds(36)} color={context.brand.primary} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

export function PrayerTimingCard() {
  const { nextSolah } = useNextSolah();
  const adhanTime = nextSolah?.time ?? "00:00";
  const iqaamahTime = addMinutesToTime(adhanTime, 5);

  return (
    <View style={styles.container}>
      <TimingCard type="adhan" time={adhanTime} />
      <TimingCard type="iqaamah" time={iqaamahTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: ds(12),
    flexDirection: "row",
    paddingVertical: ds(12),
  },
  card: {
    flex: 1,
    height: ds(74),
    backgroundColor: background.brand.inverted,
    borderRadius: borderRadius[4],
    borderWidth: 1,
    borderColor: background.brand.primary,
    padding: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: ds(8),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: ds(12),
    color: context.brand.primary,
    marginBottom: ds(4),
    fontFamily: "Figtree_400Regular",
  },
  time: {
    fontSize: ds(32),
    fontWeight: "bold",
    color: context.brand.primary,
    fontFamily: "Figtree_700Bold",
  },
});
