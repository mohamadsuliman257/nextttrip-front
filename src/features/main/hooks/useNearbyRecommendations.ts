import { useMutation } from "@tanstack/react-query";
import { getNearbyRecommendations } from "../api/getNearbyRecommendations.api";

export function useNearbyRecommendations() {
  return useMutation({
    mutationFn: getNearbyRecommendations,
  });
}
