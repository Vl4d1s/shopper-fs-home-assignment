import React from "react";
import { Container } from "@mui/material";
import TimeSeriesChart from "./MetricsChart";
import AppTitle from "./AppTitle";
import MetricsTable from "./MetricsTable/MetricsTable";

export default function App() {
  return (
    <Container>
      <AppTitle />
      <TimeSeriesChart />
      <MetricsTable />
    </Container>
  );
}
