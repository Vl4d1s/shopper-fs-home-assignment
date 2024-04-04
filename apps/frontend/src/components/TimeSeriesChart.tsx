import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "@tanstack/react-query";
import { fetchMetricSummary } from "../api/category-metrics";
import { generateChartOptions } from "../utils/chart-utils";
import type { MetricSummary } from "../types";
import { Metrics } from "../types";
import { toggleSelectedMetric } from "../utils/metrics-utils";
import MetricsSelection from "./MetricsSelection";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

export default function TimeSeriesChart() {
  const [selectedMetrics, setSelectedMetrics] = useState<Metrics[]>([
    Metrics.ProductViews,
  ]);

  const { data, error, isFetching } = useQuery<MetricSummary[]>({
    queryKey: ["aggregated-category-metrics"],
    queryFn: fetchMetricSummary,
  });

  if (isFetching && !data) {
    return <Loader />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  const handleMetricChange = (metric: Metrics) => {
    setSelectedMetrics((prev) => toggleSelectedMetric(prev, metric));
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={generateChartOptions(selectedMetrics, data)}
      />
      <MetricsSelection
        handleMetricChange={handleMetricChange}
        metrics={Object.values(Metrics)}
        selectedMetrics={selectedMetrics}
      />
    </div>
  );
}
