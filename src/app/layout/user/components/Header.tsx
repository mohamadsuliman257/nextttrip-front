import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between   px-20 py-3 ">
      <button className="relative">
        <Bell size={40} className="text-primary-500 " />
        <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center font-extrabold">
          3
        </span>
      </button>
      <Link to="/">
        <img src="/logo.png" alt="NextTrip Syria Logo" className="w-18 h-auto" />
      </Link>
    </header>
  );
}
