import type { Booking, BookingStatus } from "../types/booking.type";

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-orange-100 text-orange-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled_by_tourist: "bg-gray-100 text-gray-700",
  cancelled_by_guide: "bg-gray-200 text-gray-900",
  expired: "bg-purple-100 text-purple-700",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "قيد المراجعة",
  accepted: "مقبول",
  rejected: "مرفوض",
  completed: "مكتمل",
  cancelled_by_tourist: "ملغي من قبل السائح",
  cancelled_by_guide: "ملغي من قبل المرشد",
  expired: "انتهت صلاحيته",
};

interface Props {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("ar-EG");
};

export default function BookingsTable({ bookings, onSelectBooking }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-5 border border-primary-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          طلبات حجز المرشدين
        </h3>
        <div className="text-center py-8 text-gray-500">
          لا توجد حجوزات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">
        طلبات حجز المرشدين
      </h3>

      {/* بطاقات للشاشات الصغيرة */}
      <div className="block md:hidden space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="border border-primary-100 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">المرشد</span>
              <span className="font-medium">{b.guide?.user?.name || "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">السائح</span>
              <span className="font-medium">{b.tourist?.name || "-"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">تاريخ البدء</span>
              <span className="font-medium">{formatDate(b.start_date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">الحالة</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                {statusLabels[b.status]}
              </span>
            </div>
            {onSelectBooking && (
              <button
                onClick={() => onSelectBooking(b)}
                className="w-full mt-2 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600"
              >
                التفاصيل
              </button>
            )}
          </div>
        ))}
      </div>

      {/* جدول للشاشات المتوسطة والكبيرة */}
      <div className="hidden md:block overflow-auto max-h-96">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-primary-50 text-primary-600 border-b-2 border-primary-100">
              <th className="p-3">المرشد</th>
              <th className="p-3">السائح</th>
              <th className="p-3">تاريخ الإنشاء</th>
              <th className="p-3">تاريخ البدء</th>
              <th className="p-3">السعر</th>
              <th className="p-3">الحالة</th>
              {onSelectBooking && <th className="p-3"></th>}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="p-3 font-medium">{b.guide?.user?.name || "-"}</td>
                <td className="p-3">{b.tourist?.name || "-"}</td>
                <td className="p-3 text-gray-500">{formatDate(b.created_at)}</td>
                <td className="p-3 text-gray-500">{formatDate(b.start_date)}</td>
                <td className="p-3">
                  {b.total_price ? `${b.total_price.toLocaleString()}` : "-"}
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                    {statusLabels[b.status]}
                  </span>
                </td>
                {onSelectBooking && (
                  <td className="p-3">
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="px-3 py-1.5 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                    >
                      عرض التفاصيل
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
