import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  CheckCheck,
} from "lucide-react";
import type { BookingStats } from "../types/booking.type";

interface Props {
  stats: BookingStats | undefined;
}

export default function BookingStatsCards({ stats }: Props) {
  if (!stats) return null;

  const cards = [
    {
      title: "إجمالي الحجوزات",
      value: stats.total,
      icon: <CalendarCheck className="w-10 h-10" />,
      color: "text-purple-500",
      border: "border-purple-200",
    },
    {
      title: "قيد المراجعة",
      value: stats.pending,
      icon: <Clock className="w-10 h-10" />,
      color: "text-orange-500",
      border: "border-orange-200",
    },
    {
      title: "مقبول",
      value: stats.accepted,
      icon: <CheckCircle2 className="w-10 h-10" />,
      color: "text-green-500",
      border: "border-green-200",
    },
    {
      title: "مكتمل",
      value: stats.completed,
      icon: <CheckCheck className="w-10 h-10" />,
      color: "text-blue-500",
      border: "border-blue-200",
    },
    {
      title: "مرفوض",
      value: stats.rejected,
      icon: <XCircle className="w-10 h-10" />,
      color: "text-red-500",
      border: "border-red-200",
    },
    {
      title: "ملغي",
      value: stats.cancelled,
      icon: <Ban className="w-10 h-10" />,
      color: "text-gray-500",
      border: "border-gray-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white shadow-sm rounded-xl px-3 py-5 border-3 ${card.border} flex items-center gap-3`}
        >
          <div className={ `${card.color}`}>{card.icon}</div>
          <div className="flex-1 text-center">
            <h3 className="text-gray-500 font-medium whitespace-nowrap">
              {card.title}
            </h3>
            <p className=" text-xl font-bold text-gray-900 mt-0.5">
              {card.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      
    </div>
  );
}
