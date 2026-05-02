import { Bell, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between  px-20 py-3 ">
      <button className="relative">
        <Bell size={40} className="text-secondary-400 " />
        <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center font-extrabold">
          3
        </span>
      </button>
      <button className="flex items-center gap-2 text-secondary-800 hover:text-secondary-500 text-lg">
          <LogOut size={18} /> تسجيل الخروج
        </button>
    </header>
  );
}
