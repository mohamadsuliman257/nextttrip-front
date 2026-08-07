import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { X, Upload, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import LocationMapPicker from "@/components/LocationMapPicker";
import { suggestPlaceSchema, type SuggestPlaceForm } from "../schemas/suggestPlaceSchema";
import { buildSuggestPlaceFormData } from "../api/suggestPlace.api";
import { useSuggestPlace } from "../hooks/useSuggestPlace";
import { useCities } from "@/features/lookups";

export default function SuggestPlacePage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useSuggestPlace();
  const { data: cities } = useCities();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SuggestPlaceForm>({
    resolver: zodResolver(suggestPlaceSchema),
    defaultValues: {
      name: "",
      city_id: "",
      description: "",
      latitude: "",
      longitude: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024;
      if (!isValidType) toast.error(`الملف ${file.name} ليس صورة صالحة`);
      if (!isValidSize) toast.error(`الملف ${file.name} حجمه كبير جداً (الحد الأقصى 2MB)`);
      return isValidType && isValidSize;
    });

    setSelectedImages((prev) => [...prev, ...validFiles]);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (lat: string, lng: string) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
  };

  const onSubmit = (data: SuggestPlaceForm) => {
    const formData = buildSuggestPlaceFormData({
      name: data.name,
      city_id: data.city_id,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      images: selectedImages,
    });

    mutate(formData, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary-700">اقتراح مكان جديد</h1>
          <p className="text-gray-500 mt-2">
            شاركنا باكتشافك! اقترح مكاناً سياحياً جديداً ليتم مراجعته ونشره
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="اسم المكان"
            name="name"
            register={register}
            errors={errors}
            inputProps={{ placeholder: "أدخل اسم المكان" }}
          />

          <FormField
            label="المدينة"
            name="city_id"
            register={register}
            errors={errors}
          >
            <option value="">اختر المدينة</option>
            {cities?.map((city: any) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </FormField>

          <FormField
            label="الوصف"
            name="description"
            register={register}
            errors={errors}
            type="textarea"
            inputProps={{ placeholder: "أضف وصفاً للمكان (اختياري)", rows: 4 }}
          />

          <LocationMapPicker
            onLocationChange={handleLocationChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الصور</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">اسحب الصور هنا أو اضغط للاختيار</p>
                <p className="text-xs text-gray-400 mt-1">
                  .jpg, .jpeg, .png, .webp - الحد الأقصى 2MB لكل صورة
                </p>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`صورة ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition font-medium"
            >
              {isPending ? "جاري الإرسال..." : "إرسال الاقتراح"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
