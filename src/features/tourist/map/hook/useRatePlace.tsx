import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuthStore from "@/features/auth/store/authStore";
import { ratePlace } from "../api/ratePlace.api";

interface RatePlaceInput {
  placeId: number;
  rating: number;
  comment?: string;
}

export function useRatePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, rating, comment }: RatePlaceInput) =>
      ratePlace(placeId, { rating, comment }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["map-places"] });
      queryClient.invalidateQueries({ queryKey: ["tourist-place-reviews"] });
      toast.success("تم حفظ تقييمك بنجاح");
    },
  });
}

export function useRatePlaceGuard() {
  return () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      toast.error("يرجى تسجيل الدخول لتقييم المكان");
      return false;
    }
    if (user.role !== "tourist") {
      toast.error("تقييم الأماكن متاح للسائح فقط");
      return false;
    }
    return true;
  };
}
