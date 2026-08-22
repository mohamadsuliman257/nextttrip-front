import api from "@/lib/axios";

export async function deleteTripPlace(tripId: number, tripPlaceId: number): Promise<void> {
  await api.delete(`/tourist/trips/${tripId}/places/${tripPlaceId}`);
}
