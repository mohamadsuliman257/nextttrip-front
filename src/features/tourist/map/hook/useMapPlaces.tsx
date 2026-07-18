import { useQuery } from "@tanstack/react-query";
import { getMapPlaces } from "../api/getMapPlaces.api";

export function useMapPlaces() {
  return useQuery({
    queryKey: ["map-places"],
    queryFn: getMapPlaces,
    staleTime: 1000 * 60 * 60, // cache for 1 hour
    retry: 2, // retry 2 times
  });
}

