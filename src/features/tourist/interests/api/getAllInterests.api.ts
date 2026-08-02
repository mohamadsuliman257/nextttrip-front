import api from "@/lib/axios";
import type { TouristInterest } from "../types/interest.type";

export async function getAllInterests(): Promise<TouristInterest[]> {
  const response = await api.get("/public/interests");
  return response.data.data;
}
