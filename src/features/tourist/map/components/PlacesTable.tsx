import { useState } from "react";
import { Luggage, MapPin, Route, Star } from "lucide-react";
import type { Destination } from "@/features/admin/destinations/types/destination.type";
import type { Category } from "../types/category.type";
import type { City } from "@/features/lookups/types/city.type";
import { RatePlaceModal } from "./RatePlaceModal";

interface PlacesTableProps {
  places: Destination[];
  categories: Category[];
  cities: City[];
  onShowOnMap: (place: Destination) => void;
  onDrawRoute: (place: Destination) => void;
  onAddToTrip: (place: Destination) => void;
}

// جدول نتائج البحث عن الأماكن
export function PlacesTable({
  places,
  categories,
  cities,
  onShowOnMap,
  onDrawRoute,
  onAddToTrip,
}: PlacesTableProps) {
  const [ratePlace, setRatePlace] = useState<Destination | null>(null);

  const categoryName = (place: Destination) =>
    place.category?.name ??
    categories.find((c) => c.id === place.category_id)?.name ??
    "—";

  const cityName = (place: Destination) =>
    place.city?.name ??
    cities.find((c) => c.id === place.city_id)?.name ??
    "—";

  return (
    <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
      <h2 className="mb-2 px-2 text-base font-bold text-primary-700">
        نتائج البحث ({places.length})
      </h2>

      <table className="w-full min-w-175 border-collapse text-right text-sm">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="border border-primary-200 p-3">#</th>
            <th className="border border-primary-200 p-3">المكان</th>
            <th className="border border-primary-200 p-3">النوع</th>
            <th className="border border-primary-200 p-3">المدينة</th>
            <th className="border border-primary-200 p-3">التكلفة (د.ل)</th>
            <th className="border border-primary-200 p-3">التقييم</th>
            <th className="border border-primary-200 p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {places.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="border border-primary-200 px-3 py-6 text-center text-slate-500"
              >
                لا توجد أماكن مطابقة للبحث
              </td>
            </tr>
          ) : (
            places.map((place, index) => (
              <tr key={place.id} className="hover:bg-gray-50">
                <td className="border border-primary-200 px-3 py-2">
                  {index + 1}
                </td>
                <td className="border border-primary-200 px-3 py-2 font-medium text-primary-700">
                  {place.name}
                </td>
                <td className="border border-primary-200 px-3 py-2">
                  {categoryName(place)}
                </td>
                <td className="border border-primary-200 px-3 py-2">
                  {cityName(place)}
                </td>
                <td className="border border-primary-200 px-3 py-2">
                  {place.cost != null ? place.cost : "—"}
                </td>
                <td className="border border-primary-200 px-3 py-2">
                  <span className="flex items-center gap-1">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    {place.average_rating?.toFixed(1) ?? "—"}
                    <span className="text-xs text-slate-400">
                      ({place.reviews_count ?? 0})
                    </span>
                  </span>
                </td>
                <td className="border border-primary-200 px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onShowOnMap(place)}
                      className="flex items-center gap-1 rounded border border-primary-300 px-2 py-1 text-primary-700 hover:bg-primary-50"
                      title="عرض على الخريطة"
                    >
                      <MapPin size={14} />
                      على الخريطة
                    </button>
                    <button
                      type="button"
                      onClick={() => onDrawRoute(place)}
                      className="flex items-center gap-1 rounded bg-primary-600 px-2 py-1 text-white hover:bg-primary-700"
                      title="رسم المسار إلى المكان"
                    >
                      <Route size={14} />
                      المسار
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToTrip(place)}
                      className="flex items-center gap-1 rounded border border-primary-300 px-2 py-1 text-primary-700 hover:bg-primary-50"
                      title="أضف المكان إلى رحلة"
                    >
                      <Luggage size={14} />
                      أضف إلى رحلة
                    </button>
                    <button
                      type="button"
                      onClick={() => setRatePlace(place)}
                      className="flex items-center gap-1 rounded border border-yellow-400 px-2 py-1 text-yellow-600 hover:bg-yellow-50"
                      title="تقييم المكان"
                    >
                      <Star size={14} />
                      تقييم
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {ratePlace && (
        <RatePlaceModal place={ratePlace} onClose={() => setRatePlace(null)} />
      )}
    </div>
  );
}
