import axios from "@/lib/axios";
import type { SuggestedPlace } from "../types/suggestedPlace.type";

export async function getSuggestedPlaces(): Promise<SuggestedPlace[]> {
  const res = await axios.get("/suggested-places");
  return res.data.data;
}
