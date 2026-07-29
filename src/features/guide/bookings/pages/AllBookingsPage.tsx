import { useState } from "react";
import { useGuideBookings } from "../hooks/useGuideBookings";
import BookingDetailsModal from "../components/BookingDetailsModal";
import BookingsTable from "../components/BookingsTable";
import type { Booking, BookingStatus } from "../type/booking.type";
import BookingStatusFilter from "../components/BookingStatusFilter";

export default function AllBookingsPage() {
  const [status, setStatus] = useState<BookingStatus | undefined>(undefined);
  const { data: bookings =[], isLoading, error } = useGuideBookings({ status });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل البيانات...</p>
      </div>
    );
  }
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">جميع الحجوزات</h1>
        <BookingStatusFilter value={status} onChange={setStatus} />
      </div>

      <BookingsTable
        bookings={bookings}
        onSelectBooking={setSelectedBooking}
      />

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
