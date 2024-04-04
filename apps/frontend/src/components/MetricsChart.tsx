import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "@tanstack/react-query";
import { fetchTimeAggregatedMetric } from "../api/category-metrics";
import { generateChartOptions } from "../utils/chart-utils";
import type { TimeAggregatedMetric } from "../types";
import { Metrics } from "../types";
import { toggleSelectedMetric } from "../utils/metrics-utils";
import MetricsSelection from "./MetricsSelection";
import Loader from "./common/Loader";
import ErrorAlert from "./common/ErrorAlert";
import BoxFrame from "./common/BoxFrame";

export default function MetricsChart() {
  const [selectedMetrics, setSelectedMetrics] = useState<Metrics[]>([
    Metrics.ProductViews,
  ]);

  const { data, error, isFetching } = useQuery<TimeAggregatedMetric[]>({
    queryKey: ["time-aggregated-metric"],
    queryFn: fetchTimeAggregatedMetric,
  });

  if (isFetching && !data) {
    return <Loader />;
  }

  if (error) return <ErrorAlert message={error.message} />;

  const handleMetricChange = (metric: Metrics) => {
    setSelectedMetrics((prev) => toggleSelectedMetric(prev, metric));
  };

  return (
    <BoxFrame title="Aggregated Metrics by Category Chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={generateChartOptions(selectedMetrics, data)}
      />
      <MetricsSelection
        handleMetricChange={handleMetricChange}
        metrics={Object.values(Metrics)}
        selectedMetrics={selectedMetrics}
      />
    </BoxFrame>
  );
}
