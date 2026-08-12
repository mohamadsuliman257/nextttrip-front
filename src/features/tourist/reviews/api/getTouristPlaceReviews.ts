import api from "@/lib/axios";
import type { TouristPlaceReview } from "../types/placeReview";

export async function getTouristPlaceReviews(): Promise<TouristPlaceReview[]> {
  const res = await api.get("/tourist/places/reviews");
  return res.data.data;
}

