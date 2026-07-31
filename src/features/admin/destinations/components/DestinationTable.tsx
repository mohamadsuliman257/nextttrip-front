import type { Destination } from '../types/destination.type'

export default function DestinationTable({destinations , handleEdit , handleDelete , isDeleting} : {destinations: Destination[],handleEdit: (destination: Destination) => void , handleDelete: (id: number) => void , isDeleting: boolean} ) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200 overflow-x-auto">      
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border min-w-30">الاسم</th>
            <th className="p-3 border">المدينة</th>
            <th className="p-3 border">الفئة</th>
            <th className="p-3 border">التقييم</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {destinations.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-3 border text-center text-gray-500">
                لا توجد وجهات سياحية
              </td>
            </tr>
          ) : (
            destinations.map((destination, index) => (
              <tr key={destination.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{destination.name}</td>
                <td className="p-3 border">{destination.city?.name || destination.city_id}</td>
                <td className="p-3 border">{destination.category?.name || destination.category_id}</td>
                <td className="p-3 border">
                  {destination.average_rating ? (
                    <span className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{destination.average_rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm">({destination.reviews_count})</span>
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(destination)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(destination.id)}
                      disabled={isDeleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
