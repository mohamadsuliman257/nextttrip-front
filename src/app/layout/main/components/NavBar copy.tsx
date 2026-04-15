import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="px-8 py-3 w-screen flex flex-wrap">
       <img 
              src="/logo.png" 
              alt="NextTrip Syria Logo" 
              className="w-50 h-auto
              absolute top-3 left-8"
            />

      <ul className="gap-20  flex pt-5 text-secondary-600 font-medium text-xl">
        <li className="text-primary-700 hover:text-primary-500 transition">
          <Link className="nav-link" to="/">
            الرئيسية
          </Link>
        </li>
        <li className="hover:text-primary-500 transition">
          <Link className="nav-link" to="profile">
            استكشف
          </Link>
        </li>
        <li className="hover:text-primary-500 transition">
          <Link className="nav-link" to="about">
            المرشدون
          </Link>
        </li>
        <li className="hover:text-primary-500 transition">
          <Link className="nav-link" to="about">
            خطط رحلتك
          </Link>
        </li>
        <li className="hover:text-primary-500 transition">
          <Link className="nav-link" to="contact-us">
            تسجيل الدخول
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;