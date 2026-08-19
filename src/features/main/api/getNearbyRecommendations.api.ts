import type { NearbyRecommendation, NearbyRecommendationsRequest } from "@/features/notifications/type/nearByRecommendation";
import axios from "@/lib/axios";

export async function getNearbyRecommendations(
  params: NearbyRecommendationsRequest
): Promise<NearbyRecommendation[]> {
  const res = await axios.post("/public/ai/nearby-recommendations", params);
  return res.data.data;
}
