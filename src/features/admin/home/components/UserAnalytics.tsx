interface UserAnalyticsProps {
  users: {
    by_role: {
      admin: number;
      guide: number;
      tourist: number;
    };
    by_status: {
      active: number;
      blocked: number;
      unavailable: number;
    };
    new_users_this_month: number;
    new_users_this_week: number;
  };
}

export default function UserAnalytics({ users }: UserAnalyticsProps) {
  const totalUsers = users.by_role.admin + users.by_role.guide + users.by_role.tourist;

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">إحصائيات المستخدمين</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Role */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">حسب النوع</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">المرشدون</span>
              <span className="font-semibold text-blue-600">{users.by_role.guide}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(users.by_role.guide / totalUsers) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">السياح</span>
              <span className="font-semibold text-green-600">{users.by_role.tourist}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(users.by_role.tourist / totalUsers) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">المديرون</span>
              <span className="font-semibold text-purple-600">{users.by_role.admin}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${(users.by_role.admin / totalUsers) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* By Status */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">حسب الحالة</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">نشط</span>
              <span className="font-semibold text-green-600">{users.by_status.active}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(users.by_status.active / totalUsers) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">غير متاح</span>
              <span className="font-semibold text-yellow-600">{users.by_status.unavailable}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(users.by_status.unavailable / totalUsers) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">محظور</span>
              <span className="font-semibold text-red-600">{users.by_status.blocked}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(users.by_status.blocked / totalUsers) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Users */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">جديد هذا الأسبوع</p>
            <p className="text-2xl font-bold text-blue-600">{users.new_users_this_week}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">جديد هذا الشهر</p>
            <p className="text-2xl font-bold text-green-600">{users.new_users_this_month}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
