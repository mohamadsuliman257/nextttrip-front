import api from "@/lib/axios";

export interface RatePlacePayload {
  rating: number;
  comment?: string;
}

export async function ratePlace(placeId: number, payload: RatePlacePayload) {
  const { data } = await api.post(`/tourist/places/${placeId}/review`, payload);
  return data;
}
