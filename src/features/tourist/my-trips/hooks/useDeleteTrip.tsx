import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTrip } from "../api/deleteTrip.api";

export function useDeleteTrip(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripId: number) => deleteTrip(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تم حذف الرحلة بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("تعذر حذف الرحلة، حاول مجدداً");
    },
  });
}
