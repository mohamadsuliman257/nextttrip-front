import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { createSmartTripPlan } from "../api/tripPlanner.api";
import type { TripPlan, TripPlannerRequest } from "../types/tripPlanner.types";

const defaultRequest: TripPlannerRequest = {
  latitude: 33.5138,
  longitude: 36.2765,
  interests: ["historic", "nature"],
  budget: 120,
  days: 2,
  season: "spring",
  weather: "sunny",
  preferred_time: "morning",
  preferred_activity_level: 2,
  pace: "balanced",
};

export default function TripPlannerPage() {
  const [form, setForm] = useState<TripPlannerRequest>(defaultRequest);
  const [interestText, setInterestText] = useState(defaultRequest.interests.join(", "));
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = <K extends keyof TripPlannerRequest>(key: K, value: TripPlannerRequest[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateForm("latitude", Number(position.coords.latitude.toFixed(6)));
        updateForm("longitude", Number(position.coords.longitude.toFixed(6)));
        toast.success("تم تحديد نقطة البداية");
      },
      () => toast.error("تعذر تحديد الموقع الحالي")
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const interests = interestText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const result = await createSmartTripPlan({ ...form, interests });
      setPlan(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-primary-500">
          Smart Trip Planner
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

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              className="rounded-lg border border-primary-500 px-4 py-2 text-primary-600"
              type="button"
              onClick={useCurrentLocation}
            >
              Use current location
            </button>
            <button
              className="rounded-lg bg-primary-500 px-4 py-2 text-white disabled:opacity-60"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Planning..." : "Create trip plan"}
            </button>
          </div>
        </form>

        {plan && (
          <section className="space-y-5">
            <div className="rounded-xl bg-white p-5 shadow">
              <h2 className="mb-3 text-xl font-semibold text-primary-500">Trip summary</h2>
              <div className="grid gap-3 text-sm md:grid-cols-4">
                <span>Days: {plan.summary.days}</span>
                <span>Places: {plan.summary.total_places}</span>
                <span>Cost: {plan.summary.total_cost}</span>
                <span>Travel: {plan.summary.total_travel_time} min</span>
              </div>
            </div>

            {plan.days.map((day) => (
              <div key={day.day} className="rounded-xl bg-white p-5 shadow">
                <h3 className="mb-4 text-lg font-semibold text-secondary-600">Day {day.day}</h3>
                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div key={activity.place_id} className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-semibold">{activity.name}</h4>
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-600">
                          score {activity.score}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {activity.category} | {activity.start_time} - {activity.end_time} | travel {activity.travel_time_from_previous} min
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
