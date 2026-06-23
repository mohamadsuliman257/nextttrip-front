import type { Booking } from "@/features/types/bookingTypes";

export const GuideBookingCard = ({ booking, onOpen }:{ booking: Booking, onOpen: any })  => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">
          {booking.tourist.user.name}
        </h3>

        <span
          className={`px-3 py-1 rounded text-white text-sm ${
            booking.status === "pending"
              ? "bg-yellow-500"
              : booking.status === "accepted"
              ? "bg-green-600"
              : booking.status === "rejected"
              ? "bg-red-600"
              : booking.status === "completed"
              ? "bg-blue-600"
              : "bg-gray-500"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <p>📅 من: {booking.start_date}</p>
        <p>📅 إلى: {booking.start_date + booking.day_count}</p>
        <p>💰 السعر: {booking.total_price} ل.س</p>
      </div>

      <button
        onClick={() => onOpen(booking)}
        className="mt-4 w-full bg-primary text-white py-2 rounded"
      >
        عرض التفاصيل
      </button>
    </div>
  );
};
