const MIN_IQAMAH_MINUTES = 5;
const MAX_IQAMAH_MINUTES = 60;

export function clampIqamahMinutes(value: number) {
  if (!Number.isFinite(value)) {
    return MIN_IQAMAH_MINUTES;
  }

  return Math.min(MAX_IQAMAH_MINUTES, Math.max(MIN_IQAMAH_MINUTES, Math.round(value)));
}

export function sanitizeIqamahMinutesInput(value: string) {
  return value.replace(/\D+/g, "").slice(0, 2);
}

export function xyToDialMinutes(x: number, y: number, centerX: number, centerY: number) {
  const angle = Math.atan2(y - centerY, x - centerX);
  const normalized = (angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
  const ratio = normalized / (Math.PI * 2);

  return clampIqamahMinutes(MIN_IQAMAH_MINUTES + ratio * (MAX_IQAMAH_MINUTES - MIN_IQAMAH_MINUTES));
}

export function dialMinutesToAngle(minutes: number) {
  const clamped = clampIqamahMinutes(minutes);
  const ratio = (clamped - MIN_IQAMAH_MINUTES) / (MAX_IQAMAH_MINUTES - MIN_IQAMAH_MINUTES);
  return ratio * Math.PI * 2 - Math.PI / 2;
}
