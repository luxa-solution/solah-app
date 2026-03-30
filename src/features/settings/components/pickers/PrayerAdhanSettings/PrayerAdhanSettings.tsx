import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

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

import { FixedTimeFields } from "./parts/FixedTimeFields";
import { ModeSelector } from "./parts/ModeSelector";
import { RelativeTimeFields } from "./parts/RelativeTimeFields";
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

  const latestAllowedTimeLabel = prayerWindow
    ? formatTime(prayerWindow.latestAllowedTime, timezone, timeFormat)
    : null;

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
      <ModeSelector
        mode={mode}
        onSelect={(nextMode) => {
          setMode(nextMode);
          setError(null);
        }}
      />

      {mode === "relative_after_solah" ? (
        <RelativeTimeFields
          hours={offsetHours}
          latestAllowedTimeLabel={latestAllowedTimeLabel}
          minutes={offsetMinutes}
          onChangeHours={setOffsetHours}
          onChangeMinutes={setOffsetMinutes}
        />
      ) : null}

      {mode === "fixed_time" ? (
        <FixedTimeFields
          fixedHour={fixedHour}
          fixedMinute={fixedMinute}
          fixedPeriod={fixedPeriod}
          latestAllowedTimeLabel={latestAllowedTimeLabel}
          onChangeFixedHour={setFixedHour}
          onChangeFixedMinute={setFixedMinute}
          onChangeFixedPeriod={setFixedPeriod}
          timeFormat={timeFormat}
        />
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}
