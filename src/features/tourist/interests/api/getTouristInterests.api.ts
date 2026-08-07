import api from "@/lib/axios";

export async function getTouristInterests(): Promise<number[]> {
  const response = await api.get("/tourist/interests");
  return response.data.data;
}
