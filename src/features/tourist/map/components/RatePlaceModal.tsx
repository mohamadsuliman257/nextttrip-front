import { X } from "lucide-react";
import type { Destination } from "@/features/admin/destinations/types/destination.type";
import { PlaceRatingForm } from "./PlaceRatingForm";

interface RatePlaceModalProps {
  place: Destination;
  onClose: () => void;
}

// نافذة منبثقة لتقييم مكان من جدول نتائج البحث
export function RatePlaceModal({ place, onClose }: RatePlaceModalProps) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary-700">تقييم المكان</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-500">شارك تجربتك عن: {place.name}</p>

        <PlaceRatingForm placeId={place.id} onSuccess={onClose} />
      </div>
    </div>
  );
}
