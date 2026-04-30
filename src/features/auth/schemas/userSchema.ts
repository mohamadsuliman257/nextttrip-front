import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً"),
  email: z.string().email("بريد غير صالح"),
  password: z.string().min(6, "كلمة المرور قصيرة"),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["password_confirmation"],
});

export type UserFormData = z.infer<typeof userSchema>;
