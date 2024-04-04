import { camelCase, mapKeys } from "lodash";
import type { AggregatedMetric, ApiDataType } from "../types";

function snakeToCamel(obj: ApiDataType): AggregatedMetric {
  const convertedObject = mapKeys(obj, (_, key) => camelCase(key));
  return convertedObject as unknown as AggregatedMetric;
}

export function convertdData(data: ApiDataType[]): AggregatedMetric[] {
  return data.map(snakeToCamel);
}
