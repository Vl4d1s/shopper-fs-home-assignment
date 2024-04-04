import React from "react";
import { Container } from "@mui/material";
import TimeSeriesChart from "./components/MetricsChart";
import AppTitle from "./components/AppTitle";
import MetricsTable from "./components/MetricsTable";

export default function App() {
  return (
    <Container>
      <AppTitle />
      <TimeSeriesChart />
      <MetricsTable />
    </Container>
  );
}
