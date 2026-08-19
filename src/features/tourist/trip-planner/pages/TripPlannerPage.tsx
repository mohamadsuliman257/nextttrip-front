import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Select, { components, type OptionProps } from "react-select";
import toast from "react-hot-toast";
import { tripPlannerSchema } from "../schemas/tripPlanner.schema";
import { createSmartTripPlan } from "../api/tripPlanner.api";
import { getTouristInterests } from "@/features/tourist/interests/api/getTouristInterests.api";
import { getAllInterests } from "@/features/tourist/interests/api/getAllInterests.api";
import useAuthStore from "@/features/auth/store/authStore";
import type { TripPlan, TripPlannerRequest } from "../types/tripPlanner.types";
import FormField from "@/components/FormField";
import LocationMapPicker from "@/components/LocationMapPicker";

const today = new Date().toISOString().split("T")[0];

type InterestOption = { value: string; label: string };

function InterestSelectOption(props: OptionProps<InterestOption, true>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={props.isSelected} readOnly className="h-4 w-4 accent-primary-600" />
        <span>{props.label}</span>
      </div>
    </components.Option>
  );
}

const defaultRequest: TripPlannerRequest = {
  title: "رحلة مميزة",
  latitude: 33.5138,
  longitude: 36.2765,
  interests: [],
  // interests: ["historic", "nature"],
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
  const isTourist = user?.role === "tourist";//X

  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: savedInterests = [], isLoading: interestsLoading } = useQuery({
    queryKey: ["tourist-interests-saved"],
    queryFn: getTouristInterests,
    enabled: isTourist,//X
  });

  const { data: allInterests = [], isLoading: allInterestsLoading } = useQuery({
    queryKey: ["tourist-interests-all"],
    queryFn: getAllInterests,
  });

  const form = useForm<TripPlannerRequest>({
    defaultValues: defaultRequest,
    resolver: zodResolver(tripPlannerSchema),
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const watchedInterests = watch("interests");
  const interestsValue = Array.isArray(watchedInterests) ? watchedInterests : [];
  const interestsInitialized = useRef(false);

  useEffect(() => {
    if (interestsInitialized.current || allInterestsLoading || interestsLoading) return;
    setValue(
      "interests",
      isTourist
        ? allInterests.filter((interest) => savedInterests.includes(interest.id)).map((interest) => interest.name)
        : [],
      { shouldValidate: false }
    );
    interestsInitialized.current = true;
  }, [allInterests, allInterestsLoading, interestsLoading, isTourist, savedInterests, setValue]);
  const selectedLatitude = watch("latitude");
  const selectedLongitude = watch("longitude");

  const submit = async (data: TripPlannerRequest) => {
    setIsLoading(true);

    try {
      const interests = data.interests
        .join(",")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const result = await createSmartTripPlan({ ...data, interests });
      console.log(result);
      setPlan(result);
      toast.success(
        isTourist && result.trip_id
          ? "تم إنشاء خطة الرحلة وحفظها في رحلاتي بنجاح"
          : "تم إنشاء خطة الرحلة بنجاح"
      );
    } catch (error) {
      toast.error("فشل إنشاء خطة الرحلة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-10 px-4 ">
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


        <form onSubmit={handleSubmit(submit)} className="mb-8 grid gap-4 rounded-xl bg-white/60 p-5 shadow md:grid-cols-2">

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-primary-700">الاهتمامات</label>
            <Select<InterestOption, true>
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isLoading={allInterestsLoading}
              isDisabled={allInterestsLoading}
              options={allInterests.map((interest) => ({ value: interest.name, label: interest.name }))}
              value={allInterests
                .filter((interest) => interestsValue.includes(interest.name))
                .map((interest) => ({ value: interest.name, label: interest.name }))}
              onChange={(selected) => setValue("interests", selected.map((interest) => interest.value), { shouldValidate: true })}
              components={{ Option: InterestSelectOption }}
              placeholder="اختر اهتماماتك"
              noOptionsMessage={() => "لا توجد اهتمامات"}
              className="text-right"
              classNamePrefix="interest-select"
            />
            {errors.interests && <p className="text-sm text-red-500">{errors.interests.message}</p>}
          </div>          <FormField
            label="العنوان"
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
            inputProps={{ min: 0 }}
          />

          <FormField
            label="تاريخ البدء"
            name="start_date"
            register={register}
            errors={errors}
            type="date"
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

          <div className="md:col-span-2">
            <LocationMapPicker
              latitude={selectedLatitude?.toString()}
              longitude={selectedLongitude?.toString()}
              onLocationChange={(lat, lng) => {
                setValue("latitude", Number(lat), { shouldValidate: true });
                setValue("longitude", Number(lng), { shouldValidate: true });
              }}
              title="حدد بداية الرحلة"
            />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
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

            {plan.trip_id && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-800">
                  تم حفظ هذه الخطة في رحلاتك ويمكنك مشاهدتها أو إضافة أماكن إليها لاحقاً.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/tourist/my-trips")}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  عرض رحلاتي
                </button>
              </div>
            )}

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
