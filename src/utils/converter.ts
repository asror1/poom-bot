export function minsToMs(minutes: number): number {
  return minutes * 60 * 1000;
}

export function remainingToString(time: number) {
  return `\` ${time} minute${time > 1 ? "s" : ""} \` remaining`;
}
