import { useState } from "react";
import { Info, Plus, Star } from "lucide-react";
import { useMap } from "react-leaflet";
import type { Destination } from "@/features/admin/destinations/types/destination.type";
import { PlaceRatingForm } from "./PlaceRatingForm";
import { useRatePlaceGuard } from "../hook/useRatePlace";

interface PlacePopupProps {
  place: Destination;
  userPosition: [number, number] | null;
  distance: number;
  onDrawRoute: (place: Destination) => void;
  onAddToTrip: (place: Destination) => void;
  onShowDetails: (place: Destination) => void;
}

// النافذة المنبثقة لتفاصيل المكان
export function PlacePopup({
  place,
  userPosition,
  distance,
  onDrawRoute,
  onAddToTrip,
  onShowDetails,
}: PlacePopupProps) {
  const map = useMap();
  const [showRating, setShowRating] = useState(false);
  const canRate = useRatePlaceGuard();

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
      
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            map.closePopup();
            onDrawRoute(place);
          }}
          className="rounded bg-primary-600 px-2 py-1 text-white hover:bg-primary-700"
        >
          عرض المسار
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            map.closePopup();
            onAddToTrip(place);
          }}
          className="rounded border border-primary-300 px-2 py-1 text-primary-700 hover:bg-primary-50"
        >
          <Plus size={13} className="inline" />
          أضف إلى رحلتي
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            map.closePopup();
            onShowDetails(place);
          }}
          className="rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
        >
          <Info size={13} className="inline" />
          التفاصيل
        </button>

        <button
          type="button"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!canRate()) return;
            setShowRating((value) => !value);
          }}
          className="rounded border border-yellow-400 px-2 py-1 text-yellow-600 hover:bg-yellow-50"
        >
          <Star size={13} className="inline" fill={showRating ? "currentColor" : "none"} />
          {showRating ? "إغلاق التقييم" : "قيّم المكان"}
        </button>
      </div>

      {showRating && (
        <div className="mt-3 rounded border border-slate-200 bg-slate-50 p-2">
          <PlaceRatingForm
            placeId={place.id}
            onSuccess={() => {
              setShowRating(false);
              map.closePopup();
            }}
          />
        </div>
      )}
    </div>
  );
}
