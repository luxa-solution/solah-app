import { Text, TextInput, View } from "react-native";

import { prayerAdhanSettingsStyles as styles } from "../PrayerAdhanSettings.styles";

type RelativeTimeFieldsProps = {
  hours: string;
  minutes: string;
  latestAllowedTimeLabel: string | null;
  onChangeHours: (value: string) => void;
  onChangeMinutes: (value: string) => void;
};

export function RelativeTimeFields({
  hours,
  latestAllowedTimeLabel,
  minutes,
  onChangeHours,
  onChangeMinutes,
}: RelativeTimeFieldsProps) {
  return (
    <View style={styles.editorBlock}>
      <Text style={styles.helperText}>Relative offset</Text>
      <View style={styles.timeRow}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={onChangeHours}
          placeholder="Hours"
          style={styles.timeInput}
          value={hours}
        />
        <TextInput
          keyboardType="number-pad"
          onChangeText={onChangeMinutes}
          placeholder="Minutes"
          style={styles.timeInput}
          value={minutes}
        />
      </View>
      {latestAllowedTimeLabel ? (
        <Text style={styles.helperCaption}>Must stay before {latestAllowedTimeLabel}</Text>
      ) : null}
    </View>
  );
}
