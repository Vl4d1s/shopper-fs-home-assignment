import axios from "axios";
import type { AggregatedCategoryMetrics } from "../types";

// const API_URL = "http://localhost:5001/api/v1";

export const fetchAggregatedCategoryMetrics = async (): Promise<
  AggregatedCategoryMetrics[]
> => {
  try {
    const response = await axios.get<AggregatedCategoryMetrics[]>("data.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregated category metrics:", error);
    throw error;
  }
};
