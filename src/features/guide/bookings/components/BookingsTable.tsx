import type { Booking, BookingStatus } from "../type/booking.type";

interface BookingsTableProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const getStatusBadge = (status: BookingStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "accepted":
      return "bg-green-100 text-green-700 border-green-300";
    case "rejected":
      return "bg-red-100 text-red-700 border-red-300";
    case "completed":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "cancelled_by_tourist":
    case "cancelled_by_guide":
      return "bg-red-200 text-red-800 border-red-400";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const columns = [
  { key: "tourist_name", label: "السائح" },
  { key: "start_date", label: "التاريخ", format: (v :any) => v.split("T")[0] },
  { key: "day_count", label: "الأيام" },
  { key: "total_price", label: "السعر", format: (v : any) => `${v} ل.س` },
  {
    key: "status",
    label: "الحالة",
    format: (v: any) => (
      <span
        className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(v)}`}
      >
        {v}
      </span>
    ),
  },
];

export default function BookingsTable({ bookings, onSelectBooking }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا توجد حجوزات لعرضها
      </div>
    );
  }

  return (
    <>
{/* ----- بطاقات للشاشات الصغيرة ----- */}
      <div className="block sm:hidden space-y-4">
        {bookings.map((booking: Booking) => (
          <div
            key={booking.booking_id}
            className="bg-white border border-primary-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-2 text-sm">
              {columns.map((col) => {
                const value = booking[col.key as keyof Booking] as any;
                const display = col.format ? col.format(value) : value;

                return (
                  <div key={col.key} className="flex justify-between items-center">
                    <span className="text-gray-500">{col.label}</span>
                    <span className="font-medium">{display}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onSelectBooking(booking)}
              className="w-full mt-3 px-3 py-2 bg-primary-500 text-white rounded text-sm hover:bg-primary-500 transition-colors"
            >
              التفاصيل
            </button>
          </div>
        ))}
      </div>

      {/* ----- جدول للشاشات المتوسطة والكبيرة ----- */}
      <div className="hidden sm:block overflow-hidden rounded-lg">
        <table className="min-w-full text-right">
          <thead className="bg-gray-100 text-sm">
            <tr className="border border-primary-200">
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2">
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-2">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking: Booking) => (
              <tr key={booking.booking_id} className="border border-primary-200 text-sm">
                {columns.map((col) => {
                  const value = booking[col.key as keyof Booking] as any;
                  const display = col.format ? col.format(value) : value;

                  return (
                    <td key={col.key} className="px-3 py-2">
                      {display}
                    </td>
                  );
                })}

                <td className="px-3 py-2">
                  <button
                    onClick={() => onSelectBooking(booking)}
                    className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-500 transition-colors"
                  >
                    التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

