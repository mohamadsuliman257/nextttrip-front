import  { useState } from "react";
import { GuideBookingCard } from "../components/GuideBookingCard";
import { useGuideBookings } from "../hooks/useGuideBookings";
import type { Booking } from "@/features/types/bookingTypes";

export const BookingsPage = () => {
  const { data, isLoading } = useGuideBookings();
  const [filter, setFilter] = useState("all");

  if (isLoading) return <p>جاري التحميل...</p>;

  const filtered =
    filter === "all"
      ? data
      : data.filter((b: Booking) => b.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">حجوزاتي</h1>

      {/* الفلترة */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "accepted", "rejected", "completed"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded border ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              {s}
            </button>
          )
        )}
      </div>

      {/* قائمة الحجوزات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((booking : Booking) => (
          <GuideBookingCard
            key={booking.booking_id}
            booking={booking}
            onOpen={(booking : Booking) => console.log("Open modal", booking)}
          />
        ))}
      </div>
    </div>
  );
};
