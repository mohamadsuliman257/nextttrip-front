import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/getBookings.api";
import type { BookingStatus } from "../types/booking.type";

export function useBookings(status?: BookingStatus) {
  return useQuery({
    queryKey: ["admin-bookings", status],
    queryFn: () => getBookings(status),
  });
}
