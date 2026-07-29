import NotificationBell from "@/features/notifications/components/NotificationBell";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="flex items-center justify-between  px-4 md:px-6 py-3 ">
     
    <NotificationBell/>
      <Link to="/">
        <img src="/logo.png" alt="NextTrip Syria Logo" className="w-25 h-auto" />
      </Link>
    </header>
  );
}
