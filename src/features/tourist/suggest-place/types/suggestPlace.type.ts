export interface SuggestPlaceData {
  name: string;
  city_id: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  images?: File[];
  imagePreview?: string[];
}

export interface SuggestPlaceResponse {
  id: number;
  user_id: number;
  city_id: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
    role: string;
  };
  city: {
    id: number;
    name: string;
  };
}

export interface SuggestPlaceInput {
  name: string;
  city_id: string;
  description?: string;
  latitude?: string;
  longitude?: string;
  images: File[];
}
