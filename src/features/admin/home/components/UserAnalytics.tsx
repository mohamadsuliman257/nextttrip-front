import type { AnalyticsData } from "../types/analytics.type";

interface UserAnalyticsProps {
  users: AnalyticsData  ["users"];
}

export default function UserAnalytics({ users }: UserAnalyticsProps) {
  const totalUsers = users.by_role.admin + users.by_role.guide + users.by_role.tourist;

  // دالة مساعدة لحساب النسبة المئوية بأمان ومنع حدوث Division by Zero
  const calculatePercentage = (value: number) => {
    if (totalUsers === 0) return 0;
    return (value / totalUsers) * 100;
  };

  return (
    <div className="bg-white/90 shadow-sm rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">إحصائيات المستخدمين</h3>
      {/* New Users */}

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-primary-50/80 rounded-lg border border-primary-50">
          <p className="text-sm text-gray-500 mb-0.5">جديد هذا الأسبوع</p>
          <p className="text-2xl font-bold text-blue-600">{users.new_users_this_week.toLocaleString()}</p>
        </div>
        <div className="text-center p-3 bg-secondary-100/50 rounded-lg border border-secondary-50">
          <p className="text-sm text-gray-500 mb-0.5">جديد هذا الشهر</p>
          <p className="text-2xl font-bold text-green-600">{users.new_users_this_month.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Role */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-7">حسب النوع</h4>
          <div className="space-y-7">
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">المرشدون</span>
                <span className="font-semibold text-blue-600">{users.by_role.guide}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${calculatePercentage(users.by_role.guide)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">السياح</span>
                <span className="font-semibold text-green-600">{users.by_role.tourist}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(users.by_role.tourist)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">المديرون</span>
                <span className="font-semibold text-purple-600">{users.by_role.admin}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(users.by_role.admin)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* By Status */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-7">حسب الحالة</h4>
          <div className="space-y-7">
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">نشط</span>
                <span className="font-semibold text-green-600">{users.by_status.active}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(users.by_status.active)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">غير متاح</span>
                <span className="font-semibold text-yellow-600">{users.by_status.unavailable}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(users.by_status.unavailable)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">محظور</span>
                <span className="font-semibold text-red-600">{users.by_status.blocked}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(users.by_status.blocked)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
