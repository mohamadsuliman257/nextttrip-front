import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addPlaceToTrip } from "../api/addPlaceToTrip.api";
import type { AddPlacePayload } from "../types/myTrip.types";

type AddPlaceInput = AddPlacePayload & { tripId: number };

export function useAddPlaceToTrip(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, ...payload }: AddPlaceInput) =>
      addPlaceToTrip(tripId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تمت إضافة المكان إلى رحلتك");
      onSuccess?.();
    },
  });
}
