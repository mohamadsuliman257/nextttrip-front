import { AlertTriangle, Trash2 } from "lucide-react";
import { useDeleteTrip } from "../hooks/useDeleteTrip";

interface DeleteTripModalProps {
  tripId: number;
  tripTitle: string;
  placesCount: number;
  onClose: () => void;
}

// نافذة تأكيد حذف الرحلة مع جميع بنودها
export function DeleteTripModal({ tripId, tripTitle, placesCount, onClose }: DeleteTripModalProps) {
  const remove = useDeleteTrip(onClose);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={22} />
              <h3 className="text-lg font-bold">حذف الرحلة</h3>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            هل أنت متأكد من حذف رحلة{" "}
            <span className="font-bold text-primary-700">{tripTitle}</span>؟
          </p>
          <p className="mt-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-600">
            سيتم حذف الرحلة و{placesCount > 0 ? `جميع بنودها (${placesCount} مكان)` : "بنودها"} نهائياً،
            ولا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>

        <div className="flex gap-2 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={() => remove.mutate(tripId)}
            disabled={remove.isPending}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={15} />
            {remove.isPending ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={remove.isPending}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
