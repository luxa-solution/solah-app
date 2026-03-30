import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  LAST_SYNCED_AT_STORAGE_KEY,
  SOLAH_NOTIFICATION_IDS_STORAGE_KEY,
  SYNC_INPUT_STORAGE_KEY,
} from "../../constants";
import { ScheduleInput } from "../../types";

export type SolahNotifId = string;

export async function loadScheduledIds(): Promise<SolahNotifId[]> {
  try {
    const raw = await AsyncStorage.getItem(SOLAH_NOTIFICATION_IDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => typeof entry === "string");
  } catch {
    return [];
  }
}

export async function saveScheduledIds(ids: SolahNotifId[]) {
  try {
    await AsyncStorage.setItem(SOLAH_NOTIFICATION_IDS_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export async function loadLastSyncedAt(): Promise<number | null> {
  try {
    const raw = await AsyncStorage.getItem(LAST_SYNCED_AT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveLastSyncedAt(timestamp: number) {
  try {
    await AsyncStorage.setItem(LAST_SYNCED_AT_STORAGE_KEY, String(timestamp));
  } catch {
    // ignore
  }
}

export async function loadSyncInput(): Promise<ScheduleInput | null> {
  try {
    const raw = await AsyncStorage.getItem(SYNC_INPUT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ScheduleInput;
  } catch {
    return null;
  }
}

export async function saveSyncInput(input: ScheduleInput) {
  try {
    await AsyncStorage.setItem(SYNC_INPUT_STORAGE_KEY, JSON.stringify(input));
  } catch {
    // ignore
  }
}
