import { useQuery } from "@tanstack/react-query";
import { getTopPlaces } from "../api/getTopPlaces.api";

export function useTopPlaces() {
  return useQuery({
    queryKey: ["top-places"],
    queryFn: getTopPlaces,
  });
}
