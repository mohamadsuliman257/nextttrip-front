import { useState } from "react";
import { CalendarDays, MapPin, Plus, X } from "lucide-react";
import type { Destination } from "@/features/admin/destinations/types/destination.type";
import { useMyTrips } from "@/features/tourist/my-trips/hooks/useMyTrips";
import { useAddPlaceToTrip } from "@/features/tourist/my-trips/hooks/useAddPlaceToTrip";
import { useCreateTrip } from "@/features/tourist/my-trips/hooks/useCreateTrip";

interface AddToTripModalProps {
  place: Destination;
  onClose: () => void;
}

// نافذة إضافة مكان إلى رحلة موجودة أو رحلة جديدة
export function AddToTripModal({ place, onClose }: AddToTripModalProps) {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);

  const { data: trips = [], isLoading } = useMyTrips();
  const addPlace = useAddPlaceToTrip(onClose);
  const create = useCreateTrip(onClose);

  const handleAddExisting = (tripId: number) => {
    addPlace.mutate({ tripId, place_id: place.id });
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    create.mutate({
      title: title.trim(),
      start_date: startDate || undefined,
      days,
      place_id: place.id,
    });
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
          <div>
            <h3 className="text-lg font-bold text-primary-700">أضف إلى رحلة</h3>
            <p className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} />
              {place.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!creating ? (
            <>
              <h4 className="mb-2 text-sm font-semibold text-slate-700">
                الرحلات الموجودة
              </h4>
              {isLoading ? (
                <p className="py-3 text-sm text-slate-400">جاري تحميل رحلاتك...</p>
              ) : trips.length === 0 ? (
                <p className="rounded-lg bg-slate-50 py-3 text-center text-sm text-slate-500">
                  لا توجد رحلات بعد.
                </p>
              ) : (
                <ul className="mb-4 max-h-52 space-y-2 overflow-y-auto">
                  {trips.map((trip) => (
                    <li key={trip.id}>
                      <button
                        type="button"
                        onClick={() => handleAddExisting(trip.id)}
                        disabled={addPlace.isPending}
                        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 text-right hover:border-primary-300 hover:bg-primary-50 disabled:opacity-50"
                      >
                        <span>
                          <span className="block font-medium text-primary-700">
                            {trip.title}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {trip.days ?? 0} أيام • {trip.trip_places?.length ?? 0} أماكن
                            {trip.start_date ? ` • ${trip.start_date}` : ""}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-md bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white">
                          {addPlace.isPending ? "..." : "إضافة"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                onClick={() => setCreating(true)}
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-primary-400 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
              >
                <Plus size={16} />
                إنشاء رحلة جديدة
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <label className="block text-sm text-slate-700">
                اسم الرحلة
                <input
                  type="text"
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
                    onChange={(event) => setDays(Math.max(1, Number(event.target.value) || 1))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCreating(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  رجوع
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={!title.trim() || create.isPending}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarDays size={15} />
                  {create.isPending ? "جاري الإنشاء..." : "إنشاء الرحلة وإضافة المكان"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
