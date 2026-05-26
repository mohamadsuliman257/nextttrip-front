import { useMutation } from "@tanstack/react-query";
import { createBookingApi } from "../api/createBooking.api";
import type { BookingForm } from "../schemas/guideBookSchema";

export const useGuideBook = () =>
  useMutation({
    mutationFn: ({ guideId, data }: {guideId: number , data: BookingForm}) =>
      createBookingApi(guideId, data),
  });
