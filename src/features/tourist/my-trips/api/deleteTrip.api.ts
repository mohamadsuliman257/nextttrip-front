import api from "@/lib/axios";

export async function deleteTrip(tripId: number): Promise<void> {
  await api.delete(`/tourist/trips/${tripId}`);
}
