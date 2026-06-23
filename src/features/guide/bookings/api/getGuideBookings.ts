import api from "@/lib/axios";

export const getGuideBookings = async () => {
  const response = await api.get("/guide/bookings");
  return response.data.data;
};

