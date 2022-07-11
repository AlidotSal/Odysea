export const clamp = (val: number, min: number = 0, max: number = 1): number =>
  Math.min(Math.max(val, min), max);
