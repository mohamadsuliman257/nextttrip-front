export type TripPlaceItem = {
  id: number;
  day_number: number;
  order: number;
  start_time: string;
  duration_minutes: number;
  travel_minutes: number;
  estimated_cost: number;
  note: string | null;
  place: {
    id: number;
    name: string;
    city_id: number;
    category_id: number;
    description?: string;
    address?: string;
    cost?: number;
    average_rating?: number;
    reviews_count?: number;
    latitude?: number;
    longitude?: number;
    city?: { id: number; name: string } | null;
    category?: { id: number; name: string } | null;
    image?: string | null;
  } | null;
};

export type MyTrip = {
  id: number;
  title: string;
  start_date: string | null;
  end_date: string | null;
  days: number | null;
  day_count: number | null;
  budget_max: number | null;
  total_cost: number | null;
  total_estimated_cost: number | null;
  trip_pace: string | null;
  preferred_activity_level: string | null;
  source: string | null;
  places_count?: number;
  created_at: string;
  trip_places?: TripPlaceItem[];
};

export interface CreateTripPayload {
  title: string;
  start_date?: string;
  days?: number;
  budget_max?: number;
  trip_pace?: string;
  place_id?: number;
  start_time?: string;
  note?: string;
}

export interface AddPlacePayload {
  place_id: number;
  day_number?: number;
  start_time?: string;
  note?: string;
}
