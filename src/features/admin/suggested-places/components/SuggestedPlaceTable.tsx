import type { SuggestedPlace, SuggestionStatus } from "../types/suggestedPlace.type";

import { Eye } from "lucide-react";



interface SuggestedPlaceTableProps {

  suggestedPlaces: SuggestedPlace[];

  onApprove: (id: number, adminNotes?: string) => void;

  onReject: (id: number, adminNotes?: string) => void;

  onView: (place: SuggestedPlace) => void;

  isUpdating?: boolean;

}

const userTypeConfig = {

  tourist: "سائح",

  guide: "مرشد",

}

const statusConfig: Record<SuggestionStatus, { label: string; color: string }> = {

  pending: { label: "قيد المراجعة", color: "bg-orange-100 text-orange-700" },

  approved: { label: "مقبول", color: "bg-green-100 text-green-700" },

  rejected: { label: "مرفوض", color: "bg-red-100 text-red-700" },

};



export default function SuggestedPlaceTable({ suggestedPlaces, onView }: SuggestedPlaceTableProps) {

  return (

    <div className="bg-white shadow rounded-xl border border-primary-200 mb-10 p-2">

      <div className="overflow-auto ">

        <table className="w-full text-right border-collapse">

        <thead>

          <tr className="bg-primary-50 text-primary-900 text-center">

            <th className="p-3 border border-primary-200">#</th>

            <th className="p-3 border border-primary-200">اسم المكان</th>

            <th className="p-3 border border-primary-200">المدينة</th>

            <th className="p-3 border border-primary-200">اسم المستخدم</th>

            <th className="p-3 border border-primary-200">نوع المستخدم</th>

            <th className="p-3 border border-primary-200">تاريخ الاقتراح</th>

            <th className="p-3 border border-primary-200">الحالة</th>

            <th className="p-3 border border-primary-200">الإجراءات</th>

          </tr>

        </thead>



        <tbody>

          {suggestedPlaces.length === 0 ? (

            <tr>

              <td colSpan={8} className="p-3 border border-primary-200 text-center text-gray-500">

                لا توجد اقتراحات

              </td>

            </tr>

          ) : (

            suggestedPlaces.map((place, index) => (

              <tr key={place.id} className="hover:bg-gray-50">

                <td className="px-3 py-1 border border-primary-200">{index + 1}</td>

                <td className="px-3 py-1 border border-primary-200">{place.name}</td>

                <td className="px-3 py-1 border border-primary-200">{place.city.id || "-"}</td>

                <td className="px-3 py-1 border border-primary-200">{place.user.name}</td>

                <td className="px-3 py-1 border border-primary-200">{userTypeConfig[place.user.role]}</td>

                <td className="px-3 py-1 border border-primary-200">

                  {place.created_at ? new Date(place.created_at).toLocaleDateString('ar-EG') : '-'}

                </td>

                <td className="px-3 py-1 border border-primary-200 text-center">

                  <span

                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[place.status].color} `}

                  >

                    {statusConfig[place.status].label}

                  </span>

                </td>

                <td className="px-3 py-1 border border-primary-200">

                  <div className="text-center">

                    <button

                      onClick={() => onView(place)}

                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"

                      title="عرض التفاصيل"

                    >

                      <Eye size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      </div>

    </div>

  );

}

