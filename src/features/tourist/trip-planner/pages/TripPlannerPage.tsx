import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSmartTripPlan } from "../api/tripPlanner.api";
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
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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


        <form onSubmit={submit} className="mb-8 grid gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-2">
          <label className="space-y-1 text-sm font-medium">
            Latitude
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="number"
              step="any"
              value={form.latitude}
              onChange={(event) => updateForm("latitude", Number(event.target.value))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium">
            Longitude
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="number"
              step="any"
              value={form.longitude}
              onChange={(event) => updateForm("longitude", Number(event.target.value))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium md:col-span-2">
            Interests
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={interestText}
              onChange={(event) => setInterestText(event.target.value)}
              placeholder="historic, nature"
            />
          </label>

          <label className="space-y-1 text-sm font-medium">
            Budget
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="number"
              min={0}
              value={form.budget}
              onChange={(event) => updateForm("budget", Number(event.target.value))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium">
            Start date
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="date"
              min={today}
              value={form.start_date}
              onChange={(event) => updateForm("start_date", event.target.value)}
            />
          </label>

          <label className="space-y-1 text-sm font-medium">
            Days
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="number"
              min={1}
              max={14}
              value={form.days}
              onChange={(event) => updateForm("days", Number(event.target.value))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium">
            Season
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.season}
              onChange={(event) => updateForm("season", event.target.value as TripPlannerRequest["season"])}
            >
              <option value="winter">winter</option>
              <option value="spring">spring</option>
              <option value="summer">summer</option>
              <option value="autumn">autumn</option>
            </select>
          </label>

          <label className="space-y-1 text-sm font-medium">
            Weather
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.weather}
              onChange={(event) => updateForm("weather", event.target.value as TripPlannerRequest["weather"])}
            >
              <option value="sunny">sunny</option>
              <option value="cloudy">cloudy</option>
              <option value="rainy">rainy</option>
              <option value="hot">hot</option>
              <option value="cold">cold</option>
            </select>
          </label>

          <label className="space-y-1 text-sm font-medium">
            Preferred time
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.preferred_time}
              onChange={(event) => updateForm("preferred_time", event.target.value as TripPlannerRequest["preferred_time"])}
            >
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="evening">evening</option>
              <option value="sunset">sunset</option>
            </select>
          </label>

          <label className="space-y-1 text-sm font-medium">
            Pace
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.pace}
              onChange={(event) => updateForm("pace", event.target.value as TripPlannerRequest["pace"])}
            >
              <option value="slow">slow</option>
              <option value="balanced">balanced</option>
              <option value="intensive">intensive</option>
            </select>
          </label>

          <label className="space-y-1 text-sm font-medium">
            Activity level
            <input
              className="w-full rounded-lg border px-3 py-2"
              type="number"
              min={1}
              max={4}
              value={form.preferred_activity_level}
              onChange={(event) => updateForm("preferred_activity_level", Number(event.target.value))}
            />
          </label>

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
