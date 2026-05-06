import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, SquareChevronDown, X } from "lucide-react";
import  useAuthStore  from "@/features/auth/store/authStore";

const publicLinks = [
  { label: "الرئيسية", to: "/" },
  { label: "استكشف", to: "/profile" },
  { label: "المرشدون", to: "/guides" },
  { label: "خطط رحلتك", to: "/plan" },
];

const getDashboardLink = (role: "user" | "guide" | "admin") => {
  if (role === "admin") return "/admin";
  if (role === "guide") return "/guide";
  return "/user";
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="px-8 py-3 w-full flex items-top justify-between absolute top-0">

      {/* زر الموبايل */}
      <button
        className="md:hidden text-secondary-700 -mt-10"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* القائمة */}
      <ul
        className={`
          flex justify-between w-3/5 text-secondary-600 font-medium text-base md:text-xl transition-all pt-5
          md:flex md:flex-row md:static
          ${open ? "flex flex-col absolute top-20 right-8 bg-white/95 shadow-lg p-6 rounded-xl gap-6 z-40" : "hidden md:flex"}
        `}
      >
        {publicLinks.map((link) => (
          <li key={link.to} className="hover:text-primary-500 transition">
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}

        {/* إذا لم يكن مسجل دخول */}
        {!user && (
          <li className="hover:text-primary-500 transition">
            <Link to="/login">تسجيل الدخول</Link>
          </li>
        )}

        {/* إذا كان مسجل دخول */}
        {user && (
          <li className="relative group cursor-pointer text-secondary-600">
            <span className="flex gap-1">{user.name} <ChevronDown/> </span>

            {/* القائمة المنسدلة */}
            <ul className="absolute hidden  group-hover:flex flex-col bg-white   border shadow-lg rounded-lg p-4 gap-3 right-0 top-7 w-40 z-50">

              <li className="hover:text-primary-500 transition">
                <Link to={getDashboardLink(user.role)}>لوحة التحكم</Link>
              </li>               

              <li
                className="hover:text-primary-500 transition cursor-pointer"
                onClick={logout}
              >
                تسجيل الخروج
              </li>
            </ul>
          </li>
        )}
      </ul>

      {/* Logo */}
      <Link to="/">
        <img
          src="/logo.png"
          alt="NextTrip Syria Logo"
          className="w-40 h-auto"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
