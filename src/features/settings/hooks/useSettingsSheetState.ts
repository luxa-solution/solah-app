import { useCallback, useState } from "react";

import { SettingsType } from "@/features-settings/types";

export function useSettingsSheetState() {
  const [activeSheet, setActiveSheet] = useState<SettingsType | null>(null);

  const openSheet = useCallback((type: SettingsType) => {
    setActiveSheet(type);
  }, []);

  const closeSheet = useCallback(() => {
    setActiveSheet(null);
  }, []);

  return {
    activeSheet,
    isOpen: activeSheet !== null,
    openSheet,
    closeSheet,
    navigateToSheet: openSheet,
  };
}
