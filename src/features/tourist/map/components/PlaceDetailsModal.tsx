import { useState } from "react";
import { Clock, ExternalLink, Info, MapPin, Phone, Star, Sun, Wallet } from "lucide-react";
import { usePlaceDetails } from "../hook/usePlaceDetails";

interface PlaceDetailsModalProps {
  placeId: number;
  onClose: () => void;
}

const ACTIVITY_LABELS: Record<string, string> = {
  relax: "هادئ",
  sensible: "متوسط",
  vigour: "نشط",
};

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return [value];
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).map(String);
  return [];
};

// نافذة تفاصيل المكان مع التقييمات
export function PlaceDetailsModal({ placeId, onClose }: PlaceDetailsModalProps) {
  const { data: place, isLoading, isError } = usePlaceDetails(placeId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < Math.round(rating) ? "#fbbf24" : "none"}
        color="#fbbf24"
      />
    ));

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        {isLoading ? (
          <p className="p-8 text-center text-sm text-slate-500">جاري تحميل تفاصيل المكان...</p>
        ) : isError || !place ? (
          <div className="p-8 text-center">
            <p className="mb-4 text-sm text-red-500">تعذر تحميل تفاصيل المكان.</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <>
            {/* معرض صور المكان */}
            <div className="shrink-0 bg-primary-100">
              <div className="relative h-44">
                {place.images?.[activeImageIndex]?.image_url ? (
                  <img
                    src={place.images[activeImageIndex].image_url}
                    alt={`${place.name} - صورة ${activeImageIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-primary-300">
                    <MapPin size={40} />
                  </div>
                )}
                {place.images && place.images.length > 1 && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
                    {activeImageIndex + 1} / {place.images.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-white"
                  aria-label="إغلاق"
                >
                  إغلاق ✕
                </button>
              </div>

              {/* شرائح الصور عند وجود أكثر من صورة */}
              {(place.images?.length ?? 0) > 1 && (
                <div className="flex gap-2 overflow-x-auto p-2">
                  {place.images!.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        index === activeImageIndex
                          ? "border-primary-500 opacity-100"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`عرض الصورة ${index + 1}`}
                    >
                      <img src={image.image_url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-primary-700">{place.name}</h3>
                <span className="flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  {place.average_rating?.toFixed(1) ?? "—"} ({place.reviews_count ?? 0} تقييم)
                </span>
              </div>

              <p className="mb-3 text-xs text-slate-500">
                {[
                  place.category?.name,
                  place.city?.name,
                  place.address,
                ].filter(Boolean).join(" • ")}
              </p>

              {place.description && (
                <p className="mb-3 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                  <Info size={13} className="mr-1 inline text-primary-500" />
                  {place.description}
                </p>
              )}

              <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                {place.cost != null && (
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 p-2 text-slate-600">
                    <Wallet size={14} className="text-primary-500 shrink-0" />
                    التكلفة: {place.cost} د.ل
                  </span>
                )}
                {place.expected_duration_minutes != null && (
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 p-2 text-slate-600">
                    <Clock size={14} className="text-primary-500 shrink-0" />
                    المدة المقترحة: {place.expected_duration_minutes} دقيقة
                  </span>
                )}
                {place.phone && (
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 p-2 text-slate-600">
                    <Phone size={14} className="text-primary-500 shrink-0" />
                    <span dir="ltr">{place.phone}</span>
                  </span>
                )}
                {place.activity_level && (
                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 p-2 text-slate-600">
                    <ExternalLink size={14} className="text-primary-500 shrink-0" />
                    النشاط: {ACTIVITY_LABELS[place.activity_level] ?? place.activity_level}
                  </span>
                )}
              </div>

              {(toArray(place.best_seasons).length > 0 || toArray(place.opening_hours).length > 0) && (
                <div className="mb-3 space-y-1.5 text-xs text-slate-600">
                  {toArray(place.opening_hours).length > 0 && (
                    <p>
                      <Clock size={12} className="mr-1 inline text-primary-500" />
                      ساعات العمل: {toArray(place.opening_hours).join("، ")}
                    </p>
                  )}
                  {toArray(place.best_seasons).length > 0 && (
                    <p>
                      <Sun size={12} className="mr-1 inline text-primary-500" />
                      أفضل المواسم: {toArray(place.best_seasons).join("، ")}
                    </p>
                  )}
                  {toArray(place.recommended_times).length > 0 && (
                    <p>
                      <Clock size={12} className="mr-1 inline text-primary-500" />
                      أوقات مُوصى بها: {toArray(place.recommended_times).join("، ")}
                    </p>
                  )}
                </div>
              )}

              {/* التقييمات */}
              <h4 className="mb-2 mt-4 text-sm font-bold text-secondary-700">
                التقييمات ({place.reviews?.length ?? 0})
              </h4>
              {(place.reviews?.length ?? 0) === 0 ? (
                <p className="rounded-lg bg-slate-50 py-3 text-center text-xs text-slate-400">
                  لا توجد تقييمات لهذا المكان بعد.
                </p>
              ) : (
                <ul className="max-h-52 space-y-2 overflow-y-auto">
                  {place.reviews!.map((review) => (
                    <li key={review.id} className="rounded-lg border border-slate-200 p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-primary-700">
                          {review.user?.name ?? "مستخدم"}
                        </span>
                        <span className="flex items-center">{renderStars(review.rating)}</span>
                      </div>
                      {review.comment && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">{review.comment}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
