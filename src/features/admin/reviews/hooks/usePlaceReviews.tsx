import { useQuery } from "@tanstack/react-query";
import { getPlaceReviews, getPlaceReviewDetail } from "../api/getPlaceReviews.api";
import type { ReviewFilters } from "../types/review.type";

export function usePlaceReviews(filters?: ReviewFilters) {
  return useQuery({
    queryKey: ["admin-place-reviews", filters],
    queryFn: () => getPlaceReviews(filters),
  });
}

export function usePlaceReviewDetail(id: number | null) {
  return useQuery({
    queryKey: ["admin-place-review-detail", id],
    queryFn: () => getPlaceReviewDetail(id!),
    enabled: !!id,
  });
}
