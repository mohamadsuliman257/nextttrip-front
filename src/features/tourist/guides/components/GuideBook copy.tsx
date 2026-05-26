import { Link, useNavigate } from "react-router-dom";
import { useGuideBook } from "../hooks/useGuideBook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  guideBookSchema,
  type BookingForm,
} from "../schemas/guideBookSchema";
import type { Guide } from "../types/bookingTypes";

interface Props {
  guide: Guide;
}

export function GuideBook({ guide }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(guideBookSchema),
  });

  const { mutate, isPending } = useGuideBook();

  // 👈 نراقب قيمة عدد الأيام
  const dayCount = watch("day_count") || 0;

  // 👈 نحسب السعر الكلي
  const totalPrice = dayCount * guide.daily_price;

  const onSubmit = (data: BookingForm) => {
    mutate(
      {
        guideId: Number(guide.guide_id),
        data,
      },
      {
        onSuccess: () => navigate("/tourist/my-bookings"),
      }
    );
  };

  return (
    <div className="flex flex-col justify-end ">
      <h1 className="text-lg md:text-xl font-bold text-secondary-500 md:text-center mb-2 px-3">
        أدخل بيانات الحجز
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 bg-white/50 p-5 border-2 rounded-2xl border-primary-300"
      >
        {/* التاريخ */}
        <div>
          <label>تاريخ الحجز</label>
          <input
            type="date"
            {...register("start_date")}
            className="w-full border p-2 rounded"
          />
          {errors.start_date && (
            <p className="text-red-500">{errors.start_date.message}</p>
          )}
        </div>

        {/* عدد الأيام */}
        <div>
          <label>عدد الأيام</label>
          <input
            type="number"
            {...register("day_count", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
            min={1}
            max={30}
          />
          {errors.day_count && (
            <p className="text-red-500">{errors.day_count.message}</p>
          )}
        </div>

        {/* السعر الكلي */}
        {dayCount > 0 && (
          <div className="bg-primary-100 p-3 rounded-lg text-primary-700 font-semibold">
            السعر الكلي: {totalPrice.toLocaleString()} 
          </div>
        )}

        {/* الملاحظة */}
        <div>
          <label>ملاحظة (اختياري)</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <div className="flex gap-3">
          <button
            className="w-full bg-primary-600 text-white py-1 rounded-lg text-lg"
            disabled={isPending}
          >
            {isPending ? "جاري الإرسال..." : "تأكيد الحجز"}
          </button>

          <Link
            to="/tourist/guides"
            className="w-full bg-secondary-600 text-white py-1 rounded-lg text-lg text-center"
          >
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
}
