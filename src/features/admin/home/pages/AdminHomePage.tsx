// src/features/admin/dashboard/pages/AdminDashboardPage.tsx

import StatsCard from "../components/StatsCard";
import GuidesTable from "../components/GuidesTable";
import PlacesTable from "../components/PlacesTable";
import BookingsChart from "../components/BookingsChart";
import PlacesChart from "../components/PlacesChart";

export default function AdminHomePage() {
  return (
    <div className="space-y-2">
      {/* البطاقات */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <StatsCard title="المستخدمون" value="1200" icon="👤" />
        <StatsCard title="المرشدون" value="85" icon="🧭" />
        <StatsCard title="الأماكن" value="340" icon="📍" />
        <StatsCard title="الحجوزات" value="540" icon="📅" />
      </section>

      {/* الرسم البياني */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <BookingsChart />
        <PlacesChart />
      </div>
      <GuidesTable />
      <PlacesTable />
    </div>
  );
}
