import type { City } from "../types/city.type";
import { Pencil, Trash2 } from "lucide-react";

interface CityTableProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function CityTable({ cities, onEdit, onDelete, isDeleting }: CityTableProps) {
  return (
    <div className="bg-white shadow rounded-xl border border-primary-200 mb-10 p-2 overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border border-primary-200">#</th>
            <th className="p-3 border border-primary-200">اسم المدينة</th>
            <th className="p-3 border border-primary-200 min-w-50">الوصف</th>
            <th className="p-3 border border-primary-200">الصورة</th>
            <th className="p-3 border border-primary-200">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {cities.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 border border-primary-200 text-center text-gray-500">
                لا توجد مدن
              </td>
            </tr>
          ) : (
            cities.map((city, index) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="px-3 py-1 border border-primary-200">{index + 1}</td>
                <td className="px-3 py-1 border border-primary-200">{city.name}</td>
                <td className="px-3 py-1 border border-primary-200">{city.description || "-"}</td>
                <td className="px-3 py-1 border border-primary-200">
                  {city.image ? (
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3 py-1 border border-primary-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(city)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(city.id)}
                      disabled={isDeleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
