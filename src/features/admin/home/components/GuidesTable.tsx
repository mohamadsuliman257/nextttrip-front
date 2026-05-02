// src/features/admin/dashboard/components/GuidesTable.tsx

interface Guide {
  name: string;
  city: string;
  trips: number;
  status: "approved" | "pending";
}

export default function GuidesTable() {
  const guides: Guide[] = [
    { name: "أحمد الخطيب", city: "دمشق", trips: 120, status: "approved" },
    { name: "محمد علي", city: "اللاذقية", trips: 80, status: "pending" },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">آخر المرشدين</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">الاسم</th>
            <th className="p-3 border">المدينة</th>
            <th className="p-3 border">عدد الرحلات</th>
            <th className="p-3 border">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {guides.map((g, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{g.name}</td>
              <td className="p-3 border">{g.city}</td>
              <td className="p-3 border">{g.trips}</td>
              <td className="p-3 border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    g.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {g.status === "approved" ? "مقبول" : "قيد المراجعة"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
