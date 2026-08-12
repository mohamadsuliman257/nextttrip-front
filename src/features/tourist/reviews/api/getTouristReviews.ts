import api from "@/lib/axios";
import type { TouristReview } from "../types";


export async function getTouristReviews(): Promise<TouristReview[]> {
  const res = await api.get("/tourist/guide-bookings/reviews");
  return res.data.data;
}
