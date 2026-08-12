import { Star, MessageSquareQuote } from "lucide-react";
import type { ReviewStats } from "../types/review.type";

interface Props {
  stats: ReviewStats | undefined;
}

export default function ReviewStatsCards({ stats }: Props) {
  console.log(stats);
  if (!stats) return null;

  const max = Math.max(...Object.values(stats.distribution), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/90 shadow-sm rounded-xl p-5 border border-primary-200 flex items-center gap-4">
        <div className="text-4xl text-blue-500">
          <MessageSquareQuote size={40} />
        </div>
        <div>
          <h3 className="text-gray-500 font-medium text-xs">إجمالي التقييمات</h3>
          <p className="text-xl font-bold text-gray-900 mt-0.5">
            {stats.total_reviews.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white/90 shadow-sm rounded-xl p-5 border border-secondary-200 flex items-center gap-4">
        <div className="text-4xl text-secondary-500">
          <Star size={40} />
        </div>
        <div>
          <h3 className="text-gray-500 font-medium text-xs">متوسط التقييم</h3>
          <p className="text-xl font-bold text-gray-900 mt-0.5">
            {stats.average_rating} / 5
          </p>
        </div>
      </div>

      <div className="bg-white/90 shadow-sm rounded-xl p-5 border border-secondary-200">
        <h3 className="text-gray-500 font-medium text-xs mb-3">توزيع التقييمات</h3>
        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star] || 0;
            const percent = (count / max) * 100;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-8 text-gray-600 font-semibold">{star}★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500 bg-yellow-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-gray-500 text-left">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
