import api from "@/lib/axios";
import type { PlaceReviewsResponse, ReviewFilters } from "../types/review.type";

export async function getPlaceReviews(filters?: ReviewFilters): Promise<PlaceReviewsResponse> {
  const res = await api.get("/admin/reviews/places", { params: filters });
  return res.data.data;
}

export async function getPlaceReviewDetail(id: number) {
  const res = await api.get(`/admin/reviews/places/${id}`);
  return res.data.data;
}
