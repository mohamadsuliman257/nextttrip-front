import useAuthStore from "@/features/auth/store/authStore";
import { LogOut } from "lucide-react";
import NotificationBell from "@/features/notifications/components/NotificationBell";

export default function Header() {
  const logout = useAuthStore((set) => set.logout);
  return (
    <header className="flex items-center justify-between  px-20 py-3 ">
      <NotificationBell />
      <button className="flex items-center gap-2 text-secondary-500 hover:text-secondary-400 text-lg cursor-pointer" onClick={logout}>
           تسجيل الخروج <LogOut size={18} className="rotate-180"/>
        </button>
    </header>
  );
}
