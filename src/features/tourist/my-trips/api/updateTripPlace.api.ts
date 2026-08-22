import api from "@/lib/axios";
import type { TripPlaceItem, UpdateTripPlacePayload } from "../types/myTrip.types";

export async function updateTripPlace(
  tripId: number,
  tripPlaceId: number,
  payload: UpdateTripPlacePayload
): Promise<TripPlaceItem> {
  const res = await api.put(`/tourist/trips/${tripId}/places/${tripPlaceId}`, payload);
  return res.data.data;
}
