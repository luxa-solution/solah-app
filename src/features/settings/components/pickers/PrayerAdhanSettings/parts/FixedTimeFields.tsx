import { Pressable, Text, TextInput, View } from "react-native";

import { prayerAdhanSettingsStyles as styles } from "../PrayerAdhanSettings.styles";

type FixedTimeFieldsProps = {
  fixedHour: string;
  fixedMinute: string;
  fixedPeriod: "AM" | "PM";
  latestAllowedTimeLabel: string | null;
  onChangeFixedHour: (value: string) => void;
  onChangeFixedMinute: (value: string) => void;
  onChangeFixedPeriod: (value: "AM" | "PM") => void;
  timeFormat: string;
};

export function FixedTimeFields({
  fixedHour,
  fixedMinute,
  fixedPeriod,
  latestAllowedTimeLabel,
  onChangeFixedHour,
  onChangeFixedMinute,
  onChangeFixedPeriod,
  timeFormat,
}: FixedTimeFieldsProps) {
  return (
    <View style={styles.editorBlock}>
      <Text style={styles.helperText}>Fixed time</Text>
      <View style={styles.timeRow}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={onChangeFixedHour}
          placeholder={timeFormat === "24hr" ? "HH" : "Hour"}
          style={styles.timeInput}
          value={fixedHour}
        />
        <TextInput
          keyboardType="number-pad"
          onChangeText={onChangeFixedMinute}
          placeholder={timeFormat === "24hr" ? "MM" : "Minute"}
          style={styles.timeInput}
          value={fixedMinute}
        />
        {timeFormat === "12hr" ? (
          <View style={styles.periodRow}>
            {(["AM", "PM"] as const).map((period) => (
              <Pressable
                key={period}
                onPress={() => onChangeFixedPeriod(period)}
                style={[styles.periodButton, fixedPeriod === period && styles.selectedOption]}
              >
                <Text
                  style={[styles.optionText, fixedPeriod === period && styles.selectedOptionText]}
                >
                  {period}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
      {latestAllowedTimeLabel ? (
        <Text style={styles.helperCaption}>Must stay before {latestAllowedTimeLabel}</Text>
      ) : null}
    </View>
  );
}
