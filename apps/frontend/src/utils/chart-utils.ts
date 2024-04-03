export function generateChartOptions(
  selectedMetrics: string[],
  data: any[] = []
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
      name: metric.toUpperCase(),
      data: data.map((point) => {
        return [
          new Date(`${point.date}-01`).getTime(),
          point[`${metric}_total`],
        ];
      }),
    })),
  };
}
