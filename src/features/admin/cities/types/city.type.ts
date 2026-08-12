export interface City {
  id: number;
  name: string;
  description?: string;
  image?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CityFormData {
  name: string;
  description?: string;
  image?: string | File;
}
