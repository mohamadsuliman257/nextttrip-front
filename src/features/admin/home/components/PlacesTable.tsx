// src/features/admin/dashboard/components/PlacesTable.tsx

interface Place {
  name: string;
  city: string;
  status: "approved" | "pending" | "rejected";
}

export default function PlacesTable() {
  const places: Place[] = [
    { name: "قلعة دمشق", city: "دمشق", status: "approved" },
    { name: "شاطئ أفاميا", city: "اللاذقية", status: "pending" },
    { name: "خان أسعد باشا", city: "دمشق", status: "rejected" },
  ];

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    approved: "مقبول",
    pending: "قيد المراجعة",
    rejected: "مرفوض",
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">آخر الأماكن</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">الاسم</th>
            <th className="p-3 border">المدينة</th>
            <th className="p-3 border">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {places.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{p.name}</td>
              <td className="p-3 border">{p.city}</td>
              <td className="p-3 border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[p.status]}`}
                >
                  {statusLabels[p.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
