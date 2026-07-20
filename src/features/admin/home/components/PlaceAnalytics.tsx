interface PlaceAnalyticsProps {
  places: {
    total: number;
    by_category: Array<{
      category: string;
      count: number;
    }>;
    by_city: Array<{
      city: string;
      count: number;
    }>;
    average_rating: number;
    total_reviews: number;
  };
}

export default function PlaceAnalytics({ places }: PlaceAnalyticsProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">إحصائيات الأماكن</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">إجمالي الأماكن</p>
          <p className="text-2xl font-bold text-blue-600">{places.total}</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">متوسط التقييم</p>
          <p className="text-2xl font-bold text-yellow-600">{places.average_rating.toFixed(1)}</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">إجمالي التقييمات</p>
          <p className="text-2xl font-bold text-green-600">{places.total_reviews}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Category */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">حسب التصنيف</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {places.by_category.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{item.category}</span>
                  <span className="font-semibold text-blue-600">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(item.count / places.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By City */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">حسب المدينة</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {places.by_city.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{item.city}</span>
                  <span className="font-semibold text-green-600">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(item.count / places.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
