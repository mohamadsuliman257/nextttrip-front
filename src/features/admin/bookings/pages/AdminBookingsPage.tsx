import { useState } from "react";
import { useBookings } from "../hooks/useBookings";
import { useAnalytics } from "../../home/hooks/useAnalytics";
import BookingStatsCards from "../components/BookingStatsCards";
import BookingsTable from "../components/BookingsTable";
import BookingsChart from "../components/BookingsChart";
import type { BookingStatus } from "../types/booking.type";

const statusOptions: Array<{ value: BookingStatus | undefined; label: string }> = [
  { value: undefined, label: "الكل" },
  { value: "pending", label: "قيد المراجعة" },
  { value: "accepted", label: "مقبول" },
  { value: "rejected", label: "مرفوض" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled_by_tourist", label: "ملغي (سائح)" },
  { value: "cancelled_by_guide", label: "ملغي (مرشد)" },
  { value: "expired", label: "انتهت صلاحيته" },
];

export default function AdminBookingsPage() {
  const [status, setStatus] = useState<BookingStatus | undefined>(undefined);
  const { data, isLoading, error } = useBookings(status);
  const { data: analytics } = useAnalytics();

  return (
    <div className="space-y-4 pb-20 mt-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary-700">حجوزات المرشدين</h1>

        {/* فلترة حسب الحالة */}
        <div className="flex items-center gap-2">
          <label className="text text-gray-600">الحالة:</label>
          <select
            value={status || ""}
            onChange={(e) => setStatus((e.target.value || undefined) as BookingStatus | undefined)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statusOptions.map((opt) => (
              <option key={opt.label} value={opt.value || ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <BookingStatsCards stats={data?.stats} />

      {/* المخطط الشهري */}
      <BookingsChart data={analytics?.bookings} />

      {/* جدول الحجوزات */}
      {isLoading ? (
        <div className="flex items-center justify-center h-40 text-gray-500">
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-40 text-red-500">
          حدث خطأ في تحميل البيانات
        </div>
      ) : (
        <BookingsTable bookings={data?.bookings || []} />
      )}
    </div>
  );
}
