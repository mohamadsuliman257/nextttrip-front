import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTrip } from "../api/createTrip.api";
import type { CreateTripPayload, MyTrip } from "../types/myTrip.types";

export function useCreateTrip(onSuccess?: (trip: MyTrip) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTripPayload) => createTrip(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تم إنشاء الرحلة بنجاح");
      onSuccess?.(data);
    },
  });
}
