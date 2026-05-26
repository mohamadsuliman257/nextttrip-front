import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface Props {
  bookingId: number;
  onClose: () => void;
}

export default function RateGuideModal({ bookingId, onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(`/user/guide-bookings/${bookingId}/rate`, {
        rating,
        note,
      }),
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">تقييم المرشد</h2>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="اكتب تعليقك (اختياري)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => mutation.mutate()}
            className="flex-1 py-2 bg-yellow-500 text-white rounded-lg"
          >
            إرسال التقييم
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-600 text-white rounded-lg"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
