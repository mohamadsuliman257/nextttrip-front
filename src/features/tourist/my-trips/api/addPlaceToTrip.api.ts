import api from "@/lib/axios";
import type { AddPlacePayload } from "../types/myTrip.types";

export async function addPlaceToTrip(tripId: number, payload: AddPlacePayload) {
  const res = await api.post(`/tourist/trips/${tripId}/places`, payload);
  return res.data.data;
}
