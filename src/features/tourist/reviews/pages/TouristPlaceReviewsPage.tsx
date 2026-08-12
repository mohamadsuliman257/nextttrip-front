import PlaceReviewsList from "../components/PlaceReviewsList";
import { useTouristPlaceReviews } from "../hooks/useTouristPlaceReviews";

const TouristPlaceReviewsPage = () => {
  const { data, isLoading, error } = useTouristPlaceReviews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل تقييمات الأماكن...</p>
      </div>
    );
  }
  if (error) return <p>حدث خطأ أثناء جلب التقييمات</p>;

  return (
    <div className="pb-20 md:px-[20%] min-h-screen -mt-10">
      <h1 className="text-lg md:text-2xl font-bold text-primary-500 md:text-center mb-10 px-3">
        تقييماتي للأماكن
      </h1>

      <PlaceReviewsList reviews={data || []} />
    </div>
  );
};

export default TouristPlaceReviewsPage;

