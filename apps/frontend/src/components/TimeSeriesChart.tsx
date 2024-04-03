import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "@tanstack/react-query";
import { fetchAggregatedCategoryMetrics } from "../api/category-metrics";
import { generateChartOptions } from "../utils/chart-utils";
import type { AggregatedCategoryMetrics } from "../types";
import { Metrics } from "../types";
import MetricsSelection from "./MetricsSelection";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

export default function TimeSeriesChart() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    Metrics.UnitsSold,
  ]);

  const { data, error, isFetching } = useQuery<AggregatedCategoryMetrics[]>({
    queryKey: ["aggregated-category-metrics"],
    queryFn: fetchAggregatedCategoryMetrics,
  });

  if (isFetching && !data) {
    return <Loader />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  const handleMetricChange = (metric: string) => {
    setSelectedMetrics((prev) => {
      const isCurrentlySelected = prev.includes(metric);
      if (isCurrentlySelected && prev.length === 1) {
        return prev;
      } else if (isCurrentlySelected) {
        return prev.filter((m) => m !== metric);
      } else if (prev.length < 2) {
        return [...prev, metric];
      }
      return [prev[1], metric];
    });
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
