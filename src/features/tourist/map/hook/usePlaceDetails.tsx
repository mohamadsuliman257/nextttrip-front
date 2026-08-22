import { useQuery } from "@tanstack/react-query";
import { getPlaceDetails } from "../api/getPlaceDetails.api";
import type { PlaceDetails } from "../types/placeDetails.types";

export function usePlaceDetails(placeId: number | null) {
  return useQuery({
    queryKey: ["place-details", placeId],
    queryFn: () => getPlaceDetails(placeId!),
    enabled: placeId != null,
  });
}

export type { PlaceDetails };
