import { useQuery } from "react-query";
import { fetchAggregatedCategoryMetrics } from "../api/category-metrics";

function useAggregatedDataQuery() {
  const { data, error, isFetching } = useQuery({
    queryKey: ["aggregatedData"],
    queryFn: fetchAggregatedCategoryMetrics,
  });

  return { data, error, isFetching };
}

export default useAggregatedDataQuery;
