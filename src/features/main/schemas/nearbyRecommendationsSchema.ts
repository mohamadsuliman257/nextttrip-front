import { z } from "zod";

export const nearbyRecommendationsSchema = z.object({
  title: z.string().max(191).optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  interests: z.array(z.string()).min(1, "يجب اختيار اهتمام واحد على الأقل"),
  budget: z.number().min(0, "الميزانية يجب أن تكون رقم موجب"),
  season: z.enum(["winter", "spring", "summer", "autumn"]),
  weather: z.enum(["sunny", "cloudy", "rainy", "hot", "cold"]),
  preferred_time: z.enum(["morning", "afternoon", "evening", "sunset"]),
  preferred_activity_level: z.number().min(1).max(4),
  pace: z.enum(["slow", "relaxed", "medium", "balanced", "intensive", "active"]),
  limit: z.number().min(1).max(100).optional(),
});

export type NearbyRecommendationsSchema = z.infer<typeof nearbyRecommendationsSchema>;
