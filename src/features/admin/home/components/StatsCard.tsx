// src/features/admin/dashboard/components/StatsCard.tsx
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode; // تعديل هذا السطر ليستقبل الأيقونة البرمجية
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white/80 shadow-sm rounded-xl p-5 border border-purple-200 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
      {/* عرض الأيقونة البرمجية مباشرة */}
      <div className="text-4xl">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 font-medium text-xs whitespace-nowrap">{title}</h3>
        <p className="text-xl font-bold text-gray-950 mt-0.5">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
}
