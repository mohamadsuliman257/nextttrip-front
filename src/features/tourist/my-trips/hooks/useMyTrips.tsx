import { useQuery } from "@tanstack/react-query";
import { getMyTrips } from "../api/getMyTrips.api";

export function useMyTrips(enabled = true) {
  return useQuery({
    queryKey: ["my-trips"],
    queryFn: getMyTrips,
    enabled,
  });
}
