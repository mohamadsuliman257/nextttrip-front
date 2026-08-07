import { useSuggestedPlaces } from "../hooks/useSuggestedPlaces";

export default function PlaceSuggestionTable() {
  const { data: places = [], isLoading, error } = useSuggestedPlaces();

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-5 border border-purple-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">آخر الاقتراحات</h3>
        <div className="flex items-center justify-center h-32 text-gray-500">
          جاري التحميل...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-5 border border-purple-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">آخر الاقتراحات</h3>
        <div className="flex items-center justify-center h-32 text-red-500">
          حدث خطأ في تحميل البيانات
        </div>
      </div>
    );
  }

  const statusColors = {
    approved: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-orange-50 text-orange-700 border border-orange-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
  };

  const statusLabels = {
    approved: "مقبول",
    pending: "قيد المراجعة",
    rejected: "مرفوض",
  };

  const userTypeLabels = {
    tourist: "سائح",
    guide: "مرشد",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-secondary-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">آخر الاقتراحات</h3>
      <div className="overflow-auto max-h-75 rounded-lg border border-gray-100">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-secondary-50/50 text-secondary-700 font-semibold border-b border-secondary-400" >
              <th className="p-3">اسم المكان المقترح</th>
              <th className="p-3">اسم المستخدم</th>
              <th className="p-3">نوع المستخدم</th>
              <th className="p-3">تاريخ الاقتراح</th>
              <th className="p-3 text-center">الحالة</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {places.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3 text-gray-700 font-medium">{p.name}</td>
                <td className="p-3 text-gray-600">{p.user?.name}</td>
                <td className="p-3 text-gray-500">{userTypeLabels[p.user?.role]}</td>
                <td className="p-3 text-gray-500">{formatDate(p.created_at)}</td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${statusColors[p.status]}`}>
                    {statusLabels[p.status]}
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
