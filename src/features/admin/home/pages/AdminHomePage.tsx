import { 
  Users, 
  Compass, 
  MapPin, 
  CalendarCheck, 
  Luggage, 
  Backpack,
  DollarSign,
  TrendingUp,
  Percent
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import BookingsChart from "../components/BookingsChart";
import TripsChart from "../components/TripsChart";
import BookingTable from "../components/BookingTable";
import PlaceٍSuggestionTable from "../components/PlaceٍSuggestionTable";
import UserAnalytics from "../components/UserAnalytics";
import PlaceAnalytics from "../components/PlaceAnalytics";
import { useAnalytics } from "../hooks/useAnalytics";

export default function AdminHomePage() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-purple-600 animate-pulse">جاري تحميل الإحصائيات...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 -mt-8">
      {/* قسم بطاقات الإحصائيات مع الأيقونات الحديثة */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard 
          title="المستخدمون" 
          value={analytics.overview.total_users} 
          icon={<Users className="w-6 h-6 text-blue-500" />} 
        />
        <StatsCard 
          title="المرشدون" 
          value={analytics.overview.total_guides} 
          icon={<Compass className="w-6 h-6 text-purple-500" />} 
        />
        <StatsCard 
          title="الأماكن" 
          value={analytics.overview.total_places} 
          icon={<MapPin className="w-6 h-6 text-emerald-500" />} 
        />
        <StatsCard 
          title="الحجوزات" 
          value={analytics.overview.total_bookings} 
          icon={<CalendarCheck className="w-6 h-6 text-orange-500" />} 
        />
        <StatsCard 
          title="الرحلات" 
          value={analytics.overview.total_trips} 
          icon={<Luggage className="w-6 h-6 text-indigo-500" />} 
        />
        <StatsCard 
          title="السياح" 
          value={analytics.overview.total_tourists} 
          icon={<Backpack className="w-6 h-6 text-rose-500" />} 
        />
      </section>

      {/* التحليلات المفصلة للأماكن والمستخدمين */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserAnalytics users={analytics.users} />
        <PlaceAnalytics places={analytics.places} />
      </div>

      {/* إحصائيات الإيرادات مع تصحيح المظهر والأيقونات الداخلية */}
      <div className="bg-white/90 shadow-sm rounded-xl p-5 border border-purple-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">إحصائيات الإيرادات</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 bg-secondary-50/60 rounded-lg border border-secondary-500 flex items-center justify-between">
            <div>
              <p className="text-secondary-500 text-sm mb-1">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-secondary-600">${analytics.revenue.total_revenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-secondary-100/50 rounded-lg text-secondary-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 bg-primary-50/60 rounded-lg border border-primary-500 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">إيرادات السنة الحالية</p>
              <p className="text-2xl font-bold text-primary-600">${analytics.revenue.last_year_revenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-100/50 rounded-lg text-primary-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-500 flex items-center justify-between">
            <div>
              <p className="text-amber-700 text-sm mb-1">متوسط قيمة الحجز</p>
              <p className="text-2xl font-bold text-amber-600">${analytics.revenue.average_booking_value.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-100/50 rounded-lg text-amber-600">
              <Percent className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* المخططات البيانية العمودية  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TripsChart data={analytics.trips} />
        <BookingsChart data={analytics.bookings} />
      </div>

      {/* جداول البيانات الاستعراضية */}
      <BookingTable />
      <PlaceٍSuggestionTable />
    </div>
  );
}
