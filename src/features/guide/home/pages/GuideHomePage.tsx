import StatsCard from "../components/StatsCard";
import CalendarWidget from "../components/CalendarWidget";
import ReviewsWidget from "../components/ReviewsWidget";
import RecentBookingsTable from "../components/RecentBookingsTable";

export default function GuideHomePage() {
  return (
      <div className="space-y-2.5">

        {/* البطاقات العلوية */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <StatsCard title="طلبات جديدة" value="4" icon="✈️" />
          <StatsCard title="رحلات مؤكدة" value="9" icon="✔️" />
          <StatsCard title="تقييمك" value="4.8" icon="⭐" />
          <StatsCard title="أيامي المحجوزة" value="15" icon="📅" />
        </section>       

        {/* التقويم والتقييمات */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <CalendarWidget />
          <ReviewsWidget />
        </section>

        <RecentBookingsTable />
    
      </div>
  );
}
