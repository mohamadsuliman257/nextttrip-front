// src/features/admin/dashboard/components/BookingsChart.tsx

interface BookingsChartProps {
  data?: Array<{
    month: number;
    year: number;
    count: number;
  }>;
}

export default function BookingsChart({ data = [] }: BookingsChartProps) {
  console.log('BookingsChart data:', data);
  const maxCount = Math.max(...data.map(d => d.count), 1);

  const monthNames = ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'ايلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'];

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">
        حجوزات المرشدين
      </h3>
      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-500">
          لا توجد بيانات
        </div>
      ) : (
        <div className="h-64 flex items-end gap-4 px-4">
          {data.map((item, index) => {
            const height = (item.count / maxCount) * 100;
            console.log(`Item ${index}: count=${item.count}, maxCount=${maxCount}, height=${height}%`);
            return (
              <div key={index} className="flex flex-col items-center gap-1" style={{ width: '60px' }}>
                <div
                  className="bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                  style={{ height: `${height}%`, minHeight: '8px', width: '100%' }}
                  title={`${item.count} حجز`}
                />
                <span className="text-xs text-gray-600">
                  {monthNames[item.month - 1]}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
