import axios from "axios";
import type { MetricSummary } from "../types";

// const API_URL = "http://localhost:5001/api/v1";

function toCamelCase(s: string): string {
  return s.replace(/(?<temp1>_\w)/g, (k) => k[1].toUpperCase());
}

// Function to convert object keys from snake_case to camelCase
function convertToCamelCase(obj: any): any {
  return Object.keys(obj).reduce((accumulator: any, key: string) => {
    const camelCaseKey = toCamelCase(key);
    accumulator[camelCaseKey] = obj[key];
    return accumulator;
  }, {});
}

export const fetchMetricSummary = async (): Promise<MetricSummary[]> => {
  const { data } = await axios.get<MetricSummary[]>("data.json");
  const convertedData = data.map(convertToCamelCase);
  return convertedData;
};
