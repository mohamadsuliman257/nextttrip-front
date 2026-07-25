import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import FormField from "../../../../components/FormField";
import { citySchema, type CitySchema } from "../schemas/citySchema";
import type { CityFormData } from "../types/city.type";

interface CityFormProps {
  onSubmit: (data: CityFormData) => void;
  defaultValues?: CityFormData;
  isSubmitting?: boolean;
}

export default function CityForm({ onSubmit, defaultValues, isSubmitting }: CityFormProps) {
  console.log("defaultValues", defaultValues);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: defaultValues || { name: "", description: "", image: undefined },
  });

  // مراقبة حقل الصورة لمعرفة ما إذا تم اختيار ملف جديد
  const imageFile = watch("image");

  // الـ useEffect الذكي لمراقبة البيانات الافتراضية والملف الجديد معاً
  useEffect(() => {
    // حالة 1: إذا قام المستخدم باختيار ملف جديد من جهازه، قم بعمل معاينة له
    if (imageFile && imageFile instanceof FileList && imageFile.length > 0) {
      const file = imageFile[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } 
    // حالة 2: إذا لم يختر ملفاً جديداً، وكان هناك صورة قديمة قادمة من الباك-إند، اعرضها فوراً
    else if (defaultValues?.image_url && typeof defaultValues.image_url === "string") {
      setImagePreview(defaultValues.image_url);
    }
  }, [imageFile, defaultValues]); // مراقبة التغييرات لضمان التحديث التلقائي

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="اسم المدينة" name="name" register={register} errors={errors} />
      <FormField label="الوصف (اختياري)" name="description" register={register} errors={errors} type="textarea" />
      
      <FormField
        label="صورة المدينة (اختياري)"
        name="image"
        register={register}
        errors={errors}
        type="file"
        inputProps={{
          accept: "image/*"
        }}
      />

      {/* عرض كتلة المعاينة والصورة بشكل آمن ومضمون */}
      {imagePreview && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">
            {imageFile && imageFile.length > 0 ? "معاينة الصورة الجديدة:" : "الصورة الحالية للمدينة:"}
          </p>
          <img
            src={imagePreview}
            alt="معاينة الصورة"
            className="w-32 h-32 object-cover rounded-lg border border-purple-200 shadow-sm"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-linear-to-r from-primary-600 to-secondary-500 px-4 py-2 text-white transition-colors hover:from-primary-700 hover:to-secondary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "جاري الحفظ..." : defaultValues ? "تحديث البيانات" : "إضافة المدينة"}
      </button>
    </form>
  );
}
