import { useState } from "react";
import type { SuggestedPlace } from "../types/suggestedPlace.type";
import { X } from "lucide-react";
import { updateSuggestionStatus } from "../api/updateSuggestionStatus.api";

interface SuggestedPlaceDetailsProps {
  place: SuggestedPlace | null;
  onClose: () => void;
  onStatusUpdate?: () => void;
}

export default function SuggestedPlaceDetails({ place, onClose, onStatusUpdate }: SuggestedPlaceDetailsProps) {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    setIsSubmitting(true);
    try {
      await updateSuggestionStatus(place.id, { status, admin_notes: note });
      if (onStatusUpdate) onStatusUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-white/80 bg-opacity-50 flex items-center justify-center z-100 ">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative border border-primary-500 space-y-4 ">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div>
          <label className="block text-sm font-medium text-primary-500 mb-1">اسم المكان المقترح</label>
          <p className="text-gray-900">{place.name}</p>
        </div>

          <div>
            <label className="block text-sm font-medium text-primary-500 mb-1">الوصف</label>
            <p className="text-gray-900">{place.description}</p>
          </div>

        {place.images && place.images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-primary-500 mb-2">الصور</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {place.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`صورة ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 shrink-0"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-500 mb-1">اسم المستخدم</label>
            <p className="text-gray-900">{place.user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-500 mb-1">نوع المستخدم</label>
            <p className="text-gray-900">{place.user.role === "guide" ? "مرشد" : "سائح"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-primary-500 mb-1">تاريخ الاقتراح</label>
            <p className="text-gray-900">
              {place.created_at ? new Date(place.created_at).toLocaleDateString('ar-EG') : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-500 mb-1">الحالة</label>
            <p className="text-gray-900">
              {place.status === "pending" ? "قيد المراجعة" :
                place.status === "approved" ? "مقبول" : "مرفوض"}
            </p>
          </div>
        </div>

        {place.status === "pending" && (
          <>
            <div className="p-3 rounded-lg border border-primary-400 bg-primary-50">
              <label className="block text-sm font-medium text-primary-500 mb-1">ملاحظة الإدارة</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="أضف ملاحظة (اختياري)"
                className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none bg-white"
                rows={3}
              />

                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate("approved")}
                    disabled={isSubmitting}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "موافقة"}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "رفض"}
                  </button>
                </div>
              </div>
            </>
          )}

      </div>
    </div>
  );
}
