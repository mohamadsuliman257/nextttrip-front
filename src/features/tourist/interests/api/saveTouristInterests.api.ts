import api from "@/lib/axios";

export async function saveTouristInterests(interests: number[]): Promise<number[]> {
  const response = await api.post("/tourist/interests", { interests });
  return response.data.data;
}
