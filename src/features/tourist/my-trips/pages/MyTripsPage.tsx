import { Link } from "react-router-dom";
import { useMyTrips } from "../hooks/useMyTrips";
import TripCard from "../components/TripCard";


export default function MyTripsPage() {
  const { data: trips = [], isLoading, isError } = useMyTrips();

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
      <h1 className="text-center mb-6 text-2xl font-bold text-primary-500">رحلاتي</h1>

      {trips.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-slate-600">لا توجد رحلات محفوظة بعد.</p>
          <div className="flex flex-wrap justify-center gap-3">
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
        <div className="space-y-5 my-10">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
