import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSmartTripPlan } from "../api/tripPlanner.api";
import { getTouristInterests } from "@/features/tourist/interests/api/getTouristInterests.api";
import useAuthStore from "@/features/auth/store/authStore";
import type { TripPlan, TripPlannerRequest } from "../types/tripPlanner.types";
import FormField from "@/components/FormField";

const today = new Date().toISOString().split("T")[0];

const defaultRequest: TripPlannerRequest = {
  latitude: 33.5138,
  longitude: 36.2765,
  interests: ["historic", "nature"],
  budget: 120,
  start_date: today,
  days: 3,
  season: "spring",
  weather: "sunny",
  preferred_time: "morning",
  preferred_activity_level: 2,
  pace: "balanced",
};

const seasonOptions = [
  { value: "winter", label: "شتاء" },
  { value: "spring", label: "ربيع" },
  { value: "summer", label: "صيف" },
  { value: "autumn", label: "خريف" },
];

const weatherOptions = [
  { value: "sunny", label: "مشمس" },
  { value: "cloudy", label: "غائم" },
  { value: "rainy", label: "ممطر" },
  { value: "hot", label: "حار" },
  { value: "cold", label: "بارد" },
];

const timeOptions = [
  { value: "morning", label: "صباحاً" },
  { value: "afternoon", label: "بعد الظهر" },
  { value: "evening", label: "مساءً" },
  { value: "sunset", label: "غروب" },
];

const paceOptions = [
  { value: "slow", label: "بطيء" },
  { value: "balanced", label: "متوازن" },
  { value: "intensive", label: "مكثف" },
];

export default function TripPlannerPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isTourist = user?.role === "tourist";

  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: savedInterests = [], isLoading: interestsLoading } = useQuery({
    queryKey: ["tourist-interests-saved"],
    queryFn: getTouristInterests,
    enabled: isTourist,
  });

  const form = useForm<TripPlannerRequest>({
    defaultValues: defaultRequest,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const interestsValue = watch("interests");
  const interestText = interestsValue ? interestsValue.join(", ") : "";

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", Number(position.coords.latitude.toFixed(6)));
        setValue("longitude", Number(position.coords.longitude.toFixed(6)));
        toast.success("تم تحديد نقطة البداية");
      },
      () => toast.error("تعذر تحديد الموقع الحالي")
    );
  };

  const submit = async (data: TripPlannerRequest) => {
    if (isTourist && savedInterests.length === 0) {
      toast.error("حدد اهتماماتك أولاً قبل تخطيط الرحلة");
      navigate("/tourist/interests", { state: { from: "/tourist/trip" } });
      return;
    }

    setIsLoading(true);

    try {
      const interests = data.interests
        .join(",")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const result = await createSmartTripPlan({ ...data, interests });
      setPlan(result);
      toast.success("تم إنشاء خطة الرحلة بنجاح");
    } catch (error) {
      toast.error("فشل إنشاء خطة الرحلة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-primary-500">
          مخطط الرحلات الذكي
        </h1>


        {isTourist && !interestsLoading && savedInterests.length === 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4">
            <p className="text-sm font-medium text-primary-700">
              لم تحدد اهتماماتك بعد — حددها الآن لتخصيص خطط رحلاتك
            </p>
            <button
              type="button"
              onClick={() => navigate("/tourist/interests", { state: { from: "/tourist/trip" } })}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              تحديد اهتماماتي
            </button>
          </div>
        )}

      
        <form onSubmit={handleSubmit(submit)} className="mb-8 grid gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-2">
          <FormField
            label="خط العرض"
            name="latitude"
            register={register}
            errors={errors}
            type="number"
            inputProps={{ step: "any" }}
          />

          <FormField
            label="خط الطول"
            name="longitude"
            register={register}
            errors={errors}
            type="number"
            inputProps={{ step: "any" }}
          />

          <FormField
            label="الاهتمامات"
            name="interests"
            register={register}
            errors={errors}
            col={2}
            inputProps={{ 
              value: interestText,
              onChange: (e: any) => {
                const interests = e.target.value.split(",").map((item: string) => item.trim()).filter(Boolean);
                setValue("interests", interests);
              },
              placeholder: "تاريخي, طبيعي"
            }}
          />

          <FormField
            label="الميزانية"
            name="budget"
            register={register}
            errors={errors}
            type="number"
            inputProps={{ min: 0 }}
          />

          <FormField
            label="عدد الأيام"
            name="days"
            register={register}
            errors={errors}
            type="number"
            inputProps={{ min: 1, max: 14 }}
          />

          <FormField
            label="الفصل"
            name="season"
            register={register}
            errors={errors}
          >
            {seasonOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="الطقس"
            name="weather"
            register={register}
            errors={errors}
          >
            {weatherOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="الوقت المفضل"
            name="preferred_time"
            register={register}
            errors={errors}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="وتيرة الرحلة"
            name="pace"
            register={register}
            errors={errors}
          >
            {paceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="مستوى النشاط"
            name="preferred_activity_level"
            register={register}
            errors={errors}
            type="number"
            inputProps={{ min: 1, max: 4 }}
          />


          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              className="rounded-lg border border-primary-500 px-4 py-2 text-primary-600"
              type="button"
              onClick={useCurrentLocation}
            >
              استخدام موقعي الحالي
            </button>
            <button
              className="rounded-lg bg-primary-500 px-4 py-2 text-white disabled:opacity-60"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "جاري التخطيط..." : "إنشاء خطة الرحلة"}
            </button>
          </div>
        </form>

        {plan && (
          <section className="space-y-5">
            <div className="rounded-xl bg-white p-5 shadow">
              <h2 className="mb-3 text-xl font-semibold text-primary-500">ملخص الرحلة</h2>
              <div className="grid gap-3 text-sm md:grid-cols-4">

                <span>Days: {plan.summary.days}</span>
                <span>Start: {plan.summary.start_date}</span>
                <span>Places: {plan.summary.total_places}</span>
                <span>Cost: {plan.summary.total_cost}</span>

                <span>الأيام: {plan.summary.days}</span>
                <span>الأماكن: {plan.summary.total_places}</span>
                <span>التكلفة: {plan.summary.total_cost}</span>
                <span>وقت السفر: {plan.summary.total_travel_time} دقيقة</span>
              </div>
            </div>

            {plan.days.map((day) => (
              <div key={day.day} className="rounded-xl bg-white p-5 shadow">

                <h3 className="mb-4 text-lg font-semibold text-secondary-600">
                  Day {day.day}{day.date ? ` - ${day.date}` : ""}
                </h3>

                <h3 className="mb-4 text-lg font-semibold text-secondary-600">اليوم {day.day}</h3>

                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div key={activity.place_id} className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-semibold">{activity.name}</h4>
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-600">
                          التقييم {activity.score}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {activity.category} | {activity.start_time} - {activity.end_time} | وقت السفر {activity.travel_time_from_previous} دقيقة
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
