import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import BookingsChart from "../components/BookingsChart";
import TripsChart from "../components/TripsChart";
import BookingTable from "../components/BookingTable";
import PlaceٍSuggestionTable from "../components/PlaceٍSuggestionTable";
import UserAnalytics from "../components/UserAnalytics";
import PlaceAnalytics from "../components/PlaceAnalytics";
import { getAnalytics } from "../api/getAnalytics.api";
import type { AnalyticsData } from "../types/analytics.type";

export default function AdminHomePage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalytics(period);
      console.log(data);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">جاري تحميل الإحصائيات...</div>
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-50">
      {/* Period Selector */}
      <div className="flex justify-end gap-2 mb-4">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'year')}
          className="px-4 py-2 border border-purple-200 rounded-lg bg-white"
        >
          <option value="week">آخر أسبوع</option>
          <option value="month">آخر شهر</option>
          <option value="year">آخر سنة</option>
        </select>
      </div>

      {/* البطاقات */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatsCard title="المستخدمون" value={analytics.overview.total_users} icon="👤" />
        <StatsCard title="المرشدون" value={analytics.overview.total_guides} icon="🧭" />
        <StatsCard title="الأماكن" value={analytics.overview.total_places} icon="🏛️" />
        <StatsCard title="الحجوزات" value={analytics.overview.total_bookings} icon="�" />
      </section>

      {/* Additional Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <StatsCard title="الرحلات" value={analytics.overview.total_trips} icon="🧳" />
        <StatsCard title="السياح" value={analytics.overview.total_tourists} icon="🎒" />
        <StatsCard title="اقتراحات معلقة" value={analytics.overview.pending_suggestions} icon="�" />
      </section>

      {/* الرسم البياني */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TripsChart data={analytics.trips.monthly_trend} />
        <BookingsChart data={analytics.bookings.monthly_trend} />
      </div>
      
      {/* Revenue Stats */}
      <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">إحصائيات الإيرادات</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 text-sm">إجمالي الإيرادات</p>
            <p className="text-2xl font-bold text-green-600">${analytics.revenue.total_revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">إيرادات الفترة</p>
            <p className="text-2xl font-bold text-blue-600">${analytics.revenue.in_period.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">متوسط قيمة الحجز</p>
            <p className="text-2xl font-bold text-purple-600">${analytics.revenue.average_booking_value.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <UserAnalytics users={analytics.users} />
        <PlaceAnalytics places={analytics.places} />
      </div>

      <BookingTable />
      <PlaceٍSuggestionTable />
    </div>
  );
}
