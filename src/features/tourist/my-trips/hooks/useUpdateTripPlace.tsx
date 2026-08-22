import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTripPlace } from "../api/updateTripPlace.api";
import type { UpdateTripPlacePayload } from "../types/myTrip.types";

type UpdateTripPlaceInput = UpdateTripPlacePayload & {
  tripId: number;
  tripPlaceId: number;
};

export function useUpdateTripPlace(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, tripPlaceId, ...payload }: UpdateTripPlaceInput) =>
      updateTripPlace(tripId, tripPlaceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تم تعديل بند الرحلة بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("تعذر تعديل البند، حاول مجدداً");
    },
  });
}
