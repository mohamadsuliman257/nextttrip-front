import { useQuery } from "@tanstack/react-query";
import { getTouristPlaceReviews } from "../api/getTouristPlaceReviews";

export function useTouristPlaceReviews() {
  return useQuery({
    queryKey: ["tourist-place-reviews"],
    queryFn: getTouristPlaceReviews,
    staleTime: 1000 * 60 * 10,
  });
}

