import { camelCase, mapKeys } from "lodash";
import type { ApiDataType, MetricSummary } from "../types";

function snakeToCamel(obj: ApiDataType): MetricSummary {
  const convertedObject = mapKeys(obj, (_, key) => camelCase(key));
  return convertedObject as unknown as MetricSummary;
}

export function convertdData(data: ApiDataType[]): MetricSummary[] {
  return data.map(snakeToCamel);
}
