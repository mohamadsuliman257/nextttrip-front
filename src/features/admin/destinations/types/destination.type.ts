export type ActivityLevel = "relax" | "sensible" | "vigour";

export interface DestinationImage {
  id: number;
  image_url: string;
}

export interface Destination {
  id: number;
  city_id: number;
  category_id: number;
  city?: { id: number; name: string };
  category?: { id: number; name: string };
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  cost?: number;
  expected_duration_minutes?: number;
  activity_level?: ActivityLevel;
  is_outdoor?: boolean;
  best_seasons?: string | string[];
  recommended_times?: string | string[];
  opening_hours?: string | string[] | Record<string, unknown>;
  average_rating?: number;
  reviews_count?: number;
  latitude?: number;
  longitude?: number;
  images?: DestinationImage[];
  interests?: Array<number | { id: number }>;
  created_at?: string;
  updated_at?: string;
}

export interface DestinationFormData {
  city_id: number;
  category_id: number;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  cost?: number;
  expected_duration_minutes?: number;
  activity_level?: ActivityLevel;
  is_outdoor?: boolean;
  best_seasons?: string[];
  recommended_times?: string[];
  opening_hours?: string; // String for form input (comma-separated), will be converted to array in API
  latitude?: number;
  longitude?: number;
  images?: File[];
  existing_images?: Array<string | DestinationImage>; // URLs/objects of images already stored in the database
  images_to_delete?: number[]; // IDs of images to delete
  interests?: number[];
}
