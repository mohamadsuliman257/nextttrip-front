import axios from "@/lib/axios";

export interface City {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getCities(): Promise<City[]> {
  const res = await axios.get("/public/cities");
  return res.data.data;
}
