import api from "@/lib/axios";
import type { TripPlan, TripPlannerRequest } from "../types/tripPlanner.types";

export async function createSmartTripPlan(payload: TripPlannerRequest): Promise<TripPlan> {
  const response = await api.post("/tourist/ai/smart-trip-planner", payload, {
    timeout: 70000,
  });

  return response.data.data;
}
