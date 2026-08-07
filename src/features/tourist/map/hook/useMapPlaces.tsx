import { useQuery } from "@tanstack/react-query";
import { getMapPlaces, type MapPlacesFilters } from "../api/getMapPlaces.api";

export function useMapPlaces(filters: MapPlacesFilters) {
  return useQuery({
    queryKey: ["map-places", filters],
    queryFn: () => getMapPlaces(filters),
    staleTime: 1000 * 60 * 60, // cache for 1 hour
    retry: 2, // retry 2 times
  });
}

