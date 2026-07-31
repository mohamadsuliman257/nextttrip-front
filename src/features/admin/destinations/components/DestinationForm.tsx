import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import LocationMapPicker from "@/components/LocationMapPicker";
import { destinationSchema, type DestinationSchema } from "../schemas/destinationSchema";
import type { DestinationFormData } from "../types/destination.type";
import { useState } from "react";
import { X } from "lucide-react";
import { useCategories, useCities, useInterests } from "@/features/lookups";

interface DestinationFormProps {
    onSubmit: (data: DestinationFormData) => void;
    defaultValues?: Partial<DestinationFormData>;
    isSubmitting?: boolean;
}

export default function DestinationForm({ onSubmit, defaultValues, isSubmitting }: DestinationFormProps) {
    const { data: cities } = useCities();    
    const { data: categories } = useCategories();    
    const { data: interests } = useInterests();    
    

    const [existingImages, setExistingImages] = useState<Array<{ id: number; image_url: string }>>(
      (defaultValues?.existing_images || []).map((image) =>
        typeof image === "string" ? { id: -1, image_url: image } : image
      )
    );
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

    const toNumber = (v: unknown): number | undefined => {
      if (v === undefined || v === null || v === "") return undefined;
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    };

    const toArray = (v: unknown): string[] | undefined => {
      if (v === undefined || v === null || v === "") return undefined;
      if (Array.isArray(v)) return v.map(String);
      if (typeof v === "string") {
        try {
          const parsed = JSON.parse(v);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          /* ignore */
        }
      }
      return undefined;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<DestinationSchema>({
        resolver: zodResolver(destinationSchema),
        defaultValues: defaultValues ? {
            city_id: defaultValues.city_id || undefined,
            category_id: defaultValues.category_id || undefined,
            name: defaultValues.name || "",
            description: defaultValues.description || "",
            phone: defaultValues.phone || "",
            address: defaultValues.address || "",
            cost: toNumber(defaultValues.cost),
            expected_duration_minutes: toNumber(defaultValues.expected_duration_minutes),
            activity_level: defaultValues.activity_level || undefined,
            is_outdoor: defaultValues.is_outdoor || false,
            best_seasons: toArray(defaultValues.best_seasons) || [],
            recommended_times: toArray(defaultValues.recommended_times) || [],
            opening_hours: defaultValues.opening_hours || "",
            latitude: toNumber(defaultValues.latitude),
            longitude: toNumber(defaultValues.longitude),
            interests: defaultValues.interests || [],
        } : {
            name: "",
            city_id: undefined,
            category_id: undefined,
            description: "",
            phone: "",
            address: "",
            cost: undefined,
            expected_duration_minutes: undefined,
            activity_level: undefined,
            is_outdoor: false,
            best_seasons: [],
            recommended_times: [],
            opening_hours: "",
            latitude: undefined,
            longitude: undefined,
            interests: [],
        },
    });

    const selectedInterests = watch("interests") || [];

    const toggleInterest = (interestId: number) => {
        const current = selectedInterests;
        if (current.includes(interestId)) {
            setValue("interests", current.filter((id: number) => id !== interestId));
        } else {
            setValue("interests", [...current, interestId]);
        }
    };

    const toggleSeason = (season: string) => {
        const current = watch("best_seasons") || [];
        if (current.includes(season)) {
            setValue("best_seasons", current.filter((s: string) => s !== season));
        } else {
            setValue("best_seasons", [...current, season]);
        }
    };

    const toggleTime = (time: string) => {
        const current = watch("recommended_times") || [];
        if (current.includes(time)) {
            setValue("recommended_times", current.filter((t: string) => t !== time));
        } else {
            setValue("recommended_times", [...current, time]);
        }
    };

    const seasons = ["الربيع", "الصيف", "الخريف", "الشتاء"];
    const times = ["صباحاً", "ظهراً", "عصراً", "مساءً"];

    const handleFormSubmit = (data: DestinationSchema) => {
        const formData = {
            ...data,
            images: newImageFiles,
            existing_images: existingImages.map((image) => image.image_url),
            images_to_delete: imagesToDelete,
        } as DestinationFormData;
        onSubmit(formData);
    };

    const handleRemoveExistingImage = (image: { id: number; image_url: string }) => {
        setImagesToDelete([...imagesToDelete, image.id]);
        setExistingImages(existingImages.filter((img) => img !== image));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setNewImageFiles([...newImageFiles, ...fileArray]);
            setNewImagePreviews([...newImagePreviews, ...fileArray.map((file) => URL.createObjectURL(file))]);
        }
        e.target.value = "";
    };

    const handleRemoveNewImage = (index: number) => {
        setNewImageFiles(newImageFiles.filter((_, i) => i !== index));
        setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
    };

    const handleLocationChange = (lat: string, lng: string) => {
        setValue("latitude", parseFloat(lat) || 0);
        setValue("longitude", parseFloat(lng) || 0);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="اسم المكان *" name="name" register={register} errors={errors} />
                <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">المدينة *</label>
                    <select {...register("city_id", { valueAsNumber: true })} className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
                        <option value="">اختر المدينة</option>
                        {cities?.map((city: any) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    {errors.city_id && <p className="text-red-500 text-sm mt-1">{errors.city_id.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">الفئة *</label>
                    <select {...register("category_id", { valueAsNumber: true })} className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
                        <option value="">اختر الفئة</option>
                        {categories?.map((category: any) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
                </div>
                <FormField label="رقم الهاتف" name="phone" register={register} errors={errors} type="tel" />
                <FormField label="العنوان" name="address" register={register} errors={errors} />
                <FormField label="التكلفة" name="cost" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
                <FormField label="المدة المتوقعة (دقائق)" name="expected_duration_minutes" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
                <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">مستوى النشاط</label>
                    <select {...register("activity_level")} className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
                        <option value="">اختر مستوى النشاط</option>
                        <option value="relax">استرخاء</option>
                        <option value="sensible">معتدل</option>
                        <option value="vigour">نشط</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">ساعات العمل</label>
                    <input type="text" {...register("opening_hours")} className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" placeholder="مثال: 9:00 - 17:00" />
                    <p className="text-xs text-gray-500 mt-1">يمكنك إضافة عدة فترات عمل بفصلها بفاصلة</p>
                </div>
            </div>

            <LocationMapPicker
                latitude={defaultValues?.latitude?.toString()}
                longitude={defaultValues?.longitude?.toString()}
                onLocationChange={handleLocationChange}
            />

            <FormField label="الوصف" name="description" register={register} errors={errors} type="textarea" />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    {...register("is_outdoor")}
                    className="h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500"
                    onChange={(e) => setValue("is_outdoor", e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">نشاط في الهواء الطلق</label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">أفضل المواسم</label>
                <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                        <button key={season} type="button" onClick={() => toggleSeason(season)}
                            className={`rounded-lg border px-4 py-2 transition-colors ${(watch("best_seasons") || []).includes(season) ? "border-primary-500 bg-primary-600 text-white" : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"}`}>
                            {season}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأوقات الموصى بها</label>
                <div className="flex flex-wrap gap-2">
                    {times.map((time) => (
                        <button key={time} type="button" onClick={() => toggleTime(time)}
                            className={`rounded-lg border px-4 py-2 transition-colors ${(watch("recommended_times") || []).includes(time) ? "border-primary-500 bg-primary-600 text-white" : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"}`}>
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاهتمامات</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {interests?.map((interest: any) => (
                        <button key={interest.id} type="button" onClick={() => toggleInterest(interest.id)}
                            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${selectedInterests.includes(interest.id) ? "border-primary-500 bg-primary-600 text-white" : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"}`}>
                            {interest.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الصور</label>
                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">الصور الحالية:</p>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                            {existingImages.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img src={image.image_url} alt={`Existing ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                                    <button type="button" onClick={() => handleRemoveExistingImage(image)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {newImagePreviews.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">صور جديدة:</p>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                            {newImagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img src={preview} alt={`New ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                                    <button type="button" onClick={() => handleRemoveNewImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <input type="file" accept="image/*" multiple onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                <p className="text-xs text-gray-500 mt-1">يمكنك رفع صور متعددة</p>
            </div>

            <button type="submit" disabled={isSubmitting}
                className="w-full rounded-lg bg-linear-to-r from-primary-600 to-secondary-500 px-4 py-2 text-white transition-colors hover:from-primary-700 hover:to-secondary-600 disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? "جاري الحفظ..." : defaultValues ? "تحديث" : "إضافة"}
            </button>
        </form>
    );
}
