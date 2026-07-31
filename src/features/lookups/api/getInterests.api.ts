import axios from "@/lib/axios";
import type { Interest } from "../types/Interest.type";

export async function getInterests(): Promise<Interest[]> {
  const res = await axios.get("/public/interests");
  return res.data.data;
}
