import type { MetricSummary, Metrics } from "../types";

export function generateChartOptions(
  selectedMetrics: Metrics[],
  data: MetricSummary[] = []
): Highcharts.Options {
  return {
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Total",
      },
    },
    series: selectedMetrics.map((metric) => ({
      type: "line",
      name: metric,
      data: data.map((point) => {
        return [
          new Date(`${point.date}-01`).getTime(),
          point[metric as keyof MetricSummary],
        ];
      }),
    })),
  };
}
