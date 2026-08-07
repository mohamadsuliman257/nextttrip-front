import axios from "@/lib/axios";
import type { Booking } from "../types/booking.type";

export async function getBookings(): Promise<Booking[]> {
  const res = await axios.get("/admin/bookings");
  console.log(res.data);
  return res.data.data;
}
