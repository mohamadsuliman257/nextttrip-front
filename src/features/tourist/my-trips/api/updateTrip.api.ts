import api from "@/lib/axios";
import type { MyTrip, UpdateTripPayload } from "../types/myTrip.types";

export async function updateTrip(tripId: number, payload: UpdateTripPayload): Promise<MyTrip> {
  const res = await api.put(`/tourist/trips/${tripId}`, payload);
  return res.data.data;
}
