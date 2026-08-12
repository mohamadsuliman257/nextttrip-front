import axios from "@/lib/axios";
import type { BookingsResponse, BookingStatus } from "../types/booking.type";

export async function getBookings(status?: BookingStatus): Promise<BookingsResponse> {
  const res = await axios.get("/admin/bookings", { params: { status } });
  return res.data.data;
}
