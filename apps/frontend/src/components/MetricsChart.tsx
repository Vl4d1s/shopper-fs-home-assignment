import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { fetchMetricsAggragetedByTime } from "../api/category-metrics";
import { generateChartOptions } from "../utils/chart-utils";
import type { MetricSummary } from "../types";
import { Metrics } from "../types";
import { toggleSelectedMetric } from "../utils/metrics-utils";
import MetricsSelection from "./MetricsSelection";
import Loader from "./common/Loader";
import ErrorAlert from "./common/ErrorAlert";

export default function MetricsChart() {
  const [selectedMetrics, setSelectedMetrics] = useState<Metrics[]>([
    Metrics.ProductViews,
  ]);

  const { data, error, isFetching } = useQuery<MetricSummary[]>({
    queryKey: ["metrics-aggrageted-by-time"],
    queryFn: fetchMetricsAggragetedByTime,
  });

  if (isFetching && !data) {
    return <Loader />;
  }

  if (error) return <ErrorAlert message={error.message} />;

  const handleMetricChange = (metric: Metrics) => {
    setSelectedMetrics((prev) => toggleSelectedMetric(prev, metric));
  };

  return (
    <Box gap={2} my={4} padding={2} sx={{ border: "1px solid grey" }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={generateChartOptions(selectedMetrics, data)}
      />
      <MetricsSelection
        handleMetricChange={handleMetricChange}
        metrics={Object.values(Metrics)}
        selectedMetrics={selectedMetrics}
      />
    </Box>
  );
}
