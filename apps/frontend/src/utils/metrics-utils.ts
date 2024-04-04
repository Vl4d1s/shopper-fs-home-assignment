import type { Metrics } from "../types";

export function toggleSelectedMetric(
  prev: Metrics[],
  metric: Metrics
): Metrics[] {
  const isCurrentlySelected = prev.includes(metric);
  if (isCurrentlySelected && prev.length === 1) {
    return prev;
  } else if (isCurrentlySelected) {
    return prev.filter((m) => m !== metric);
  } else if (prev.length < 2) {
    return [...prev, metric];
  }
  return [prev[1], metric];
}
