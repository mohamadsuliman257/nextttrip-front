import axios from "@/lib/axios";

export interface TopPlace {
  id: number;
  name: string;
  city_id: number;
  average_rating: number;
  reviews_count: number;
  image_url?: string;
  city?: {
    id: number;
    name: string;
  };
  images?: {
    id: number;
    place_id: number;
    image_url: string;
    order: number;
  }[];
}

export async function getTopPlaces(): Promise<TopPlace[]> {
  const res = await axios.get("/public/top-places");
  return res.data.data;
}
