import { useState } from "react";
import { CalendarDays, Pencil, X } from "lucide-react";
import type { MyTrip } from "../types/myTrip.types";
import { useUpdateTrip } from "../hooks/useUpdateTrip";

interface EditTripModalProps {
  trip: MyTrip;
  onClose: () => void;
}

const PACES = [
  { value: "slow", label: "هادئ" },
  { value: "medium", label: "متوسط" },
  { value: "intensive", label: "مكثّف" },
];

// نافذة تعديل بيانات الرحلة (الاسم، التوقيت، الأيام، الميزانية)
export function EditTripModal({ trip, onClose }: EditTripModalProps) {
  const [title, setTitle] = useState(trip.title ?? "");
  const [startDate, setStartDate] = useState(trip.start_date?.slice(0, 10) ?? "");
  const [days, setDays] = useState(trip.days ?? 1);
  const [budgetMax, setBudgetMax] = useState(
    trip.budget_max != null ? String(trip.budget_max) : ""
  );
  const [tripPace, setTripPace] = useState(trip.trip_pace ?? "medium");

  const update = useUpdateTrip(onClose);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between border-b border-slate-100 p-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-primary-700">
            <Pencil size={17} />
            تعديل الرحلة
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
          onSubmit={(event) => {
            event.preventDefault();
            update.mutate({
              tripId: trip.id,
              title: title.trim(),
              start_date: startDate || null,
              days,
              budget_max: budgetMax ? Number(budgetMax) : null,
              trip_pace: tripPace,
            });
          }}
        >
          <label className="block text-sm text-slate-700">
            اسم الرحلة <span className="text-red-500">*</span>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-slate-700">
              تاريخ البداية
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              />
            </label>
            <label className="block text-sm text-slate-700">
              عدد الأيام
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(event) => setDays(Math.max(1, Math.min(30, Number(event.target.value) || 1)))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-slate-700">
              الميزانية القصوى (د.ل)
              <input
                type="number"
                min={0}
                value={budgetMax}
                onChange={(event) => setBudgetMax(event.target.value)}
                placeholder="اختياري"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              />
            </label>
            <label className="block text-sm text-slate-700">
              وتيرة الرحلة
              <select
                value={tripPace}
                onChange={(event) => setTripPace(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              >
                {PACES.map((pace) => (
                  <option key={pace.value} value={pace.value}>
                    {pace.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={!title.trim() || update.isPending}
            className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarDays size={15} />
            {update.isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </form>
      </div>
    </div>
  );
}
