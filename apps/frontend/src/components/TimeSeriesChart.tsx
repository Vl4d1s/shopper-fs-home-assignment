import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useCategoryMetrics from "../hooks/useCategoryMetrics";
import { generateChartOptions } from "../utils/chart-options";
import { Metrics } from "../types";
import MetricsSelection from "./MetricsSelection";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

export default function TimeSeriesChart() {
  const { data: aggregatedData, error, isLoading } = useCategoryMetrics();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    Metrics.UnitsSold,
  ]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

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
        options={generateChartOptions(selectedMetrics, aggregatedData)}
      />
      <MetricsSelection
        handleMetricChange={handleMetricChange}
        metrics={Object.values(Metrics)}
        selectedMetrics={selectedMetrics}
      />
    </div>
  );
}
