import type { User, AccountStatus } from "../types/user.type";

interface UserTableProps {
  users: User[];
  onStatusChange: (id: number, status: AccountStatus) => void;
  isUpdating?: boolean;
}

const statusConfig: Record<AccountStatus, { label: string; color: string }> = {
  active: { label: "نشط", color: "bg-green-100 text-green-700" },
  inactive: { label: "غير نشط", color: "bg-gray-100 text-gray-700" },
  suspended: { label: "معلق", color: "bg-red-100 text-red-700" },
  pending: { label: "قيد المراجعة", color: "bg-orange-100 text-orange-700" },
};

const userTypeConfig: Record<"guide" | "tourist", { label: string }> = {
  guide: { label: "مرشد" },
  tourist: { label: "سائح" },
};

export default function UserTable({ users, onStatusChange, isUpdating }: UserTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">المستخدمون</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">الاسم</th>
            <th className="p-3 border">البريد الإلكتروني</th>
            <th className="p-3 border">الهاتف</th>
            <th className="p-3 border">نوع المستخدم</th>
            <th className="p-3 border">حالة الحساب</th>
            <th className="p-3 border">تغيير الحالة</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 border text-center text-gray-500">
                لا يوجد مستخدمين
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.phone || "-"}</td>
                <td className="p-3 border">{userTypeConfig[user.user_type].label}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[user.account_status].color}`}
                  >
                    {statusConfig[user.account_status].label}
                  </span>
                </td>
                <td className="p-3 border">
                  <select
                    value={user.account_status}
                    onChange={(e) => onStatusChange(user.id, e.target.value as AccountStatus)}
                    disabled={isUpdating}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="suspended">معلق</option>
                    <option value="pending">قيد المراجعة</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
