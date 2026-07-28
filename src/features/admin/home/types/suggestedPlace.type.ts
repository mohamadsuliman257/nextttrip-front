export type SuggestionStatus = "pending" | "approved" | "rejected";

export interface SuggestedPlace {
  id: number;
  user_id: number;
  city_id?: number;
  name: string;
  
  description?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  status: SuggestionStatus;
  admin_notes?: string;
  
  user: { 
    name: string;
    role: 'tourist' | 'guide'  
  };
  created_at?: string;
}