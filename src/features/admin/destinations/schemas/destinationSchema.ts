import { z } from "zod";

export const destinationSchema = z.object({
  city_id: z.number().min(1, "المدينة مطلوبة"),
  category_id: z.number().min(1, "الفئة مطلوبة"),
  name: z.string().min(1, "اسم المكان مطلوب").max(191, "الاسم يجب أن يكون أقل من 191 حرف"),
  description: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  cost: z.number().optional().catch(undefined),
  expected_duration_minutes: z.number().int().optional().catch(undefined),
  activity_level: z.enum(["relax", "sensible", "vigour"]).optional(),
  is_outdoor: z.boolean().optional().catch(undefined),
  best_seasons: z.array(z.string()).optional(),
  recommended_times: z.array(z.string()).optional(),
  opening_hours: z.string().optional(), // Accept string for form input, will be converted to array
  latitude: z.number().optional().catch(undefined),
  longitude: z.number().optional().catch(undefined),
  // images: z.array(z.any()).optional(),
  interests: z.array(z.number()).optional(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;
