import { Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import type { Destination } from "@/features/admin/destinations/types/destination.type";

interface PlacePopupProps {
  place: Destination;
  userPosition: [number, number] | null;
  distance: number;
  onDrawRoute: (place: Destination) => void;
}

// النافذة المنبثقة لتفاصيل المكان
export function PlacePopup({
  place,
  userPosition,
  distance,
  onDrawRoute,
}: PlacePopupProps) {
  return (
    <div dir="rtl" className="min-w-48">
      <strong>{place.name}</strong>
      
      <div className="mt-2 flex items-center gap-1">
        <Star size={14} fill="#fbbf24" color="#fbbf24" />
        {place.average_rating?.toFixed(1) ?? "—"} ({place.reviews_count ?? 0})
      </div>
      
      <p>{place.description || place.address || "لا يوجد وصف متاح."}</p>
      
      {userPosition && (
        <p>{distance.toFixed(1)} كم</p>
      )}
      
      <button
        onClick={() => onDrawRoute(place)}
        className="mt-2 rounded bg-primary-600 px-2 py-1 text-white"
      >
        عرض المسار
      </button>
      
      <button
        onClick={() => toast("سيتم ربط إضافة المكان بخدمة الرحلات عند توفرها.")}
        className="mr-2 mt-2 rounded border border-primary-300 px-2 py-1 text-primary-700"
      >
        <Plus size={13} className="inline" />
        أضف إلى رحلتي
      </button>
    </div>
  );
}
