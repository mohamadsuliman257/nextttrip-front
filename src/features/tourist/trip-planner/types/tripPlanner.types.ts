export type TripPlannerRequest = {
  latitude: number;
  longitude: number;
  interests: string[];
  budget: number;
  days: number;
  season: "winter" | "spring" | "summer" | "autumn";
  weather: "sunny" | "cloudy" | "rainy" | "hot" | "cold";
  preferred_time: "morning" | "afternoon" | "evening" | "sunset";
  preferred_activity_level: number;
  pace: "slow" | "relaxed" | "medium" | "balanced" | "intensive" | "active";
};

export type TripActivity = {
  database_place_id: number | null;
  place_id: string;
  osm_place_id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  image_urls: string[];
  score: number;
  cost: number;
  duration: number;
  activity_level: number;
  is_outdoor: number;
  opening_hours: string;
  recommended_time: string;
  start_time: string;
  end_time: string;
  travel_time_from_previous: number;
  distance_from_previous: number;
};

export type TripDay = {
  day: number;
  total_cost: number;
  total_duration: number;
  total_travel_time: number;
  activities: TripActivity[];
};

export type TripPlan = {
  summary: {
    algorithm: string;
    days: number;
    pace: string;
    budget: number;
    total_places: number;
    total_cost: number;
    total_duration: number;
    total_travel_time: number;
    fitness: number;
    generations: number;
    population_size: number;
  };
  days: TripDay[];
};
