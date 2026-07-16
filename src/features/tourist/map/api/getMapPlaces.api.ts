import axios from "@/lib/axios";
import type { Destination } from "@/features/admin/destinations/types/destination.type";

export async function getMapPlaces(): Promise<Destination[]> {
  const { data } = await axios.get("/public/places");
  return data.data ;
}
