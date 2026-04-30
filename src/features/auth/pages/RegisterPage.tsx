// auth/pages/RegisterPage.tsx
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema, type UserFormData } from "../schemas/userSchema";
import { guideSchema, type GuideFormData } from "../schemas/guideSchema";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

type RegisterFormData = UserFormData & Partial<GuideFormData>;

export default function RegisterPage() {
  const [role, setRole] = useState<"user" | "guide">("user");

  const { mutate, isPending } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(
      role === "user" ? userSchema : guideSchema,
    ) as Resolver<RegisterFormData>,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: RegisterFormData) => {
    console.log(errors)
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar") {
        if (value instanceof FileList && value.length > 0) {
          formData.append("avatar", value[0]);
        }
        return; //  لكي لا تضاف avatar مرتين
      }

      formData.append(key, value as any);
    });

    formData.append("role", role);

    mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:bg-linear-0 from-primary-200/40 via-secondary-100 to-primary-200/40 ">
      {/* RIGHT SIDE — FULL WIDTH FORM */}
      <div className="order-2 md:order-1 flex-1 bg-white overflow-y-auto h-screen">
        <div className="mt-0 md:mt-10  flex  justify-center mb-10">
          <div className="w-full max-w-lg space-y-6">
            <h2 className="heading-primary font-bold text-secondary-800/85 text-center ">
              إنشاء حساب
            </h2>
            {/* اختيار نوع الحساب */}
            <div className="flex items-center justify-center gap-6 mb-2 md:mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  className="w-4 h-4 accent-primary-600"
                />
                <span>مستخدم</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="guide"
                  checked={role === "guide"}
                  onChange={() => setRole("guide")}
                  className="w-4 h-4 accent-primary-600"
                />
                <span>مرشد</span>
              </label>
            </div>

            {/* الفورم */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 px-3">
              {/* Section 1 */}

              {/* الاسم */}
              <div>
                <label className="text-secondary-800 font-medium">الاسم</label>
                <input
                  className="w-full border rounded-lg px-3 py-1 md:py-2"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* البريد */}
              <div>
                <label className="text-secondary-800 font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-1 md:py-2"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* كلمة المرور */}
              <div>
                <label className="text-secondary-800 font-medium">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-1 md:py-2"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* تأكيد كلمة المرور */}
              <div>
                <label className="text-secondary-800 font-medium">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-1 md:py-2"
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation && (
                  <p className="text-red-500">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              {/* Section 2 */}
              {role === "guide" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* gender */}
                  <div>
                    <label className="text-secondary-800 font-medium">
                      الجنس
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("gender")}
                    >
                      <option value="">اختر الجنس</option>
                      <option value="M">ذكر</option>
                      <option value="F">أنثى</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500">{errors.gender.message}</p>
                    )}
                  </div>

                  {/* اللغات */}
                  <div>
                    <label className="text-secondary-800 font-medium">
                      اللغات
                    </label>
                    <input
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("languages")}
                    />
                    {errors.languages && (
                      <p className="text-red-500">{errors.languages.message}</p>
                    )}
                  </div>

                  {/* تاريخ الميلاد */}
                  <div>
                    <label className="text-secondary-800 font-medium">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("DOB")}
                    />
                    {errors.DOB && (
                      <p className="text-red-500">{errors.DOB.message}</p>
                    )}
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="text-secondary-800 font-medium">
                      رقم الهاتف
                    </label>
                    <input
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* السعر اليومي */}
                  <div>
                    <label className="text-secondary-800 font-medium">
                      السعر اليومي
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("price_per_day", { valueAsNumber: true })}
                    />
                    {errors.price_per_day && (
                      <p className="text-red-500">
                        {errors.price_per_day.message}
                      </p>
                    )}
                  </div>

                  {/* السيرة */}
                  <div className="md:col-span-2">
                    <label className="text-secondary-800 font-medium">
                      السيرة التعريفية
                    </label>
                    <textarea
                      className="w-full border rounded-lg px-3 py-1 md:py-2"
                      {...register("bio")}
                    />
                    {errors.bio && (
                      <p className="text-red-500">{errors.bio.message}</p>
                    )}
                  </div>

                  {/* الصورة */}
                  <div className="md:col-span-2">
                    <label className="text-secondary-800 font-medium">
                      الصورة الشخصية
                    </label>
                    <input
                      type="file"
                      className="w-full"
                      {...register("avatar")}
                    />
                    {errors.avatar?.message && (
                      <p className="text-red-500">{errors.avatar.message}</p>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-1 md:py-3 rounded-lg gradient-primary text-white font-semibold"
              >
                {isPending ? "جاري التحميل..." : "إنشاء الحساب"}
              </button>
            </form>

            <div className="text-center mt-6 text-gray-700 ">
              لديك حساب بالفعل؟
              <a
                href="/login"
                className="text-secondary-600 font-semibold hover:underline ml-1 mr-2"
              >
                تسجيل الدخول
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT SIDE — BIG LOGO */}
      <div className="order-1 md:order-2 flex flex-col justify-center items-center  text-center md:text-right md:w-1/2 mb-6 md:mb-0">
        <Link to="/">
          <img
            src="/logo.png"
            alt="NextTrip Logo"
            className="w-40 md:w-60 lg:w-[250px] mt-4" // شعار كبير جدًا
          />
        </Link>

        <p className="text-gray-700 mt-2 text-sm md:text-base max-w-sm">
          انضم إلى منصة NextTrip واستمتع بتجربة سفر ذكية داخل سوريا.
        </p>
      </div>
    </div>
  );
}
