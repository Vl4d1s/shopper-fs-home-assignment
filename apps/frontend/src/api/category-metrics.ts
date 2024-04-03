// import axios from "axios";
import axios from "axios";
import type { AggregatedCategoryMetrics } from "../types";

// const API_URL = "http://localhost:5001/api/v1";

export const fetchAggregatedCategoryMetrics = async (): Promise<
  AggregatedCategoryMetrics[]
> => {
  const { data } = await axios.get<AggregatedCategoryMetrics[]>("data.json");
  return data;
};
