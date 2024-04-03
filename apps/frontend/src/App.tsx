import React from "react";
import { Container } from "@mui/material";
import TimeSeriesChart from "./components/TimeSeriesChart";
import AppTitle from "./components/AppTitle";

export default function App() {
  return (
    <Container>
      <AppTitle />
      <TimeSeriesChart />
    </Container>
  );
}
