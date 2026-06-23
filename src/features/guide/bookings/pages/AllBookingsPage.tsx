import { useState } from "react";
import { useGuideBookings } from "../hooks/useGuideBookings";
import BookingDetailsModal from "../components/BookingDetailsModal";
import type { Booking, BookingStatus } from "../type/booking.type";
import BookingStatusFilter from "../components/BookingStatusFilter";


export default function AllBookingsPage() {
  const [status, setStatus] = useState<BookingStatus | undefined>(undefined);

  const { data: bookings, isLoading, error } = useGuideBookings({ status });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (isLoading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* العنوان + الفلترة */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">جميع الحجوزات</h1>

        <BookingStatusFilter
          value={status}
          onChange={setStatus}
        />

      </div>

      {/* جدول الحجوزات */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-right">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">السائح</th>
              <th className="px-3 py-2">التاريخ</th>
              <th className="px-3 py-2">الأيام</th>
              <th className="px-3 py-2">السعر</th>
              <th className="px-3 py-2">الحالة</th>
              <th className="px-3 py-2">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking: Booking) => {
              const formattedDate = booking.start_date.split("T")[0];

              return (
                <tr key={booking.booking_id} className="border-b text-sm">
                  <td className="px-3 py-2">{booking.booking_id}</td>
                  <td className="px-3 py-2">{booking.tourist_name}</td>
                  <td className="px-3 py-2">{formattedDate}</td>
                  <td className="px-3 py-2">{booking.day_count}</td>
                  <td className="px-3 py-2">{booking.total_price} ل.س</td>
                  <td className="px-3 py-2">{booking.status}</td>

                  <td className="px-3 py-2">
                    <div className="flex gap-2">

                      {/* زر التفاصيل */}
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        التفاصيل
                      </button>

                      {/* قبول */}
                      {booking.can_guide_react && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded">
                          قبول
                        </button>
                      )}

                      {/* رفض */}
                      {booking.can_guide_react && (
                        <button className="px-3 py-1 bg-red-600 text-white rounded">
                          رفض
                        </button>
                      )}

                      {/* إلغاء */}
                      {booking.can_guide_cancel && (
                        <button className="px-3 py-1 bg-red-700 text-white rounded">
                          إلغاء
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* مودال التفاصيل */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
