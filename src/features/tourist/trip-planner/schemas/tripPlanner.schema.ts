import { z } from "zod";

export const seasonValues = ["winter", "spring", "summer", "autumn"] as const;
export const weatherValues = ["sunny", "cloudy", "rainy", "hot", "cold"] as const;
export const preferredTimeValues = ["morning", "afternoon", "evening", "sunset"] as const;
export const paceValues = ["slow", "relaxed", "medium", "balanced", "intensive", "active"] as const;

export const tripPlannerSchema = z.object({
  title: z.string().max(191, "يجب ألا يتجاوز العنوان 191 محرفاً"),
  latitude: z.coerce
    .number({ message: "خط العرض مطلوب" })
    .min(-90, "يجب أن يكون خط العرض بين -90 و 90")
    .max(90, "يجب أن يكون خط العرض بين -90 و 90"),
  longitude: z.coerce
    .number({ message: "خط الطول مطلوب" })
    .min(-180, "يجب أن يكون خط الطول بين -180 و 180")
    .max(180, "يجب أن يكون خط الطول بين -180 و 180"),
  interests: z.array(z.string().min(1, "الاهتمام مطلوب")).min(1, "أدخل اهتماماً واحداً على الأقل"),
  budget: z.coerce.number({ message: "الميزانية مطلوبة" }).min(0, "يجب أن تكون الميزانية 0 أو أكثر"),
  start_date: z.string().refine((value) => !value || !Number.isNaN(Date.parse(value)), {
    message: "تاريخ البدء غير صحيح",
  }),
  days: z.coerce
    .number({ message: "عدد الأيام مطلوب" })
    .int("يجب أن يكون عدد الأيام رقماً صحيحاً")
    .min(1, "يجب أن يكون عدد الأيام 1 على الأقل")
    .max(14, "يجب ألا يتجاوز عدد الأيام 14"),
  season: z.enum(seasonValues, { message: "الفصل غير صحيح" }),
  weather: z.enum(weatherValues, { message: "الطقس غير صحيح" }),
  preferred_time: z.enum(preferredTimeValues, { message: "الوقت المفضل غير صحيح" }),
  preferred_activity_level: z.coerce
    .number({ message: "مستوى النشاط مطلوب" })
    .int("يجب أن يكون مستوى النشاط رقماً صحيحاً")
    .min(1, "يجب أن يكون مستوى النشاط بين 1 و 4")
    .max(4, "يجب أن يكون مستوى النشاط بين 1 و 4"),
  pace: z.enum(paceValues, { message: "وتيرة الرحلة غير صحيحة" }),
});

export type TripPlannerFormValues = z.infer<typeof tripPlannerSchema>;
