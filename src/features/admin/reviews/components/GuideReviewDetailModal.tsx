import AdminModal from "@/components/AdminModal";
import RatingStars from "@/components/RatingStars";
import { useGuideReviewDetail } from "../hooks/useGuideReviews";
import type { BookingStatus } from "../../home/types/booking.type";

const statusLabels: Record<BookingStatus, string> = {
  pending: "قيد المراجعة",
  accepted: "مقبول",
  rejected: "مرفوض",
  completed: "مكتمل",
  cancelled_by_tourist: "ملغي من قبل السائح",
  cancelled_by_guide: "ملغي من قبل المرشد",
  expired: "انتهت صلاحيته",
};

interface Props {
  reviewId: number | null;
  onClose: () => void;
}

export default function GuideReviewDetailModal({ reviewId, onClose }: Props) {
  const { data: review, isLoading } = useGuideReviewDetail(reviewId);

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("ar-EG") : "-";

  return (
    <AdminModal
      isOpen={!!reviewId}
      onClose={onClose}
      title="تفاصيل تقييم المرشد"
      maxWidthClassName="max-w-lg"
    >
      {isLoading || !review ? (
        <div className="text-center text-gray-500 py-8">جاري التحميل...</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={review.booking?.guide?.avatar}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
              alt="صورة المرشد"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {review.booking?.guide?.user?.name || "مرشد"}
              </h3>
              <p className="text-sm text-gray-500">
                {review.booking?.guide?.user?.email}
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
              <span className="font-normal">{review.booking?.tourist?.name || "-"}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">السعر اليومي</span>
              <span className="font-normal">${review.booking?.guide?.daily_price || 0}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">تاريخ الرحلة</span>
              <span className="font-normal">{formatDate(review.booking?.start_date)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">عدد الأيام</span>
              <span className="font-normal">{review.booking?.day_count || 1}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">التكلفة الكلية</span>
              <span className="font-normal">${review.booking?.total_price || 0}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 block">حالة الحجز</span>
              <span className="font-normal">{statusLabels[review.booking.status]??"-"}</span>
            </div>
          </div>

          {review.booking?.trip && (
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
              رحلة: {review.booking.trip.title} ({formatDate(review.booking.trip.start_date)} →{" "}
              {formatDate(review.booking.trip.end_date)})
            </div>
          )}

          <p className="text-xs text-gray-400">
            تاريخ التقييم: {formatDate(review.created_at)}
          </p>
        </div>
      )}
    </AdminModal>
  );
}
