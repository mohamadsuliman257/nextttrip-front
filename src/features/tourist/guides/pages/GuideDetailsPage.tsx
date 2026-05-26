import { useParams } from "react-router-dom";
import { useGuideDetails } from "../hooks/useGuides";
import RatingStars from "@/components/RatingStars";
import { GuideBook } from "../components/GuideBook";

export function GuideDetailsPage() {
  const { guideId } = useParams();
  const { data: guide, isLoading } = useGuideDetails(Number(guideId));

  if (isLoading) return <p>جاري التحميل...</p>;
  guide.gender = guide.gender == 'M' ? 'امرأة' : 'رجل';
  return (
    <div className="py-20 md:px-[20%] ">
      {/* الاسم  */}
      <h1 className="text-lg md:text-2xl font-bold text-primary-500 md:text-center mb-6 px-3">
        {guide.name} تفاصيل وحجز المرشد
      </h1>
      <div className="flex  mx-auto bg-white/50 p-3 px-6 rounded-xl border-2 border-secondary-500">

        <div className="w-100 flex-1">
          {/* صورة المرشد */}
          <img
            src={guide.avatar}
            className="w-40 h-40 rounded-full  shadow-md"
          />

          {/* التقييم */}
          <div className="flex mt-3">
            <RatingStars rating={guide.rating} />
          </div>

          {/* <div className="grid grid-cols-2"> */}
          {/* معلومات */}
          <div className="mt-6 space-y-2 text-xl font-bold ">
            <p className="text-secondary-600">
              <span className=" text-gray-500"> العمر:</span>  {guide.age}
            </p>
            <p className="text-secondary-600  ">
              <span className=" text-gray-500"> الجنس:</span>  {guide.gender}
            </p>
            <p className="text-secondary-600  ">
              <span className=" text-gray-500">عدد الحجوزات:</span>  {guide.bookings_count}
            </p>
            <p className="text-secondary-600 ">
              <span className=" text-gray-500 ">عدد المراجعات:</span>  {guide.reviews_count}
            </p>
            <p className="text-secondary-600  ">
              <span className=" text-gray-500"> اللغات:</span>  {guide.languages}
            </p>
            <p className="text-secondary-600  ">
              <span className=" text-gray-500">المدن:</span>  {guide.cities}
            </p>
            <p className="text-secondary-600  ">
              <span className=" text-gray-500">السعر اليومي:</span>  {guide.daily_price}
            </p>


          </div>
          <p className="text-secondary-600 mt-5">
            <span className=" text-gray-500 ">السيرة الذاتية:</span>  {guide.bio}
          </p>
        </div>

        <GuideBook guide={guide} />
      </div>
    </div>
  );
}
