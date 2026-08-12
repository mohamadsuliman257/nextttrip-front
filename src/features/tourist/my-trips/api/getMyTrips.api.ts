import api from "@/lib/axios";
import type { MyTrip } from "../types/myTrip.types";

export async function getMyTrips(): Promise<MyTrip[]> {
  const res = await api.get("/tourist/trips");
  return res.data.data;
}
