import { useState, useEffect, useRef } from "react";
import { useUnreadNotifications } from "../hooks/useUnreadNotifications";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { Bell, X } from "lucide-react";
import type { Notification } from "../type/notification.type";
import NotificationPreview from "./NotificationPreview";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/store/authStore";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { data: unread = [] } = useUnreadNotifications();
  const { data: { count: unreadCount = 0 } = { count: 0 } } = useUnreadCount();
  const markAllAsRead = useMarkAllAsRead();
  const { user } = useAuthStore();


  const openPreview = () => {
    setOpen(true);
  };

  const closePreview = () => {
    setOpen(false);

    if (unreadCount > 0) {
      markAllAsRead.mutate();
    }
  };

  const goToAllNotifications = () => {
    closePreview();
    const role = user?.role;
    
    navigate(`/${role}/notifications`);
  };

  // إغلاق النافذة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closePreview();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative">

      {/* زر الجرس */}
      <button
        className="absolute cursor-pointer right-5 top-3"
        onClick={openPreview}
        disabled={markAllAsRead.isPending}
      >
        <Bell className="w-11 h-11 text-primary-500" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs px-1 rounded-full w-5 h-5 flex items-center justify-center font-extrabold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* نافذة الإشعارات */}
      {open && (
        <div
          ref={modalRef}
          className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-3 z-50 border border-primary-300"
        >
          <button
            className="absolute left-1 top-1 text-primary-400"
            onClick={closePreview}
            disabled={markAllAsRead.isPending}
          >
            <X />
          </button>

          <h3 className="font-bold mb-2">الإشعارات الجديدة</h3>

          {unread.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              لا توجد إشعارات جديدة
            </p>
          )}

          {unread.slice(0, 5).map((n: Notification) => (
            <div key={n.id} className="border-b border-primary-300 py-2">
              <NotificationPreview notification={n} />
            </div>
          ))}

          {/* رابط كافة الإشعارات */}
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={goToAllNotifications}
              className="text-primary-500 font-bold text-sm hover:underline"
            >
              عرض كافة الإشعارات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
