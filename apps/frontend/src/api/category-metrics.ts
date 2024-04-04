import axios from "axios";
import type { ApiDataType, MetricSummary } from "../types";
import { convertdData } from "../utils/string-utils";

export const fetchMetricSummary = async (): Promise<MetricSummary[]> => {
  const { data } = await axios.get<ApiDataType[]>("data.json");
  const convertedData = convertdData(data);
  return convertedData;
};
