import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNearbyRecommendations } from "../hooks/useNearbyRecommendations";
import { nearbyRecommendationsSchema, type NearbyRecommendationsSchema } from "../schemas/nearbyRecommendationsSchema";
import LocationMapPicker from "@/components/LocationMapPicker";
import FormField from "@/components/FormField";
import { useInterests } from "@/features/lookups/hooks/useInterests";
import type { NearbyRecommendation } from "@/features/notifications/type/nearByRecommendation";

export default function NearbyRecommendationsPage() {
  const { data: interests } = useInterests();
  const [recommendations, setRecommendations] = useState<NearbyRecommendation[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NearbyRecommendationsSchema>({
    resolver: zodResolver(nearbyRecommendationsSchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
      interests: [],
      budget: 0,
      season: "spring",
      weather: "sunny",
      preferred_time: "morning",
      preferred_activity_level: 2,
      pace: "medium",
      limit: 10,
    },
  });

  const selectedInterests = watch("interests") || [];
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const { isPending, error, mutate } = useNearbyRecommendations();

  const toggleInterest = (interestName: string) => {
    const current = selectedInterests;
    if (current.includes(interestName)) {
      setValue("interests", current.filter((i) => i !== interestName));
    } else {
      setValue("interests", [...current, interestName]);
    }
  };

  const handleLocationChange = (lat: string, lng: string) => {
    setValue("latitude", parseFloat(lat));
    setValue("longitude", parseFloat(lng));
  };

  const onSubmit = (data: NearbyRecommendationsSchema) => {
    mutate(data, {
      onSuccess: (results) => {
        setRecommendations(results);
      },
    });
  };

  return (
    <div className="min-h-screen mb-10 md:-mt-10">
      <div className="max-w-[90%] md:max-w-4xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-primary-700 ">استكشف الأماكن القريبة باستخدام AI</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/70 rounded-xl shadow-lg p-6 border border-primary-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField
              label="العنوان (اختياري)"
              name="title"
              register={register}
              errors={errors}
            />
            <FormField
              label="الميزانية"
              name="budget"
              register={register}
              errors={errors}
              type="number"
              options={{ valueAsNumber: true }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الفصل</label>
              <select {...register("season")} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="winter">الشتاء</option>
                <option value="spring">الربيع</option>
                <option value="summer">الصيف</option>
                <option value="autumn">الخريف</option>
              </select>
              {errors.season && <p className="text-red-500 text-sm mt-1">{errors.season.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الطقس</label>
              <select {...register("weather")} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="sunny">مشمس</option>
                <option value="cloudy">غائم</option>
                <option value="rainy">ممطر</option>
                <option value="hot">حار</option>
                <option value="cold">بارد</option>
              </select>
              {errors.weather && <p className="text-red-500 text-sm mt-1">{errors.weather.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوقت المفضل</label>
              <select {...register("preferred_time")} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="morning">صباحاً</option>
                <option value="afternoon">ظهراً</option>
                <option value="evening">مساءً</option>
                <option value="sunset">غروب الشمس</option>
              </select>
              {errors.preferred_time && <p className="text-red-500 text-sm mt-1">{errors.preferred_time.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مستوى النشاط (1-4)</label>
              <input
                type="number"
                {...register("preferred_activity_level", { valueAsNumber: true })}
                min={1}
                max={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.preferred_activity_level && <p className="text-red-500 text-sm mt-1">{errors.preferred_activity_level.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وتيرة الرحلة</label>
              <select {...register("pace")} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="slow">بطيء</option>
                <option value="relaxed">مريح</option>
                <option value="medium">متوسط</option>
                <option value="balanced">متوازن</option>
                <option value="intensive">كثيف</option>
                <option value="active">نشط</option>
              </select>
              {errors.pace && <p className="text-red-500 text-sm mt-1">{errors.pace.message}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">الاهتمامات</label>
            <div className="flex flex-wrap gap-2">
              {interests?.map((interest: any) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.name)}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors ${selectedInterests.includes(interest.name)
                    ? "border-primary-500 bg-primary-600 text-white"
                    : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"
                    }`}
                >
                  {interest.name}
                </button>
              ))}
            </div>
            {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">عدد النتائج</label>
            <input
              type="number"
              {...register("limit", { valueAsNumber: true })}
              min={1}
              max={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.limit && <p className="text-red-500 text-sm mt-1">{errors.limit.message}</p>}
          </div>

          <LocationMapPicker
            latitude={latitude?.toString() || ""}
            longitude={longitude?.toString() || ""}
            onLocationChange={handleLocationChange}
            title="حدد موقعك على الخريطة"
          />

          {latitude !== 0 && longitude !== 0 && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                <strong>الموقع المحدد:</strong> {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:bg-primary-400"
          >
            {isPending ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
            <span>{isPending ? "جاري البحث..." : "بحث"}</span>
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            حدث خطأ في جلب التوصيات. يرجى المحاولة مرة أخرى.
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-primary-700 mb-4">الأماكن المقترحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {recommendations && recommendations.length === 0 && !isPending && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">لم يتم العثور على أماكن قريبة في هذا النطاق</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: NearbyRecommendation }) {
  const imageUrl = place.image_urls?.[0] || null;
  // console.log(place)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="relative h-48">
        {imageUrl &&
          <img
            src={imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        }

      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-800 mb-2">{place.name}</h4>
        <p className="text-sm text-gray-500 line-clamp-2">{place.category}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-medium">{place.score}</span>
        </div>
      </div>
    </div>
  );
}
