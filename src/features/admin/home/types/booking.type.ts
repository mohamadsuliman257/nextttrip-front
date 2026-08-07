export type BookingStatus = "pending" | "accepted" | "rejected" | "completed" | "cancelled_by_tourist" | "cancelled_by_guide" | "expired";

export interface Booking {
  id: number;
  tourist_id: number;
  guide_id: number;
  trip_id?: number;
  start_date: string;
  day_count?: number;
  description?: string;
  status: BookingStatus;
  total_price?: number;
  last_note?: string;
  created_at: string;
  updated_at: string;
  tourist?: {
    id: number;
    name: string;
  };
  guide?: {
    id: number;
    user: {
      id: number;
      name: string;
    }
  };
  trip?: {
    id: number;
    name?: string;
  };
}
