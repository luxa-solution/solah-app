import { CloudMoon, CloudSun, LucideIcon, MoonStar, Sun, Sunset } from "lucide-react-native";

import { SolahName } from "@/features-solah/types";

export const SolahIcons: Record<SolahName, LucideIcon> = {
  Subhi: CloudMoon,
  Dhuhr: Sun,
  Asr: CloudSun,
  Maghrib: Sunset,
  Isha: MoonStar,
};
