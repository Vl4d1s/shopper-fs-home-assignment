import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import type { Metrics } from "../types";

interface MetricsSelectionProps {
  title?: string;
  handleMetricChange: (metric: Metrics) => void;
  metrics: Metrics[];
  selectedMetrics: string[];
}

export default function MetricsSelection({
  handleMetricChange,
  metrics,
  selectedMetrics,
  title,
}: MetricsSelectionProps) {
  return (
    <div>
      <Typography variant="h6">
        {title ? title : "Select Metrics to Compare (up to 2):"}
      </Typography>
      <FormGroup row>
        {metrics.map((metric) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMetrics.includes(metric)}
                onChange={() => {
                  handleMetricChange(metric);
                }}
              />
            }
            key={metric}
            label={metric}
          />
        ))}
      </FormGroup>
    </div>
  );
}
