export interface NearbyRecommendation {
  id: number;
  name: string;
  category?: string;
  score: number;
  
  image_urls:  String[];
}

export interface NearbyRecommendationsRequest {
  title?: string;
  latitude: number;
  longitude: number;
  interests: string[];
  budget: number;
  season: "winter" | "spring" | "summer" | "autumn";
  weather: "sunny" | "cloudy" | "rainy" | "hot" | "cold";
  preferred_time: "morning" | "afternoon" | "evening" | "sunset";
  preferred_activity_level: number;
  pace: "slow" | "relaxed" | "medium" | "balanced" | "intensive" | "active";
  limit?: number;
}