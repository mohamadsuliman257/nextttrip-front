import NotificationBell from "@/features/notifications/components/NotificationBell";

export default function Header() {
  return (
    <header className="flex items-center justify-between  px-4 md:px-6 py-3 ">
      <NotificationBell />      
    </header>
  );
}
