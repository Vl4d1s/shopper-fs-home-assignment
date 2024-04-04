import axios from "axios";
import type {
  ApiDataType,
  CategoryAggregatedMetric,
  TimeAggregatedMetric,
} from "../types";
import { convertdData } from "../utils/string-utils";

const API_URL = "http://localhost:5001/api/v1/metrics";

export const fetchTimeAggregatedMetric = async (): Promise<
  TimeAggregatedMetric[]
> => {
  const { data } = await axios.get<ApiDataType[]>(`${API_URL}/time`);
  const convertedData = convertdData(data);

  return convertedData as TimeAggregatedMetric[];
};

export const fetchCategoryAggregatedMetric = async (): Promise<
  CategoryAggregatedMetric[]
> => {
  const { data } = await axios.get<ApiDataType[]>(`${API_URL}/category`);
  const convertedData = convertdData(data);

  return convertedData as CategoryAggregatedMetric[];
};
