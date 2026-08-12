import axios from "@/lib/axios";
import type { Booking } from "../types/booking.type";

interface BookingsResponse {
  stats: unknown;
  bookings: Booking[];
}

export async function getBookings(): Promise<Booking[]> {
  const res = await axios.get<{ data: BookingsResponse }>("/admin/bookings");
  return res.data.data.bookings;
}
