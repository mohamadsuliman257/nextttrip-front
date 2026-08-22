import { useState } from "react";
import { Clock, Save, X } from "lucide-react";
import type { TripPlaceItem } from "../types/myTrip.types";
import { useUpdateTripPlace } from "../hooks/useUpdateTripPlace";

interface EditTripPlaceModalProps {
  tripId: number;
  item: TripPlaceItem;
  maxDay: number;
  onClose: () => void;
}

// نافذة تعديل توقيت بند داخل الرحلة (اليوم، وقت البداية والمدة)
export function EditTripPlaceModal({ tripId, item, maxDay, onClose }: EditTripPlaceModalProps) {
  const [dayNumber, setDayNumber] = useState(item.day_number);
  const [startTime, setStartTime] = useState(item.start_time?.slice(0, 5) ?? "");
  const [durationMinutes, setDurationMinutes] = useState(String(item.duration_minutes ?? ""));
  const [note, setNote] = useState(item.note ?? "");

  const update = useUpdateTripPlace(onClose);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between border-b border-slate-100 p-4">
          <h3 className="flex items-center gap-2 text-base font-bold text-primary-700">
            <Clock size={16} />
            تعديل التوقيت - {item.place?.name ?? "مكان خارج القاعدة"}
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
          className="flex flex-col gap-3 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            update.mutate({
              tripId,
              tripPlaceId: item.id,
              day_number: dayNumber,
              start_time: startTime || undefined,
              duration_minutes: durationMinutes ? Math.max(5, Number(durationMinutes) || 0) : undefined,
              note: note.trim() || undefined,
            });
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-slate-700">
              اليوم
              <select
                value={dayNumber}
                onChange={(event) => setDayNumber(Number(event.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              >
                {Array.from({ length: Math.max(1, maxDay) }, (_, index) => index + 1).map((day) => (
                  <option key={day} value={day}>
                    اليوم {day}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              وقت البداية
              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
              />
            </label>
          </div>

          <label className="block text-sm text-slate-700">
            المدة (بالدقائق)
            <input
              type="number"
              min={5}
              max={1440}
              step={5}
              value={durationMinutes}
              onChange={(event) =>
                setDurationMinutes(event.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="مثال: 90"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
            />
          </label>

          <label className="block text-sm text-slate-700">
            ملاحظة
            <textarea
              rows={2}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="اختياري"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
            />
          </label>

          <button
            type="submit"
            disabled={update.isPending}
            className="flex items-center justify-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={15} />
            {update.isPending ? "جاري الحفظ..." : "حفظ التوقيت"}
          </button>
        </form>
      </div>
    </div>
  );
}
