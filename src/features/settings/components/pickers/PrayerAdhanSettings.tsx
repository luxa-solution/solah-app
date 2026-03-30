import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { PRAYER_ADHAN_MODE_OPTIONS } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";
import { PrayerAdhanConfig } from "@/features-settings/types";
import {
  buildFixedTimeValue,
  buildRelativeOffsetMinutes,
  getPrayerWindow,
  getRelativeTimeParts,
  splitFixedTimeValue,
  validateAdhanConfigWithinPrayerWindow,
} from "@/features-settings/utils";
import { SolahName } from "@/features-solah/types";
import { formatTime, validateAdhanConfig } from "@/features-solah/utils";
import { colors } from "@/shared/styles";

import { prayerAdhanSettingsStyles as styles } from "./PrayerAdhanSettings.styles";

type PrayerAdhanSettingsProps = {
  prayer: SolahName;
  onClose?: () => void;
  onDone?: () => void;
};

export function PrayerAdhanSettings({ prayer, onClose, onDone }: PrayerAdhanSettingsProps) {
  const currentConfig = useSettingsStore((state) => state.prayerSchedule[prayer]);
  const location = useSettingsStore((state) => state.location.location);
  const timezone = useSettingsStore((state) => state.timezone.timezone);
  const calculationMethod = useSettingsStore((state) => state.calculationMethod.method);
  const timeFormat = useSettingsStore((state) => state.timeFormat.value);
  const setPrayerSchedule = useSettingsStore((state) => state.setPrayerSchedule);

  const [mode, setMode] = useState(currentConfig.adhan.mode);
  const relativeParts = getRelativeTimeParts(currentConfig.adhan.offsetMinutes ?? 5);
  const fixedParts = splitFixedTimeValue(currentConfig.adhan.fixedTime, timeFormat);
  const [offsetHours, setOffsetHours] = useState(relativeParts.hours);
  const [offsetMinutes, setOffsetMinutes] = useState(relativeParts.minutes);
  const [fixedHour, setFixedHour] = useState(fixedParts.hour);
  const [fixedMinute, setFixedMinute] = useState(fixedParts.minute);
  const [fixedPeriod, setFixedPeriod] = useState<"AM" | "PM">(fixedParts.period);
  const [error, setError] = useState<string | null>(null);

  const prayerWindow = useMemo(
    () =>
      getPrayerWindow(
        prayer,
        location,
        calculationMethod,
        currentConfig.iqamahDelayMinutes,
        new Date()
      ),
    [calculationMethod, currentConfig.iqamahDelayMinutes, location, prayer]
  );

  const handleSave = () => {
    const relativeOffset = buildRelativeOffsetMinutes(offsetHours, offsetMinutes);
    const fixedTime = buildFixedTimeValue({
      timeFormat,
      hour: fixedHour,
      minute: fixedMinute,
      period: fixedPeriod,
    });

    const nextConfig: PrayerAdhanConfig =
      mode === "at_solah_time"
        ? { mode }
        : mode === "relative_after_solah"
          ? { mode, offsetMinutes: relativeOffset ?? undefined }
          : { mode, fixedTime };

    if (prayerWindow) {
      const validation = validateAdhanConfigWithinPrayerWindow(
        nextConfig,
        prayerWindow.solahTime,
        prayerWindow.latestAllowedTime,
        timezone
      );
      if (!validation.valid) {
        setError(validation.reason ?? "Invalid adhan setting");
        return;
      }
    } else if (mode === "fixed_time" || mode === "relative_after_solah") {
      const fallbackValidation = validateAdhanConfig(nextConfig, new Date(), timezone);
      if (!fallbackValidation.valid) {
        setError(fallbackValidation.reason ?? "Invalid adhan setting");
        return;
      }
    }

    setPrayerSchedule(prayer, {
      ...currentConfig,
      adhan: nextConfig,
    });
    setError(null);
    onDone?.();
    if (!onDone) {
      onClose?.();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.modeRow}>
        {PRAYER_ADHAN_MODE_OPTIONS.map((option) => {
          const selected = option.value === mode;
          return (
            <Pressable
              accessibilityLabel={option.label}
              key={option.value}
              onPress={() => {
                setMode(option.value);
                setError(null);
              }}
              style={[styles.modeOption, selected && styles.selectedOption]}
            >
              <MaterialCommunityIcons
                color={selected ? colors.context.default.inverted : colors.context.brand.primary}
                name={option.icon}
                size={24}
              />
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {mode === "relative_after_solah" ? (
        <View style={styles.editorBlock}>
          <Text style={styles.helperText}>Relative offset</Text>
          <View style={styles.timeRow}>
            <TextInput
              keyboardType="number-pad"
              onChangeText={setOffsetHours}
              placeholder="Hours"
              style={styles.timeInput}
              value={offsetHours}
            />
            <TextInput
              keyboardType="number-pad"
              onChangeText={setOffsetMinutes}
              placeholder="Minutes"
              style={styles.timeInput}
              value={offsetMinutes}
            />
          </View>
          {prayerWindow ? (
            <Text style={styles.helperCaption}>
              Must stay before {formatTime(prayerWindow.latestAllowedTime, timezone, timeFormat)}
            </Text>
          ) : null}
        </View>
      ) : null}

      {mode === "fixed_time" ? (
        <View style={styles.editorBlock}>
          <Text style={styles.helperText}>Fixed time</Text>
          <View style={styles.timeRow}>
            <TextInput
              keyboardType="number-pad"
              onChangeText={setFixedHour}
              placeholder={timeFormat === "24hr" ? "HH" : "Hour"}
              style={styles.timeInput}
              value={fixedHour}
            />
            <TextInput
              keyboardType="number-pad"
              onChangeText={setFixedMinute}
              placeholder={timeFormat === "24hr" ? "MM" : "Minute"}
              style={styles.timeInput}
              value={fixedMinute}
            />
            {timeFormat === "12hr" ? (
              <View style={styles.periodRow}>
                {(["AM", "PM"] as const).map((period) => (
                  <Pressable
                    key={period}
                    onPress={() => setFixedPeriod(period)}
                    style={[styles.periodButton, fixedPeriod === period && styles.selectedOption]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        fixedPeriod === period && styles.selectedOptionText,
                      ]}
                    >
                      {period}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
          {prayerWindow ? (
            <Text style={styles.helperCaption}>
              Must stay before {formatTime(prayerWindow.latestAllowedTime, timezone, timeFormat)}
            </Text>
          ) : null}
        </View>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}
