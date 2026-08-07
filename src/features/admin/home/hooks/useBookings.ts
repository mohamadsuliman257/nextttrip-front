import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/getBookings.api";

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
}
