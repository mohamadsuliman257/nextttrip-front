import axios from "@/lib/axios";
import type { PlaceDetails } from "../types/placeDetails.types";

export async function getPlaceDetails(placeId: number): Promise<PlaceDetails> {
  const { data } = await axios.get(`/public/places/${placeId}`);
  return data.data;
}
