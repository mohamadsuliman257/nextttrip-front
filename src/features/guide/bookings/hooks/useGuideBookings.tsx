import { useQuery } from "@tanstack/react-query";
import { getGuideBookings } from "../api/getGuideBookings";

export const useGuideBookings = () => {
  return useQuery({
    queryKey: ["guide-bookings"],
    queryFn: getGuideBookings,
  });
};
