import type { Category } from "../types/category.type";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function CategoryTable({ categories, onEdit, onDelete, isDeleting }: CategoryTableProps) {
  return (
    <div className="bg-white shadow rounded-xl border border-primary-200 mb-10 p-2">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border border-primary-200">#</th>
            <th className="p-3 border border-primary-200">اسم التصنيف</th>
            <th className="p-3 border border-primary-200">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-1 px-3 border border-primary-200 text-center text-gray-500">
                لا توجد تصنيفات
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-1 px-3 border border-primary-200">{index + 1}</td>
                <td className="py-1 px-3 border border-primary-200">{category.name}</td>
                <td className="py-1 px-3 border border-primary-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
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
