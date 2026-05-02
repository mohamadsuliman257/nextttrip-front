import { Link, NavLink } from "react-router-dom";
import {  Users, MapPin, Briefcase, Settings, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "الرئيسية"  },
    { to: "/admin/users", icon: Users, label: "المستخدمون" },
    { to: "/admin/guides", icon: Briefcase, label: "المرشدون" },
    { to: "/admin/places", icon: MapPin, label: "الأماكن" },
    { to: "/admin/settings", icon: Settings, label: "الإعدادات" },
  ];

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button onClick={() => setOpen(true)} className="md:hidden fixed top-2 right-4  bg-secondary-200 shadow p-2 rounded-full text-primary-500">
        <Menu size={22} />
      </button>

      {/* خلفية غامقة تظهر عند فتح القائمة */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-secondary-800/80 md:hidden z-40 h-screen w-full" />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-64 z-40 h-screen          
           text-secondary-800 md:bg-white/10 bg-white/90
          flex flex-col items-center py-6 
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0
          transform transition-transform duration-800
        `}
      >
        {/* زر X للإغلاق (يظهر فقط في الجوال) */}
        <button onClick={() => setOpen(false)} className="md:hidden absolute top-4 left-4 bg-secondary-200 p-1 rounded-full shadow">
          <X size={22} />
        </button>

        <Link to="/">
          <img src="/logo.png" alt="NextTrip Syria Logo" className="w-40 h-auto mb-10" />
        </Link>

        <h2 className="text-2xl mb-10 text-primary-700 text-shadow-sm text-shadow-gray-300 font-bold">لوحة التحكم  </h2>
        
        <nav className="flex flex-col gap-3 w-full px-6 text-lg">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-md transition ${
                  isActive ? "bg-secondary-100" : "hover:bg-secondary-400/60 hover:text-secondary-50"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>        
      </aside>
    </>
  );
}
