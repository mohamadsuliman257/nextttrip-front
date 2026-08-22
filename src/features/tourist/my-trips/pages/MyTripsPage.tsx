import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useMyTrips } from "../hooks/useMyTrips";
import TripCard from "../components/TripCard";
import { CreateTripModal } from "../components/CreateTripModal";


export default function MyTripsPage() {
  const { data: trips = [], isLoading, isError } = useMyTrips();
  const [showCreate, setShowCreate] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center text-slate-500">
        جاري تحميل رحلاتك...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center text-red-500">
        تعذر تحميل الرحلات. حاول مجدداً.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4  -mt-12">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <h1 className="text-center mb-2 text-2xl font-bold text-primary-500">رحلاتي</h1>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1 rounded-lg bg-primary-600 mb-3 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 mt-5 md:-mt-3"
        >
          <Plus size={16} />
          إضافة رحلة
        </button>
        {trips.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="mb-4 text-slate-600">لا توجد رحلات محفوظة بعد.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              >
                إضافة رحلة يدوياً
              </button>
              <Link
                to="/tourist/trip"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              >
                أنشئ خطة رحلة ذكية
              </Link>
              <Link
                to="/tourist/map"
                className="rounded-lg border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
              >
                استكشف الخريطة
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5 mb-10">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {showCreate && <CreateTripModal onClose={() => setShowCreate(false)} />}
      </div>
    </div>
  );
}
