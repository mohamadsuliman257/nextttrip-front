
import { useState } from "react";
import { CalendarDays, Clock, MapPin, Pencil, Sparkles, Trash2, Wallet } from "lucide-react";
import type { MyTrip, TripPlaceItem } from "../types/myTrip.types";
import { Link } from "react-router-dom";
import { EditTripModal } from "./EditTripModal";
import { EditTripPlaceModal } from "./EditTripPlaceModal";
import { useDeleteTripPlace } from "../hooks/useDeleteTripPlace";
import { getEndTime } from "../utils/dateTime";

interface TripCardProps {
  trip: MyTrip;
}

export default function TripCard({ trip }: TripCardProps) {
  const [editingTrip, setEditingTrip] = useState(false);
  const [editingItem, setEditingItem] = useState<TripPlaceItem | null>(null);

  const deleteItem = useDeleteTripPlace();

  const daysMap = new Map<number, TripPlaceItem[]>();
  trip.trip_places?.forEach((item) => {
    const list = daysMap.get(item.day_number) ?? [];
    list.push(item);
    daysMap.set(item.day_number, list);
  });

  const maxDay = Math.max(trip.days ?? trip.day_count ?? 1, ...daysMap.keys(), 1);
  const isAi = trip.source === "ai";

  const handleDeleteItem = (item: TripPlaceItem) => {
    if (window.confirm(`هل تريد حذف "${item.place?.name ?? "هذا البند"}" من الرحلة؟`)) {
      deleteItem.mutate({ tripId: trip.id, tripPlaceId: item.id });
    }
  };

  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-primary-700">{trip.title}</h2>
        <div className="flex items-center gap-2">
          {isAi ? (
            <span className="flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              <Sparkles size={13} />
              خطة ذكية
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              رحلة يدوية
            </span>
          )}
          <button
            type="button"
            onClick={() => setEditingTrip(true)}
            className="flex items-center gap-1 rounded-lg border border-primary-300 px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
            aria-label="تعديل الرحلة"
          >
            <Pencil size={13} />
            تعديل الرحلة
          </button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-3 text-sm text-slate-600">
        <span className="flex items-center gap-1">
          <CalendarDays size={15} />
          {trip.start_date ?? "بدون تاريخ"}
          {trip.end_date ? ` - ${trip.end_date}` : ""}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={15} />
          {trip.days ?? 0} يوم
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={15} />
          التكلفة: {trip.total_cost ?? 0} د.ل
          {trip.budget_max != null ? ` / الميزانية ${trip.budget_max} د.ل` : ""}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={15} />
          {trip.trip_places?.length ?? 0} مكان
        </span>
      </div>

      {daysMap.size === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">
          لا توجد أماكن في هذه الرحلة بعد. أضف أماكن من
          <Link to="/tourist/map" className="font-semibold text-primary-600 hover:underline">
            الخريطة
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {[...daysMap.entries()].sort((a, b) => a[0] - b[0]).map(([day, items]) => (
            <div key={day} className="rounded-xl border border-primary-100 bg-primary-50/40 p-3">
              <h3 className="mb-2 font-semibold text-secondary-700">اليوم {day}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 rounded-lg bg-white p-2 text-sm">
                    <span className="mt-0.5 text-slate-400">{item.order}.</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-primary-700">
                        {item.place?.name ?? "مكان خارج القاعدة"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.place?.city?.name ? `${item.place.city.name} - ` : ""}
                        {item.place?.category?.name ?? item.note ?? ""}
                      </p>
                      <p className="text-xs text-slate-400">
                        من {item.start_time?.slice(0, 5) ?? "--:--"} إلى{" "}
                        {getEndTime(item.start_time, item.duration_minutes)}
                        {item.duration_minutes > 0 ? ` • مدة ${item.duration_minutes} دقيقة` : ""}
                        {item.travel_minutes > 0 ? ` • سفر ${item.travel_minutes} دقيقة` : ""}
                        {item.estimated_cost > 0 ? ` • ${item.estimated_cost} د.ل` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-start gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        disabled={deleteItem.isPending}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50"
                        aria-label="تعديل التوقيت"
                        title="تعديل التوقيت"
                      >
                        <Clock size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item)}
                        disabled={deleteItem.isPending}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        aria-label="حذف البند"
                        title="حذف البند"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex justify-end">
        <Link
          to="/tourist/map"
          className="rounded-lg border border-primary-300 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50"
        >
          إضافة أماكن من الخريطة
        </Link>
      </div>

      {editingTrip && <EditTripModal trip={trip} onClose={() => setEditingTrip(false)} />}
      {editingItem && (
        <EditTripPlaceModal
          tripId={trip.id}
          item={editingItem}
          maxDay={maxDay}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}
