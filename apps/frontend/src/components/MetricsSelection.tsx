import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface MetricsSelectionProps {
  title?: string;
  handleMetricChange: (metric: string) => void;
  metrics: string[];
  selectedMetrics: string[];
}

export default function MetricsSelection({
  handleMetricChange,
  metrics,
  selectedMetrics,
  title = "Select Metrics to Compare:",
}: MetricsSelectionProps) {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
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
            label={metric.replace("_", "").toUpperCase()}
          />
        ))}
      </FormGroup>
    </div>
  );
}
