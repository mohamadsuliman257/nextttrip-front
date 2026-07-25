import type { User, AccountStatus } from "../types/user.type";
import useAuthStore from "@/features/auth/store/authStore";

interface UserTableProps {
  users: User[];
  onStatusChange: (id: number, status: AccountStatus) => void;
  onMakeAdmin?: (id: number) => void;
  isUpdating?: boolean;
}

const statusConfig: Record<AccountStatus, { label: string; color: string }> = {
  active: { label: "نشط", color: "bg-green-100 text-green-700" },
  blocked: { label: "محجوب", color: "bg-gray-100 text-gray-700" },
  unavailable: { label: "غير متاح", color: "bg-red-100 text-red-700" },
  closed: { label: "مغلق", color: "bg-orange-100 text-orange-700" },
};

const userTypeConfig: Record<"guide" | "tourist" | "admin", { label: string }> = {
  guide: { label: "مرشد" },
  tourist: { label: "سائح" },
  admin: { label: "مدير نظام" },
};

export default function UserTable({ users, onStatusChange, onMakeAdmin, isUpdating }: UserTableProps) {
  const { user: currentUser } = useAuthStore();
  return (
    <div className="bg-white shadow rounded-xl border border-primary-200 mb-10 p-2">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border border-primary-200">#</th>
            <th className="p-3 border border-primary-200">الاسم</th>
            <th className="p-3 border border-primary-200">البريد الإلكتروني</th>
            <th className="p-3 border border-primary-200">الهاتف</th>
            <th className="p-3 border border-primary-200">نوع المستخدم</th>
            <th className="p-3 border border-primary-200">حالة الحساب</th>
            <th className="p-3 border border-primary-200">تغيير الحالة</th>
            <th className="p-3 border border-primary-200">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-3 border border-primary-200 text-center text-gray-500">
                لا يوجد مستخدمين
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-3 py-1 border border-primary-200">{index + 1}</td>
                <td className="px-3 py-1 border border-primary-200">{user.name}</td>
                <td className="px-3 py-1 border border-primary-200">{user.email}</td>
                <td className="px-3 py-1 border border-primary-200">{user.phone || "-"}</td>                
                <td className="px-3 py-1 border border-primary-200">{userTypeConfig[user.role].label}</td>
                <td className="px-3 py-1 border border-primary-200">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[user.status].color}`}
                  >
                    {statusConfig[user.status].label}
                  </span>
                </td>
                <td className="px-3 py-1 border border-primary-200">
                  <select
                    value={user.status}
                    onChange={(e) => onStatusChange(user.id, e.target.value as AccountStatus)}
                    disabled={isUpdating || user.id === currentUser?.id}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="active">نشط</option>
                    <option value="blocked"> محجوب</option>
                    <option value="unavailable">غير متاح</option>
                    <option value="closed"> مغلق</option>
                  </select>
                </td>
                <td className="px-3 py-1 border border-primary-200">
                  {user.role === "tourist" && onMakeAdmin && user.id !== currentUser?.id && (
                    <button
                      onClick={() => {
                        if (window.confirm("هل أنت متأكد من تحويل هذا المستخدم إلى مدير نظام؟")) {
                          onMakeAdmin(user.id);
                        }
                      }}
                      disabled={isUpdating}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      تحويل إلى آدمن
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
