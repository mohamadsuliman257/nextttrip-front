import api from "@/lib/axios";
import type { TripPlan, TripPlannerRequest } from "../types/tripPlanner.types";
import useAuthStore from "@/features/auth/store/authStore";

export async function createSmartTripPlan(
  payload: TripPlannerRequest
): Promise<TripPlan> {

  const user = useAuthStore.getState().user;

  const endpoint = user
    ? "/tourist/ai/smart-trip-planner"
    : "/public/ai/smart-trip-planner";

  const response = await api.post(endpoint, payload, {
    timeout: 70000,
  });

  return response.data.data;
}
