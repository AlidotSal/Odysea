export const clamp = (val: number, min: number = 0, max: number = 1): number =>
  Math.min(Math.max(val, min), max);

export function throttleRAF(callback: () => void) {
  let queuedCallback: (() => void) | null = null;
  if (!queuedCallback) {
    requestAnimationFrame(() => {
      const cb = queuedCallback;
      queuedCallback = null;
      if (cb) cb();
    });
  }
  queuedCallback = callback;
}
