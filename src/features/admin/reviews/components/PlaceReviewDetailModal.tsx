import AdminModal from "@/components/AdminModal";
import RatingStars from "@/components/RatingStars";
import { usePlaceReviewDetail } from "../hooks/usePlaceReviews";

interface Props {
  reviewId: number | null;
  onClose: () => void;
}

export default function PlaceReviewDetailModal({ reviewId, onClose }: Props) {
  const { data: review, isLoading } = usePlaceReviewDetail(reviewId);

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("ar-EG") : "-";

  return (
    <AdminModal
      isOpen={!!reviewId}
      onClose={onClose}
      title="تفاصيل تقييم المكان"
      maxWidthClassName="max-w-lg"
    >
      {isLoading || !review ? (
        <div className="text-center text-gray-500 py-8">جاري التحميل...</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={review.place_image || "/logo.png"}
              className="w-16 h-16 rounded-lg object-cover border-2 border-primary-200"
              alt="صورة المكان"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {review.place?.name || "مكان"}
              </h3>
              <p className="text-sm text-gray-500">
                {review.place?.city?.name || ""}
                {review.place?.city?.name ? " - " : ""}
                {review.place?.category?.name || ""}
              </p>
              <RatingStars rating={review.rating} size={18} />
            </div>
          </div>

          <div>
            <span className="text-gray-500 text-sm">التعليق:</span>
            <p className="mt-1 bg-gray-50 p-3 rounded-lg text-gray-800">
              {review.comment || "لا يوجد تعليق"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">السائح</span>
              <span className="font-semibold">{review.user?.name || "-"}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">بريد السائح</span>
              <span className="font-semibold">{review.user?.email || "-"}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 col-span-2">
              <span className="text-gray-500 block">متوسط تقييم المكان</span>
              <span className="font-semibold">
                {review.place?.average_rating || 0} / 5 ({review.place?.reviews_count || 0} تقييم)
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            تاريخ التقييم: {formatDate(review.created_at)}
          </p>
        </div>
      )}
    </AdminModal>
  );
}
