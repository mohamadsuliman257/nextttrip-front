  import RatingStars from "@/components/RatingStars";
import type { TouristPlaceReview } from "../types/placeReview";

type Props = {
  review: TouristPlaceReview;
};

const PlaceReviewCard = ({ review }: Props) => {

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("ar-EG") : "-";

  return (
    <div className="border border-secondary-300 rounded-lg p-4 shadow-sm bg-white/70 flex flex-col">
      <div className="flex items-start gap-4">
        <img
          src={review.place.image}
          alt={review.place.image}
          className="w-20 h-20 rounded-lg object-cover border-2 border-primary-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-primary-700 truncate">
            {review.place.name}
          </h3>
          <RatingStars rating={review.rating} size={18} />
          <span className="text-yellow-500 text-sm font-semibold ms-1">
            {review.rating} / 5
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-3 flex-1">
        {review.comment || "لا يوجد تعليق"}
      </p>

      <div className="mt-4 text-sm text-gray-500 border-t border-secondary-200 pt-2">
        <p>تاريخ التقييم: {formatDate(review.created_at)}</p>
      </div>
    </div>
  );
};

export default PlaceReviewCard;

