import { z } from "zod";

export const suggestPlaceSchema = z.object({
  name: z.string().min(1, "اسم المكان مطلوب").max(191, "الاسم طويل جداً"),
  city_id: z.string().min(1, "المدينة مطلوبة"),
  description: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export type SuggestPlaceForm = z.infer<typeof suggestPlaceSchema>;
