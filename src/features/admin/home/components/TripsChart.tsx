interface TripsChartProps {
  data?: Array<{
    month: number;
    month_name?: string;
    year: number;
    count: number;
  }>;
}


export default function TripsChart({ data = []}: TripsChartProps) {
  // حساب أعلى قيمة للمخطط لضبط النسب بشكل آمن
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  // مصفوفة احتياطية لأسماء الأشهر العربية
    const MonthNames = ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'];


  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-purple-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">إحصائيات الرحلات</h3>

        <p className="text-xs text-gray-500 mb-4">معدل  الرحلات المضافة لكل شهر</p>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          لا توجد بيانات متوفرة
        </div>
      ) : (
        /* الحاوية الأساسية للشارت مصفوفة بشكل flex أفقي بارتفاع ثابت */
        <div className="h-64 flex items-end justify-between gap-3 px-2 pt-6 border-b border-gray-100 w-full">
          {data.map((item, index) => {
            // حساب نسبة الارتفاع الصافية للعمود
            const heightPercentage = (item.count / maxCount) * 100;
            
            // اعتماد الاسم القادم من الباك إند أو الحساب من مصفوفة الاحتياط
            const label = MonthNames[item.month - 1] ;

            return (
              <div key={index} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group min-w-[35px] relative">
                
                <div className="relative w-full flex-1 flex items-end justify-center">
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded absolute pointer-events-none shadow-sm z-10 bottom-[105%] left-1/2 -translate-x-1/2 whitespace-nowrap mb-1">
                    {item.count} رحلة
                  </div>

                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-500 ease-out hover:bg-blue-600 shadow-sm"
                    style={{ height: `${heightPercentage}%`, minHeight: item.count > 0 ? '6px' : '2px' }}
                    title={`${label}: ${item.count} رحلة`}
                  />
                </div>
                
                <span className="text-[10px] font-medium text-gray-500 text-center truncate max-w-full block h-4 mt-1" title={label}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
