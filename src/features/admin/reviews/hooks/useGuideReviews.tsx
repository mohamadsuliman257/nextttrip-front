import { useQuery } from "@tanstack/react-query";
import { getGuideReviews, getGuideReviewDetail } from "../api/getGuideReviews.api";
import type { ReviewFilters } from "../types/review.type";

export function useGuideReviews(filters?: ReviewFilters) {
  return useQuery({
    queryKey: ["admin-guide-reviews", filters],
    queryFn: () => getGuideReviews(filters),
  });
}

export function useGuideReviewDetail(id: number | null) {
  return useQuery({
    queryKey: ["admin-guide-review-detail", id],
    queryFn: () => getGuideReviewDetail(id!),
    enabled: !!id,
  });
}
