import type { TouristPlaceReview } from "../types/placeReview";
import PlaceReviewCard from "./PlaceReviewCard";

type Props = {
  reviews: TouristPlaceReview[];
};

const PlaceReviewsList = ({ reviews }: Props) => {
  if (reviews.length === 0)
    return <p className="text-center text-gray-500">لا توجد تقييمات للأماكن بعد</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <PlaceReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default PlaceReviewsList;

