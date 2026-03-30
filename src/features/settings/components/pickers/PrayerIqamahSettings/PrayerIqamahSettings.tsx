import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import { useSettingsStore } from "@/features-settings/store";
import { clampIqamahMinutes, sanitizeIqamahMinutesInput } from "@/features-settings/utils";
import { SolahName } from "@/features-solah/types";
import { validateIqamahDelay } from "@/features-solah/utils";
import { colors, font, spacing } from "@/shared/styles";

import { CircularMinuteDial } from "../shared";

type PrayerIqamahSettingsProps = {
  prayer: SolahName;
  onClose?: () => void;
  onDone?: () => void;
};

export function PrayerIqamahSettings({ prayer, onClose, onDone }: PrayerIqamahSettingsProps) {
  const currentConfig = useSettingsStore((state) => state.prayerSchedule[prayer]);
  const setPrayerSchedule = useSettingsStore((state) => state.setPrayerSchedule);

  const [minutes, setMinutes] = useState(String(currentConfig.iqamahDelayMinutes));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!/^\d+$/.test(minutes)) {
      setError("Iqamah delay must be between 5 and 60 minutes");
      return;
    }

    const parsed = Number(minutes);
    const validation = validateIqamahDelay(parsed);
    if (!validation.valid) {
      setError(validation.reason ?? "Invalid iqamah delay");
      return;
    }

    setPrayerSchedule(prayer, {
      ...currentConfig,
      iqamahDelayMinutes: parsed,
    });
    setError(null);
    onDone?.();
    if (!onDone) {
      onClose?.();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CircularMinuteDial
        onChange={(value) => {
          setMinutes(String(value));
          setError(null);
        }}
        value={clampIqamahMinutes(Number(minutes || currentConfig.iqamahDelayMinutes))}
      />

      <TextInput
        keyboardType="number-pad"
        onChangeText={(value) => {
          setMinutes(sanitizeIqamahMinutesInput(value));
          setError(null);
        }}
        placeholder="Minutes"
        style={styles.input}
        value={minutes}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  error: {
    ...font.body.xsmall,
    color: "red",
  },
  saveButton: {
    marginTop: spacing.sm,
    borderRadius: 10,
    backgroundColor: colors.background.brand.primary,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  saveText: {
    ...font.label.large,
    color: colors.context.default.inverted,
  },
});
