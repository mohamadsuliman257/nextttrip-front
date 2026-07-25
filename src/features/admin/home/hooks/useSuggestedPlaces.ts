import { useQuery } from "@tanstack/react-query";
import { getSuggestedPlaces } from "../api/getSuggestedPlaces.api";

export function useSuggestedPlaces() {
  return useQuery({
    queryKey: ['suggested-places'],
    queryFn: getSuggestedPlaces,
  });
}
