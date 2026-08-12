import { useState } from "react";
import RatingStars from "@/components/RatingStars";
import { usePlaceReviews } from "../hooks/usePlaceReviews";
import ReviewStatsCards from "../components/ReviewStatsCards";
import ReviewFiltersBar from "../components/ReviewFiltersBar";
import PlaceReviewDetailModal from "../components/PlaceReviewDetailModal";
import Pagination from "../components/Pagination";
import type { ReviewFilters } from "../types/review.type";

export default function PlaceReviewsPage() {
  const [filters, setFilters] = useState<ReviewFilters>({
    sort: "date",
    order: "desc",
    per_page: 10,
  });
  const [page, setPage] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

const { data, isLoading, error } = usePlaceReviews({ ...filters, page });

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("ar-EG") : "-";

  const handleFiltersChange = (newFilters: ReviewFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-primary-700">تقييمات الأماكن</h1>

      <ReviewStatsCards stats={data?.stats} />

      <ReviewFiltersBar
        filters={filters}
        onChange={handleFiltersChange}
        placeholder="ابحث باسم المكان أو السائح..."
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-40 text-gray-500">جاري التحميل...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">حدث خطأ في تحميل البيانات</div>
      ) : (
        <div className="bg-white/90 shadow-sm rounded-xl border border-primary-200 overflow-hidden">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="bg-primary-50 text-primary-600 border-b-2 border-primary-100">
                <th className="p-3">المكان</th>
                <th className="p-3">السائح</th>
                <th className="p-3">التقييم</th>
                <th className="p-3">التعليق</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    لا توجد تقييمات
                  </td>
                </tr>
              ) : (
                data?.items?.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={review.place_image || "/logo.png"}
                          className="w-8 h-8 rounded object-cover"
                          alt=""
                        />
                        <span className="font-semibold">{review.place?.name || "-"}</span>
                      </div>
                    </td>
                    <td className="p-3">{review.user?.name || "-"}</td>
                    <td className="p-3">
                      <RatingStars rating={review.rating} size={16} />
                    </td>
                    <td className="p-3 max-w-40 truncate text-gray-600">
                      {review.comment || "لا يوجد تعليق"}
                    </td>
                    <td className="p-3 text-gray-500">{formatDate(review.created_at)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedReviewId(review.id)}
                        className="px-3 py-1.5 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition"
                      >
                        عرض التفاصيل
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination pagination={data?.pagination} onPageChange={setPage} />
        </div>
      )}

      <PlaceReviewDetailModal
        reviewId={selectedReviewId}
        onClose={() => setSelectedReviewId(null)}
      />
    </div>
  );
}
