import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingApi } from "../api/createBooking.api";
import type { BookingForm } from "../schemas/guideBookSchema";

export const useGuideBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guideId, data }: { guideId: number, data: BookingForm }) =>
      createBookingApi(guideId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide-bookings"] });
    },
  });
}
