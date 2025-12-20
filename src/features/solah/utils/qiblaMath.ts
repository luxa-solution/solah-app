/**
 * Convert raw magnetometer values into a compass heading.
 * 0° = North, 90° = East
 */
export function magnetometerToHeading(x: number, y: number): number {
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  let heading = angle - 90;
  if (heading < 0) heading += 360;
  return heading;
}

/**
 * Normalize angle to the range [-180, 180)
 * Ensures shortest rotation direction
 */
export function normalizeAngle(angle: number): number {
  const normalized = ((((angle + 180) % 360) + 360) % 360) - 180;
  return normalized;
}

/**
 * Calculate relative Qibla angle (needle rotation)
 */
export function calculateQiblaOffset(qiblaBearing: number, heading: number): number {
  return normalizeAngle(qiblaBearing - heading);
}

/**
 * Smooth a circular angle using shortest-path interpolation.
 * prev & next are in degrees [0, 360)
 */
export function smoothAngle(prev: number, next: number, alpha: number = 0.15): number {
  // shortest signed delta in [-180, 180]
  const delta = ((((next - prev + 180) % 360) + 360) % 360) - 180;

  return (prev + alpha * delta + 360) % 360;
}
