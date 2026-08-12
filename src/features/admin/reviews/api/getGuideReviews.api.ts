import api from "@/lib/axios";
import type { GuideReview, GuideReviewsResponse, ReviewFilters } from "../types/review.type";

export async function getGuideReviews(filters?: ReviewFilters): Promise<GuideReviewsResponse> {
  const res = await api.get("/admin/reviews/guides", { params: filters });
  return res.data.data;
}

export async function getGuideReviewDetail(id: number): Promise<GuideReview> {
  const res = await api.get(`/admin/reviews/guides/${id}`);
  return res.data.data;
}
