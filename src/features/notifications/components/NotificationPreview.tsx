import type { Notification } from "../type/notification.type";

export default function NotificationPreview({ notification  }: { notification: Notification }) {
  const {  data } = notification;

  if (data.type === "alter-booking") {
    return (
      <div>
        <p className="font-bold">{data.message}</p>
        <p className="text-sm text-gray-600">الحالة: {data.status}</p>
      </div>
    );
  }

  if (data.type === "new-booking") {
    return (
      <div>
        <p className="font-bold">حجز جديد من {data.tourist_name}</p>
        <p className="text-sm text-gray-600">
          يبدأ بتاريخ {data.startDate} — لمدة {data.days} أيام
        </p>
      </div>
    );
  }

  if (data.type === "suggested-place-submitted") {
    return (
      <div>
        <p className="font-bold">{data.message}</p>
        <p className="text-sm text-gray-600">
          {data.place_name} - {data.city_name}
        </p>
      </div>
    );
  }

  return <p>إشعار غير معروف</p>;
}

