import { useState } from "react";
import { CalendarDays, MapPin, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateTrip } from "../hooks/useCreateTrip";

interface CreateTripModalProps {
  onClose: () => void;
}

const PACES = [
  { value: "slow", label: "هادئ" },
  { value: "medium", label: "متوسط" },
  { value: "intensive", label: "مكثّف" },
];

// نافذة إنشاء رحلة جديدة يدوياً
export function CreateTripModal({ onClose }: CreateTripModalProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [budgetMax, setBudgetMax] = useState("");
  const [tripPace, setTripPace] = useState("medium");

  const create = useCreateTrip();

  const buildPayload = () => ({
    title: title.trim(),
    start_date: startDate || undefined,
    days,
    budget_max: budgetMax ? Number(budgetMax) : undefined,
    trip_pace: tripPace,
  });

  // حفظ الرحلة ثم الانتقال إلى واجهة استكشاف الأماكن
  const handleSubmit = async (goToExplore: boolean) => {
    if (!title.trim()) return;
    try {
      await create.mutateAsync(buildPayload());
      onClose();
      if (goToExplore) {
        navigate("/tourist/map");
      }
    } catch {
      // الأخطاء تُعرض عبر toast في الهوك
    }
  };

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
            <Plus size={18} />
            إضافة رحلة
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
            void handleSubmit(false);
          }}
        >
          <label className="block text-sm text-slate-700">
            اسم الرحلة <span className="text-red-500">*</span>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="مثال: رحلة نهاية الأسبوع"
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

          <div className="mt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={!title.trim() || create.isPending}
              className="flex items-center justify-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarDays size={15} />
              {create.isPending ? "جاري الحفظ..." : "حفظ الرحلة"}
            </button>

            <button
              type="button"
              onClick={() => void handleSubmit(true)}
              disabled={!title.trim() || create.isPending}
              className="flex items-center justify-center gap-1 rounded-lg border border-dashed border-primary-400 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MapPin size={15} />
              حفظ وإضافة أماكن
            </button>
            <p className="text-center text-xs text-slate-400">
              سيتم حفظ الرحلة أولاً ثم الانتقال إلى واجهة استكشاف الأماكن لإضافتها.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
