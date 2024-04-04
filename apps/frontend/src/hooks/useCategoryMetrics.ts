import { useQuery } from "react-query";
import { fetchMetricSummary } from "../api/category-metrics";

function useAggregatedDataQuery() {
  const { data, error, isFetching } = useQuery({
    queryKey: ["aggregatedData"],
    queryFn: fetchMetricSummary,
  });

  return { data, error, isFetching };
}

export default useAggregatedDataQuery;
