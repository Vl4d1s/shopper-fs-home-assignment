import axios from "axios";
import type { ApiDataType, MetricSummary } from "../types";
import { convertdData } from "../utils/string-utils";

const API_URL = "http://localhost:5001/api/v1/metrics";

export const fetchMetricsAggragetedByTime = async (): Promise<
  MetricSummary[]
> => {
  const { data } = await axios.get<ApiDataType[]>(`${API_URL}/time`);
  const convertedData = convertdData(data);
  return convertedData;
};

export const fetchMetricsAggragetedCategory = async (): Promise<
  MetricSummary[]
> => {
  const { data } = await axios.get<ApiDataType[]>(`${API_URL}/category`);
  const convertedData = convertdData(data);
  return convertedData;
};
