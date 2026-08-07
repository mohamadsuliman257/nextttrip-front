import type { Language } from "../types/language.type";
import { Pencil, Trash2 } from "lucide-react";

interface LanguageTableProps {
  languages: Language[];
  onEdit: (language: Language) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function LanguageTable({ languages, onEdit, onDelete, isDeleting }: LanguageTableProps) {
  return (
    <div className="bg-white shadow rounded-xl border  border-primary-200 overflow-x-auto mb-10 p-2">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border border-primary-200">#</th>
            <th className="p-3 border border-primary-200">اسم اللغة</th>
            <th className="p-3 border border-primary-200">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {languages.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-3 border border-primary-200 text-center text-gray-500">
                لا توجد لغات
              </td>
            </tr>
          ) : (
            languages.map((language, index) => (
              <tr key={language.id} className="hover:bg-gray-50">
                <td className="px-3 py-1 border border-primary-200">{index + 1}</td>
                <td className="px-3 py-1 border border-primary-200">{language.name}</td>
                <td className="px-3 py-1 border border-primary-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(language)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(language.id)}
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
