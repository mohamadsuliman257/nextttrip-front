import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTrip } from "../api/updateTrip.api";
import type { UpdateTripPayload } from "../types/myTrip.types";

export function useUpdateTrip(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, ...payload }: UpdateTripPayload & { tripId: number }) =>
      updateTrip(tripId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تم تحديث الرحلة بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("تعذر تحديث الرحلة، حاول مجدداً");
    },
  });
}
