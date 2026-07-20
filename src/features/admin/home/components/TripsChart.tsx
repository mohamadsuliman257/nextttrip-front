interface TripsChartProps {
  data?: Array<{
    month: number;
    year: number;
    count: number;
  }>;
}

export default function TripsChart({ data = [] }: TripsChartProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">
        إحصائيات الرحلات
      </h3>

      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-500">
          لا توجد بيانات
        </div>
      ) : (
        <div className="h-40 flex items-end gap-3">
          {data.map((item, index) => {
            const height = (item.count / maxCount) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-secondary-500 rounded transition-all duration-300 hover:bg-secondary-600"
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${item.count} رحلة`}
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
