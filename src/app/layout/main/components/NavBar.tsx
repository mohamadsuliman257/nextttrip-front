import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-8 py-3 w-full flex items-top justify-between relative">     

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
          flex justify-between w-3/5  text-secondary-600 font-medium text-xl transition-all pt-5
          md:flex md:flex-row md:static
          ${open ? "flex flex-col absolute top-20 right-8 bg-white shadow-lg p-6 rounded-xl gap-6" : "hidden md:flex"}
        `}
      >
        <li className="text-primary-700 hover:text-primary-500 transition">
          <Link to="/">الرئيسية</Link>
        </li>

        <li className="hover:text-primary-500 transition">
          <Link to="/profile">استكشف</Link> 
        </li>

        <li className="hover:text-primary-500 transition">
          <Link to="/about">المرشدون</Link>
        </li>

        <li className="hover:text-primary-500 transition">
          <Link to="/about">خطط رحلتك</Link>
        </li>

        <li className="hover:text-primary-500 transition">
          <Link to="/contact-us">تسجيل الدخول</Link>
        </li>
      </ul>
       {/* Logo */}
      <img
        src="/logo.png"
        alt="NextTrip Syria Logo"
        className="w-40 h-auto"
      />
    </nav>
  );
};

export default NavBar;
