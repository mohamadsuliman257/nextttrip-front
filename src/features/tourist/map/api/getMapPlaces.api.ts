import axios from "@/lib/axios";
import type { Destination } from "@/features/admin/destinations/types/destination.type";

export interface MapPlacesFilters {
  q?: string;
  category_id?: number;
  city_id?: number;
  min_cost?: number;
  max_cost?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export async function getMapPlaces(filters: MapPlacesFilters = {}): Promise<Destination[]> {
  const { data } = await axios.get("/public/places", { params: filters });
  return data.data;
}
