import { NavLink } from "react-router-dom";
import { Home, Calendar, Star, Briefcase, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/guide", icon: Home, label: "الرئيسية" },
    { to: "/guide/bookings", icon: Briefcase, label: "حجوزاتي" },
    { to: "/guide/calendar", icon: Calendar, label: "جدول الرحلات" },
    { to: "/guide/reviews", icon: Star, label: "تقييماتي" },
  ];

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4  bg-primary-200 shadow p-2 rounded-full"
      >
        <Menu size={22} />
      </button>

      {/* خلفية غامقة تظهر عند فتح القائمة */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-primary-800/80 md:hidden z-40 h-screen w-full"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-64 z-40 h-screen          
           text-secondary-800 md:bg-white/10 bg-white/90
          flex flex-col items-center py-6 shadow-xl
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0
          transform transition-transform duration-800
        `}
      >
        {/* زر X للإغلاق (يظهر فقط في الجوال) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 left-4 bg-primary-200 p-1 rounded-full shadow"
        >
          <X size={22} />
        </button>

        <img src="/avatar.png" alt="Guide" className="w-32 rounded-full mb-3" />
        <h2 className="font-bold text-lg">أحمد الخطيب</h2>
        <p className="text-sm text-secondary-800 mb-6">مرشد سياحي</p>

        <nav className="flex flex-col gap-3 w-full px-6">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-md transition ${
                  isActive ? "bg-primary-200" : "hover:bg-primary-400/60 hover:text-primary-50"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="mt-auto mb-4 flex items-center gap-2 text-primary-700 hover:text-primary-500">
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </aside>
    </>
  );
}
