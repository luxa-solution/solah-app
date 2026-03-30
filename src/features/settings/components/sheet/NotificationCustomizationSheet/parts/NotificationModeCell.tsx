import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

import {
  NOTIFICATION_DELIVERY_ICON,
  NOTIFICATION_DELIVERY_LABEL,
  type NotificationDeliveryMode,
} from "@/features-settings/constants";
import { colors } from "@/shared/styles";

import { notificationCustomizationSheetStyles as styles } from "../NotificationCustomizationSheet.styles";

type NotificationModeCellProps = {
  mode: NotificationDeliveryMode;
  onPress: () => void;
  testID: string;
};

export function NotificationModeCell({ mode, onPress, testID }: NotificationModeCellProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={NOTIFICATION_DELIVERY_LABEL[mode]}
      onPress={onPress}
      style={({ pressed }) => [styles.modeCell, pressed && styles.modeCellPressed]}
      testID={testID}
    >
      <MaterialCommunityIcons
        color={colors.context.brand.primary}
        name={NOTIFICATION_DELIVERY_ICON[mode]}
        size={22}
      />
    </Pressable>
  );
}
