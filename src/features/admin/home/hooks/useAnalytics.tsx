import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/getAnalytics.api";

export function useAnalytics() {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => getAnalytics(),
  });
}
