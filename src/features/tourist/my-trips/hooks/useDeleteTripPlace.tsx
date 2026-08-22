import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTripPlace } from "../api/deleteTripPlace.api";

export function useDeleteTripPlace(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, tripPlaceId }: { tripId: number; tripPlaceId: number }) =>
      deleteTripPlace(tripId, tripPlaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("تم حذف البند من الرحلة");
      onSuccess?.();
    },
    onError: () => {
      toast.error("تعذر حذف البند، حاول مجدداً");
    },
  });
}
