import { useState } from "react";
import { Star } from "lucide-react";
import { useRatePlace } from "../hook/useRatePlace";

interface PlaceRatingFormProps {
  placeId: number;
  onSuccess?: () => void;
}

// نموذج تقييم مكان (نجوم + تعليق اختياري) قابل لإعادة الاستخدام داخل الخريطة أو الجدول
export function PlaceRatingForm({ placeId, onSuccess }: PlaceRatingFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const { mutate, isPending } = useRatePlace();

  const submit = () => {
    if (!rating) return;
    mutate(
      { placeId, rating, comment: comment.trim() || undefined },
      { onSuccess }
    );
  };

  return (
    <div className="flex flex-col gap-2" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-center gap-1" dir="rtl">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={22}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className={`cursor-pointer transition ${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        {rating > 0 && (
          <span className="ms-1 text-sm font-semibold text-yellow-500">
            {rating} / 5
          </span>
        )}
      </div>

      <textarea
        rows={2}
        placeholder="اكتب ملاحظتك… (اختياري)"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="w-full rounded border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-primary-400"
      />

      <button
        type="button"
        disabled={!rating || isPending}
        onClick={submit}
        className="rounded bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "جاري الحفظ..." : "حفظ التقييم"}
      </button>
    </div>
  );
}
