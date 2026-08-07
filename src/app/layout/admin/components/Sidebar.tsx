import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  Menu,
  X,
  LayoutDashboard,
  Bell,
  ChevronDown,
  LogOut,
  Building2,
  Layers,
  Heart,
  Globe,
  Lightbulb,
  Building,
  // CalendarCheck,
  // UserStar,
  // MessageSquareDiff
} from "lucide-react";
import { useState, useEffect } from "react";
import useAuthStore from "@/features/auth/store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  // حالة فتح القوائم الفرعية
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: any) => {
    setOpenMenus((prev: any) => ({ ...prev, [label]: !prev[label] }));
  };

  // فتح القائمة الفرعية تلقائياً إذا كان المسار الحالي يطابق أحد عناصرها
  useEffect(() => {
    menu.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) =>
          location.pathname === child.to
        );
        if (hasActiveChild && !openMenus[item.label]) {
          setOpenMenus((prev: any) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, [location.pathname]);
  // console.log(openMenus);
  const menu = [
    {
      label: "الرئيسية / الإحصائيات",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "إدارة الجداول الأساسية",
      children: [
        { label: "المدن", to: "/admin/cities", icon: Building2 },
        { label: "تصنيفات الوجهات السياحية", to: "/admin/categories", icon: Layers },
        { label: "الاهتمامات", to: "/admin/interests", icon: Heart },
        { label: "اللغات", to: "/admin/languages", icon: Globe },
      ],
    },
    {
      label: "إدارة المستخدمين",
      icon: Users,
      to: "/admin/users",
    },
    // {
    //   label: "الحجوزات ",
    //   icon: CalendarCheck,
    //   to: "/admin/bookings",
    // },
    {
      label: "الوجهات السياحية ",
      children: [
        { label: "اقتراحات الأماكن", to: "/admin/suggested-places", icon: Lightbulb },
        { label: "إدارة الأماكن", to: "/admin/places", icon: Building },
        { label: "إشعارات الأماكن", to: "/admin/notifications", icon: Bell }]
    },
    // {
    //   label: "تقييمات الأماكن",
    //   icon: MessageSquareDiff,
    //   to: "/admin/place-reviews",
    // },
    // {
    //   label: "تقييمات المرشدين ",
    //   icon: UserStar,
    //   to: "/admin/guide-reviews",
    // },
    // {
    //   label: "الرحلات ",
    //   icon: UserStar,
    //   to: "/admin/trips",
    // },
  ];

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-2 right-4 bg-secondary-200 shadow p-2 rounded-full text-primary-500 z-50"
      >
        <Menu size={22} />
      </button>

      {/* خلفية */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-secondary-800/80 md:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-78 z-50 h-full
          text-secondary-800 md:bg-white/10 bg-white/90
          flex flex-col py-6 overflow-y-auto
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0
          transform transition-transform duration-500
        `}
      >
        {/* زر إغلاق */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 left-4 bg-secondary-200 p-1 rounded-full shadow"
        >
          <X size={22} />
        </button>

        {/* الشعار */}
        <Link to="/" className="flex justify-center">
          <img src="/logo.png" className="w-40 mb-10" />
        </Link>

        <h2 className="text-2xl mb-8 text-primary-700 font-bold text-center">
          لوحة التحكم
        </h2>

        <nav className="flex flex-col gap-2 px-4 text-lg">
          {menu.map((item) => {
            const Icon = item.icon;

            // عنصر رئيسي بدون children
            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-3 rounded-md transition ${isActive
                      ? "bg-secondary-100"
                      : "hover:bg-secondary-300/60"
                    }`
                  }
                >
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            // عنصر رئيسي مع children
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center  w-full py-2 px-3 rounded-md hover:bg-secondary-300/60 transition"
                >
                  <ChevronDown
                    size={18}
                    className={`me-2 transition ${openMenus[item.label] ? "" : "rotate-90"
                      }`}
                  />
                  <span>
                    {item.label}
                  </span>
                </button>

                {openMenus[item.label] && (
                  <div className="ms-8 ps-2 ml-6 mt-1 flex flex-col gap-1 text-lg ">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <NavLink
                          key={child.label}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2 py-1 transition  ${isActive ? "bg-secondary-100" : "hover:bg-secondary-300/60"
                            }`
                          }
                        >
                          {ChildIcon && <ChildIcon size={14} />}
                          {child.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <button className="flex py-2 px-6 w-10/12  gap-3 mt-3 rounded-md transition hover:bg-primary-400/60 hover:text-primary-50" onClick={() => logout(() => navigate("/"))}>
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </aside>
    </>
  );
}
