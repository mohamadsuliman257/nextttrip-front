import api from "@/lib/axios";
import type { CreateTripPayload, MyTrip } from "../types/myTrip.types";

export async function createTrip(payload: CreateTripPayload): Promise<MyTrip> {
  const res = await api.post("/tourist/trips", payload);
  return res.data.data;
}
