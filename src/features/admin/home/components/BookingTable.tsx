import { useBookings } from "../hooks/useBookings";

const statusColors = {
  pending: "bg-orange-100 text-orange-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const statusLabels = {
  pending: "قيد المراجعة",
  accepted: "مقبول",
  rejected: "مرفوض",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export default function BookingTable() {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">طلبات حجز المرشدين</h3>
        <div className="flex items-center justify-center h-32 text-gray-500">
          جاري التحميل...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">طلبات حجز المرشدين</h3>
        <div className="flex items-center justify-center h-32 text-red-500">
          حدث خطأ في تحميل البيانات
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">طلبات حجز المرشدين </h3>
      <div className="overflow-auto max-h-75">
        <table className="w-full text-right border-collapse  border-primary-100">
          <thead>
            <tr className="bg-primary-50 text-primary-600 border-b-2 border-primary-100">
              <th className="p-3 ">المرشد</th>
              <th className="p-3 ">التاريخ</th>
              <th className="p-3 ">السائح</th>
              <th className="p-3 ">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="p-3 ">{booking.guide?.user?.name || '-'}</td>
                <td className="p-3 ">{formatDate(booking.created_at)}</td>
                <td className="p-3 ">{booking.tourist?.name || '-'}</td>
                <td className="p-3 ">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
